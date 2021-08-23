# Using this README.md

Go through each heading and ensure you have access to the capabilities or 
service the heading represents, or understand what is it about, in order to 
contribute to the project goals.

TODO(lbradford) link this as SelfTech Project File README standard. Link to
where the standard can be seen.

# Project Goals

The Australian Radio Spectrum is consumed via licences from the Government to
private companies based on Spectrum/Frequency, Modulation, Geographical Area,
and duration of the licence.

This information is public data, but currently there is no visualization tool
which displays who currently owns the licence for what part of the spectrum.

This is frustrating as a Telecommunications Provider, because currently static,
hard to distribute/share, internal tools such as spreadsheet files must be used
as the source of truth for Spectrum Holding Visualization data, which is a 
bottleneck for data input when making decisions on upcoming auctions of
licences.

Additionally, this is frustrating as a consumer, since consumers cannot easily
find or use this spectrum information to help decide which Telecommunications
Provider will be the best fit for their circumstances.

There should be an easy way for a Telecommunications Provider, and consumers,
to view this information. Everyone uses Telecommunications, this is such vital
information.

# Prerequisites

You need the general cognitive ability to use a programming language, or to
understand the rules/protocols regarding Spectrum Holdings licencing.

The most important development tools used by the project are:
- React
- TypeScript
- Git

You should find a 1-2 hour crash course on Functional Components in React
using TypeScript, and complete this in your own time.

In a typical project instructions for onboarding and filtering candidates would
be provided here.

# Team Communication and Project members

Communication is via the English language.

Use UTS Microsoft Teams. Project members/team is:
- Yifei Huang - PM/Product Owner - yifei.huang@vodafone.com.au
- Liam Bradford - SWE - liamjtb@gmail.com
- Rhys Hanrahan - SWE - rhys.hanrahan@gmail.com
- Chan Nuang Tun - SWE - cnt09254823396@gmail.com
- Kyaw Si Thu (Chris) - SWE - sithuchris@gmail.com

Any questions to the PM can be sent asynchronously via email.

We're using Teams because this is the service we are all already using.

We will have realtime communications during the allocated weekly tutorial time.

# Legal + Finacial queries

As it stands this is a student project. The repository uses the Apache License
2.0, so that Vodafone can use this repository and create their own version of 
the web application to with as they please, if they feel like it. Additionally,
this Licence protects the contributors from any liabilities.

In typical projects this is where links to agreements such as payment would go.
Payment to services/billing would go here.

# UI Application Type - Web App

We will distribute the application as a web application using a free domain from
Firebase/Google Cloud.

A web application is easier to universally update than a spreadsheet file.
Webtech should contain a variety of available visualization tools/libraries
that are superior to what can be produced in a spreadsheet file.

A desktop application, or mobile application, is harder to distribute and 
update compared to a web application. Additionally, the project does not require
any special additional capabilties that mobile or desktop/laptop compute
resources can provide.

# Code Repository - Github

You need to be added as a project member of this Github Repository, Project,
Organization.

We're using Github since this is the most widely known repository host and is 
also the most billing friendly, and comes with other features with minimal 
configuration required, allowing us to upskill junior members efficiently and
focus on the project.

# Version Control - Git

You need to download git [Git](https://git-scm.com/downloads)
We're using Git since this is the industry standard for version control.

# Project Management - Github Projects

[Link Here](https://github.com/VodafoneSpectrumHoldingsVisualization/mono_repo/projects/1)

We're using a Kanban style board. The columns are:
- To do/Backlog
- In Progress
- In Review
- Awaiting deployment
- Done

A card represents a task.

All cards should be prepended with the person assigned to them. For example
(lbradford) Write README.

A Card starts in To do, and is moved to In Progress once you start working on
it. For development this typically means you will create a branch which is named
after this Card.

Once your Card/task is finished, you should push your branch to the repository.
You should then manually move the Card/task to In Review. You then using the
Github UI create a Pull Request to merge your branch into the staging
environment. Someone else on the project will need to approve your work. Any 
automated tests will need to pass. If your work is all good, it will end up in
the staging project for us to have a look at.

Once your work is in the Staging environment, move the card to Awaiting
Deployment. When we have decided that this work is ready to be pushed to 
Production/Release, we will create a Pull Request to Merge Staging and
Master/Production/Release.

When the work is in Master/Production/Release, move the card to Done.

We're using a Github Project board since it comes for free out of the box with
the Github Repository.

# UI Design - None

We'll stick to drawings and discussions from Yifei, and developer's best
implementation of this vision.

For now, using a design tool is overhead for this project.

# Code Editor - VSCode

You need to download [VSCode](https://code.visualstudio.com/download).

# Compute Infrastructure/Web Hosting - Firebase/Google Cloud

When you navigate to any of the 3 following links, make sure you are logged in
/authenticated to your correct Google Account, in the top right corner.

You need to get added to the [production project](https://console.firebase.google.com/u/0/project/spectrumholdings-prod/settings/iam)
You need to get added to the [staging project](https://console.firebase.google.com/u/3/project/spectrumholdings-staging/settings/iam)
You need to create your own [local development project](https://console.firebase.google.com/u/0/)
- Click the card with a + which says create a project
- Name your project the following: spectrumholdings-`yournameabreviated`
For example, spectrumholdings-lbradford
- Enable Google Analytics, choose Default Account
- Click Create Project. Wait ~30 seconds for creation. Click continue.
- Important: Make sure at the bottom left of the window/tab you can see
something like this `Spark Free $0/month`. This means your project won't cost
any money.

Usually all of our projects would belong in a Google Cloud Organization, an 
abstraction which represents our company, and we would have fine grained Access
Control, but since we are using our personal email accounts, and do not own
a business domain, nor have a business entity, we won't use this abstraction.

Why Firebase/Google Cloud?
- Firebase/Google Cloud provides us all our backend requirements out of the box.
We do not have to write any code to set up our Web Hosting, or Authentication
or Database Services if we require them - especially if we want these services
to be extremely reliable by being globally distributed across multiple and
able to scale up automatically with our manual intervention if traffic
increases.
- Firebase/Google Cloud offers us a generous free tier for Web Hosting. If the
site gains traction, we can easily upgrade to a pay as you go for our usage.
Ideally Vodafone would sponsor this if required.

## Web Hosting - Firebase Hosting

Already explained.

## Data Hosting - In client

In future consider using a spreadsheet hosted somewhere, and FaaS or database
to pull from.

## Analytics - Google Analytics for Firebase

TODO(lbradford) is this fine Yifei? I strongly recommend we capture some
analytics. The data captured would be:

# DevSecOps/CICD - Github Actions

TODO(lbradford): explain CICD/DevSecOps
TODO(lbradford): explain how we share secrets and configuration files.
TODO(lbradford): explain explain different environments

# Package Structure and Software Architecture, Development Patterns

TODO(lbradford): explain root files and how we will organize code.
TODO(lbradford): explain MobX. Actually might not be necessary.

## Dependencies and Build tool

We will use node.js and Yarn package manager to build the project and pull in
dependencies.

Please install [node.js](https://nodejs.org/en/download/)
Please install nvm (Node Version Manager)
- [Windows](https://github.com/nullivex/nodist)
- [MacOS and Linux](https://github.com/nvm-sh/nvm)

Please install [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Why React?

TODO(lbradford): CSR vs SSR. See Solid SSR to get a better grasp on whether
Next is necessary.

## JS/TS Only

TODO(lbradford)

## Why Firebase
## Cloud/faas > on premise/bare metal for us

TODO(lbradford)

## Why this package structure?

## Software Architecture Diagrams

TODO(lbradford@):
Google Design Doc,
User Application Arch
Conceptual Application Arch (classes) - incl build
Implementation Arch (files) - incl build
Systems Design (incl. client execution architecture)

# Development Cycle

If you've read through the aforementioned you're now ready to start
contributing.

TODO(lbradford): Google image via Android on build - dev - release
|
TODO(lbradford): cycle image incl. user cycle

TODO(lbradford): list developer cycle steps:
- debug
- PR
- submit.

TODO(lbradford):
config + scripts + Firebase Tools + commands to use to oull dependneice,s git, and build project and upload etc. Local host vs your dev.

