require("dotenv").config();

// --------------------------------------------------
//                 express imports
// --------------------------------------------------

const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors')


// --------------------------------------------------
//                 project imports
// --------------------------------------------------

const user_routes = require("./routes/user_routes");
const task_routes = require("./routes/task_routes");

// --------------------------------------------------
//                     others
// --------------------------------------------------

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

let url = process.env.URL;

app.use(url + "/users", user_routes);
app.use(url + "/tasks", task_routes);
