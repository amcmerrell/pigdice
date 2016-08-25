// Business Logic
function Game(){
  this.numberOfPlayers = 0;
  this.turn = 0;
  this.players = [];
  this.winningNumber = 0;
  this.lastroll = true;
  this.gameType = false;
}

function Player(name,score) {
  this.nameOfPlayer = name;
  this.currentRoll = 0;
  this.turnTotal = 0;
  this.scoreTotal = 0;
  this.rollSuccess = true;
}

Player.prototype.roll = function(){
  this.currentRoll = Math.floor((Math.random() * 6) + 1);
}

Player.prototype.evaluateRoll = function(){
  if (this.currentRoll !== 1) {
      this.turnTotal += this.currentRoll;
      this.rollSuccess = true;
    }
    else {
      this.turnTotal = 0;
      this.rollSuccess = false;
    }
}

Game.prototype.createPlayers = function(){
    var myPlayer = new Player("Player " + (this.numberOfPlayers+1));
    this.players[this.numberOfPlayers] = myPlayer;
    this.numberOfPlayers++;
}

Game.prototype.changeTurn = function(){
  this.updateScore();
  this.players[this.turn].turnTotal = 0;
  if ((this.turn+1) < this.players.length) {
    this.turn++;
  }
  else{
    this.turn = 0;
  }
  if(this.gameType && this.turn === 1){
    this.computerTurn();
  }
}

Game.prototype.computerTurn = function(){
  setTimeout(function() {
    if(roll()){
      setTimeout(function() {
        if(roll()){
          setTimeout(function() {
            hold();
          }, 1000);
        }
      }, 1000);
    }
  }, 1000);
}

//  var passing = true;
//   setInterval (function() {
//     if(passing){
//       passing = roll();
//     }else {
//       return;
//     }
//   }, 1000);
// }

Game.prototype.hold = function() {
  this.players[this.turn].scoreTotal += this.players[this.turn].turnTotal;
  this.changeTurn();
}

Game.prototype.win = function(){
  if(this.players[this.turn].scoreTotal + this.players[this.turn].turnTotal >= this.winningNumber) {
    return true;
  }
  else {
    return false;
  }
}

Game.prototype.resetGame = function(){
  this.turn = 0;
  this.lastroll = true;
  this.numberOfPlayers = 0;
  for (var i = 0; i < this.players.length; i++) {
    this.players.pop();
  }
}
// UI Logic

//callback function for roll click listener
function roll(){
  $("#message").text("");
  myGame.players[myGame.turn].roll();
  $("#roll-details").text(myGame.players[myGame.turn].nameOfPlayer);
  myGame.players[myGame.turn].displayDie();
  myGame.players[myGame.turn].evaluateRoll();
  myGame.lastroll = myGame.players[myGame.turn].rollSuccess;
  $("#turn-details").text(myGame.players[myGame.turn].nameOfPlayer + ": Your turn total is: " + myGame.players[myGame.turn].turnTotal);
  if(myGame.players[myGame.turn].rollSuccess === false) {
    myGame.changeTurn();
    $("#message").text(myGame.players[myGame.turn].nameOfPlayer + "s Turn");
  }else if(myGame.win()){
    $("#message").text(myGame.players[myGame.turn].nameOfPlayer +" rolled a " + myGame.players[myGame.turn].currentRoll + " and Wins!!!");
    $("#start").fadeIn();
    $("#in-progress").hide();
    $("#turn-details").text("");
    $("#roll-details").text("");
    myGame.resetGame();
  }
  return myGame.players[myGame.turn].rollSuccess;
}

//callback function for hold click listener
function hold(){
  if(myGame.lastroll){
    myGame.hold();
    $("#message").text(myGame.players[myGame.turn].nameOfPlayer + "s Turn");
  }
  else $("#message").text("You cant hold! You rolled a one!");
}

Game.prototype.createScoreBoard = function(){
    $(".score").remove();
  for (i=0; i<this.players.length; i++) {
    $("#scoreboard").append("<div class = 'score'><strong>" + this.players[i].nameOfPlayer + "</strong> Score: " + "<span id = 'score" + i + "'>" + this.players[i].scoreTotal + "</span></div>").hide().fadeIn();
  }
}

Game.prototype.updateScore = function(){
  for (i=0; i<this.players.length; i++) {
    $("#score"+i).text(this.players[i].scoreTotal);
  }
}

Player.prototype.displayDie = function(){
  $(".die").hide();
  $("#number" + this.currentRoll).slideDown(50);
}
var myGame = new Game();
$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var numberOfPlayers = parseInt($("#players").val());
    var winningNumber = parseInt($("#winning-number").val());
    var gametype = $("input:radio[name=GameType]:checked").val();
    myGame.winningNumber = winningNumber;

    if (gametype === "computer") {
      numberOfPlayers = 2;
      myGame.gameType = true;
    }

    for (var i = 0; i < numberOfPlayers; i++) {
      myGame.createPlayers();
    }

    $("#message").text("");
    $("#start").hide();
    $("#in-progress").fadeIn();
    $(".die").hide();
    myGame.createScoreBoard();

  });
  $("#roll").click(roll);
  $("#hold").click(hold);
});
