---
layout: post
title: "Quickbooks API: Instructions for enabling item categories"
published: true
---
{% include JB/setup %}

Sharing here since I'm not sure how to post an answer to an unasked question on the Intuit site

## tl;dr

To enable item categories in dev, when logged in to a sandbox company,
go to https://sandbox.qbo.intuit.com/app/categorymigration and click 'Switch to Categories'

## Details

This is a new developer account using the OAuth 2.0 API ([Quickbooks v3](https://developer.intuit.com/docs/api)).

I was unable to turn on categories in the sandbox by updating `companyinfo` or any obvious page in the web UI.

In production, I noticed that the URL for the categories page was `/app/category`,
so I went to `https://sandbox.qbo.intuit.com/app/categories`,
and it redirected to `https://sandbox.qbo.intuit.com/app/categorymigration`
I saw and clicked the link to 'Switch to Categories'.
I was then able to go to `/app/categories` in the web UI to create categories, as well as create them via the API.

FWIW, It appears the migration posted a CORS request to `https://sandbox.qbo.intuit.com/qbo50/neo/v1/company/193514655268479/companysetup/enableCategories`
e.g.

```ruby
post /item, payload: { Name: 'Transportation', Type: 'Category' }, params: { minorversion: 4}
```

Before the enablecategories migration, the API returned I got a 400

 ```ruby
[{:fault_type=>"ValidationFault", :error_code=>"500", :error_message=>"Unsupported Operation", :error_detail=>"Operation CREATE CATEGORY is not supported."}]
```

afterwards

```ruby
{"Name"=>"Flowers", "Active"=>true, "FullyQualifiedName"=>"Transportation", "Type"=>"Category", "domain"=>"QBO", "sparse"=>false, "Id"=>"36", "SyncToken"=>"0", "MetaData"=>{"CreateTime"=>"2017-11-08T08:58:38-08:00", "LastUpdatedTime"=>"2017-11-08T08:58:38-08:00"}}
 ```

### Not a bug: Category of Type: Service

Weird note: a subsequent query returned with `Type: Service` instead of `Type: Category`.

(Quickbooks support suggested I use a minor version 12 or greater, but I didn't go through the trouble to create a new company to check that)

```ruby
{"Name"=>"Transportation", "Active"=>true, "FullyQualifiedName"=>"Transportation", "Type"=>"Service", "domain"=>"QBO", "sparse"=>false, "Id"=>"36", "SyncToken"=>"0", "MetaData"=>{"CreateTime"=>"2017-11-08T13:28:16-08:00", "LastUpdatedTime"=>"2017-11-08T13:31:39-08:00"}
```

but I was still able to use it as a super category,

e.g.

```ruby
 { "Name"=>"Hour", "Active"=>true, "SubItem"=>true, "ParentRef"=>{"value"=>"36", "name"=>"Transportation"}, "Level"=>1, "FullyQualifiedName"=>"Transportation:Hour", "Type"=>"Service", "domain"=>"QBO", "sparse"=>false, "Id"=>"37", "SyncToken"=>"0", "MetaData"=>{"CreateTime"=>"2017-11-08T13:31:18-08:00", "LastUpdatedTime"=>"2017-11-08T13:31:18-08:00"}}
```
