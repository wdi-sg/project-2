# Conso - Cost consolidation and pricing application

This purpose of this application is to assist businesses with cost consolidation and pricing of their offerings. It is especially useful for projects which require input from multiple parties.

## Workflow
<!-- Did you write user stories, draw wireframes, use task tracking, produce ERDs? Did you use source control, with regular commits? Include links to them here. -->

### The problem

Cost consolidation and subsequent pricing of complex, one-off projects such as those in construction and IT systems require input and collaboration among multiple parties.

Usually this is done with spreadsheets. The problem is spreadsheets do not cut it. They cannot be worked on concurrently and having multiple spreadsheets with multiple owners create chaos and there is a need to compile all the data. As there is a lot of human involvement in this kind of workflow, it can lead to human error which can be extremely costly to the business.


This application aims to address the problems detailed above.

### User Stories

#### User
The user will be able to create a cost item and specify details such as cost of the item.

They should only have read and write access to cost items which they are the owner.

They can update details of cost items at any time.

The user can view a summary report of all items for which they are the owner and the total cost of these items.

Good to have feature: User cannot view 'price' or specify 'margin'

#### Admin
The admin has read and write access to all cost items.

'Margin' is a variable which can be specified by the Admin for each type of cost item and the the price will be calculated based on this.

The Admin can view a summary report of all items with the total cost, price and margin.

### ERD

![ERD](/public/img/ERD.png)

<!-- ## Getting Started

Provide instructions here about how to get your project running on our local machine. Do we just need to clone and open a certain file or do we need to install anything first.

### Prerequisites

What is needed to install and run the project, how do we install them

```
Code example
```

### How to Use

A step by step guide on how to install and use the project, for example if this is a game, how do we play it.


```
Code example
```

More steps...

```
until finished
```


## Tests

Did you write automated tests? If so, how do we run them.


```
Code example
``` -->

## Live Version


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
