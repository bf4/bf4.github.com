---
layout: post
title: "Dockerized databases for CI"
published: false
---
{% include JB/setup %}

```yaml
machine:
  services:
    - docker # if not started by default, e.g. https://circleci.com/docs/1.0/build-image-trusty/
  pre:
    - sudo service postgresql stop # e.g. 9.5 on https://circleci.com/docs/1.0/build-image-trusty/
  environment:
     PGUSER: testuser
     PGDATABASE: testuser_test
     PGHOST: 127.0.0.1
     PGPORT: 5433 # Avoid any possible conflict with already running pg
     PGPASSWORD: testpassword
     DATABASE_URL: "postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}"
     PGVERSION: "9.6"
dependencies:
  cache_directories:
    - "~/docker"
  override:
    # UNCOMMENT WHEN UPGRADING ARCH: clear out current cache built against different architecture
    # - rm -rf ~/docker
    - docker info
    - |
      if [[ -e ~/docker/postgres.tar ]];
        then docker load -i ~/docker/postgres.tar
      else
        docker pull "postgres:${PGVERSION}"
        mkdir -p ~/docker
        docker save "postgres:${PGVERSION}" > ~/docker/postgres.tar
      fi
    - docker run --detach --name=rails-postgres --volume="data-postgres:/var/lib/postgresql/data" --env="POSTGRES_PASSWORD=${PGPASSWORD}"  --env="POSTGRES_USER=${PGUSER}" --env="POSTGRES_DB=${PGDATABASE}" --publish "${PGPORT}:5432" "postgres:${PGVERSION}"
    # wait for postgres to be listening on 5433 (PGPORT)
    - for i in {1..10}; do if sudo lsof -i ":${PGPORT}"; then echo 'postgres is running!'; break; else echo 'postgres is not running on ${PGPORT} yet'; sleep 0.1; fi done; [ $i -ne 10 ] # postgres is started as long as the loop finished before 10
    # but we cannot necessarily connect yet, so...
    - for i in {1..10}; do if pg_isready "-h${PGHOST}" "--user=${PGUSER}" "--port=${PGPORT}"; then echo 'postgres is ready to connect!'; break; else echo 'postgres is not yet ready'; sleep 1; fi done; [ $i -ne 10 ] # postgres is started as long as the loop finished before 10
    # sanity check
    - psql --command "select now()"
database:
  override:
    - echo 1 # don't setup circle-ci database.yml
  post:
    - RAILS_ENV=test bundle exec rake db:create db:structure:load --trace # needed when not inferring db setup
```
