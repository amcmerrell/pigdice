// Business Logic
var numberOfPlayers = 0;
var turn = 0;
var rollSuccess = true;
var players = [];

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

var createPlayers = function(){
  do{
    myPlayer = new Player("Player " + (numberOfPlayers+1));
    numberOfPlayers ++;
    players.push(myPlayer);
  }while(numberOfPlayers < 2);
}

var changeTurn = function(){
  $(".score").remove();
  updateScore();
  players[turn].turnTotal = 0;
  if ((turn+1) < players.length) {
    turn++;
  }
  else{
    turn = 0;
  }
}

var hold = function() {
  players[turn].scoreTotal += players[turn].turnTotal;
  changeTurn();
}

var win = function(){
  if(players[turn].scoreTotal + players[turn].turnTotal >= 20) {
    return true;
  }
  else {
    return false;
  }
}

var reset = function(){
  turn = 0;
  numberOfPlayers = 0;
  alert(players.length);
  for (var i = 0; i < players.length; i++) {
    delete players[i].nameOfPlayer;
    delete players[i].currentRoll;
    delete players[i].turnTotal;
    delete players[i].scoreTotal;
  }
  players = [];
}

// UI Logic
var updateScore = function(){
  for (i=0; i<players.length; i++) {
    $("#scoreboard").append("<li class = 'score'>" + players[i].nameOfPlayer + ": " + "Score: " +  players[i].scoreTotal + "</li>");
  }
}
$(document).ready(function() {

  $("#play").click(function() {
      createPlayers();
      $("#message").text("");
      $("#start").hide();
      $("#in-progress").fadeIn();
      updateScore();
      $("#roll").click(function(){
        // $("#message").text("");
        players[turn].roll();
        $("#roll-details").text(players[turn].nameOfPlayer + ": You Rolled a " + players[turn].currentRoll);
        rollSuccess = players[turn].evaluateRoll();
        $("#turn-details").text(players[turn].nameOfPlayer + ": Your turn total is: " + players[turn].turnTotal);
        if(!rollSuccess) {
          changeTurn();
          $("#message").text(players[turn].nameOfPlayer + "s Turn");
        }else if(win()){
          $("#message").text(players[turn].nameOfPlayer + " Wins!!!");
          $(".score").remove();
          $("#start").fadeIn();
          $("#in-progress").hide();
          $("#turn-details").text("");
          $("#roll-details").text("");
          reset();
        }
      });
      $("#hold").click(function(){
        if(rollSuccess){
          hold();
          $("#message").text(players[turn].nameOfPlayer + "s Turn");
        }
        else $("#message").text("You cant hold! You rolled a one!");
      });
  });
});
