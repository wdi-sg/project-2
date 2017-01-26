# mmb

This is the repository of my 2nd project from WDI immersive course. This is a full-stack web application, utilising technologies from the front end (HTML,CSS,JS) and back end (node.js, express, many other packages etc).

The idea is a clone from the NBC tv series community. In one of the episodes, the characters are introduced to a social networking application called MeowMeowBeenz (yes, with the Z). The application is basically a glorified rating system, in which people upload their images of themselves in order to be rated from 1 - 5. Chaos ensues (as expected)

Disclaimer alert! :

This application is entirely satirical, if you are offended by the content please try to avoid this web application. Otherwise, please enjoy!

## Getting Started

Provide instructions here about how to get your project running on our local machine. Do we just need to clone and open a certain file or do we need to install anything first.

### Prerequisites

Set up the needed local process.env variables and connect to your local version of mongo db for local use.

Otherwise, this application will be hosted on a heroku platform after I finish writing up this readme.md

### How to Use

This web application is a social networking app
The steps to use it is rather simple.

After creating an account, you will be directed immediately to the dashboard, in here, you will be able to look at other people's profile.

But in order to really participate, you have to create a new profile page.

Clicking on the profile page link will direct you to the create profile page where you will fill in your details.

After completing your profile page, now head back to the home(dashboard) and start clicking on profiles that catch your fancy.

Inside another person's profile page, you will be presented a bigger picture of the person's profile.
In addition, you can rate the person, starting from **Scum**,**Foul Beast**,**Acceptable**,**Good work Skeleton** to **Praise the Sun**! Praise the Sun is the highest rating that you can give to a single person, and Scum is the lowest rating that you can give.

## Tests

YES I did write tests!!!
first set up the project (set the session secret and mongo db)
run mongod, then run this command;

```
npm test
```

you should see a list of tests appearing...

## Live Version

Where is this deployed online (github pages, heroku etc), give us the link and any access details we need.

I will update this later!

## Built With

What did you use to build it, list the technologies, plugins, gems, packages etc.

* Bootstrap
* multer package


## Workflow

Workflow was me mapping it mostly on paper. I initially did not have a strong conceptual idea but I did want to explore the image uploading package (multer) so I went with that. One thing led to another and thus the app was born.

## Authors

Just me

## References

* For my rating algorithm, I used a Dirichlet prior distribution algo derived from this particular website. I did not derive it but merely implemented the formula derived by evan miller.
* http://www.evanmiller.org/ranking-items-with-star-ratings.html
* http://www.evanmiller.org/how-not-to-sort-by-average-rating.html
