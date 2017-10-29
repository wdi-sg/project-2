# Buzz - Easy commute

Buzz is a web app which offers on-demand bus transportation for users. It aims to pool users travelling from a similar origin and destination, then match these groups to a private bus service. As a result, transportation becomes more efficient.

![Homepage_actual](/public/assets/pictures/Homepage_actual.png "Homepage_actual")

## Workflow

User story:
As a user,  I would like a solution that takes me to work more effectively than public transport, so that I can arrive to work well-rested.

The idea for this came about a year back initially when Uber and Grab was, and still sort of is, occupying headlines. Instead of a car transport service, why not buses, which are economically, and environmentally friendlier? I took an hour by public transport to get to the CBD, whereas a car or taxi ride would take me 30 minutes. However, the latter would be at least 7/8x more expensive.

But lo and behold, there is actually a very similar model which exists in my city, Singapore. It's called [Beeline](https://www.beeline.sg/) and thus, there will be quite a few parallels between this and my app. I would have liked to use it, but the service did not put up a route which was suitable for me.

Introducing Buzz, it collects user-input journey information, and attempts to fill the gap for PMETs who are willing to pay a reasonable premium for something more direct, reliable, and faster. Instead of a tiring commute with multiple transitions and possible delays, that can be replaced with a single mode of transport, the bus.

Clusters of similar journeys are gathered together, and interested bus vendors can provide regular service trips after a minimum number of paying customers.

This project includes (links under Built With):
  * Two database document models: Users and Partners
  * Google Maps Javascript API
  * mLab mongodb online database
  * CRUD operations using mongoose and mongodb
  * Bcrypt password encryption
  * Account login & multiple-strategy authentication with Passport
  * Login-restricted functionalities

### Brainstorming

These are the initial wireframe plans before I started coding (and realizing I had not enough time/experience)



![Homepage](/public/assets/pictures/Wireframe1.jpg "Homepage")  |  ![Route page](/public/assets/pictures/Wireframe2.jpg "Route page")
:------------------------------------------------:|:-------------------------------------------------:
![Route page pt2](/public/assets/pictures/Wireframe3.jpg "Route page pt 2")  |  ![Partners](/public/assets/pictures/Wireframe4.jpg "Partners")

![Flowchart](/public/assets/pictures/Flowchart.jpg "Flowchart")
This is what the app looked like by the end of the week's deadline (save for the homepage at the top of this page):
![Partnerlogin](/public/assets/pictures/Partnerlogin_actual.png "Partnerlogin")  |  ![Partnerinput](/public/assets/pictures/PartnerInput_actual.png "Partnerinput")
:------------------------------------------------:|:-------------------------------------------------:
![Userlogin_actual](/public/assets/pictures/Userlogin_actual.png "Userlogin_actual")  |  ![Routecheck_actual](/public/assets/pictures/Routecheck_actual.png "Routecheck_actual")

### Prerequisites

Users just need to run the url (scroll down below) on their internet browser, preferably Google Chrome.

If you intend to run this on a local server instead, I used Yarn in this project. Install yarn, then install the dependencies within the file.

To install Yarn (and NodeJS) using Homebrew:
```
brew install yarn
```
For in-depth Yarn installations, visit the [yarn site](https://yarnpkg.com/en/docs/install).

To install the dependencies using yarn, open the file folder and run:
```
yarn init
```

Nodemon was used to run this project, it re-hosts the files each time a change is saved/detected. You can see under package.json we've already tagged it to the scripts, so you can run:
```
yarn start
```

Open up your browser, and run:
```
localhost:3000
```
Tadah!

### How to Use

A step by step guide on how to install and use the project, for example if this is a game, how do we play it.


```
Code example
```

More steps...

```
until finished
```

## Live Version

This app is deployed on the Heroku platform, and accessible via this link: [Buzz](https://buzznearyou.herokuapp.com)


## Built With

* [Google maps Javascript API](https://developers.google.com/maps/documentation/javascript/) - Geocoding and map visualization API

* [mlab](https://mlab.com/) - online mongodb service

* [mongoose](http://mongoosejs.com/) - object data modelling program
* [Passport](https://www.npmjs.com/package/passport) - Used with passport-local for login authentication

* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password encryption

* [Bootstrap](http://getbootstrap.com/) - CSS framework

* [jQuery](http://jquery.com/) - jQuery for DOM manipulation

* [Yarn](http://yarnpkg.com/) - Used as Javascript package manager

* [Heroku](https://www.heroku.com/) - Used to host the app




## Authors

Did you collaborate with others on this project, list them here

* **John McClain** - *Responsible for keeping vests white* - [GithubUserName](https://github.com/GithubUserName)

## Acknowledgments

* Hat tip to anyone who's code was used, for example [this was a useful starting point for creating this template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
