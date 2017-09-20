# Lee Brian's Project 2

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2: Park Where Sia!?

https://parkwheresia.herokuapp.com/
---

### Introduction

This website is to help users identify where the nearest carparks is when they key in their destination.
Inspiration from the phone app **Park-a-Lot**.

![](public/img/idea-1.jpg)

---

### Overview ###
* API used: **Google Map**

![](public/img/Google-map-api.png)

![](public/img/singapore.png)

* Only got 2 models: **Users** and **Carparks**.

One user can have zero, one or many carparks and one carpark can have only one user.

Entity Relationship Diagram:

![](public/img/ERD.png)

* Built with: **Mongoose, Express, Node**

Plugins:

![](public/img/dependencies.png)

* CSS Framework: **BULMA**

![](public/img/bulma-logo.png)


---

### Wireframe ###

![](public/img/wireframe-1.jpg)
![](public/img/wireframe-2.jpg)
![](public/img/wireframe-3.jpg)
![](public/img/wireframe-4.jpg)

---
### Script ###

* User schema has three properties: username, password and email. Out of these three, **username** is unique. Used **"mongoose-unique-validator"** to check for unique-ness instead of going to mongoose to findOne to compare.

![](public/img/User-schema.png)

* In order to refine the search results to only return carparks nearby the user's destination, the below was added to the query. As such, returned results will only be limited to Singapore. (Imagine searching for Chinatown!)

![](public/img/query.png)

* For carpark deletion, function is scripted to delete carpark from both User.carparks and Carpark database.

![](public/img/destroy.png)


---

### Improvements to make ###

* More information of the carparks can be provided upon clicking. There is a database of all carparks' rates and an API on availability(live!) of carparks. Should incorporate them in so as to achieve what the phone app can achieve. (Nearest vs Cheapest)

![](public/img/idea-2.jpg)

* Search results can be refined further to allow for better accuracy of carpark locations. Check out below!

![](public/img/fareast.png)

* Make this available to public also.


---


### Acknowledgement ###
* Prima Aulia (my Awesome WDI Instructor!)

* Wong Shi Mei (my very patient TA!)

* WDI 11 classmates!

* GOOGLE!

---

### Feedback ###
All feedbacks are welcome!
