const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB CONNECTED');
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campground', async (req, res) => {
    const camp = new Campground({title: 'Backyard', price: '399'});
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})