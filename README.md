# Tripanzee

Heroku link: [Click Here](http://tripanzee.herokuapp.com)<br>
Github repository: [Click Here](https://github.com/wdi-sg/project-2)

<img src=http://i.imgur.com/9oncWOC.png>

Tripanzee is an online trip/itinerary planner which utilises the Google Maps and Google Places APIs to give users useful insights when planning their next trip.

#### Working Features:
- Functional user authentications system
- Create new trip and choose the dates
- Search for places with a query using the Google Maps and Google Places APIs
- From the map, add places to a specified date of a specified trip
- View added places of specified date of specified trip, in list form and also on Google Maps
- Remove places from specified date of specified trip
- Delete trip
- View most popular places (top 10 added places) and view each place on Google Maps

## Getting Started

To get started, fork and clone this repository ([https://github.com/wdi-sg/project-2](https://github.com/wdi-sg/project-2)) into your local computer.

### Prerequisites

- Node
- Node Package Manager (NPM)
- MongoDB
- Google Maps API Key

After cloning the repository into your local repository, open terminal while in your local repository and run the following code to install all the dependencies required for this project. This project requires node.js to run. Node.js can be downloaded [here](https://nodejs.org/en/download/).

```
npm install
```

You will also require MongoDB for your database, as well as a Google Maps API key, which can be obtained [here](https://developers.google.com/maps/). After you obtain your Google Maps API key, create a .env file in your local repository and insert this line (replacing `<YOUR API KEY>` with your newly obtained API key):

```
GOOGLE_MAPS_URL=https://maps.googleapis.com/maps/api/js?key=<YOUR API KEY>&&libraries=places
```


### How to Use

To run the project, open terminal within your local repository and run the following code. Ensure that you have already ran `npm install` before this step.


```
npm start
```

This will run `nodemon index.js` and start a local server at `localhost:5200`. If the port is already in use change the port number in `index.js` and try again. Express will also attempt to connect to MongoDB.

## Workflow

Did you write user stories, draw wireframes, use task tracking, produce ERDs? Did you use source control, with regular commits? Include links to them here.

### Wireframes

#### Homepage

<img src="http://imgur.com/LhqtF6t.png">

#### Signup Page & Login Page

<img src="http://imgur.com/oWOKSxe.png">

#### Manage Trips

<img src="http://imgur.com/VY0gX96.png">

#### View/Add Places

<img src="http://imgur.com/yj7QyvB.png">

#### Infowindow

<img src="http://imgur.com/4WbV8Vn.png">

#### Top Places

<img src="http://imgur.com/69piN39.png">

#### Favorites (Work in Progress)

<img src="http://imgur.com/BxMYLCU.png">

### ERD

<img src="http://imgur.com/XfxDFF4.png">

### Schemas

#### User
```
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Place'
  }]
})
```
#### Trip
```
var tripSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  dates: [{
    date: String,
    places: [{
      type: Schema.Types.ObjectId,
      ref: 'Place'
    }]
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
```
#### Place
```
var placeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  address: String,
  place_id: String,
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})
```
## Challenges

### Updating all the models simultaneously
Modifying one model is simple with the built in schema methods such as `findOne` and `findOneAndRemove`. However with referencing between 3 models, removing one trip would mean that I have to modify the trips property of both the User and Place models. Hence I had controller functions which modify all 3 models.

### Redirecting to Add/View Places page AND immediately send a request to Google Places to retrieve information based on the id sent from my server
This would be quite straightforward if I could use an AJAX request. However an AJAX request would not allow me to redirect to another page, therefore I had to use a form. The problem with this is that when the page is being refreshed, the front end scripts reload as well, which means the script would have already forgotten what was the place id being requested to the server. Therefore I used handlebars to render the placeID in a `<script>` tag in my `places/index` handlebar, so that it is global to `script.js`:
```
<script type="text/javascript">
  var placeID = 0
  {{#if placeID}}
    placeID = '{{placeID}}'
  {{/if}}
</script>
```
## Future Plans
- Favorites
- Fine tune handling of errors
- Directions (Using Maps API)
- Download Trip/Send to Mobile
- Trip Sharing


## Built With

* HTML5
* CSS3
* Javascript
* jQuery
* Node.js
* Express.js
* MongoDB
* Mongoose
* Handlebars
* Passport
