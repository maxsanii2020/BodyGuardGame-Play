
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
  initialSatisfactionScore: 0,
  BossHealth: 0,
  PlayerHealth: 0
};

var gameOverMusic_audio;

demo.StartScreen = function(){};

demo.StartScreen.prototype = {

  preload: function(){

    // Hide the Top-menu at Start Screen
    document.getElementById("top-menu").style.display = 'none';

    //game.load.image('StartScreenBG', 'assets/images/ScreenStartBG_Bodygaurd.jpg');
    game.load.image('GameMenu_bg', 'assets/images/gameMenu_bg.jpg');
    game.load.spritesheet('StartGameButton', 'assets/images/startGameButtons-colored.png', 200, 50);
    game.load.spritesheet('TutorialButton', 'assets/images/tutorialButton.png', 200, 50);
    game.load.spritesheet('FeedbackButton', 'assets/images/feedbackButton.png', 200, 50);
    game.load.spritesheet('AboutButton', 'assets/images/aboutButton.png', 200, 50);
    game.load.spritesheet('StartNextMissionMainMenuButton', 'assets/images/startNextMissionMainMenuButton.png', 200, 50);
    game.load.spritesheet('StartFirstMissionButton', 'assets/images/startFirstMissionButton.png', 200, 50);
    game.load.image('background-black', 'assets/background/background_black.png');
    game.load.audio('gameOverMusic', 'assets/audio/SoundEffects/NewSoundEffects/Music/gameOver_music_happy.mp3');

    //test
    game.load.image('loadingBar', 'assets/images/loading_bar.png');

  },


  create: function(){

    // get the audio for game over
    gameOverMusic_audio = game.add.audio('gameOverMusic');

    //set background image
    game.add.image(0, 0, 'GameMenu_bg');
    game.stage.backgroundColor = 'black';

    // stop all sounds
    game.sound.stopAll();

    //  Just to kick things off
    if(gameResult.Level == 1){
      var gameStartButton = game.add.button(game.world.centerX - 500, game.world.centerY - 200, 'StartGameButton', StartGameOnClick, this, 2, 1, 0);
    } else {
      var gameNextMissionButton = game.add.button(game.world.centerX - 500, game.world.centerY - 260, 'StartNextMissionMainMenuButton', StartGameOnClick, this, 2, 1, 0);
      var gameRestartButton = game.add.button(game.world.centerX - 500, game.world.centerY - 200, 'StartFirstMissionButton', restartMissionOne, this, 2, 1, 0);    
    }

    var tutorialButton = game.add.button(game.world.centerX - 500, game.world.centerY - 140, 'TutorialButton', StartGameOnClick, this, 2, 1, 0);
    var feedbackButton = game.add.button(game.world.centerX - 500, game.world.centerY - 80, 'FeedbackButton', StartGameOnClick, this, 2, 1, 0);
    var aboutButton = game.add.button(game.world.centerX - 500, game.world.centerY - 20, 'AboutButton', StartGameOnClick, this, 2, 1, 0);


  },


  update: function(){

    if(!gameOverMusic_audio.isPlaying)
      gameOverMusic_audio.fadeIn(3000, true);


    if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){       
      StartGameOnClick();
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.C))
    {

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

// user passed for next mission, but retries current mission
function retryCurrentMission() {
    gameResult.Level--;
    gameResult.SatisfactionScore = gameResult.initialSatisfactionScore;
    StartGameOnClick();
}

function retryFailedMission() {
    gameResult.SatisfactionScore = gameResult.initialSatisfactionScore;
    StartGameOnClick();
}

function restartMissionOne () {
  gameResult.Level = 1;
  StartGameOnClick();
}

// reset all gameResult properties except .level
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
