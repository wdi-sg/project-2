# Team Task Manager

Link to site:
http://159.89.194.112/

The Team Task Manager is to help teams be agile even when working offsite. The task board list all tasks for the project in real time and any edits are reflected onto all team members.

In addition, the Team Task Manager comes with inbuilt communication tools.

## How to use the Team Task manager

1. Register/login to an account.
2. Join/Create a team at "/manageProject"
3. View the Task Board at "/board"
4. Create tasks on the board by pressing the "Create New Task" button
5. Delete task by clicking on the delete button on the Task card
6. Move task around by clicking on the task and clicking another section.

## Setting up the project

1. Create .env file in main directory - add SESSION_SECRET
2. yarn install - to install dependencies
3. ensure mongodb is up and running on your local machine

### Stack

Node, Express, Handlebars, MongoDB

## ERD

1. Projects
2. Tasks
3. Users
4. Messages

<img src="./public/images/erd.png" alt="ERD" width="500"/>

## Screenshot

The bulk of the website is on the Sprint board.

<img src="./public/images/sprintBoard.png" alt="Sprintboard Screenshot" width="800"/>

## List of Routes

* Login
* Register
* Index (shows guide on how to use)
* Profile (shows list of task)
* Manage Project (allows creating, joining, and leaving projects)
* Task Board (shows the task management board)

## Hosting

Hosted on DigitalOcean.

* Ubuntu 16.04.3 x64
* NGINX (reverse proxy)
* pm2 (node process manager)
