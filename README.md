# Project Setup

### Introduction

FoodForYou API is an open source **food-delivery system API** which allows users to find and create meals and restaurants, create orders and includes a full user login system.

### Project Support Features

- find / create / update meals
- find / create / update restaurants
- find / create / update orders
- full user authentication
- admin overwiev

### Prerequisites

You need to have **NodeJS** (v14.17.6 or higher) installed on your system in order to install and run the application.

### Installation Guide

- clone this repository [here](https://github.com/florianhund/FoodForYou)

- navigate into the repository

- install all dependencies

```bash
git clone https://github.com/florianhund/FoodForYou
cd FoodForYou
npm i
```

- Create a **.env file in your project root folder** and add your variables. See .env.example for assistance.
  <br>
  Set NODE_ENV to DEVELOPMENT if you are not running the application in production mode.

### Usage

Run the following command in the root directory to start the application.

```bash
npm start
```

The server port will be the port specified in .env file.

### Documentation

The following route provides information about all **API-Endpoints, models, servers** and the whole project itselves. You should access this route via your preferred browser.
<br>
GET /api-docs

### Technologies Used

- [NodeJS](https://nodejs.org) This is a **cross-platform runtime environment** built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

- [ExpressJS](https://expressjs.com) This is a **NodeJS web application framework**.

- [MongoDB](https://mongodb.com) This is a free open source **NoSQL Document database** with scalability and flexibility where data is stored in JSON-like documents.

- [Mongoose ODM](https://mongoosejs.com) This makes it easy to write **MongoDB** validation by providing a straight forward, schema-based solution to model to application data.

- [Typescript](https://typescriptlang.org) This is a **strongly typed programming language** that builds on JavaScript, giving you better tooling at any scale.

- [Express-Validator](https://express-validator.github.io) This is a set of **express.js middlewares** that wraps validator.js validator and sanitizer functions.

- [Swagger-Ui-Express](https://swagger.io/) This is an Interface Description Language for **describing RESTful APIs**. It is used to design, build and document RESTful web services.

- [Jest](https://jestjs.io/) This is a delightful JavaScript / Typescript **Testing Framework**.

### Authors

- [Florian Hundegger](https://github.com/florianhund)

### License

This project is available for use under the **ISC License**.
