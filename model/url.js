const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = Schema({
    original_url: {
        type: String,
        unique: true
    },
    short_url: {
        type: String
    },
    url_id: {
        type: String,
        index: true,
        unique: true
    }
})

module.exports = mongoose.model('Urls', urlSchema);