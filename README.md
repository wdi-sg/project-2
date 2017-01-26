# CUE

> CUE is a collaborative playlist creation tool meant for the discerning enthusiast. you could be stacking up a sick set for a party with friends, or curiously curating a mixtape for a special somebody - CUE is meant for you.

## Getting Started

To get started, clone this repo and run `npm install` to install the necessary dependancies on your machine.
To get the server up and running, run `npm start` to start the server on the port defined in an `.env` file (default is 3000 if not found).

### Prerequisites

Running `npm install` will install all the necessary dependancies.

### How to Use

A step by step guide on how to install and use the project, for example if this is a game, how do we play it.
Run `npm install` to install all necessary dependancies and run `npm start` to start the server.

CUE requires user registration for use. After signing up and logging in, users can start by creating new playlists, looking at a list of all playlists, or searching for playlists by name.

Users can create playlists collaboratively by adding tracks or voting on tracks to place them higher or lower in the playlists. Users can only delete tracks in a playlist if they are the creator of the playlist or the contributor of the track. Users can only delete playlists that they have created.

Users can also like playlists so that they can be easily accessed in their profile page, along with playlists that they have created.

## Tests

This project was created using test-driven development, with tests written using Mocha, Chai, Superagent/Supertest.
Tests are found in the `/test` directory, split into 5 files.
To run the full test suite, run `npm test`.
Tests are run using the `test` environment and will create their own database for app testing.

## Live Version

CUE is deployed online via heroku at https://cueup.herokuapp.com/.

## Built With

NPM packages used in this project:
* bcryptjs
* body-parser
* colors
* connect-flash
* cookie-parser
* debug
* dotenv
* ejs
* express
* express-ejs-layouts
* express-session
* mongoose
* morgan
* passport
* passport-local
* serve-favicon
* chai
* colors
* superagent
* supertest

On the front end, this project was created using:
* [ejs](http://www.ejs.co/)
* [jQuery](http://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Sass](http://sass-lang.com/)

## Acknowledgments

* The dynamic gradient background was generated using javascript found [here](https://codepen.io/quasimondo/pen/lDdrF) - Credit to [Mario Klingemann](https://codepen.io/quasimondo/).


