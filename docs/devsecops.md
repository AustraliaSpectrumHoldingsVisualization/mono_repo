## Software Architecture Diagrams

## Why this package structure and mono repo?

TODO

## UI Application Type - Web App

We will distribute the application as a web application using a free domain from
Firebase/Google Cloud.

A web application is easier to universally update than a spreadsheet file.
Webtech should contain a variety of available visualization tools/libraries
that are superior to what can be produced in a spreadsheet file.

A desktop application, or mobile application, is harder to distribute and 
update compared to a web application. Additionally, the project does not require
any special additional capabilties that mobile or desktop/laptop compute
resources can provide.

## Web Hosting - Firebase Hosting

Already explained.

## Data Hosting - Firebase Database

We upload a manually created Excel Spreadsheet from the ACMA database to 
Firebase Realtime Database, and use this to populate the map.

## Analytics - Google Analytics for Firebase

Comes for free, out of the box, with Firebase and Google Cloud.

## DevSecOps/CICD - Github Actions

Comes for free out of the box with Github.

## JS/TS Only

Any backend code, and build scripts, will be built using Node.js in either
TypeScript or JavaScript. There are no CPU bound requirements for the build
scripts or any forseeable backend code, which means using something easier like
Node.js will ease upskilling of junior members.

## Why Firebase/Github/Cloud over on premise/bare metal

There is a spectrum of compute that can be used when building projects.
Cloud - FaaS < PaaS < Containers/VM < Baremetal - on Premise.

The more lower down on the specrum, the more abstracted away the
responsbilities of SREs are. Scaling, cross compiliation, deployment are more
taken care of. This can decrease development time.

The higher up on the spectrum, the less abstracted responsbilities of SREs are.
This allows for greater configuration, customization, and bleeding edge
performance. This can increase development time.

For our purposes we want to optimize towards reducing development time, and
are not running any particularly performance intense workloads. Because of this
we will use Cloud services as much as possible.