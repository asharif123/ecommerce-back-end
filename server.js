const express = require('express');
//grab all the routes, part of modularizing routes
const routes = require('./routes');
const sequelize = require('./config/connection');

const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

//body parser that allows data and convert into json, only accepts json data
//without this, cannot see the json data that you're sending

app.use(express.json());

////urlencoded method, allows express to do more url parsing

app.use(express.urlencoded({extended: true}))

//utilize all the routes defined
app.use(routes);

app.get('/', (req, res) => {
    res.send("HELLO WORLD!")
});

// sync sequelize models to the database, then turn on the server
//force: false to ensure we dont recreate database everytime we run nodemon server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  

  
