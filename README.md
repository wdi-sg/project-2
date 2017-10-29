# Itinerary - the sharing platform

[https://itineraries.herokuapp.com/](https://itineraries.herokuapp.com/)

![](/public/assets/img/landing.png)

## Background

Itinerary is a platform to help traveller keep **record of their travel routes** by sharing it effortlessly in itinerary.
On the other half, Users are also able to view other traveller route to help planning trip to places easier.

![Image of flowchart](/public/assets/img/erd.png)

This is my first time building a full-stack web app, using Node.js and Express, with the following features:
* One Models: Users
* Views and Access levels for Public vs. Users
* Login and Authentication using [Passport](http://passportjs.org/)
* Use of Google Maps API
* Use of Uploadcare Image uploader

### Flow Chart :
![Image of flowchart](/public/assets/img/flowchart.png)

## User Stories

The idea was to build a platform where user can share their travel routes. And the pubic can view and plan their trip.

Once logged in, user can create a route post with input of date travelled, country situated, uploading one image of the place, title and short description of the place. Only route that publish by the user are able to update and delete by user.

While the public can only view routes filter by country.

---

Eventually the website looks like this:

![Screenshot 1](/public/assets/img/landing.png)  |  ![Screenshot 2](/public/assets/img/add-itinerary.png)
:------------------------------------------------:|:-------------------------------------------------:
![Screenshot 3](/public/assets/img/register.png)  |  ![Screenshot 1](/public/assets/img/update.png)

## Development

* [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/)
* [mLab (mongoDB Hosting)](https://mlab.com)
* [Heroku Cloud Server](https://www.heroku.com)
* ORM: [Mongoose](http://mongoosejs.com/)
* [Bootstrap CSS Framework](http://getbootstrap.com/), with a Bootstrap Template
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/)
* [Parse, manipulate, and display dates and times](https://momentjs.com/) in JavaScript.
* JavaScript, jQuery

## References, Tools, and Inspiration

* [Video](https://www.handy.travel/en)
* [Icon sets for Ionic Framework](http://ionicons.com/)
* [Google Maps Javascript Api](https://mapstyle.withgoogle.com/)
* [Uploadcare Image upload](https://uploadcare.com/)
* [Bootstrap 4 Ui Kit](http://www.creative-tim.com/product/now-ui-kit)
* Instructors and Classmates at GA Singapore wdi 12
