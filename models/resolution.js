const mongoose = require('mongoose');

const resolutionSchema = new mongoose.Schema({
    agent: {
        type: String
    },

    phone:{
        type: String
    },

    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Resolution', resolutionSchema);