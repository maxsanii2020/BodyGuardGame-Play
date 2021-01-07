
/**** Game Scope Objects ****/
var demo = {};


var gameResult = {
  Level: 1,
  Score: 0,
  Status: null,
  FailureReason: null,
  gameTimeMin: 0,
  gameTimeSec: 0,
  TotalCreature: 0,
  EnemiesTotal: 0,
  EnemiesKilled: 0,
  PeopleTotal: 0,
  PeopleKilled: 0,
  SatisfactionScore: 0,
  BossHealth: 0,
  PlayerHealth: 0
};


demo.StartScreen = function(){};

demo.StartScreen.prototype = {

  preload: function(){

    game.load.image('StartScreenBG', 'assets/images/ScreenStartBG_Bodygaurd.jpg');
    game.load.spritesheet('StartGameButton', 'assets/images/startGameButtons.png', 200, 50);    
  },


  create: function(){
    // Hide the Top-menu at Start Screen
    document.getElementById("top-menu").style.display = 'none';
    //set background image
    game.add.image(0, 0, 'StartScreenBG');
    game.stage.backgroundColor = 'black';
    //  Just to kick things off
    var button = game.add.button(game.world.centerX - 500, game.world.centerY - 200, 'StartGameButton', StartGameOnClick, this, 2, 1, 0);

    //var text = game.add.text(50, 200, 'Click to start the game', { fill: '#ffffff' });
 	  console.log("state 0 has started!");
  },


  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){    
      StartGameOnClick();
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
      console.log("Up is entered!");
      gameResult.Level = 1;
      console.log("game level is: " + gameResult.Level);
      game.state.start('GameOver');
    }
    else{

    }
  }


};


/*************** Functions for Screen Menu *****************/

function StartGameOnClick () {
  console.log("Game has started!");
  resetGameValues();
  game.state.start('Game1');
}

function GameMenuOnClick () {
  game.state.start('StartScreen');
}

function resetGameValues(){
    gameResult.Score = 0;
    gameResult.Status = null;
    gameResult.FailureReason = null;
    gameResult.gameTimeMin = 0;
    gameResult.gameTimeSec = 0;    
    gameResult.TotalCreature = 0;
    gameResult.EnemiesTotal = 0;
    gameResult.EnemiesKilled = 0;
    gameResult.PeopleTotal = 0;
    gameResult.PeopleKilled = 0;
    gameResult.BossHealth = 0;
    gameResult.PlayerHealth = 0;
}
