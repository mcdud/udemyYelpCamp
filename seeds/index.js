const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB CONNECTED');
})

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

// clears db and adds seed data
const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
       const camp = new Campground({
           title: `${sample(descriptors)} ${sample(places)}`,
           location: `${sample(cities).city}, ${sample(cities).state}`
       });
       await camp.save();
    }
}

seedDB();