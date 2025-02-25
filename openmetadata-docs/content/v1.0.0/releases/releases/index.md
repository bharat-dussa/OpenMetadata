---
title: All Releases
slug: /releases/all-releases
---

# Releases

{% note %}

The OpenMetadata community is on a monthly release cadence. At every 4-5 weeks we will be releasing a new
version. To see what's coming in next releases, please check our [Roadmap](/releases/roadmap) section.

{% /note %}

# [1.0.2 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/1.0.2-release) - Latest - May 24th 2023 🎉

## UI Improvements
- Supports a separate column for Classification and Glossary in the following entities: Topic, Dashboard, Pipeline, ML Model, Container, and Data Model.
- Improved Sample Data tab UX for Tables.
- Email is now displayed on the Teams page. Users can edit their Email.
- The custom logo can be configured from the UI. The logo will be displayed on the Login page and app bar.
- UI supports updating the displayName for service, database, schema, and all other assets.

## Ingestion
- Supports custom database name for Glue.
- Fixed Postgres lineage ingestion for version 11.6.
- Added api_version and domain fields to Salesforce connector.
- Kerberos libraries have been added to ingestion image.
- PII flags have been further restricted for column names.
- Fixed GitHub reader for LookML.
- Restructured the Tableau data models ingestion.
- Fixed the basic auth for Kafka.

## Backend
- Fixed vulnerabilities for dependencies.
- Supports custom logo from backend.
- Fixed a bug related to random password.
- By default, service connection details will be masked for users, and unmasked for bots. Users will be able to view based on their view permissions.
- Fixed Elasticsearch indexing issues for a large number of objects.

# [1.0.1 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/1.0.1-release) - May 10th 2023 🎉

## UI Improvements
- Improved search experience while editing manual lineage.
- Improved security with masked API token for Looker connection.
- The tier component has been revamped.
- Added Pagination support on the Data Model page.
- Added startDate to create ingestion flow.
- Search improvements have been made on the Explore page.
- Multiple UI tweaks have been made for a better user experience, such as image placeholder improvements, text alignment and custom connectors icons.

## Ingestion
- Included IBM dependency for i Series.
- Fixed CVE vulnerability for ingestion docker image.
- Now, we fetch views and view definitions from Hive and Impala.
- Added a test connection step for verifying the Owner details in Tableau.
- Profiler logs have been improved.
- Fixed the issues reported around ingestion.

## Notifications
- Alert notifications have been added for Data Insights Report.

## Glossary
- Earlier, we only supported changing or updating the Glossary Owner. Now, we even support the removal of Owner from Glossary as well as Glossary Terms.

# [1.0 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/1.0.0-release) - April 25th 2023 🎉

{% inlineCalloutContainer %}
{% inlineCallout
color="violet-70"
icon="celebration"
bold="Upgrade OpenMetadata"
href="/deployment/upgrade" %}
Learn how to upgrade your OpenMetadata instance to 1.0!
{% /inlineCallout %}
{% /inlineCalloutContainer %}


## APIs & Schema
- **Stabilized** and improved the Schemas and APIs.
- The APIs are **backward compatible**.

## Ingestion
- Connecting to your data sources has never been easier. Find all the necessary **permissions** and **connection details** directly in the UI.
- When testing the connection, we now have a comprehensive list of **validations** to let you know which pieces of metadata can be extracted with the provided configuration.
- **Performance** improvements when extracting metadata from sources such as Snowflake, Redshift, Postgres, and dbt.
- New **Apache Impala** connector.

## Storage Services
- Based on your [feedback](https://github.com/open-metadata/OpenMetadata/discussions/8124), we created a new service to extract metadata from your **cloud storage**.
- The Data Lake connector ingested one table per file, which covered only some of the use cases in a Data Platform. With **Storage Services**, you can now present accurate metadata from your tables, even when **partitioned**.
- The first implementation has been done on **S3**, and we will keep adding support for other sources in the upcoming releases.

## Dashboard Data Models
- Dashboard Services now support the concept of **Data Models**: data that can be directly defined and managed in the Dashboard tooling itself, e.g., LookML models in Looker.
- Data Models will help us close the gap between engineering and business by providing all the necessary metadata from sources typically used and managed by analysts or business users.
- The first implementation has been done for **Tableau** and **Looker**.

## Queries
- Improved UI for **SQL Queries**, with faster loading times and allowing users to **vote** for popular queries!
- Users can now create and share a **Query** directly from the UI, linking it to multiple tables if needed.

## Localization
- In 1.0, we have added **Localization** support for OpenMetadata.
- Now you can use OpenMetadata in **English**, **French**, **Chinese**, **Japanese**, **Portuguese**, and **Spanish**.

## Glossary
- New and Improved **Glossary UI**
- Easily search for Glossaries and any Glossary Term directly in the **global search**.
- Instead of searching and tagging their assets individually, users can add Glossary Terms to multiple **assets** from the Glossary UI.

## Auto PII Classification
- Implemented an automated way to **tag PII data**.
- The auto-classification is an optional step of the **Profiler** workflow. We will analyze the column names, and if sample data is being ingested, we will run NLP models on top of it.

## Search
- **Improved Relevancy**, with added support for partial matches.
- **Improved Ranking**, with most used or higher Tier assets at the top of the search.
- Support for **Classifications** and **Glossaries** in the global search.

## Security
- **SAML** support has been added.
- Added option to mask passwords in the API response except for the `ingestion-bot` by setting the environment variable `MASK_PASSWORDS_API=true`. More info [here](/deployment/security/enable-password-masking).
- **Deprecation Notice**: **SSO** Service accounts for Bots will be deprecated. **JWT** authentication will be the preferred method for creating Bots.

## Lineage
- Enhanced Lineage UI to display a large number of **nodes (1000+)**.
- Improved UI for **better navigation**.
- Improved **SQL parser** to extract lineage in the Lineage Workflows.

## Chrome Browser Extension
- All the metadata is at your fingertips while browsing Looker, Superset, etc., with the OpenMetadata Chrome Browser Extension.
- **Chrome extension** supports Google SSO, Azure SSO, Okta, and AWS Cognito authentication.
- You can Install the Chrome extension from **Chrome Web Store**.

## Other Changes
- The **Explore page** cards will now display a maximum of **ten tags**.
- **Entity names** support apostrophes.
- The **Summary panel** has been improved to be consistent across the UI.

# [0.13.3 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.13.3-release) - March 30th 2023 🎉

## Ingestion Framework
- Datalake Avro & Json, JsonZip support
- BigQuery Profiler Ingestion for all regions
- Support for Snowflake Geometry Type
- Add support Nifi client certificate Auth
- Update `sqllineage-openmetadata` + add timeout for parsing queries
- Fixes issue in Snowflake Join Table query parsing
- Optimize Memory Usage for Usage data ingestion
- Fetch vertica schema comments as description
- Improve snowflake system metrics
- Add Database & Schema descriptions from Snowflake
- Add support XLets in Airflow Lineage Runner
- Add support for `AssumeRole` in AWS
- Add support for `pyimpala`
- Fixed issues in DBT oracle
- Support for Tableau Owner
- Support for DBT manifest V8

## Roles & Policies
- A Non-Privileged user can add new 'Roles' to Teams
- Fix Permissions API to consider the leaf nodes tags as well, example: table's column tags

## Search
- Improve Search Relevancy, by adding functional scoring and add ngram analyzer;
- Enable search for entities using both name and displayName

## Security
- Enable LDAP configuration to be configured via environment variable
- LDAP-s support connection without MTLS

## EntityName
- Relax data asset name restrictions to allow the special characters except "::"
- Allow unicode character and digits in Entity

## Data Quality
- Fix column values between test

# [0.13.2 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.13.2-release) - Jan 30th 2023 🎉

## Improved SQL Lineage
- We have collaborated with the [sqllineage](https://github.com/reata/sqllineage) and [sqlfluff](https://www.sqlfluff.com/) communities
    to improve the parsing capabilities of `sqllineage`. We'll continue to collaborate to ship further improvements in new releases.

## New Glossary UI
- Moved from a tree view in the left panel to an easy to navigate list of the terms sorted alphabetically.
- The term list shows the tags and descriptions in the cards.

## Glossary Import & Export
- You can now export your Glossary data as a CSV file.
- In the same way, you can now bulk upload terms to a Glossary by adding their details in a CSV file.
- The import utility will validate the file and show you a preview of the elements that are going to be imported to OpenMetadata.

## Unified Tag Category API
- Renamed Tag Categories to Classification, a more widely used term.
- Updated the API to conform with the rest of the specification. More info [here](https://github.com/open-metadata/OpenMetadata/issues/9259).

## Mutually Exclusive Tags
- When creating a Classification or a Glossary term, you can now make the tags to be mutually exclusive.
- If tags are set to be mutually exclusive, you won't be able to set multiple tags from the same category in the same asset.

## EntityName
- Special characters

## Ingestion Framework
- Performance Improvements: We are now getting descriptions in batch, making connectors such as Redshift or Snowflake way faster!
- The Oracle connector now ships with the Thick mode enabled.
- AWS QuickSight fixes
- DB2 constraints and profiler improvements
- Added support for Postgres Foreign Tables
- Added support for Datalake profiler row-based sampling

# [0.13.1 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.13.1-release) - Dec 20th 2022** 🎉
## Profiler and Data Quality
- Freshness Metric has been introduced. Data freshness shows DML operations performed against a table and the number of rows affected. All this is displayed within the data profiler with filterable graphs. This is currently supported for BigQuery, Snowflake, and Redshift.
- Support has been added for data quality tests on Data Lake.
- UI has been improved to show table and column profile data on seperate page. Legend is now selectable to filter for specific metrics

## Alerts and Notification
The logic for Notification Support has been improved. Users can define Alerts based on a Trigger (all data assets or a specific entity), Filters (events to consider), and Action (Slack, MS Teams, Email, Webhook) on where to send the alert.

## Ingestion
- Now, dbt has its own workflow. Previously, dbt  was a part of metadata ingestion workflow.
- Airflow Lineage Operator and the OpenMetadata Hook are now part of the ingestion package. Send Airflow metadata from your DAGs and safely store the OpenMetadata server connection directly in Airflow.
- Multiple Databases (catalog) is now supported for the Databricks connector
- Azure blob is now supported to backup your metadata into

## New Connectors
- OpenMetadata now supports Azure Datalake Storage Gen 2

## General Improvements
- Users can update the description and tags for Topic Schema. Previously, the topic schemas were read-only. We now support Avro/Protobuf parsing and field level details for topic schemas.
- The layout for the Data Insight  Report has been improved. We now display a line graph instead of a bar graph. The Most Viewed Data Assets are clickable to view the asset details page.
- Improvements have been made to Advanced Search. Now, when a filter is applied, the details of the filter selected are displayed for clarity.
- On the Explore page UI, the Side Preview is now available for all data assets. Previously it was only displayed for tables.

# [0.13.0 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.13.0-release) - Dec 8th 2022 🎉
{%  youtube videoId="oNbMnTW5AkE" start="0:00" end="7:51" /%}

## Data Insights and KPI
Data Insight allows admins to take an active approach in their metadata management. Data Inisght provides a single-pane view of all the key metrics to best reflect the state of your data. Admins can define the Key Performance Indicators (KPIs) and set goals within OpenMetadata to work towards better documentation, ownership, and tiering. Alerts can be set against the KPIs to be received on a specified schedule.

## Lineage
The lineage UI has been transformed to enhance user experience. Users can get a holistic view of an entity from the Lineage tab. When an entity is selected, the UI displays end-to-end lineage traceability for the table and column levels.

## Profiler
With the OpenMetadata UI, users can now create and deploy profiling workflows for the Datalake connector, which supports AWS S3 and GCS

## SSO
Support for LDAP SSO has been added in this release

## Advance Search
Syntax Editor has been introduced for advanced search with And/Or conditions that help discover assets quickly

## New Connectors
- AWS SageMaker
- AWS QuickSight
- AWS Kinesis
- Domo

## Messaging Service Schemas Improvements
Major enhancements have been made to how data is extracted from Kafka and Redpanda Messaging services. Previously, OpenMetadata extracted all the Topics in the messaging queue and also connected to the Schema Registry to get the Schemas. These schemas were taken as one payload and published to OpenMetadata. We now parse Avro and Protobuf Schemas to extract the fields. Now, users can document each of these fields within a schema by adding descriptions and tags. Users can search based on the fields in the Schema of a Topic.

## General Improvements
- Soft deleted entities can be restored. Currently, only the ML Models are not supported.
- Soft deleted teams can be restored. When restoring a soft deleted parent team, the child teams will not be restored by default.

# [0.12.3 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.12.3-release) - Nov 18th 2022 🎉
## Bug Fixes
- User suggestion index mapping
- Tag and Glossary terms caching

# [0.12.2 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.12.2-release) - Oct 20th 2022 🎉
## Ingestion
- Databricks lineage
- Added support for Airflow version 2.2.2 as a workflow scheduler
## Bug Fixes
- Support same table across differemt databases for the profiler

# [0.12.1 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.12.1-release) - Oct 3rd 2022 🎉
## Basic Authentication

- User/Password signup and login
- Email notifications for forgotten password and new user signed up
- Admin can add new users and send an email 

## ElasticSearch full re-index through UI

- Now admins can full re-index elasticsearch through the UI itself

## Versioning Support for Custom Attributes

- Any changes to entity custom attributes are now versioned

## DBT Metadata - Tags

- We support ingesting DBT tags into OpenMetadata

## Bots Integration 

- Admins can create bots and their security mechanism from UI itself

## Bug Fixes

- Around 136 Features/Improvements/Tests made it into 0.12.1 release 

# [0.12.0 Release](https://github.com/open-metadata/OpenMetadata/releases/tag/0.12.0-release) - Sept 7th 2022 🎉

You can read the Release Blog [here](https://blog.open-metadata.org/openmetadata-0-12-0-release-1ac059700de4)
or watch an awesome video showing the new features!

{%  youtube videoId="tv3pyCLcJfQ" start="0:00" end="17:04" /%}



## Team Hierarchy
Prior releases supported a flat hierarchy of just Teams and Users. In 0.12, support has been added for the entire organizational hierarchy with Business Unit, Division, Department, and Groups. An organization from small to very large can now be modeled in OpenMetadata with this feature.

## Roles and Policies

Access Control functionality has been revamped to support many use cases that were not possible before. Previously, a Role contained a single Policy, which consisted of simple Rules to Allow/Not Allow. The advanced rule configuration in the 0.12 release allows users to build more expressive rules using conditions.

- A Role is a collection of Policies. Roles can be assigned to users or teams where all the users in the team inherit the team roles.
- A Policy is a collection of Rules. A Policy can be reused as it can be part of a Role or can be directly assigned to Teams.
- A Rule is defined by a set of Resources, a set of Operations, an Effect to either Deny or Allow the operation, and a condition written as SpEL expression to add additional conditions based on metadata attributes. Examples of conditions — isOwner(), noOwner() && !matchTags('PII').

## Data Quality and Data Profiler

OpenMetadata began support for Data Quality in the 0.10 release, and support was added for publishing Great Expectations results in the 0.11 release. Our goal with OpenMetadata is to define metadata standards for all things data and in this release, we are standardizing Tests and Data Quality metadata. Data Quality Tests can be expressed in JSON schema and now these tests can be added dynamically using the Test Definitions API. We have also added a custom SQL data quality test that allows you to write your data quality tests using SQL statements.

An interactive dashboard helps to visualize and explore the data from the Data Profiler. You can explore how your data is changing over time, and identify data drifts using this dashboard. You can also see how data quality is changing by looking at how tests are doing over time. What is even better is, that you can explore this at both the table level or drill down to each column level going back up to 60 days.

The UI supports the detailed exploration of data quality tests, and users can drill down for the details of the test results present in a time series fashion. Tests can be added easily from the Profiler tab in the UI, both at the Table and Column levels. The UI provides a one-glance update on the metrics with a summary of data quality at the Table and Column levels.

## Announcements

Informing users about upcoming changes to the data is a big challenge. In most organizations, a team sends an email well in advance about the change. But no one reads/tracks them and finally, when the change is done, many users are unprepared to handle it.

With Announcements, you can now inform your entire team of all the upcoming events and changes, such as deprecation, deletion, or schema changes. These announcements can be scheduled with a start date and an end date. All the users following your data are not only notified in Activity Feeds but a banner is also shown on the data asset details page for users to discover (or be reminded of) the announcement.

## Activity Feed Notifications

In 0.12, we’ve also streamlined the Notifications menu with two separate tabs for Tasks and Mentions, that’ll display only the recent notifications. You can always navigate to your User Profile page to view more activities.

## Slack & Microsoft Teams integration

Users can get timely updates about the metadata change events for all entities through APIs using webhooks. The webhook integration with Slack has been further improved in this release.

OpenMetadata also supports webhook integration to Microsoft Teams, just as it supports Slack. Users can choose to receive notifications for only the required entities by using event filters based on when an entity is created, updated, or deleted. 

## Tasks

In the 0.11 release, a request to add or update descriptions for data assets could be converted to a Task. In the 0.12 release, Tasks can be created based on requests to create or update tags. Also, a glossary term approval workflow can be converted to a Task.


## Secret Management Store Interface

In 0.12, we have completely revamped how that secret is stored, accessed, and by whom; by introducing a Secrets Manager Interface to communicate with any Key Management Store. The KMS will mediate between any OpenMetadata internal requirement and sensitive information. That way, users can choose to use the underlying database as KMS, or any external system. The OpenMetadata community has already added support for AWS Key Management Service and AWS SSM.

## Connectors
New connectors are an essential part of every release in OpenMetadata. We are introducing four new connectors in this release:

- Redpanda is a Kafka API-compatible streaming data platform for developers that unifies historical and real-time data. OpenMetadata now supports Redpanda as a Messaging service, which allows users to document its topics and schemas. Refer to the Redpanda documentation for more info.
- Dagster is a new-generation Python-based orchestrator that’s designed for developing and maintaining data assets, such as tables, data sets, machine learning models, and reports. It has been added as part of OpenMetadata’s pipeline connectors. Read more from the Dagster documentation.
- Fivetran delivers ready-to-use connectors that automatically adapt as schemas and APIs change, ensuring consistent, reliable access to data. It has been added as a pipeline service. For more information, refer to the Fivetran documentation.
- Apache NiFi automates the flow of data between systems. OpenMetadata now supports a NiFi connector as the third new pipeline service on this release.

## Lineage
We’ve enhanced the performance of workflows by having a separate workflow for Lineage and Usage. By using two workflows for computing specific pieces of information, we can effectively filter down the queries to extract lineage.

During table usage ingestion, the tables retrieved successfully will be cached, so that there is no need to repeat the same calls multiple times as many queries would be referencing the same tables.
Usage queries have been optimized.
A result limit has been added to Usage queries.

## Global Settings
The OpenMetadata Settings dropdown menu has been transformed into a single, centralized Settings page for added convenience in viewing all the available options. The Global Settings comprises setting options for Team Members, Access based on Roles and Policies, Services, Data Quality, Collaboration, Custom Attributes, and Integrations for webhooks and bots. Admins can view or update settings for various services like Slack, MS Teams, Webhooks, etc from the Global Settings page.


## UI/UX Improvements
The major UI UX improvements have been done around Roles and Policies and a Global Settings page. Quite a lot of tweaks have been made to the UI to improve the UX.

When creating a new user or when a user is registering for the first time, the dropdown menu for Teams now displays an option to ‘Show All’ teams. Previously, we supported the display of only the first 10 teams. An option has also been provided to search and filter.
UI improvements have been made on the Schema, Service, and Database details pages.
Manage Tab has been replaced with the manage button on the UI.

## 0.10.1 Release - May 17th, 2022

- Support for Postgres as OpenMetadata Store [#4601](https://github.com/open-metadata/OpenMetadata/issues/4601)
- UI Improvements in 0.10.1 Release [#4600](https://github.com/open-metadata/OpenMetadata/issues/4600)
- Support JWT Token Generation for Bot Accounts [#4637](https://github.com/open-metadata/OpenMetadata/issues/4637)
- UI Ingestion Improvements - Support for Dashboards & Messaging Services [#4843](https://github.com/open-metadata/OpenMetadata/issues/4843)
- Security: Fix Azure SSO and support refresh tokens in [#4989](https://github.com/open-metadata/OpenMetadata/issues/4989)

## 0.10.0 Release - Apr 27th, 2022

### Support for Database Schema

OpenMetadata supports databases, service name databases, and tables. We’ve added Database Schema as part of the FQN. 
For each external data source, we ingest the database, as well as the tables that are contained underneath the schemas.

### Support for Hard Delete

OpenMetadata supported soft deletions. Now, we also support the hard deletion of entities through the UI, APIs,
and ingestion. Hard deleting an entity removes the entity and all of its relationships. This will also generate a change event.

### Deploy Ingestion from UI

OpenMetadata has refactored the service connections to simplify the ingestion jobs from both the ingestion framework 
and the UI. We now use the pydantic models automatically generated from the JSON schemas for the connection
definition. The ‘Add Service’ form is automatically generated in the UI based on the JSON schema specifications for the
various connectors that are supported in OpenMetadata.

### Download dbt Manifest Files from Amazon S3 or Google Cloud Storage

Previously, when ingesting the models and lineage from dbt, we passed the path of the dbt manifest and catalog files 
directly into the workflow. We’ve worked on improving the quality of life of dbt. Now, we can dynamically download 
these files from Amazon S3 or Google Cloud Storage. This way we can have any other process to connect to the dbt, 
extract the catalog, and put it into any cloud service. We just need the path name and workflow job details from the 
metadata extraction to be able to ingest metadata.

### JSON Schema based Connection Definition

Each service (database, dashboard, messaging, or pipeline service) has its own configuration specifications, with some 
unique requirements for some services. Instead of the ad hoc definitions of the source module in Python for each 
connector, we’ve worked on the full refactoring of the ingestion framework. We now use the pydantic models automatically
generated from the JSON schemas for the connection definition.

### Airflow Rest APIs

The Airflow REST APIs have been refactored. With our API centric model, we are creating a custom airflow rest API 
directly on top of Airflow using plugins. This passes the connection information to automatically generate all the dags
and prepares handy methods to help us test the connection to the source before creating the service.

### UI Changes

- The UI improvements are directed toward providing a consistent user experience.
- Hard Deletion of Entities: With the support for the hard deletion of entities, we can permanently delete tables, 
  topics, or services. When the entity is hard deleted, the entity and all its relationships are removed. 
  This generates an ‘EntityDeleted’ change event.
- Dynamic “Add Service” Forms: The ‘Add Service’ form is automatically generated in the UI based on the JSON 
  schema specifications for the various connectors that are supported in OpenMetadata.
- UI Support for Database Schema as part of FQN: The database schema has been introduced in the 0.10 release. All the
  entity pages now support Database Schema in the UI.
- Lineage Editor: Improvements have been made to the lineage editor.
- Teams: While signing up in OpenMetadata, the teams with restricted access are hidden and only the joinable teams are displayed.
- Team Owner: An Owner field has been added to the Team entity. Only team owners can update the teams.
- Activity Feeds: The Activity Feeds UI supports infinite scrolling.
- Add User: A user can be added from the Users page.

### Security Changes
- **Support Refresh Tokens for Auth0 and Okta SSO**: The JWT tokens generated by the SSO providers expire by default 
  in about an hour, making the user re-login often. In this release, we’ve added support for refresh tokens for Auth0 
  and Okta SSO. The tokens are refreshed silently behind the scenes to provide an uninterrupted user experience.
  In future releases, we’ll continue to stabilize authentication and add refresh tokens for the other SSO providers.
- **Custom OIDC SSO**: OpenMetadata now supports integration with your custom-built OIDC SSO for authentication. 
  This is supported both on the front end for user authentication and on the ingestion side.
- **Azure SSO**: Support has been added for Azure SSO on Airflow.

## 0.9.0 - March 10th, 2022

### Collaboration

- Conversations in the main feed.
- Users can ask each other questions, add suggestions and replies.
- Turn some threads into tasks and provide it in MyData as number of tasks.
- Glossary.
- Table details - Click through on usage to see who or what services are using it, what queries are pulling from it.

### Data Quality
- Ability to create and monitor the test cases.
- Data Quality Tests support with Json Schemas and APIs.
- UI Integration to enable user to write tests and run them on Airflow.

### Glossary

- Glossaries are a Controlled Vocabulary in an organization used to define the concepts and terminologies specific to a
  particular domain.
- API & Schemas to support Glossary.
- UI support to add Glossary and Glossary Terms. 
- Support for using Glossary terms to annotate Entities and Search using Glossary Terms.

### Connectors
- Apache Iceberg
- Azure SQL
- Clickhouse
- Clickhouse Usage
- Databricks
- Databricks Usage
- Delta Lake
- DynamoDB
- IBM DB2
- Power BI
- MSSQL Usage
- SingleStore
- Apache Atlas ,Import Metadata from Apache Atlas into OpenMetadata
- Amundsen, Import Metadata from Amundsen into OpenMetadata

### Lineage
- DataSource SQL Parsing support to extract Lineage
- View Lineage support

### Pipeline
- Capture pipeline status as it happens

### Security

- Security policies through the UI.
- Configuration personas and authorization based on policies.
- AWS SSO support.

## 0.8 Release - Jan 22nd, 2022

### Access Control Policies
- Design of Access Control Policies.
- Provide Role based access control with community feedback.

### Eventing Webhook

- Register webhooks to get metadata event notifications.
- Metadata Change Event integration into Slack and framework for integration into other services such as 
  Kafka or other Notification frameworks

### Connectors
- Delta Lake
- Iceberg
- PowerBI
- Azure SQL

## 0.7 Release - Dec 15th, 2021

### UI - Activity Feed, Improved UX for Search
- Users will have access to Activity Feed of all the changes to the Metadata.
- New and Improved UX for Search and Landing page.

### Support for Table Location
- Extract Location information from Glue, Redshift.
- Show Location details on the Table Page.

### ElasticSearch Improvements
- Support SSL (including self-signed certs) enabled ElasticSearch.
- New entities will be indexed into ElasticSearch directly

### Connectors
- Metabase
- Apache Druid
- Glue Improvements
- MSSQL - SSL support
- Apache Atlas Import connector
- Amundsen Import connector

### Other features
- Metadata Change Event integration into Slack and framework for integration into other services such as Kafka or
  other Notification frameworks
- Delta Lake support, Databricks, Iceberg

## 0.6 Release - Nov 17th, 2021

### Metadata Versioning and Eventing Framework
- Capture changes to Entity Metadata from source and user interactions as versions.
- Versioned changes will be published as events for clients to consume to take actions on.

### Data Reliability
- Improvements to Data Reliability library.
- Capture custom measurements through user provided SQL.

### Airflow APIs
- Airflow APIs to deploy DAGS and manage them.
- UI integration to deploy ingestion workflows.

### Connectors
- AWS Glue
- dbt
- MariaDB

## 0.5 Release - Oct 19th, 2021

### Support for Lineage
- Lineage related schemas and APIs.
- Lineage metadata integration from AirFlow for tables.
- UI changes to show lineage information to the users.

### Data Reliability
- Improvements to Data Profiler.
- UI integration with Data Profiler to show how the table profile looks over the period of time.

### Complex Types
- Support complex types such as Struct, Array with nested fields.
- UI support to add expand complex types and tag, add description for nested fields.

### Connectors
- Trino
- Redash

### Other features
- Pipeline Entities are supported.
- Integration with Airflow to extract Pipeline details.

## 0.4 Release - Sep 20th, 2021

### Support for Kafka (and Pulsar WIP)
- Support for Message Service and Topic entities in schemas, APIs, and UI.
- Kafka connector and ingestion support for Confluent Schema Registry.

### Support for Dashboards
- Support for Dashboard services, Dashboards, and Charts entities in schemas, APIs, and UI.
- Looker, Superset, Tableau connector, and ingestion support.

### User Interface
- Sort search results based on Usage, Relevance, and Last updated time.
- Search string highlighted in search results.
- Support for Kafka and Dashboards from Looker, Superset, and Tableau.

### Other features
- Pluggable SSO integration - Auth0 support.
- Support for Presto.

### Work in progress
- Salesforce CRM connector.
- Data profiler to profile tables in ingestion framework and show it table details page.
