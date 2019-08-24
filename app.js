const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const sportRoutes = require('./routes/sports');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const stadiumRoutes = require('./routes/stadiums');
const districtRoutes = require('./routes/districts');
const teamRoutes = require('./routes/teams');
const categoriesRoutes = require('./routes/categories');
const schoolsRoutes = require('./routes/schools');

const app = express();

mongoose.connect('mongodb+srv://alan_g:alng.1jMongo@sportapp-yk7g0.mongodb.net/hisd', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Database!');
    })
    .catch(() => {
        console.log('Connection to DB failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/api/sports', sportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stadiums', stadiumRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/schools', schoolsRoutes);

module.exports = app;