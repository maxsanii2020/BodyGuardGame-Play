var demo = {};
demo.state0 = function(){};

demo.state0.prototype = {

  preload: function(){
    //game.load.image('tree', 'assets/background/bgImage_InterSection.jpg');
  },


  create: function(){
    game.stage.backgroundColor = '#800080';
 	console.log("state 0 has started!");
  },


  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
 		console.log("Right is entered!");
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

    }
    else{

    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
 		console.log("Up is entered!");
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){

    }
  }


};