# Conso
### Project cost consolidation and pricing application

Conso is a cloud based application which assists businesses with project cost consolidation and pricing. It is especially useful for projects which require input from multiple parties.

## Live prototype
https://conso.herokuapp.com

## Workflow

### The problem

Cost consolidation and subsequent pricing of complex, one-off projects such as those in construction and IT systems require input and collaboration among multiple parties.

Usually this is done with spreadsheets. The problem is spreadsheets do not cut it. They cannot be worked on concurrently and having multiple spreadsheets with multiple owners create chaos and there is a need to compile all the data. As there is a lot of human involvement in this kind of workflow, it can lead to human error which can be extremely costly to the business. The process is also slow.

This application aims to address the problems detailed above.

### User Stories

#### User
The user will be able to create a cost component and specify the following details:
1. Name
2. Description
3. Vendor
4. Type
5. Unit cost
6. Quantity

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

* bcrypt: ^1.0.3
* body-parser: ^1.18.2
* express: ^4.16.2
* express-handlebars: ^3.0.0
* method-override: ^2.3.10
* mongoose: ^4.12.3
* nodemon: ^1.12.1



## Author

**Ray Tham**

Copyright © 2017



<!-- ## Acknowledgments

* -->
