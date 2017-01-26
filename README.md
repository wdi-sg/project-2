# WDI Project 2: BarterFly

This web mobile/desktop app was built in one week meeting requirements of Project 2 in the WDI course. 

The project is called BarterFly, an app that allows users to create an inventory of items to sell and flexibly interact with others in trades that allow a combination of multiple items and cash. Trades are between two individuals, update in real time as changes are made, and also include a real time discussion chat per trade.

## Getting Started

To run locally, git clone a copy from here to your system. You will need MongoDB installed locally, running on default port. Some prerequisites are needed to run the code, as per below.

### Prerequisites

You will need to install all dependencies after cloning:

```
npm install
```


You will need the following settings written into an .env file, inside the root of the cloned directory. You will need your own Cloudinary account to store images generated by the app. 

```
SESSION_SECRET=<your own session secret here>
NODE_ENV=test
PROD_PORT=4000
CLOUDINARY_URL=<url of your cloudinary account here>
```

Run "npm start" from the cloned project's root. You can now connect on localhost port 3000 in your browser.

### How to Use

You can search for items in the marketplace without logging in. To actually start a trade, signup and create an account, and make a few items - names, descriptions, an  image and your estimation of value. 

Then try to create trades by searching items from other accounts and clicking Make An Offer in the search view. You can chat and modify trades in real time; updates to discussion etc are effectively pushed in real time to your trade partner if they are in the BarterCenter or Trade views.

## Live Version

A live version of this app is deployed on [heroku](http://barterfly.herokuapp.com)

## Built With

Jquery (non slim version as Jquery AJAX was used)

Bootstrap 3.3.7 was also used.

Basic templates from the Bootstrap examples were used in several places, notably the left dashboard and the navbar.

## Workflow

Primarily the app was created around my own user stories, adding features and functionality as I found that they would become important in the actual experience. The one week schedule meant that features were picked based on what was the most bang for the temporal buck in terms of impressiveness. 

Some important validations still need to be done. For example, although buttons for modifying trades are removed when one or both parties to a trade are requesting a finalization, the backend does not yet filter out modifications to the trade if a HTTP request is made manually without the app interface.

## Authors

Adrian Ke, with kind advice from the General Assembly teaching staff, Nick and Jeremiah.

## Acknowledgments

Bootstrap 3's basic examples for dashboard and navbar are pretty clear and useful responsive elements that can be modified on. Would recommend.

