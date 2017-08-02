---
layout: post
title: "How to set multiple GitHub Pull Request statuses"
description: "How to set multiple GitHub Pull Request statuses"
permalink: "how-to-set-multiple-github-pull-request-statuses"
categories: [ "top" ]
tags: ["github"]
date: 2017-08-02
published: true
---
{% include JB/setup %}

## How multiple statuses look

- success: <img src="/images/github-status.png" alt="multiple GitHub statuses" title="multiple GitHub statuses">
- failure: <img src="/images/github-status-failure.png" alt="multiple GitHub statuses" title="multiple GitHub statuses">

## [I want multiple Github PR Statuses](#i-want-multiple-statuses)

Like many people, my GitHub pull requests (PRs) trigger a continuous integration (CI) server
to test my build.  When the CI server finishes running, it notifies Github whether the
build was successful.

On a successful CI build, the GitHub UI turns green, and I get a little checkmark and a link to the
build.  I usually have a setting that requires the build to be passing to make the PR mergeable.

Like many people, my build can fail for various reasons: syntax error, test failure, style violation,
insufficient code coverage, security audit, etc. So, I've been dutifully clicking the link to the CI
build to examine the failure reason.

Sometimes, I want a check to run and be allowed to fail without blocking the PR from being mergeable.

Sometimes, I want to know that the problem was style or code coverage, and not tests, without needing to
click the link and read the build output.

Unfortunately, the CI server communicates with GitHub via the [Repository Webhooks API](https://developer.github.com/v3/repos/hooks/#create-a-hook),
which only allows one status in the payload. For example:

```json
{
  "sha": "414fca9e31480df9a354fc4f41f45f375c6f39c5",
  "name": "bf4/script_testing",
  "target_url": "https://circleci.com/gh/bf4/script_testing/15?utm_campaign=vcs-integration-link&utm_medium=referral&utm_source=github-build-link",
  "context": "ci/circleci",
  "description": "Your tests passed on CircleCI!",
  "state": "success"
}
```

The underlying GitHub API that sets the build status is the [Status API](https://developer.github.com/v3/repos/statuses/).

So, I took a look at, and found success.

### [Prerequisites](#prerequisites)

- Access Token
  - Go to https://github.com/settings/tokens/new and create a personal access token
  with either 'repo' or 'repo:status' OAuth scope. (You may want to use a 'machine user' for your organization
  so you can have your org-specific gravatar show up in the statuses.)
  - Add the access token to the CI environment as `GITHUB_STATUS_ACCESS_TOKEN`

### [Steps to set multiple GitHub PR Statuses](#setup-steps)

For each build step:

1. On success|failure, set state=succes|failure and a status description.
1. Post to the Github Status API
1. Fail the build step when state=failure

### [Minimal recipe to set multiple GitHub PR Statuses](#recipe)

Assuming you're using CircleCI and your circle.yml is

```yaml
test:
  override:
    - bin/test
  post:
    - bin/lint-style
```

the build will fail if either bin/test or bin/lint-style fail.

Change that to:

```yaml
test:
  override:
    # https://developer.github.com/v3/repos/statuses/#create-a-status
    - |
      if bin/test; then
        state="success"
        description="Tests passed"
      else
        state="failure"
        description="Test failures"
      fi
      context="ci/minimal_status"
      owner="${CIRCLE_PROJECT_USERNAME}"
      repo="${CIRCLE_PR_REPONAME:-$CIRCLE_PROJECT_REPONAME}"
      sha="${CIRCLE_SHA1}"

      curl -X POST \
      --silent --show-error --write-out "STATUS: %{http_code}" \
      -H "Accept: application/vnd.github.v3+json" \
      -H "Content-Type: application/json; charset=utf-8" \
      -H "Authorization: token ${GITHUB_STATUS_ACCESS_TOKEN}" \
      -H "User-Agent: ExampleNameCIStatus" \
      -d "$(printf '
          {
           "state": "%s",
           "description": "%s",
           "context": "%s"
          }
          '  "$state" "$description" "$context"
      )" \
      "https://api.github.com/repos/${owner}/${repo}/statuses/${sha}"
  post:
    # https://developer.github.com/v3/repos/statuses/#create-a-status
    - |
      if bin/lint-style; then
        state="success"
        description="Such style"
      else
        state="failure"
        description="Style errors"
      fi
      context="ci/lint_style"
      owner="${CIRCLE_PROJECT_USERNAME}"
      repo="${CIRCLE_PR_REPONAME:-$CIRCLE_PROJECT_REPONAME}"
      sha="${CIRCLE_SHA1}"

      curl -X POST \
      --silent --show-error --write-out "STATUS: %{http_code}" \
      -H "Accept: application/vnd.github.v3+json" \
      -H "Content-Type: application/json; charset=utf-8" \
      -H "Authorization: token ${GITHUB_STATUS_ACCESS_TOKEN}" \
      -H "User-Agent: ExampleNameCIStatus" \
      -d "$(printf '
          {
           "state": "%s",
           "description": "%s",
           "context": "%s"
          }
          '  "$state" "$description" "$context"
      )" \
      "https://api.github.com/repos/${owner}/${repo}/statuses/${sha}"
```

### [Status Script](#script)

Obviously, there is room to turn this into a script. It turns out, I wrote one!

You can see a `github_status` script I wrote in [https://github.com/bf4/script_testing/pull/1](https://github.com/bf4/script_testing/pull/1).

It even has tests!

If you wanted to use it directly, you could:

```yaml
test:
  override:
    - |
      if bin/test; then
        state="success"
        desc="Tests passed"
      else
        state="failure"
        desc="Test failures"
      fi
      context="tests"
      ./github_status create "$GITHUB_STATUS_PR_NUMBER" -url "$GITHUB_STATUS_TARGET_URL" -context "${context}" -state "${state}" -desc "${desc}"
      if [ "$state" = "failure" ]; then false; else true; fi # 'false' fails the build
  post:
    - |
      if bin/lint-style; then
        state="success"
        description="Such style"
      else
        state="failure"
        description="Style errors"
      fi
      context="lint_style"
      ./github_status create "$GITHUB_STATUS_PR_NUMBER" -url "$GITHUB_STATUS_TARGET_URL" -context "${context}" -state "${state}" -desc "${desc}"
      if [ "$state" = "failure" ]; then false; else true; fi # 'false' fails the build

dependencies:
  post:
  - wget https://github.com/bf4/script_testing/raw/414fca9e31480df9a354fc4f41f45f375c6f39c5/libexec/github_status && chmod +x github_status

machine:
  environment:
    GITHUB_STATUS_USER_AGENT: "bf4ExampleCiStatus"
    GITHUB_STATUS_PR_NUMBER: "${CIRCLE_PR_NUMBER:-$CIRCLE_SHA1}"
    GITHUB_STATUS_REPO_OWNER: "$CIRCLE_PROJECT_USERNAME"
    GITHUB_STATUS_REPO_NAME: "${CIRCLE_PR_REPONAME:-$CIRCLE_PROJECT_REPONAME}"
    GITHUB_STATUS_TARGET_URL: "$CIRCLE_BUILD_URL"
```
