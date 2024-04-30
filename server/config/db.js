const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/kinopoisk').then(() => {
    console.log('Connected to mongoDB');
}).catch((e) =>{
    console.log('Failed to Connect to mongoDB');
})