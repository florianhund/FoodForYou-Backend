# Project Setup

### Introduction

FoodForYou API is an open source food-delivery system API which allows users to find and create meals and restaurants, create orders and includes a full user login system.

### Project Support Features

- find / create meals
- find / create restaurants
- find / create orders
- full user authentication

### Installation Guide

- clone this repository [here](https://github.com/florianhund/FoodForYou)

- navigate in the repository

- install all dependencies

```bash
git clone https://github.com/florianhund/FoodForYou
cd FoodForYou
npm i
```

- Create an .env file in your project root folder and add your variables. See .env.example for assistance.

### Usage

Run the following command in the root directory to start the application.
```bash
npm start
```
The server port will be the port specified in .env file.

### Technologies Used

- [NodeJS](https://nodejs.org) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases. 

- [ExpressJS](https://expressjs.com) This is a NodeJS web application framework.

- [MongoDB](https://mongodb.com) This is a free open source NoSQL Document database with scalability and flexibility where data is stored in JSON-like documents.

- [Mongoose ODM](https://mongoosejs.com) This makes it easy to write MongoDB validation by providing a straight forward, schema-based solution to model to application data.

- [Typescript](https://typescriptlang.org) This is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- [Express-Validator](https://express-validator.github.io) This is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.

### Authors

- [Florian Hundegger](https://github.com/florianhund)

### License

This project is available for use under the ISC License.
