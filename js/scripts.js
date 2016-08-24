// Business Logic
var numberOfPlayers = 0;
var playerArray = [];
var playerWins = false;

function Player(name, turnTotal, scoreTotal) {
  this.nameOfPlayer = name;
  this.turnTotal = turnTotal;
  this.scoreTotal = scoreTotal;
}

Player.prototype.roll = function(){
  var roll = Math.floor((Math.random() * 6) + 1);
  alert(this.nameOfPlayer + " you rolled a " + roll);
  if (roll !== 1) {
    this.turnTotal += roll;
    return false;
  } else {
    this.turnTotal = 0;
    return true;
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
var play = function(){
  do{
    var myPlayer = new Player("Player " + (numberOfPlayers+1),0,0);
    numberOfPlayers ++;
    playerArray.push(myPlayer);
  }while(numberOfPlayers < 2);

  do{
    for (var i = 0; i < playerArray.length; i++) {
      playerArray[i].turn();
      alert(playerArray[i].nameOfPlayer+ ": you scored: " + playerArray[i].scoreTotal);
      if (playerWins){
        console.log("Congratualtions Player " + playerArray[i].nameOfPlayer + " you win!!!");
        break;
      }
    }
  }while(!(playerWins));
}
// UI Logic
$(document).ready(function() {
 play();
});
