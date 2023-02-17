const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.gs9hkam.mongodb.net/?retryWrites=true&w=majority`, ()=> {
console.log('Mongodb is connected');
});