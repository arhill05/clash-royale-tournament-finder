const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const addMinutes = require('date-fns/add_minutes');
const addHours = require('date-fns/add_hours');
const distanceInWordsStrict = require('date-fns/distance_in_words_strict');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a tournament name!'
    },
    description: {
        type: String,
        trim: true
    },
    startTime: {
        type: Date,
        required: "Please enter a start time!"
    },
    password: String,
    timeDescription: String,
    maxPlayers: Number
});

module.exports = mongoose.model("Tournament", tournamentSchema);