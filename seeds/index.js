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
        const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground({
           title: `${sample(descriptors)} ${sample(places)}`,
           location: `${sample(cities).city}, ${sample(cities).state}`,
           image: 'https://source.unsplash.com/collection/10489597',
           description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur atque aperiam explicabo repellat debitis. Libero quam magni voluptate incidunt repellendus!',
           price
       });
       await camp.save();
    }
}

seedDB();


