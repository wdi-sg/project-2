# Conso
### Project cost consolidation and pricing application

Conso is a cloud based application which assists businesses with project cost consolidation and pricing. It is especially useful for projects which require input from multiple parties.

## Live prototype
https://conso.herokuapp.com

## Workflow

### The problem

Cost consolidation and subsequent pricing of complex, one-off projects such as developing IT systems require input and collaboration among multiple parties.

Usually this is done with spreadsheets. However working with spreadsheets presents a host of problems:

1. Spreadsheets cannot be worked on concurrently
1. Having multiple spreadsheets with multiple owners create chaos
1. It is time consuming as there is a need to compile all the data in a master sheet
1. The workflow is not agile as the master sheet needs to be updated each time one contributor makes a change
1. High degree of human involvement in the workflow increases instances of error which can be extremely costly to the business.


Conso will address these issues.

### User Stories

#### User
The user will be able to create a cost component and specify the following details:
1. Name
1. Description
1. Vendor
1. Type
1. Unit cost
1. Quantity

They will be able to update these details and delete cost components.

The user can view all items for which they are the owner and view the total cost of these items.

Users only have read and write access to cost items which they are the owner.

#### Admin
The admin has read and write access to all cost items.

'Margin' is a variable which can be specified by the Admin for each type of cost item and the the price will be calculated based on this.

The Admin can view and edit all items. They can view the total cost, price and margin and owner.
They have access to a summary report by cost type.

### ERD

![ERD](/ERD_project_2.png)

### Wireframes

![wireframe](/wireframe.png)


### How to Use
```
1. Register a user account on the register page
2. To register an Admin account, use the code: RAYTHAM
3. Login
4. Click on "add new component" on the main view
5. Enter details
6. Click on "add component" (repeat steps 4-6 to add more components)
7. Screen shows a summary of all components added by user

Step 8 onwards applies to Admin only
8. Click on "cost summary" on the side panel to view cost summary by type of component
9. Click on "set variables" on the side panel
10. Enter margin required for each type of component
11. Click on "Update"
12. Cost and price details will be generated
```



## Built With
Conso is build with Node.js, MongoDB and the following modules:

* "bcrypt": "^1.0.3",
* "body-parser": "^1.18.2",
* "connect-mongo": "^2.0.0",
* "dotenv": "^4.0.0",
* "express": "^4.16.2",
* "express-handlebars": "^3.0.0",
* "express-session": "^1.15.6",
* "method-override": "^2.3.10",
* "mongoose": "^4.12.3",
* "nodemon": "^1.12.1",
* "passport": "^0.4.0",
* "passport-local": "^1.0.0"


## Author

**Ray Tham**

Copyright © 2017



<!-- ## Acknowledgments

* -->
