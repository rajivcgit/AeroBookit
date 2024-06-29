
# AeroBookit

This is a website where users can search, book and/or cancel flight tickets.




<br>

## Getting Started

### Prerequisites

1. **Node.js** for running server-side JavaScript. You can find instructions on how to download and install Node.js for your computer [here](https://nodejs.org/en/download/).

2. **MongoDB** (Community Edition preferrably) to store data. Instructions on downloading and installing MongoDB on your computer can be found [here](https://docs.mongodb.com/manual/installation/).

### Installing

Once you have Node.js and MongoDB installed on your computer,

#### Clone or download this repository.
```sh
git clone https://github.com/Mahadev2074/AeroBookit.git

```

#### Change the folder and Install dependencies.
```sh
cd AeroBookit
npm install
```

#### Create a `.env` file and add the following:
```sh
seshSECRET = <session secret>
dbSECRET = <database secret>
```

#### Run the project.
```sh
npm start
```

#### Open your web browser and visit the address `localhost:3000` and voila!

<br>

## Features

* Authentication:
  * User login with email and password.
  * For new user, there is a sign-up option.

* Authorization:
  * User can only book and cancel ticktets after logging in.
  * User cannot cancel flight tickets without being authenticated.

* Ticket booking functionalities:
  * Search for tickets with necessary parameters.
  * Filter search by price, duration or alphatical order.

* Contact feature for any queries.

* Flash messages responding to users' interaction with the app.

* Responsive web design.

<br>

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [bootstrap](https://getbootstrap.com/)

### Back-end

* [node.js](https://nodejs.org/en/)
* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [passport](http://www.passportjs.org/)
* [express-session](https://github.com/expressjs/session#express-session)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [git](https://git-scm.com/)
* [github](https://github.com/)