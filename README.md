# Pirated Twitter

This is a replica of [Twitter](https://twitter.com/?lang=en). You can follow your friends to see what they're saying or post your own tweets. Additional features such as mentions, replies and retweeting are on the way!

## Overview

Register an account and start tweeting. The search bar on the top left helps you find your friends via their twitter handle.

* Register an account
* Login with your account
* Search for your friends
* Follow your friends to see their tweets
* Tweet!

## [▶ Click here to visit the site](https://project-2-koozy.herokuapp.com/)

## ERD
![ERD](/public/assets/images/proj2_erd.png "ERD.png")

#### User Schema

```javascript
const requiredString = { type: String, required: true }
const tweetId = { type: Schema.Types.ObjectId, ref: 'Tweet' }

const userSchema = new Schema({
  username: { type: String, lowercase: true, match: /^[a-z0-9]+$/, unique: true },
  name: requiredString,
  email: requiredString,
  password: requiredString,
  tweets: [tweetId],
  mentions: [tweetId],
  followers: [ this ],
  following: [ this ]
})
```

#### Tweet Schema

```javascript
const userId = { type: Schema.Types.ObjectId, ref: 'User' }
const requiredString = { type: String, required: true }

const tweetSchema = new Schema({
  message: requiredString,
  author: userId,
  parentTweet: this,
  childrenTweets: [ this ],
  mentions: [userId],
  favourites: [userId],
  retweets: [userId]
})
```

## Wireframe
![Wireframe](/public/assets/images/wireframe.png "wireframe.png")

## Routes

* Home
* Login
* Register
* Profile
* Search
* Logout

## Time Management

* **Day 1, Monday**: LinkedIn replica. Drew up wireframes, ERD, and routes. Added create home, login, and register routes

* **Day 2, Tuesday**: LinkedIn replica. Added sessions, fixed multiple bugs for sessions. Create webform for LinkedIn replica.

* **Day 3, Wednesday**: Ditched LinkedIn replica project. Started working on Twitter replica, plan new ERDs, routes, and new wireframes

* **Day 4, Thursday**: Added tweet functionality, and user wall (only own tweets).

* **Day 5, Friday**: Completed user wall (all followed tweets). Basic autocomplete feature.

* **Day 6/7, Saturday/Sunday**: CSS.

## Built With

* [jQuery](http://jquery.com/)
* [Mongoose](http://mongoosejs.com/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Express-Handlebars](https://github.com/ericf/express-handlebars)
* [Body-Parser](https://www.npmjs.com/package/body-parser)
* [Method-Override](https://github.com/expressjs/method-override)
* [Express-Session](https://www.npmjs.com/package/express-sessions)
* [Passport](http://www.passportjs.org/)
* [Materialize](http://materializecss.com/)

## Planned Features

* Fix autocomplete feature
* Update and delete tweets
* Update and delete account
* Mentions
* Replies
* Retweets
* Sort tweets by time/date
* Favourites

## References

* [Twitter](https://twitter.com/?lang=en)
