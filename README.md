# Craft Hub (working title)

link: https://tsurucrafthub.herokuapp.com/home

Ever stumbled upon a pattern/ template of a craft project that you really want to attempt but unsure how long it will take or need inspiration for the choice of different material.

Craft Hub is here to help.

Craft Hub will:
* 1) Allow user to upload their variation to the pattern/ template that they based on.
* 2) Allow user to state the amount of time they took and calculate the average amount of time user took for the pattern/ template.
* 3) Inspire and encourage user to make more craft.

What Craft Hub can not do:
* Magically make your craft project appear.(User still need to put in effort to make it)


----------

# ERD Diagram

# ![](/Readmeassets/ERD_new.jpg)

-----------
# Wireframes

# ![](/Readmeassets/home.png)
Home Page will have recommended patterns or projects for user to attempt. If the user has logged in, it should display recommended as what was set in user's preferences instead.(ie. if preferences is woodcraft, it will display projects or pattern under woodcraft category.)

# ![](/Readmeassets/profile.png)
# ![](/Readmeassets/profilev2.png)
A simple profile page. As each user are able to have to-challenge-projects, projects (completed) and pattern, the layout of the profile is yet to confirm.

# ![](/Readmeassets/category.png)
A simple layout of all projects under same category.

# ![](/Readmeassets/pattern_a.png)
For each pattern, it will first show the variation.

# ![](/Readmeassets/pattern_b.png)
When user click on the instructions, it will display the material and instructions

# ![](/Readmeassets/variationorproject.png)
For each variation/ project that the user create, it will have their own individual page to display.


----------
Routes list

```
('/home')
Get /

('/login')
Get /
Post / redirect to home

('/register')
Get /
Post / redirect to profile

('category/')
Get / (not relevant currently)
Get/:category (show 10 pattern & 10 project under the category selected)

('/profile/')
Get /
Delete /
Get /edit
Put /edit
Get /:slug

('/pattern/')
Get /new
Post /new
Get /:id (pattern id)

Get /:id/edit
Put /:id/edit
Delete /:id/edit

Get /:id/variation/new
Post /:id/variation/new

Post /:id/bookmark // add bookmark to user
Put /:id/bookmark // removeBookmark

('/projects')

Get /:id (projects id)
Get /:id/edit
Put /:id/edit
Delete /:id/edit
```

------------

# Flow Chart

# ![](/Readmeassets/flowchart_new.jpg)


------------

# Key Features to build
* User: user register page, login page, profile page
* pattern: upload pattern, pattern details page, linking to variation.
* Variation/ project: linking to pattern, project details page, uploading project.
* search function, home page
* Features to build only after above is completed: Calculation of average time spent, analysis of user's project (ie. breakdown of how many project done in each category or each level. )

-----------

## Built With

* HTML
* CSS
* Javascript
* Node
* Express

-----------

## Log

version 0.1.0 Day 1 (23 Oct):
* added Erd Diagram, wireframes, flowchart.  
* install relevant dependencies
* connect to heroku
* building 3 models

version 0.3.0 Day 2 (24 Oct):
* added working login-routes, register-routes, profile-routes.
* added pattern-routes: able to create new pattern, new variation under the pattern.
* able to update the pattern id or project id to the user upon creation.

version 0.4.5 Day 3 (25 Oct):
* fix: able to see the pattern & project details (title) under profile.
* fix: update the 3 models schema
* added working category_routes: able to display 10 pattern and 10 project under the category.
* added home_route, that will show 6 pattern from the categories.

version 0.5.0 Day 4 (26 Oct):
* added: update user, delete user.

version 0.7.5 Day 5 (27 Oct) :
* added: upload image function
* change the Schema structure of user and pattern model
* able to remove user & its pattern & projects
* fix: prevent multiple adding of bookmark for same project for the user
* add: remove bookmark on profile page and as an option when updating a variation for the pattern.

version 0.8.0 Day 6 (29 Oct):
* added: CSS
* routes list to readme

version 0.8.1 (5 Nov) :
* Fix bugs: Non-user are now able to view pattern and other user profile


--------------
## Improvement

To be added:
* finalise 3 models
* search function
* bonus features: estimated time spend
* user preference category
* more category



To Fix:
* Deleting Account + pattern + project under it
* Delete pattern should update all variation project pattern name.  

------------

## Acknowledgments
Images list used for the database: check picturessource.txt (to be upload once is insert in database)
