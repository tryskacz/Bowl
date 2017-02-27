const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    date: Date,
    graph: Number,
    total: Number,
    score1: Number,
    score2: Number,
    score3: Number,
    score4: Number,
    score5: Number,
    score6: Number,
    score7: Number,
    score8: Number,
    score9: Number,
    score10: Number,
    throw1: String,
    throw2: String,
    throw3: String,
    throw4: String,
    throw5: String,
    throw6: String,
    throw7: String,
    throw8: String,
    throw9: String,
    throw10: String,
    throw11: String,
    throw12: String,
    throw13: String,
    throw14: String,
    throw15: String,
    throw16: String,
    throw17: String,
    throw18: String,
    throw19: String,
    throw20: String,
    throw21: String
});

module.exports = GameSchema;