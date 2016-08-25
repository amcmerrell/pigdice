// Business Logic
function Game(){
  this.numberOfPlayers = 0;
  this.turn = 0;
  this.players = [];
  this.winningNumber = 0;
  this.lastroll = true;
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
}

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
Game.prototype.updateScore = function(){
  $(".score").remove();
  for (i=0; i<this.players.length; i++) {
    $("#scoreboard").append("<div class = 'score'><strong>" + this.players[i].nameOfPlayer + "</strong> Score: " +  this.players[i].scoreTotal + "</div>").hide().fadeIn();
  }
}

Player.prototype.displayDie = function(){
  $(".die").hide();
  $("#number" + this.currentRoll).slideDown(50);
}

$(document).ready(function() {
  var myGame = new Game();
  $("form").submit(function(event) {
    event.preventDefault();
    var numberOfPlayers = parseInt($("#players").val());
    var winningNumber = parseInt($("#winning-number").val());
    myGame.winningNumber = winningNumber;
    for (var i = 0; i < numberOfPlayers; i++) {
      myGame.createPlayers();
    }
    $("#message").text("");
    $("#start").hide();
    $("#in-progress").fadeIn();
    $(".die").hide();
    myGame.updateScore();
  });
  $("#roll").click(function(){
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
  });
  $("#hold").click(function(){
    if(myGame.lastroll){
      myGame.hold();
      $("#message").text(myGame.players[myGame.turn].nameOfPlayer + "s Turn");
    }
    else $("#message").text("You cant hold! You rolled a one!");
  });
});
