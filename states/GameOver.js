demo.GameOver = function(){};

demo.GameOver.prototype = {

  preload: function(){
    //game.load.image('tree', 'assets/background/bgImage_InterSection.jpg');
  },


  create: function(){

    // Hide the Top-menu at Start Screen
    document.getElementById("top-menu").style.display = 'none';
  	
    game.stage.backgroundColor = '#696969';
 	console.log("GameOver state has started!");

    var text1 = game.add.text(game.world.centerX - 300, game.world.centerY - 240, 'Game Over!', { fill: '#8B0000' });
    var text2 = game.add.text(game.world.centerX - 300, game.world.centerY - 140, 'Press Enter to Go to the Game Menu', { fill: '#ffffff' });

    // text: values
	var Level = "Level: " + gameResult.Level;
  var Status = "Mission Status: " + gameResult.Status + " " + gameResult.FailureReason;  
	var satisfaction = "Boss Satisfaction: " + Math.round(gameResult.SatisfactionScore * 100) + " %";
	var enemiesKilled = "Total Enemies Killed: " + gameResult.EnemiesKilled + " / " + gameResult.EnemiesTotal;
	var peopleKilled = "Total Civilians Killed: " + gameResult.PeopleKilled + " / " + gameResult.PeopleTotal;
  var bossHealth = "Boss Health: " + gameResult.BossHealth + " %";
  var playerHealth = "Player Health: " + gameResult.PlayerHealth + " %";

	// add the texts to the game page
    var ResultText1 = game.add.text(game.world.centerX - 300, game.world.centerY - 70, Level, { fill: '#ffffff' });
    var ResultText2 = game.add.text(game.world.centerX - 300, game.world.centerY - 30, Status, { fill: '#ffffff' });

    var ResultText3 = game.add.text(game.world.centerX - 300, game.world.centerY + 30, satisfaction, { fill: '#ffffff' });    
    var ResultText5 = game.add.text(game.world.centerX - 300, game.world.centerY + 70, bossHealth, { fill: '#ffffff' });
    var ResultText6 = game.add.text(game.world.centerX - 300, game.world.centerY + 110, playerHealth, { fill: '#ffffff' });

    var ResultText7 = game.add.text(game.world.centerX - 300, game.world.centerY + 160, enemiesKilled, { fill: '#ffffff' });
    var ResultText8 = game.add.text(game.world.centerX - 300, game.world.centerY + 200, peopleKilled, { fill: '#ffffff' });

  },


  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){    
      GameMenuOnClick();
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
      gameResult.Level++;
	  StartGameOnClick();
    }
    else{

    }
  }


};
