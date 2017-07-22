# Create React App with Express and MongoDB

A very lightweight boilerplate, for creating react apps, with express as the back-end.
This project is inspired of the [food lookup demo](https://github.com/fullstackreact/food-lookup-demo).

## Overview

When the project is started with `npm start`, two processes are started simultaneously.

One is for the client, and is what the user will connect to, through the browser.
And is running on `localhost:3000`

The other is the server, that is responsible for api requests. And is running on `localhost:3001`

A more detailed explanation of this, can be found [here](https://github.com/fullstackreact/food-lookup-demo#overview).

## Installation

To download and install this boilerplate, clone the repository, and install the node dependencies.

```shell
# Clone the project
$ git clone https://github.com/viktorstrate/create-react-express-app.git my-app

# Move to project
$ cd my-app

# Install dependencies, for both the server and the client
$ npm install && cd client && npm install

# Start the server for development
$ npm start
```

Now setup some enviroment variables, by copying `.env.example` to `.env`.
And edit the new file, to match your environment.

## Project structure

The following, explains what the different parts of the project does. 

### Client

The `client` folder is a modified version of `create-react-app`,
and contains the code that will be sent to the browser.

[Read more...](https://github.com/viktorstrate/create-react-express-app/tree/master/client#client-side)

### Server

The `server` folder, contains the all logic that will run on the server.

```
server              The root of the server logic
├─ api/             Where all the express routes are stored
├─── comments.js    An example route
├─ models/          Models for the database
├─── Message.js     An example model
├─ mongoose.js      Initial setup for the database
├─ server.js        Entry point for server
```

## Production

To run in production, the project needs to be built first.

```shell
# Build the server and client
$ npm run build

# Serve the site
$ npm run serve
```
