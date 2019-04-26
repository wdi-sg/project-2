# Multi Business Locator

This is a new search engine which looks for multiple local businesses, such as restaurants, bookstores etc, simultaneously.

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2: Building Your First Full-stack Application


## Getting Started

### Link to application

<https://chongct-project2.herokuapp.com/>

### Prerequisites

Install Node.js and npm from <https://nodejs.org/en/>.

Install Yarn through Homebrew package manager using the command `brew install yarn`.

### How to Use

After cloning the project, run `yarn install` in command line to install the required dependencies listed in package.json.

Create a .env file to store environment-specific variables.

Connect to a database hosted on mlab and obtain the URI.

Request an API key from [Yelp](https://www.yelp.com.sg/singapore).

---

## Workflow

### Models

![alt text](https://github.com/chongct/project-2/blob/master/images/models.png "Models")

![alt text](https://github.com/chongct/project-2/blob/master/images/sample-analyzedList.png "Sample data from analyzedListSchema")

### Entity Relationship Diagram (ERD)

![alt text](https://github.com/chongct/project-2/blob/master/images/entity-relationship-diagram.png "ERD")

### Wireframes

The first four images show the wireframe templates used throughout the site.
The last flow chart shows the routes that link the website pages.

![alt text](https://github.com/chongct/project-2/blob/master/images/wireframe-search.png "Wireframe (Search feature)")

![alt text](https://github.com/chongct/project-2/blob/master/images/wireframe-login.png "Wireframe (Login feature)")

### Flowchart

![alt text](https://github.com/chongct/project-2/blob/master/images/flowchart.png "Flowchart")

### User Stories

* As an individual with multiple errands to run or locations to visit, I want to be able to quickly identify business locations combinations that are located close to one another so that I will be able to minimize travelling time.
* As a member in a family or group of friends, I want to be able to find business locations combinations that are located close to one another which the family or group of friends are interested in, so that the location identified can satisfy the group as a whole with minimal travelling.
* As a user without a registered account, I want to be able to perform searches so that I can decide if I should sign up for an account.
* As a user without a registered account, I also want to be able to have my results analyzed so that I can decide if I should sign up for an account.
* As a user with a registered account, in addition to the benefits a user without a registered account is able to enjoy, I want to be able to save my analyzed results so that I can refer to them in the future.

---

## Code Structure and Flow

1. Yelp API Call

Multiple calls to the API are needed simultaneously from multiple search fields. The results are obtained from separate API calls and rendered. A strategy to make use of asynchronous JavaScript is needed.

Native JavaScript `forEach` was used initially but this resulted in a situation where API calls are queued up one after another.

[Async Promises](https://www.npmjs.com/package/async-promises) is used instead, where API calls are done simultaneously, before results are rendered.

```javascript
// truncated and modified code to demonstrate simultaneously API calls
return asyncP.each(itemArray, (entry) => {
  return new Promise((resolve) => {
    client.search({
      location: location,
      limit: 8,
      term: entry
    }).then(response => {
      var result = response.jsonBody.businesses;
    })
  })
}).then(() => {
  console.log("This line will only be printed once.");
});
```


2. Processing of multiple locations combination

* Loop through all returned arrays with searched locations, eg. array displaying restaurants, array displaying bookstores, to get all possible combinations. For example, a combination is obtained by pairing a restaurant with a nearby bookstore.
* Calculate an arbitrary index to relate latitude and longitude difference with distance.
* Loop through all possible combinations and sort them in an increasing order based on the arbitrary index calculated.


3. Create, Read, Update & Delete (CRUD)

* Create: Saving of locations combination after these results are rendered.
* Read: Accessing these saved locations combinations for future reference.
* Delete: Deleting of these saved locations combinations either instantaneously by clicking on them again or by removing them on the saved page.


## Built With

* HTML, CSS and JavaScript
* CSS framework [Bulma](https://bulma.io/)
* [jQuery](http://jquery.com/)
* Node.js, Yarn, Express, Handlebars
* API and data by [Yelp](https://www.yelp.com.sg/singapore)
* Passport.js, Bcrypt, Flash messages, Express validator
* Async promises
* MongoDB and Mongoose, hosted on mLab

---

## Areas to Improve on
* Website pages design
* Tidying up of code
* Google Maps API

---

## Acknowledgments

* Family and friends for the inspirations and testing
