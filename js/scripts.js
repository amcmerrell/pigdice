// Business Logic

function Game(){
  this.numberOfPlayers = 0;
  this.turn = 0;
  this.rollSuccess = true;
  this.players = [];
}

function Player(name,score) {
  this.nameOfPlayer = name;
  this.currentRoll = 0;
  this.turnTotal = 0;
  this.scoreTotal = 0;
}

Player.prototype.roll = function(){
  this.currentRoll = Math.floor((Math.random() * 6) + 1);
}

Player.prototype.evaluateRoll = function(){
  if (this.currentRoll !== 1) {
      this.turnTotal += this.currentRoll;
      return true;
    }
    else {
      this.turnTotal = 0;
      return false;
    }
}

Game.prototype.createPlayers = function(){
    var myPlayer = new Player("Player " + (this.numberOfPlayers+1));
    this.players.push(myPlayer);
    this.numberOfPlayers++;
}

Game.prototype.changeTurn = function(){
  $(".score").remove();
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
  if(this.players[this.turn].scoreTotal + this.players[this.turn].turnTotal >= 20) {
    return true;
  }
  else {
    return false;
  }
}

Game.prototype.resetGame = function(){
  this.turn = 0;
  this.rollSuccess = true;
  this.numberOfPlayers = 0;
  for (var i = 0; i < this.players.length; i++) {
    this.players[i].currentRoll = 0;
    this.players[i].turnTotal = 0;
    this.players[i].scoreTotal = 0;
  }
}

// UI Logic
Game.prototype.updateScore = function(){
  for (i=0; i<this.players.length; i++) {
    $("#scoreboard").append("<li class = 'score'>" + this.players[i].nameOfPlayer + ": " + "Score: " +  this.players[i].scoreTotal + "</li>");
  }
}
$(document).ready(function() {
  var myGame = new Game();
  $("#play").click(function() {
    for (var i = 0; i < 2; i++) {
      myGame.createPlayers();
    }
    $("#message").text("");
    $("#start").hide();
    $("#in-progress").fadeIn();
    myGame.updateScore();
  });
  $("#roll").click(function(){
    myGame.players[myGame.turn].roll();
    $("#roll-details").text(myGame.players[myGame.turn].nameOfPlayer + ": You Rolled a " + myGame.players[myGame.turn].currentRoll);
    myGame.rollSuccess = myGame.players[myGame.turn].evaluateRoll();
    $("#turn-details").text(myGame.players[myGame.turn].nameOfPlayer + ": Your turn total is: " + myGame.players[myGame.turn].turnTotal);
    if(!(myGame.rollSuccess)) {
      myGame.changeTurn();
      $("#message").text(myGame.players[myGame.turn].nameOfPlayer + "s Turn");
    }else if(myGame.win()){
      $("#message").text(myGame.players[myGame.turn].nameOfPlayer + " Wins!!!");
      $(".score").remove();
      $("#start").fadeIn();
      $("#in-progress").hide();
      $("#turn-details").text("");
      $("#roll-details").text("");
      myGame.resetGame();
    }
  });
  $("#hold").click(function(){
    if(myGame.rollSuccess){
      myGame.hold();
      $("#message").text(myGame.players[myGame.turn].nameOfPlayer + "s Turn");
    }
    else $("#message").text("You cant hold! You rolled a one!");
  });
});
