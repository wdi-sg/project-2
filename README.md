# Personal Stock Tracker

This is a stock tracker app that can double as a real time stock tracker cum stock trading simulator to help users better keep in touch with the market and better manage their trading portfolios.

## Live version

https://personalinvestor.herokuapp.com/

### Prerequisites

Download this and then install whatever dependencies using yarn. Then start the server

```
$ yarn install
$ nodemon
```
It is recommended that you use nodemon to run the server.

### How to Use

Create an account by going to the register page, then log in at the log in page.

Subsequently, click on the 'Stock Positions' tab to take you to the page. Key in the stock name, ticker symbol, buy date, quantity bought and price bought. The app will then track the current price of the stock as well as how much you gained and lost from it, and provide you with a summary of your stock portfolio.





## API

The API is taken from AlphaVantage. A package called 'alpha-vantage-cli' is used to help get the latest prices of the stocks. Documentation for the package can be found here: https://www.npmjs.com/package/alpha-vantage-cli


```
alphaVantageAPI.getIntradayData(entry.ticker, '1min')
.then(intradayData => {
  console.log(entry.ticker);
  console.log(intradayData[0].Close);
```



## Built With

* HTML, CSS and JavaScript
* Bulma
* Handlebars
* Node.js
* Express
* API and data by Alpha Vantage
* Passport.js, Bcrypt, Flash messages, Express validator
* MongoDB and Mongoose, hosted on mLab




## Workflow

The below wireframes detail the homepage, summary page, positions page, registration page and login page, in that order.


![alt text](https://github.com/empludo/project-2/blob/master/images/homepage.png )

![alt text](https://github.com/empludo/project-2/blob/master/images/summary.png )

![alt text](https://github.com/empludo/project-2/blob/master/images/positions.png )

![alt text](https://github.com/empludo/project-2/blob/master/images/register.png )

![alt text](https://github.com/empludo/project-2/blob/master/images/login.png )


Entity Relationship Diagram

![alt text](https://github.com/empludo/project-2/blob/master/images/erd.png )


## User Stories

This app seeks to help investors track their investments in real time, with the help of the API Alpha Vantage, which gives real time updates on share prices. (WIP not implemented yet) Users will have to create an account, and upon creation of their accounts, they can begin to input the shares that they have bought. The positions that they have taken will be stored, and can be condensed into a summary detailing their total profits and losses. The app can also double as a trading simulator for shares until the user feels confident enough to trade with real money.

## Authors

Did you collaborate with others on this project, list them here

* **John McClain** - *Responsible for keeping vests white* - [GithubUserName](https://github.com/GithubUserName)

## Acknowledgments

* The entire WDI 13 class for helping out.
