---
layout: post
title: "FactoryBot Patterns"
published: true
---
{% include JB/setup %}

I keep looking these up:

## Transient Property

```ruby
FactoryBot.define do
  factory :user do

    transient do
      manager_access_level nil
    end

    after(:create) do |user, evaluator|
      # Usage: create(:user, manager_access_level: :full_access_level)
      if (access_level = evaluator.manager_access_level)
        user.roles << Role.by_name(access_level)
      end
    end
  end
end
```

### With `has_many`

```ruby
FactoryBot.define do
  factory :trip do

    # Usage: create(:trip, :with_destinations)
    # Usage: create(:trip, :with_destinations, destinations_count: 2)
    trait :with_destinations do
      transient do
        destinations_count 1
      end
      after :build do |trip, evaluator|
        trip.destinations = build_list(:destination, evaluator.destinations_count, trip: trip)
      end
      after :create do |trip, _evaluator|
        trip.destinations.each(&:save!)
      end
    end
  end
end
```
