// Business Logic
function Player(name, turnTotal, scoreTotal) {
  this.name = name;
  this.turnTotal = turnTotal;
  this.scoreTotal = scoreTotal;
}

Player.prototype.roll = function(){
  var roll = Math.floor((Math.random() * 6) + 1);
  alert("you rolled" + roll);
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
      alert("You rolled a 1 too bad!")
    }
  }while((this.turnTotal < 20 && stop) && !(rolledOne))
  this.scoreTotal = this.turnTotal;
}

Player.prototype.rollOne = function(){

  if (this.roll() === 1) {
    this.turnTotal = 0;
  } else {
    this.roll()
  }
}

var myPlayer = new Player("Player 1",0,0);
myPlayer.turn();
console.log("You scored: " + myPlayer.scoreTotal);
// UI Logic
$(document).ready(function() {

});
