demo.GameOver = function(){};

demo.GameOver.prototype = {

  preload: function(){
    game.load.spritesheet('NextMissionButton', 'assets/images/nextMissionButton.png', 200, 50);
    game.load.spritesheet('RetryMissionButton', 'assets/images/retryMissionButton.png', 200, 50);    
    game.load.spritesheet('MainMenuButton', 'assets/images/MainMenuButton.png', 200, 50); 

  },


  create: function(){

    var statusText = null;
    var statusMessageText = null;
    var headerStyle = null;
    var nextActionButton = null;
    var currentGameLevel = gameResult.Level;
    var currentSatisfactionRate = gameResult.SatisfactionScore;

    // Hide the Top-menu at Start Screen
    document.getElementById("top-menu").style.display = 'none';
    game.stage.backgroundColor = 'black';

    // Set values for passed scenarios, and determine the top messages
    if(gameResult.Status == "passed"){
      // raise the level
      gameResult.Level++;
      
      // give bonus to satisfaciton
      gameResult.SatisfactionScore = gameResult.SatisfactionScore + (satisfactionRateScale * (satisfactionPoints.NextLevelBonus/100));
      if(gameResult.SatisfactionScore > satisfactionRateScale)
        gameResult.SatisfactionScore = satisfactionRateScale;

      statusText = "Mission Accomplished";
      statusMessageText = "You made it! Congrats you're selected for the next mission.";
      headerStyle =  { font: "40px Arial", fill: "#3CB371", align: "center", backgroundColor:null, fontWeight: "bold"};
    } 
    else 
    {
      // set the initial satisfaction value that the user had before he started the game and failed.
      gameResult.SatisfactionScore = gameResult.initialSatisfactionScore;
      statusText = "Mission Failed";

      if(gameResult.FailureReason == "fired"){
        statusMessageText = "You're fired! It's important to keep your boss always satisfied."; 
      }
      else if(gameResult.FailureReason == "boss-dead"){
        statusMessageText = "Your boss is dead.";
      }
      else if(gameResult.FailureReason == "player-dead"){
        statusMessageText = "You couldn't make it.";        
      }

      headerStyle =  { font: "40px Arial", fill: "#951717", align: "center", backgroundColor:null, fontWeight: "bold"};
    }

    // set the texts and buttons for Game success/failed and next missions/retry mission
    var text1 = game.add.text(game.world.centerX - 300, game.world.centerY - 340, statusText, headerStyle );
    var text2 = game.add.text(game.world.centerX - 300, game.world.centerY - 290, statusMessageText, { font: "25px Arial", fill: '#B2BABB' });

    // determine the buttons for passed and failure scenarios
    if(gameResult.Status == "passed"){
      var nextActionButton = game.add.button(game.world.centerX - 300, game.world.centerY - 230, 'NextMissionButton', StartGameOnClick, this, 2, 1, 0);
      var retryMissionButton = game.add.button(game.world.centerX - 300, game.world.centerY - 170, 'RetryMissionButton', retryCurrentMission, this, 2, 1, 0);      
    }
    else {
      var retryMissionButton = game.add.button(game.world.centerX - 300, game.world.centerY - 170, 'RetryMissionButton', retryFailedMission, this, 2, 1, 0);
    }

    var MainMenuButton = game.add.button(game.world.centerX - 300, game.world.centerY - 110, 'MainMenuButton', GameMenuOnClick, this, 2, 1, 0);


    // set the texts for performance report
    var report = "Performance Report  -  Mission " + currentGameLevel;
  	var satisfaction = "Boss Satisfaction: " + Math.round(currentSatisfactionRate * 100) + " %";
  	var enemiesKilled = "Total Enemies Killed: " + gameResult.EnemiesKilled + " / " + gameResult.EnemiesTotal;
  	var peopleKilled = "Total Civilians Killed: " + gameResult.PeopleKilled + " / " + gameResult.PeopleTotal;
    var bossHealth = "Boss Health: " + gameResult.BossHealth + " %";
    var playerHealth = "Player Health: " + gameResult.PlayerHealth + " %";

	  // add the performance report texts to the game page
    var reportStyle = { font: "25px Arial", fill: '#B2BABB' };
    var reportText = game.add.text(game.world.centerX - 300, game.world.centerY - 30, report, { font: "30px Arial", fill: '#FFFFFF' });
    var satisfactionText = game.add.text(game.world.centerX - 300, game.world.centerY + 25, satisfaction, reportStyle);    
    var bossHealthText = game.add.text(game.world.centerX - 300, game.world.centerY + 70, bossHealth, reportStyle);
    var playerHealthText = game.add.text(game.world.centerX - 300, game.world.centerY + 120, playerHealth, reportStyle);
    var enemiesKilledText = game.add.text(game.world.centerX - 300, game.world.centerY + 170, enemiesKilled, reportStyle);
    var civiliansKilledText = game.add.text(game.world.centerX - 300, game.world.centerY + 220, peopleKilled, reportStyle);

  },


  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      StartGameOnClick();
    }

  }


};
