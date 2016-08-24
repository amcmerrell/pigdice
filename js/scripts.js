// Business Logic
var numberOfPlayers = 0;
var playerArray = [];
var playerWins = false;
var started = false;
var turn = 0;

function Player(name) {
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
    }
    else {
      this.turnTotal = 0;
      alert(playerArray[turn].nameOfPlayer + " your turn is over!");
      changeTurn();
    }
}

Player.prototype.turn = function(){
  var stop = false;
  var rolledOne = false;
  do{
    rolledOne = this.roll();
    if ( !(rolledOne) && this.turnTotal < 20) {
      stop = confirm("Current turn total is:" + this.turnTotal + ". Would you like to roll again?");
    }else if(rolledOne) {
      console.log("You rolled a 1 too bad!")
    }
  }while((this.turnTotal < 20 && stop) && !(rolledOne));
  this.scoreTotal = this.turnTotal;
  if (this.scoreTotal >= 20) {
    playerWins = true;
  }
}
var createPlayers = function(){
  do{
    var myPlayer = new Player("Player " + (numberOfPlayers+1));
    numberOfPlayers ++;
    playerArray.push(myPlayer);
  }while(numberOfPlayers < 2);
}
var changeTurn = function(){
  $(".score").remove();
  updateScore();
  if ((turn+1) < playerArray.length) {
    turn++;
  }
  else{
    turn = 0;
  }
}

  // do{
  //   for (var i = 0; i < playerArray.length; i++) {
  //     playerArray[i].turn();
  //     alert(playerArray[i].nameOfPlayer+ ": you scored: " + playerArray[i].scoreTotal);
  //     if (playerWins){
  //       console.log("Congratualtions Player " + playerArray[i].nameOfPlayer + " you win!!!");
  //       break;
  //     }
  //   }
  // }while(!(playerWins));

// UI Logic
var updateScore = function(){
  for (i=0; i<playerArray.length; i++) {
    $("#scoreboard").append("<li class = 'score'>" + playerArray[i].nameOfPlayer + ": " + "Score: " +  playerArray[i].scoreTotal + "</li>")
  }
}
$(document).ready(function() {

  $("#play").click(function() {
    if(!started){
      createPlayers();
      updateScore();
      started = true;
      $("#roll").click(function(){
        if(!playerWins){
            playerArray[turn].roll();
            $("#roll-details").text(playerArray[turn].nameOfPlayer + ": You Rolled a " + playerArray[turn].currentRoll);
            playerArray[turn].evaluateRoll();
            $("#turn-details").text(playerArray[turn].nameOfPlayer + ": Your Turn total is: " +playerArray[turn].turnTotal);
        }
        else ("Start a new game!")
      });
      $("#hold").click(function(){
        if(!playerWins){


        }
        else ("Start a new game!")
      });
    }
    else alert("Game in progress");


  })

});
