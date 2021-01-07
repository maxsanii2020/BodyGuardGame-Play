var game = new Phaser.Game(1100, 800, Phaser.CANVAS);
game.state.add('StartScreen', demo.StartScreen);
game.state.add('Game1', demo.Game1);
game.state.add('GameOver', demo.GameOver);

game.state.start('StartScreen');