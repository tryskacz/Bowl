var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var GameSchema = require('./game');

mongoose.Promise = global.Promise;

var db = mongoose.connection;

//player schema
var PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
    },
    sex: {
        type: String
    },
    member: {
        type: Boolean,
        default: true
    },
    highscore: {
        type: Number,
        default: 0
    },
    spares: {
        type: Number,
        default: 0
    },
    strikes: {
        type: Number,
        default: 0
    },
    gamescount: {
        type: Number,
        default: 0
    },
    games: [GameSchema]

});

var Player = module.exports = mongoose.model('Player', PlayerSchema);

module.exports.getPlayerById = function(id, callback) {
    Player.findById(id, callback);
}

module.exports.getPlayerByName = function(name, callback) {
    var query = {
        name: name
    };
    Player.findOne(query, callback);
}

module.exports.createPlayer = function(newPlayer, callback) {
    newPlayer.save(callback);

}

module.exports.findPlayers = function findPlayers(param, callback) {
    var sortParam = ({ 'name': 1 });
    if (param == 2) {
        sortParam = ({ 'games': -1 });  
    } else if (param == 3) {
        sortParam = ({ 'highscore': -1 });  
    } else if (param == 4) {
        sortParam = ({ 'strikes': -1 });  
    } else if (param == 5) {
        sortParam = ({ 'spares': -1 });          
    } else {
        sortParam = ({ 'name': 1 });   
    }
    console.log(sortParam);
    Player.find({}, function(err, players) {
        if (err) {
            return callback(err);
        } else if (players) {
            return callback(null, players);
        } else {
            return callback();
        }
    }).sort(sortParam);

}

module.exports.saveScore = function saveScore(playerId, game, gamescount, callback) {
    var strikes = 0;
    var spares = 0;
    for (var x = 0; x < 22; x++) {
        var thr = 'throw' + x;
        if (game[thr] == 'X') strikes++;
        if (game[thr] == '/') spares++;
    }

    Player.findById(playerId)
        .then((player) => {
            player.games.push(score);
            player.strikes = player.strikes + strikes;
            player.spares = player.spares + spares;
            player.gamescount = player.games.length;
            if (player.highscore < game['total']) {
                player.highscore = game['total'];
            }
            return player.save();
        })
        .then(() => Player.findById(playerId))
        .then((player) => {
            if (player.games.length > gamescount) {
                console.log(player);
                callback();
            }
        });

}