var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var Player = require('../models/player');

/* GET home page. */
router.get('/', function(req, res) {
    var myCallback = parallel_load_dashboard(
        1,  //řazení podle jmen
        function(items) {
            res.render('index', items);
        }); //items vypis hracu
});

router.get('/newplayer', function(req, res) {
  res.render('newplayer');
});

router.get('/newscore', function(req, res) {
    var myCallback = parallel_load_dashboard(
        1,  //řazení podle jmen
        function(items) {
            res.render('newscore', items);
        }); //items vypis hracu
    //zjednodusit jen na vypis jmen a pocet her(vic neni treba pri zalozeni skore)
});
router.get('/home', function(req, res) {
  res.render('index');
});

function parallel_load_dashboard(req, callback) {
    loadList(req, function(returnValue) {
          callback(returnValue);
    });
}

function loadList(param, callback) {
    Player.findPlayers(param, function(error, players) {
        var done = 0;
        var myCallback = makeList(
            players,
            function(items) {
                var sort = [];
                sort['sortorder'] = param;
                sort['Players'] = items;
                callback(sort);
            }); //items vypis hracu
        
    });
}

// skore / 3.5 zaokrouhlit, vyska sloupce v grafu
function makeList(players, callback) {
    var listBoard = [];
    if (players.length == 0) {
        callback();
    }
    for (var i = 0; i < players.length; i++) {
        var hrac = players[i];
        listBoard[i] = {
            'id': hrac._id,
            'name': hrac.name,
            'sex': hrac.sex,
            'member': hrac.member,
            'gamescount': hrac.gamescount,
            'highscore': hrac.highscore,
            'strikes': hrac.strikes,
            'spares': hrac.spares,
            'games': hrac.games
        };
        if (listBoard.length == players.length) {
            console.log('Celkem hracu: ' + players.length);
            callback(listBoard)
        }

    }
}


router.post('/', function(req, res) {
    var myInnerCallback = parallel_load_dashboard(
        req.body.sortorder,
        function(items) {
            res.render('index', items)
        });

});

//nový hráč
router.post('/newplayer', function(req, res, next) {

    function findPlayer() {
        return Player.findOne({
                "name": req.body.name.trim()    //trim() odstraní zbytečné mezery ze stringu
            })
            .then(function(player) {
                if (player) {
                    throw new Error('Player already exists!');
                }
            }, function(err) {
                // handle mongoose errors here if needed
                // rethrow an error so the caller knows about it
                throw new Error('Some Mongoose error happened!');
                // or throw err; if you want the caller to know exactly what happened
            });
    }

    findPlayer().then(function() {
        var name = req.body.name.trim();
        var sex = req.body.sex;
        var member = req.body.member;
        if (req.body.member) member = true;
        else member = false;
        //Form Validator
        req.checkBody('name', 'Je třeba zadat jméno').notEmpty();
        req.checkBody('sex', 'Je třeba zadat pohlaví').notEmpty();
        // Check Errors
        var errors = req.validationErrors();
        if (errors) {
            console.log(errors);
            res.render('index', {
                errors: errors
            });
        } else {

            var newPlayer = new Player({
                name: name,
                sex: sex,
                member: member
            });

            Player.createPlayer(newPlayer, function(err, user) {
                if (err) throw err;
            });

            req.flash('success', 'Hráč úspěšně uložen');

            res.location('/newplayer');
            res.redirect('/newplayer');
            
        }



    }).catch(function(err) {
        // here, you'll have Mongoose errors or 'User already exists!' error
        console.log(err.message);
        req.flash('error', 'Jméno je již použito');
        res.location('/');
        res.redirect('/');
    });

});


function loadThrows(req, callback) {
    total = req.body.total;
    throw1 = req.body.throw1;
    throw2 = req.body.throw2;
    throw3 = req.body.throw3;
    throw4 = req.body.throw4;
    throw5 = req.body.throw5;
    throw6 = req.body.throw6;
    throw7 = req.body.throw7;
    throw8 = req.body.throw8;
    throw9 = req.body.throw9;
    throw10 = req.body.throw10;
    throw11 = req.body.throw11;
    throw12 = req.body.throw12;
    throw13 = req.body.throw13;
    throw14 = req.body.throw14;
    throw15 = req.body.throw15;
    throw16 = req.body.throw16;
    throw17 = req.body.throw17;
    throw18 = req.body.throw18;
    throw19 = req.body.throw19;
    throw20 = req.body.throw20;
    throw21 = req.body.throw21;
    score1 = req.body.score1;
    score2 = req.body.score2;
    score3 = req.body.score3;
    score4 = req.body.score4;
    score5 = req.body.score5;
    score6 = req.body.score6;
    score7 = req.body.score7;
    score8 = req.body.score8;
    score9 = req.body.score9;
    score10 = req.body.score10;
    scoredate = req.body.scoredate;
    graph = total / 3;
    score = {
        total: total,
        score1: score1,
        score2: score2,
        score3: score3,
        score5: score5,
        score5: score5,
        score6: score6,
        score7: score7,
        score8: score8,
        score9: score9,
        score10: score10,
        throw1: throw1,
        throw2: throw2,
        throw3: throw3,
        throw4: throw4,
        throw5: throw5,
        throw6: throw6,
        throw7: throw7,
        throw8: throw8,
        throw9: throw9,
        throw10: throw10,
        throw11: throw11,
        throw12: throw12,
        throw13: throw13,
        throw14: throw14,
        throw15: throw15,
        throw16: throw16,
        throw17: throw17,
        throw18: throw18,
        throw19: throw19,
        throw20: throw20,
        throw21: throw21,
        graph: Math.floor(graph),
        date: scoredate
    };
    callback(score);
}



//nové skore
router.post('/newscore', function(req, res, next) {
    function findPlayer() {
        return Player.findOne({
                "name": req.body.name
            })
            .then(function(player) {
                if (player) {
                    throw new Error('Player already exists!');
                }
            }, function(err) {
                // handle mongoose errors here if needed
                // rethrow an error so the caller knows about it
                throw new Error('Some Mongoose error happened!');
                // or throw err; if you want the caller to know exactly what happened
            });
    }



    findPlayer().then(function() {
            var playerId = req.body.playerId;
            var playerId;
            var total;
            var throw1;
            var throw2;
            var throw3;
            var throw4;
            var throw5;
            var throw6;
            var throw7;
            var throw8;
            var throw9;
            var throw10;
            var throw11;
            var throw12;
            var throw13;
            var throw14;
            var throw15;
            var throw16;
            var throw17;
            var throw18;
            var throw19;
            var throw20;
            var throw21;
            var score1;
            var score2;
            var score3;
            var score4;
            var score5;
            var score6;
            var score7;
            var score8;
            var score9;
            var score10;
            var scoredate;
            var score;
            var myCallback = loadThrows(
                req,
                function(score) {



                    var gamecount;
                    Player.findById(playerId)
                        .then((player) => {
                            gamecount = player.games.length;
                        });

                    Player.saveScore(playerId, score, gamecount, function(err, user) {
                        if (err) throw err;
                    });

                    req.flash('success', 'Skóre úspěšně uloženo');

                    res.location('/newscore');
                    res.redirect('/newscore');

                });
        }

    );


});

module.exports = router;