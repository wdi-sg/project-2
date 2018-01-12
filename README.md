# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2: Tripcollab

A site for travel collaboration with your travel buddies!

Have you ever collaborated with your friends on a trip and found out there are too many ideas?

Tripcollab aims to make travel planning fun with easy itinerary planning.

---

## Live Version
[https://tripcollab-dk.herokuapp.com/](https://tripcollab-dk.herokuapp.com/)

---

## Built With

* HTML, CSS, Javascript
* [jQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
* [node.js](https://nodejs.org/en/)
* [mongoDB](https://www.mongodb.com/)
* [Google Maps APIs](https://developers.google.com/maps/)

---

## Workflow

![](/-ProjectDocumentation/images/erd.jpg)

#### Could do with some design rework
![](/-ProjectDocumentation/images/screens/home.png)


#### 1. Create user account
![](/-ProjectDocumentation/images/screens/register.png)


#### 2. Login
![](/-ProjectDocumentation/images/screens/login.png)


#### 3. Add new trip
![](/-ProjectDocumentation/images/screens/newTrip.png)

![](/-ProjectDocumentation/images/screens/tripCreated.png)


#### 4. Add desired locations
![](/-ProjectDocumentation/images/screens/addLocation.png)

![](/-ProjectDocumentation/images/screens/locationAdded.png)


#### 5. Plan itinerary
![](/-ProjectDocumentation/images/screens/itineraryDate.png)

![](/-ProjectDocumentation/images/screens/itineraryPlace.png)

![](/-ProjectDocumentation/images/screens/itineraryTime.png)


#### List of trips
![](/-ProjectDocumentation/images/screens/trips.png)

![](/-ProjectDocumentation/images/screens/confirmDelete.png)


### Current Features

* Create user account
* Login
* Create trips, locations & itinerary
* Delete trips, locations & itinerary

---

## Further Development

* Styling of site
* Add more collaboration features
* Trip features (Travel time, routes, etc)

---

## References

* [Bootstrap Documentation](https://v4-alpha.getbootstrap.com/getting-started/introduction/)
* [Mongoose Documentation](http://mongoosejs.com/docs/guide.html)
* [Google Maps API Documentation](https://developers.google.com/maps/documentation/)

---

## Interesting Observations

Come on, I think there should be a better way of doing this ? :sweat_smile:
Any suggestions ?

```javascript
Trip.findOne(query).exec((err, data) => {
  if (err) {
    console.log(err)
    req.flash('error', 'Trip not found')
    res.redirect('/home')
  }
  else {
    let dateObj = {
      'dateFrom': getISODate(data.dateFrom),
      'dateTo': getISODate(data.dateTo),
      'dateFromUTC': getUTCDateNoTime(data.dateFrom),
      'dateToUTC': getUTCDateNoTime(data.dateTo)
    }
    let fkTripId = {
      tripId: data.id
    }
    Location.find(fkTripId).exec((err2, data2) => {
      if (err2) {
        console.log(err2)
      }
      else {
        Itinerary.find(fkTripId).sort({date: 'asc'}).exec((err3, data3) => {
          if (err3) {
            console.log(err3)
          }
          else {
            res.render('trip/tripMain',{"results":data, "results2":data2, "dateObj":dateObj, "results3":data3})
          }
        })//End Itinerary.find
      }
    })//End Location.find
  }
})//End Trip.findOne
```
