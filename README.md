# SMRT Delay Tracker

## Getting Started

### Prerequisites

Clone the project onto your local server/machine, and have the following information in your .env file:

* SESSION_SECRET
* TWITTER_CONSUMER_KEY
* TWITTER_CONSUMER_SECRET
* TWITTER_ACCESS_TOKEN
* TWITTER_ACCESS_TOKEN_SECRET
* TWITTER_CALLBACK_URL_LIVE

Create a config folder, and within it, a dbConfig.js file with the information for your mongoDB server.


```
yarn install
```

### How to Use

To be able to access the tracker, the user must first login onto the app through Twitter.

After login, the user will be redirected to the tracker page where tweets pertaining to train delays for each of the lines will be displayed.

## Live Version

Current Build:

https://smrtdelaytracker.herokuapp.com/

## Built With

* HTML
* CSS
* JavaScript
* jQuery
* twit
* momentJS
* passportJS
* Mongoose
* MongoDB
* Express-Handlebars

## Workflow

ERD as per below:

![](https://raw.githubusercontent.com/strisen/project-2/master/public/wireframes/erd.png)

Initial Wireframes as per below:

![](https://raw.githubusercontent.com/strisen/project-2/master/public/wireframes/mainframe.png)

The aim of this app is to allow users to keep track of train delays after logging into the app.

The authentication is necessary to facilitate the implementation of an annoucement/post system where additional information can be posted and shared within the app.

## Acknowledgments

* Twitter API Documentation & Forums
