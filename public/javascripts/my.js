function openNav() {
    document.getElementById("sidePanel").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("nav-icon").style.visibility = "none";
    document.getElementById("nav-icon").style.opacity = "0";
}

function closeNav() {
    document.getElementById("sidePanel").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("nav-icon").style.visibility = "visible";
    document.getElementById("nav-icon").style.opacity = "1";
}

function selectPlayer(playerId, e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    $("#" + playerId).addClass("selected")
    document.getElementById(playerId).onclick = function() {
        deselectPlayer(playerId);
    };
}

function deselectPlayer(playerId, e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    $("#" + playerId).removeClass("selected")
    document.getElementById(playerId).onclick = function() {
        selectPlayer(playerId);
    };
}

function newPlayer() {
    window.location.href = '/newplayer'
  }
function newScore() {
    window.location.href = '/newscore'
  }
function home() {
    window.location.href = '/'
  }
function openEdit() {
    document.getElementById("newplayer-overlay").className = "newplayeroverlay open";
}

function closeEdit() {
    document.getElementById("newplayer-overlay").className = "newplayeroverlay";
}

function openNewPlayer() {
    document.getElementById("newplayer-overlay").className = "newplayeroverlay open";
}

function closeNewPlayer() {
    document.getElementById("newplayer-overlay").className = "newplayeroverlay";
}

function openNewGame() {
    document.getElementById("newgame-overlay").className = "newgameoverlay open";
}

function closeNewGame() {
    document.getElementById("newgame-overlay").className = "newgameoverlay";
}
//score
shot = [];
score = [];

function buttons() {
    //vsedchny tlacitka zviditelnit
    for (b = 0; b < 12; b++) {
        var btnId = 'btn-add-' + b;
        console.log(btnId);
        document.getElementById(btnId).disabled = false;
    }

    //pri prvnim ze dvou zneviditelnit X a pocet ktery uz nejde shodit
    var x = shot.length;
    if (x & 1 || x == 20) {
        console.log(x);
        //urcite dat pryc X (osetrit desate kolo, kde mohou byt 3 X)
        if (shot[shot.length - 1] != 'X') document.getElementById('btn-add-10').disabled = true;
        if (shot[19] == '/') document.getElementById('btn-add-10').disabled = false;
        var lastThrow = (10 - shot[shot.length - 1]);
        console.log(lastThrow);
        for (b = lastThrow; b < 10; b++) {
            var btnId = 'btn-add-' + b;
            document.getElementById(btnId).disabled = true;
        }
    } else {
        document.getElementById('btn-add-11').disabled = true;
    }

    if (shot[19] == 'X' || shot[19] == '/') document.getElementById('btn-add-11').disabled = true;
    if (shot[18] == 'X') document.getElementById('btn-add-11').disabled = true;

    if (score[9]) {
        for (b = 0; b < 12; b++) {
            var btnId = 'btn-add-' + b;
            console.log(btnId);
            document.getElementById(btnId).disabled = true;
        }
    }
}

function backspace() {
    shot.splice(-1, 1);
    runScript(shot.length);
    var rem = 'throw' + (shot.length + 1);
    var tdthrowid = 'td' + rem;
    document.getElementById(rem).value = "";
    document.getElementById(tdthrowid).className = 'throw1';
}

function eraseAll() {
    shot = [];
    runScript(shot.length);

    for (var x = 1; x < 22; x++) {
        var rem = 'throw' + x;
        var tdthrowid = 'td' + rem;
        document.getElementById(rem).value = "";
        document.getElementById(tdthrowid).className = 'throw1';
    }
}



function add(number) {
    store(number);
    runScript(shot.length);
}

function runScript(param) {
    valid = true;
    if (valid) {
        calculate(param);
        print();
        buttons();
    }
}

function store(number) {
    if (document.getElementById('throw1').value) shot[0] = document.getElementById('throw1').value;
    if (document.getElementById('throw2').value) shot[1] = document.getElementById('throw2').value;
    if (document.getElementById('throw3').value) shot[2] = document.getElementById('throw3').value;
    if (document.getElementById('throw4').value) shot[3] = document.getElementById('throw4').value;
    if (document.getElementById('throw5').value) shot[4] = document.getElementById('throw5').value;
    if (document.getElementById('throw6').value) shot[5] = document.getElementById('throw6').value;
    if (document.getElementById('throw7').value) shot[6] = document.getElementById('throw7').value;
    if (document.getElementById('throw8').value) shot[7] = document.getElementById('throw8').value;
    if (document.getElementById('throw9').value) shot[8] = document.getElementById('throw9').value;
    if (document.getElementById('throw10').value) shot[9] = document.getElementById('throw10').value;
    if (document.getElementById('throw11').value) shot[10] = document.getElementById('throw11').value;
    if (document.getElementById('throw12').value) shot[11] = document.getElementById('throw12').value;
    if (document.getElementById('throw13').value) shot[12] = document.getElementById('throw13').value;
    if (document.getElementById('throw14').value) shot[13] = document.getElementById('throw14').value;
    if (document.getElementById('throw15').value) shot[14] = document.getElementById('throw15').value;
    if (document.getElementById('throw16').value) shot[15] = document.getElementById('throw16').value;
    if (document.getElementById('throw17').value) shot[16] = document.getElementById('throw17').value;
    if (document.getElementById('throw18').value) shot[17] = document.getElementById('throw18').value;
    if (document.getElementById('throw19').value) shot[18] = document.getElementById('throw19').value;
    if (document.getElementById('throw20').value) shot[19] = document.getElementById('throw20').value;
    if (document.getElementById('throw21').value) shot[20] = document.getElementById('throw21').value;

    if (number == "X" && shot.length < 18) {
        shot[shot.length] = number;
        shot[shot.length] = 0;
        // console.log(shot.length+1);
        var throwId = 'throw' + (shot.length - 1);
        var throwId2 = 'throw' + (shot.length);
        var tdthrowid = 'td' + throwId2;
        document.getElementById(throwId).value = "";
        document.getElementById(throwId2).value = "X";
        document.getElementById(tdthrowid).className = 'throw1 filled';
    } else if (!shot[0] && number != 'X') {
        shot[0] = number;
        document.getElementById('throw1').value = number;
        document.getElementById('tdthrow1').className = 'throw1 filled';
    } else {
        shot[shot.length] = number;
        var throwId = 'throw' + shot.length;
        var tdthrowid = 'td' + throwId;
        document.getElementById(throwId).value = number;
        
        document.getElementById(tdthrowid).className = 'throw1 filled';
    }

}

function calculate(vrh) {
    frame = 0;
    lastFrame = 0;
    paramFrame = vrh + 1;
    for (i = 0; i < 8; i++) { //first 8 frames
        if (shot[2 * i] == 'X') { //strike this frame
            if ((shot[2 * i + 2] == 'X') && (shot[2 * i + 4] == 'X')) //strike on next 2 shots
                score[i] = lastFrame + 30;
            else if (shot[2 * i + 2] == 'X') //one more strike after this
                score[i] = lastFrame + 20 + parseInt(shot[2 * i + 4]);
            else if (shot[2 * i + 3] == '/') //strike followed by a spare
                score[i] = lastFrame + 20;
            else //strike followed by an open
                score[i] = lastFrame + 10 + parseInt(shot[2 * i + 2]) + parseInt(shot[2 * i + 3]);
        } else if (shot[2 * i + 1] == '/') { //spare this frame
            if (shot[2 * i + 2] == 'X') //next shot is a strike
                score[i] = lastFrame + 20;
            else //next shot not a strike
                score[i] = lastFrame + 10 + parseInt(shot[2 * i + 2]);
        } else //open this frame
            score[i] = lastFrame + parseInt(shot[2 * i]) + parseInt(shot[2 * i + 1]);
        lastFrame = score[i];
    }
    //9th frame
    if (shot[16] == 'X') { //strike this frame
        if ((shot[18] == 'X') && (shot[19] == 'X')) //followed by 2 strikes in tenth
            score[8] = lastFrame + 30;
        else if (shot[18] == 'X') //followed by 1 strike in the tenth
            score[8] = lastFrame + 20 + parseInt(shot[19]);
        else if (shot[19] == '/') //followed by a spare in the tenth
            score[8] = lastFrame + 20;
        else //followed by an open in the tenth
            score[8] = lastFrame + 10 + parseInt(shot[18]) + parseInt(shot[19]);
    } else if (shot[17] == '/') { //spare this frame
        if (shot[18] == 'X') //followed by a strike in tenth
            score[8] = lastFrame + 20;
        else //followed by something else
            score[8] = lastFrame + 10 + parseInt(shot[18]);
    } else //open this frame
        score[8] = lastFrame + parseInt(shot[16]) + parseInt(shot[17]);
    lastFrame = score[8];
    //10th frame
    if (shot[18] == 'X') { //first shot is a strike
        if ((shot[19] == 'X') && (shot[20] == 'X')) //3 strikes in the tenth
            score[9] = lastFrame + 30;
        else if (shot[19] == 'X') //first 2 are strikes
            score[9] = lastFrame + 20 + parseInt(shot[20]);
        else if (shot[20] == '/') //one strike followed by a spare
            score[9] = lastFrame + 20;
        else //one strike followed by an open
            score[9] = lastFrame + 10 + parseInt(shot[19]) + parseInt(shot[20]);
    } else if (shot[19] == '/') { //first shot is a spare
        if (shot[20] == 'X') //spare followed by a strike
            score[9] = lastFrame + 20;
        else //spare followed by an open
            score[9] = lastFrame + 10 + parseInt(shot[20]);
    } else //open in the tenth
        score[9] = lastFrame + parseInt(shot[18]) + parseInt(shot[19]);
}

function print() {
    if (score[0]) {
        document.getElementById('score1').value = score[0]
    } else {
        document.getElementById('score1').value = ""
    };
    if (score[1]) {
        document.getElementById('score2').value = score[1]
    } else {
        document.getElementById('score2').value = ""
    };
    if (score[2]) {
        document.getElementById('score3').value = score[2]
    } else {
        document.getElementById('score3').value = ""
    };
    if (score[3]) {
        document.getElementById('score4').value = score[3]
    } else {
        document.getElementById('score4').value = ""
    };
    if (score[4]) {
        document.getElementById('score5').value = score[4]
    } else {
        document.getElementById('score5').value = ""
    };
    if (score[5]) {
        document.getElementById('score6').value = score[5]
    } else {
        document.getElementById('score6').value = ""
    };
    if (score[6]) {
        document.getElementById('score7').value = score[6]
    } else {
        document.getElementById('score7').value = ""
    };
    if (score[7]) {
        document.getElementById('score8').value = score[7]
    } else {
        document.getElementById('score8').value = ""
    };
    if (score[8]) {
        document.getElementById('score9').value = score[8]
    } else {
        document.getElementById('score9').value = ""
    };
    if (score[9]) {
        document.getElementById('score10').value = score[9]
    } else {
        document.getElementById('score10').value = ""
    };

    if (score[score.length - 1]) {
        document.getElementById('total').value = score[score.length - 1];
    } else {
        document.getElementById('total').value = "";
    };
}