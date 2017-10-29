# Fantasy Tours

Fantasy Tours is a leading specialist tour operator featuring stunning locations from some of the biggest TV and film brands.

We bring you to stunningly beautiful places, most of which are remote and hard to find. We trek you deep into old growth forests, along wild sea cliffs, across rocky beaches, into caves and crumbling medieval ruins. We have costumes, swords and wands available for use, at no extra cost. Experience the magic. Go all the way into your favourite fantasy.

## Live Version
[Fantasy Tours](https://project2liyuan.herokuapp.com)

## Table of Contents
1. Workflow
2. Time Management
6. Potential Improvements
8. External Libraries/Frameworks
9. Acknowledgements

## Workflow

### User stories
As a user, I want to add tours that are related to my favourite films/tvshows into my cart so that I can book the tours for my future plans. I should not be able to add shows and tours.

As an administrator, I want to add shows and the available tours for each show so that I can make sure they are appropriate.

### Wireframes
<img src="/public/img/wireframes.jpg" border = 2px solid black>

### ERD
<img src="/public/img/erd.png" border = 2px solid black>

### Routes
<img src="/public/img/routes.jpg" border = 2px solid black>

## Time Management
* **Day 1, Monday**: Drew up wireframes, ERD, routes and Pseudocode. Added login, register and started making forms for creating tours and shows

* **Day 2, Tuesday**: Added tvshow, tour routes for admin to add shows and tours to populate the database thereby finishing CRUD

* **Day 3, Wednesday**: Added user routes for cart and show routes for general users to book tours

* **Day 4, Thursday**: Added reviews and google maps API

* **Day 5, Friday**: Spent a considerable amount of time on the delete tour in cart function and learning how to use materialize CSS

* **Day 6/7, Saturday/Sunday**: More CSS

## Potential Improvements
* Add an admin function so only admins can add shows/tours
* Add blackout dates for tours/specific tour dates with radio buttons for users to choose from
* Fix error when users who are not logged in try to make reviews
* Add proper payment function

## External Libraries/Frameworks

* [jQuery](http://jquery.com/)
* [Materialize](http://materializecss.com/)
* [Font-Awesome Icon Library](http://fontawesome.io/)
* [Uploadcare PAAS](https://uploadcare.com/)
* [Node.js](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [mLab (mongoDB Hosting)](https://mlab.com)
* [Heroku Cloud Server](https://www.heroku.com)
* [Mongoose](http://mongoosejs.com/)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/)

## Acknowledgments

* [Brit Movie Tours](https://britmovietours.com/)
* [Games of Thrones Tours](http://www.gameofthronestours.com/)
* [Viator](https://www.viator.com/)
* [Propie, by Chris Ke](https://github.com/chriskejw/propie)
* [CityFix, by Jonathan Lim](https://github.com/jonathanlimes/cityfix)
* Instructors and Classmates at GA Singapore
