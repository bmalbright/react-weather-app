const { Schema } = require('mongoose');

// This is a sub-document schema, it won't become it's 
// own model but will be used as the schema for 
// 'savedCities' array in User.js

const citySchema = new Schema({
    cityName: [
        {
            type: String,
        }
    ]
});

module.exports = citySchema;