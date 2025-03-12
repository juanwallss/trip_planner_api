const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const itinerariesRoutes = require('./routes/itineraryRoutes')
const activitiesRoutes = require('./routes/activityRoutes')

const app = express();


// Middleware to parse JSON bodies

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.use(express.json({
  type: "*/*" // optional, only if you want to be sure that everything is parsed as JSON. Wouldn't recommend
}));

// Routes
app.use('/users', userRoutes);
// auth routes
app.use('/auth', authRoutes);
// itineraries routes
app.use('/itineraries', itinerariesRoutes)
// activities routes
app.use('/activities', activitiesRoutes)


module.exports = app;