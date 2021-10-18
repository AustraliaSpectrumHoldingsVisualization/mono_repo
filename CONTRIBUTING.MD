# Prerequisites

You need the general cognitive ability to use a programming language, or to
understand the rules/protocols regarding Spectrum Holdings licencing.

The most important development tools used by the project are:
- React
- TypeScript
- Git
- Node.js

You should find a 1-2 hour crash course on Functional Components in React
using TypeScript, and complete this in your own time.

In a typical project instructions for onboarding and filtering candidates would
be provided here.

# Legal + Finacial queries

As it stands this is a student project. The repository uses the Apache License
2.0, so that anyone can use this repository and create their own version of 
the web application to with as they please, if they feel like it. Additionally,
this Licence protects the contributors from any liabilities.

In typical projects this is where links to agreements such as payment would go.

Payment to services/billing would go here. We're using the free tier of Firebase
for all of our infrastructure, so it's ok.

Maybe we'll buy a domain for this project.

# Team Communication and Project members

Communication is via the English language.

The main communication is done via our private email thread. To participate in
this if you're not already involved, please open a Github issue for this
project.

Project members include:
Y - PM
L - Lead SWE
R - Senior SWE
C - SWE
K - SWE

Any questions to the PM can be sent asynchronously via email.

We will have realtime communications during the allocated weekly tutorial time.

# Getting Started

## Version Control - Git

You need to download git [Git](https://git-scm.com/downloads)
We're using Git since this is the industry standard for version control.

## Dependencies and Build tool

We will use node.js and Yarn package manager to build the project and pull in
dependencies.

Please install [node.js](https://nodejs.org/en/download/)
Please install nvm (Node Version Manager)
- [Windows](https://github.com/coreybutler/nvm-windows/releases)
- [MacOS and Linux](https://github.com/nvm-sh/nvm)

Please install [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Code Editor - VSCode

You need to download [VSCode](https://code.visualstudio.com/download).

## Code Repository - Github

You need to be added as a project member of this Github Repository, Project,
Organization.

We're using Github since this is the most widely known repository host and is 
also the most billing friendly, and comes with other features with minimal 
configuration required, allowing us to upskill junior members efficiently and
focus on the project.

## Compute Infrastructure/Web Hosting - Firebase/Google Cloud

When you navigate to any of the 3 following links, make sure you are logged in
/authenticated to your correct Google Account, in the top right corner.

You need to get added to the [production project](https://console.firebase.google.com/u/0/project/spectrumholdings-prod/settings/iam)
You need to get added to the [staging project](https://console.firebase.google.com/u/0/project/spectrumholdings-staging/settings/iam)
You need to create your own [local development project](https://console.firebase.google.com/u/0/)
- Click the card with a + which says create a project
- Name your project the following: spectrumholdings-`yournameabreviated`
For example, spectrumholdings-jsmith
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

## Writing your first line of code

For your next steps, please see:
- docs/client-frontend-dev.md
- docs/server-microservices-backend-dev.md
- docs/devsecops.md

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
(jsmith) Write README.

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
