# Crane (working title)

Ever stumbled upon a pattern/ template of a craft project that you really want to attempt but unsure how long it will take or need inspiration for the choice of different material.

Crane is here to help.

Crane will:
1) Allow user to upload their variation to the pattern/ template that they based on
2) Allow user to state the amount of time they took and calculate the average amount of time user took for the pattern/ template.
3) Inspire and encourage user to make more craft.

----------

# ERD Diagram

# ![](/Readmeassets/ERD.jpg)

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
# Flow Chart

# ![](/Readmeassets/flowchart.jpg)


------------

# Key Features to build
* User: user register page, login page, profile page
* pattern: upload pattern, pattern details page, linking to variation.
* Variation/ project: linking to pattern, project details page, uploading project.
* search function, home page
* Features to build only after above is completed: Calculation of average time spent, analysis of user's project (ie. breakdown of how many project done in each category or each level. )
-----------

## Built With

HTML
CSS
Javascript
Node
Express
-----------
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


To be added:
* finalise 3 models
* create the handlebars for the routes
* create the routes: project
* include external frameworks
* bonus features
------------

## Acknowledgments
(to be fill up later)
