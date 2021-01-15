//var game = new Phaser.Game(1100, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

demo.Game1 = function(){

};


// gameplay collections
var creatureWaitingList = [];
var people = [];
var allCollideSpritesGroup;
var peopleSelectionRanges = [];
var enemySelectionRanges = [];

//Main Sprite vars
var player;
var boss;

// extra sprites
var sprite_group;
var girl_sprite;
var singleEnemy;
var testSprite;
var walkingGuy;
var weapon;
var weaponEnemy;
var mysprite;
var myTestSprite1;
var myTestSprite2;

// general variables (these global variables retain their changed values in a new level, so make sure you reset them in game_config.js if they're not fixed)
var fireButton;
var counter = 0;
var cursors;
var controlKey;
var crowd_mood="happy";
var crowdCurrentSpeedMode="safe";
var textTemp;
var bossIsDead = false;
var playerBullets;
var enemyBullets;
var satisfactionBar;
var satisfactionRateScale = 1.0;
var satisfactionRate = satisfactionRateScale;
var satisfactionLastRate = 1.0;
var nextUpdateHealthbar = 0;
var updateHealthbarRate = 300;
var stopToleranceThreshold = 2;
var stopCount = 0;
var nextMakeSomeoneRunTime = 0;
var nextCheckGreetingStatus = 0;
var checkGreetingStatusRate = 4000;
var nextBossMoveTime = 0;
var bossMoveDelayRate = 6000;
var wasBossOnSide = false;
var peopleCountGreeting = 0;


// Shooting/Safe mode variables
var checkIsEnemgyShootingRate = 1500;
var nextCheckIsEnemgyShooting = 0;
var checkIsPlayerShootingRate = 1500;
var nextCheckIsPlayerShooting = 0;
var nextCheckSafeMode = 0;
var checkSafeModeRate = 7000;
var nextRunShootingStatus = 0;
var runShootingStatusRate = 330;


// flags/ health-time thresholds
var currentTimeMin;
var currentTimeSeconds;
var halfHealthThreshold;
var lowHealthThreshold;
var highHealthThreshold;
var halfSatisfactionThreshold;
var lastQuarterSatisfactionThreshold;
var lowSatisfactionThreshold;
var highSatisfactionThreshold;
var lastQuarterTimeSec;
var firstQuarterTimeMin;
var firstQuarterTimeSec;
var halfGameTimeMin;
var halfGameTimeSec;

var playerCollideBossCount = 0;
var bossComplainCollidingNum = 100;
var isPlayerShooting = false;
var isEnemyShooting = false;
var isSafeMode = true;
var isWaitingForSafeMode = false;
var prevIsSafeMode = true;


// audio var
var pistol_shot_audio;
var pistol_shot_2_audio;
var machinegun_1_audio;
var RPG_shot_audio;
var death_man_audio;
var death_man_2_audio;
var death_female_audio;
var cop_voice_stop_audio;
var bulletHitBody_audio;
var crowdLongCheering_audio;
var crowdPanicedLong_Audio;
var crowdPanicedManScreem_Audio;
var crowdPanicedFemaleScreem_Audio;
var gameMusic_audio;
var policeAlarm_audio;
var missionAccomplished_audio;
var DTO = {};



demo.Game1.prototype = {

// preload stage
preload: function() {

    // pre-loading bar image
    //game.load.image('loading_bar', 'assets/images/loading_bar.png');
    //game.load.image('mission-accomplished', 'assets/images/missionAccomplished.png');
    //var loadingBar = game.add.sprite(300, 300, 'mission-accomplished');
    var styleTest = { font: "40px Arial", fill: "#FFFFFF", align: "center", backgroundColor:null, fontWeight: "bold"};
    var sampleTextt = game.add.text(this.game.world.centerX-200, this.game.world.centerY-100, 'Loading...', styleTest);

    /*this.loadingBar = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading_bar');
    this.loadingBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.loadingBar);
    */

    // Game config
    game.load.script( 'game_config', 'game_config.js');
    // Sprite config
    game.load.script( 'sprites_config', 'sprites config.js');  
    // Message config
    game.load.script( 'message_config', 'message_config.js');

    //images
    game.load.image('street', 'assets/background/bgImage_InterSection.jpg');
    game.load.image('mission-accomplished', 'assets/images/missionAccomplished.png');
    game.load.image('bullet', 'assets/sprites/shmup-bullet.png');
    game.load.image('bullet-RPG', 'assets/sprites/RPG-bullet.png');
    game.load.image('gunMan', 'assets/sprites/gunMan.png');
    game.load.image('figure_man', 'assets/sprites/figure_man_small.png');
    game.load.image('badman', 'assets/sprites/badman.png');
    game.load.image('boy', 'assets/sprites/regularGuy_resized.png');
    game.load.image('officeGuy', 'assets/sprites/youngGuy_walk.png');
    //param: width of the single image (image width/number of frames in a col), height of the single image (image height/number of frames in a row), number of images in that spreadsheet    
    game.load.spritesheet('girl', 'assets/spritesheets/girl_spritesheet.png', 95, 130, 21);
    //game.load.spritesheet('simpleGirl', 'assets/spritesheets/girl_spritesheet_new.png', 95, 130, 25);

    game.load.spritesheet('walkingGuy', 'assets/spritesheets/regularGuy_walk.png', 256, 192, 16);

    // JSONHash spritesheets
    game.load.atlasJSONHash('AllCharacters', 'assets/spritesheets/AllCharacters.png', 'assets/spritesheets/AllCharacters.json');


    /**************************** audio **********************************/
    //Guns
    game.load.audio('pistol_shot', 'assets/audio/SoundEffects/NewSoundEffects/Guns/gunshot_300mm.mp3');
    game.load.audio('pistol_shot_2', 'assets/audio/SoundEffects/NewSoundEffects/Guns/pistol_shot.mp3');
    game.load.audio('machinegun_1', 'assets/audio/SoundEffects/NewSoundEffects/Guns/MP5.mp3');
    game.load.audio('RPG_1', 'assets/audio/SoundEffects/NewSoundEffects/Guns/RPG.mp3');    
    //Screems  
    game.load.audio('death_man', 'assets/audio/SoundEffects/NewSoundEffects/Screams/death_man.mp3');
    game.load.audio('death_man_2', 'assets/audio/SoundEffects/NewSoundEffects/Screams/death_Screem.mp3');
    game.load.audio('death_female', 'assets/audio/SoundEffects/NewSoundEffects/Screams/Scream-Female-2.mp3');
    game.load.audio('cop_voice_stop', 'assets/audio/SoundEffects/NewSoundEffects/Screams/stop-voice.mp3');
    //Crowd        
    game.load.audio('bulletHitBody', 'assets/audio/SoundEffects/NewSoundEffects/Guns/bulletHitBody.mp3');
    game.load.audio('crowd_long_cheering', 'assets/audio/SoundEffects/NewSoundEffects/Crowd/Z_crowd_long_cheering.mp3');
    game.load.audio('crowdPaniced_long', 'assets/audio/SoundEffects/NewSoundEffects/Crowd/crowd-panic-long-edited.mp3');
    game.load.audio('crowdPanicedManScreem', 'assets/audio/SoundEffects/NewSoundEffects/Crowd/crowd_panic_manScreems.mp3');
    game.load.audio('crowdPanicedFemaleScreem', 'assets/audio/SoundEffects/NewSoundEffects/Crowd/crowd_panic_femaleScreems.mp3');

    // Music/Effects
    game.load.audio('mission-accomplished', 'assets/audio/SoundEffects/NewSoundEffects/Effects/Success.mp3');
    game.load.audio('police-alarm', 'assets/audio/SoundEffects/NewSoundEffects/Crowd/Police_sound.mp3');    
    game.load.audio('gameMusic', 'assets/audio/SoundEffects/NewSoundEffects/Music/game_music_soft_tensionTone.mp3');

    /*
    var i;
    for (i = 0; i < 1000000; i++) {
        console.log("number: " + i);
    }
    */

},


create: function() {

    /******* Notes **************/

    //for some reason, this doesn't work in create funtion: mysprite = game.add.sprite(300, 300, 'boy');
    //but you still can use that in the update function, and it does create the sprite, I don't know why, maybe because of the class design that I have
    // for now, use the classes for creating sprite

    /****************************/

    // stop all sounds from gameMenu and gameOver
    stopAllSounds();

    // set game level properties
    setGameLevelProperties(gameResult.Level);

    // Hide the Top-menu at Start Screen
    document.getElementById("top-menu").style.display = 'block';

    // Resize our game world to be a 2000 x 2000 square
    //game.world.setBounds(0, 0, 1100, 800);
    game.world.setBounds(0, 0, 1100, window.innerHeight-110);

    // set background image
    game.add.image(0, 0, 'street');

    // Create and initialize the top menu elements
    initializeTopMenuValues();

    // load the people/enemy range arrays
    insertCharactersRanges();

    // set default value for DTO
    DTO["PeopleRushSpeed"] = 0;

    //audio
    pistol_shot_audio = game.add.audio('pistol_shot');
    pistol_shot_2_audio = game.add.audio('pistol_shot_2');
    machinegun_1_audio = game.add.audio('machinegun_1');
    RPG_shot_audio = game.add.audio('RPG_1');
    death_man_audio = game.add.audio('death_man');
    death_man_2_audio = game.add.audio('death_man_2');
    death_female_audio = game.add.audio('death_female');
    cop_voice_stop_audio = game.add.audio('cop_voice_stop');
    bulletHitBody_audio = game.add.audio('bulletHitBody');
    crowdLongCheering_audio = game.add.audio('crowd_long_cheering');
    crowdPanicedLong_Audio = game.add.audio('crowdPaniced_long');
    crowdPanicedManScreem_Audio = game.add.audio('crowdPanicedManScreem');
    crowdPanicedFemaleScreem_Audio = game.add.audio('crowdPanicedFemaleScreem');    
    missionAccomplished_audio = game.add.audio('mission-accomplished');
    policeAlarm_audio = game.add.audio('police-alarm');
    gameMusic_audio = game.add.audio('gameMusic');


    //  Being mp3 files these take time to decode, so we can't play them instantly
    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
    //  The audio files could decode in ANY order, we can never be sure which it'll be.
    //game.sound.setDecodedCallback([explosion, sword, blaster], start, this);
    game.sound.setDecodedCallback([pistol_shot_audio, pistol_shot_2_audio, machinegun_1_audio, death_man_audio, death_female_audio, bulletHitBody_audio, crowdLongCheering_audio, crowdPanicedLong_Audio, crowdPanicedManScreem_Audio, crowdPanicedFemaleScreem_Audio, cop_voice_stop_audio, gameMusic_audio], start, this);

    /******************************* Weapon *********************************************/
    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(20, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 1500;

    //  Speed-up the rate of fire, the higher number, the slower rate
    weapon.fireRate = 400;


    weaponEnemy = game.add.weapon(20, 'bullet');
    weaponEnemy.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weaponEnemy.bulletSpeed = 1500;
    weaponEnemy.fireRate = 100;


    /************************************************************************************/

    /******************************* BGsprite - sprite ************************************/
  
    //  The player bullet group
    playerBullets = game.add.group();
    playerBullets.enableBody = true;
    playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    playerBullets.createMultiple(100, 'bullet');
    
    playerBullets.setAll('anchor.x', 0.5);
    playerBullets.setAll('anchor.y', 0.5);
    playerBullets.setAll('outOfBoundsKill', true);
    playerBullets.setAll('checkWorldBounds', true);

    player = new CreatePlayerSprite(1, 400, 300, game, playerBullets,'gunMan');

    /******************************* Enemies Bullet ************************************/

    //  The enemies bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');
    
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);


    /******************************* Boss - Sprite ************************************/
    
    boss = new CreateBossSprite(1, 700, 400, game,'figure_man');
    
    /******************************* People Group ************************************/

    allCollideSpritesGroup = game.add.group();

    /************************************************************************************/

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(player.sprite, 35, 30, true);
    //weaponEnemy.trackSprite(testSprite.sprite, 35, 30, true);

    cursors = this.input.keyboard.createCursorKeys();
    controlKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

    //name the keyboard keys
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


    gameMusic_audio.play();


    /************** Test ******************************/
    /*
    myTestSprite1 = new CreateTestSprite(1000, 400, 400, game, enemyBullets,'SecurityPolice', 'StatePolice_Walk_000.png');
    myTestSprite1.sprite.scale.setTo(0.11,0.11);
    myTestSprite1.sprite.anchor.set(.50);
    myTestSprite1.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('security_police_Walk_', 1, 8, '.png', 3), 12, true,false);
    myTestSprite1.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('security_police_attack_', 1, 6, '.png', 3), 7, false,false);   
    myTestSprite1.sprite.animations.play('attack');

    // x,y starts from the most top left side of the sprite, so you have to add to x and y to bring it to the center. Test it in the develper Tool first.
    weaponEnemy.trackSprite(myTestSprite1.sprite, 86, 63, true);
    */

    /**************************************************/

},

update: function() {

    /********** Test Weapon **************/
    //myTestSprite1.attack();
    /*************************************/

    // Update the top menu values
    updateTopMenuValues(player.health, boss.health);

    if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(player.sprite.rotation, 300, player.sprite.body.acceleration);

    }
    else if (cursors.down.isDown) {
        game.physics.arcade.accelerationFromRotation(player.sprite.rotation, -300, player.sprite.body.acceleration);
    }
    else {
        player.sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown) {
        player.sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown) {
        player.sprite.body.angularVelocity = 300;
    }
    else {
        player.sprite.body.angularVelocity = 0;
    }

    // on control key pressed, play stop audio.
    if(controlKey.isDown && gameConfig.nextStopCommandTime < game.time.now){      
        cop_voice_stop_audio.play();
        gameConfig.nextStopCommandTime = game.time.now + 800;
        gameConfig.isStopKeyPressed = true;
        handleStopCommand();
    }else{
        gameConfig.isStopKeyPressed = false;
    }

    if (fireButton.isDown) {
        pistol_shot_audio.play();
        weapon.fire();
        isPlayerShooting = true;
        nextCheckIsPlayerShooting = this.game.time.now + checkIsPlayerShootingRate;        
        crowd_mood = "scared";
        DTO["PeopleRushSpeed"] = 1;
    }

    // create enemies/people at specified interval time
    populateCreatures();

    // handle collision
    //handleAllCollisions(player.sprite);
    //handleAllCollisions(boss.sprite);
    game.physics.arcade.collide(player.sprite, boss.sprite);
    game.physics.arcade.collide(player.sprite, allCollideSpritesGroup);
    game.physics.arcade.collide(boss.sprite, allCollideSpritesGroup);
    
    // handle the event when player hit the boss
    boss.sprite.body.onCollide = new Phaser.Signal();
    boss.sprite.body.onCollide.add(bossCollideSprite, this);

    // handle bullets overlaping and triggering Update method on each person
    handleUpdatesAndBulletOverlap();

    // set the flags for safe mode, and player/enemy shooting
    checkShootingStatus();

    // make someone run randomly every once a while
    makeSomeoneRun();

    // apply changes based on crowd mode
    monitorCrowdMode();


    // remove the dead sprites from allCollideSprites
    /*for(var i=0; i<allCollideSprites.length; i++){

        if (allCollideSprites[i].alive == false){
            allCollideSprites.splice(i, 1);
            i = i-1;
            console.log("removed sprite: " + i);
        }
        else if (boss.sprite != allCollideSprites[i]){    
           game.physics.arcade.overlap(boss.sprite, allCollideSprites[i], touchedBoss, null, this); 
        }
    }*/

    game.world.wrap(player.sprite, 16);

    if (crowd_mood == "scared" || isSafeMode == false) {

    }


    if(!boss.sprite.alive){
        gameOver("boss-dead");
        bossIsDead = true;
    }


    /**************** Testing Tool ***************/
    if(game.input.keyboard.isDown(Phaser.Keyboard.Z)){       
        missionCompleted(); 
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.X))
    {
        gameOver("player-dead");
    }
    /**********************************************/

},//end of Update


render: function() {

    weapon.debug();
    var text = "Total People:" + (gameResult.EnemiesTotal + gameResult.PeopleTotal) + ", People: " + gameResult.PeopleTotal + ", Enemies: " + gameResult.EnemiesTotal; 
    game.debug.text(text, 10, 80);

}


};




/*************************************************************************************************/
/*                                      CUSTOM FUNCTIONS                                         */
/*************************************************************************************************/


/*********************************************************************************************/
/******************************* Boolet hit Events *******************************************/

function hitEnemy(badman_sprite, weapon) {
    badman_sprite.kill();
    bulletHitBody_audio.play();
    death_man_audio.play();
    weapon.kill();
    //badman_spritee.body.angularVelocity = 300;
}


function bossCollideSprite(bossSprite, sprite2) {

    if(sprite2.name == "Player"){
        
        playerCollideBossCount++;

        if(playerCollideBossCount > bossComplainCollidingNum) {
            flags.bossComplainHitting = true;
            playerCollideBossCount = 0;
            updateSatisfaction("deduct", satisfactionPoints.bossComplainPushing);
        }
    }
}


function bulletHitPlayer (sprite, bullet) {

    // tip: bullet comes here as Phaser.Bullet object
    bullet.kill();
    var bulletType = bullet.key;

    var destroyed = player.damage(bulletType);

    if (destroyed)
    {
        //console.log("player is dead!");
        gameOver("player-dead");
    } 
}

function bulletHitPeople (PeopleSprite, bullet) {

    bullet.kill();
    var bulletType = bullet.key;

    if(PeopleSprite.alive)
    {
        var destroyed = people[PeopleSprite.name].damage(bulletType);

        if (destroyed)
        {

        }       
    }

    if(people[PeopleSprite.name].currentAnimation != "attack")
    {
        flags.randomPersonGotHit = true;
    }
}

function bulletHitBoss (sprite, bullet) {

    flags.bossGotHitbyEnemy = true;
    updateSatisfaction("deduct", satisfactionPoints.enemyBulletHitBoss);

    bullet.kill();
    var bulletType = bullet.key;

    var destroyed = boss.damage("", bulletType);

    if (destroyed)
    {
        //console.log("Boss is dead!");
        gameOver("boss-dead");
    } 
}


function playerBulletHitBoss (sprite, bullet) {

    flags.bossGotHitbyPlayer = true;

    updateSatisfaction("deduct", satisfactionPoints.playerBulletHitBoss);

    bullet.kill();
    var bulletType = bullet.key;

    var destroyed = boss.damage(player.sprite.name, bulletType);

    if (destroyed)
    {
        //console.log("Boss is dead by Player!");
        gameOver("boss-dead");
    } 
}


function handleStopCommand() {

    if(!isEnemyShooting)
        stopCount++;

    if (stopToleranceThreshold <= stopCount){
        stopCount = 0;
        updateSatisfaction("deduct", satisfactionPoints.bossCompalinStopping);
        flags.bossComplainStopping = true;
    }
}


function touchedBoss(boss, collided_sprite) {
    //collided_sprite.x = collided_sprite.x - 20;
    //weaponEnemy.fire();
}

/*********************************************************************************************/


/*********************************************************************************************/
/******************************* Create/Populate people **************************************/

function populateCreatures() {

    // create a new enemy/people at every specified time interval
    if(game.time.now >= gameConfig.creationTime && gameConfig.creatureCount < gameConfig.creatureTotal){

        createRandomCreature();
        gameConfig.creatureCount++;
        gameConfig.creationTime = game.time.now + gameConfig.nextCreationTime;
    }

    // release a creature in the waiting list at every specified time interval
    if(game.time.now >= gameConfig.nextEntranceTime && creatureWaitingList.length != 0){


        //console.log("Release an object....game time now:" + game.time.now + " , next Entrance Time: " + gameConfig.nextEntranceTime);
        var creatureObj = creatureWaitingList.shift();

        // if the creature is new and hasn't been populated yet, add it to enemies/people list
        if(creatureObj.isPopulated == false){

            creatureObj.isPopulated = true;

            if(creatureObj.isEnemy == true)
            {
                people.push(creatureObj);
                //console.log("enemy is pushed!");
            }else{
                people.push(creatureObj);
                //console.log("people is pushed!");
            }
        }


        // reset the sprite's arcade properties, and then set its coordination
        creatureObj.sprite.reset(-200, game.math.between(50, game.world.height-100));
        creatureObj.isInsidetheWorld = true;
        
        gameConfig.nextEntranceTime = game.time.now + gameConfig.entranceWaitingTime;
    }    
}

function createRandomCreature() {

    var newCreature;
    var index = gameConfig.creatureCount;

    if(Math.random() < gameConfig.EnemyCreationChance)
    {
        let peopleType = selectEnemy();
        newCreature = new CreatePeopleSprite(true, peopleType, index, game, player.sprite, 0, 0);
        gameResult.EnemiesTotal++;
    }
    else
    {
        let peopleType = selectPeople();
        newCreature = new CreatePeopleSprite(false, peopleType, index, game, player.sprite, 0, 0);
        gameResult.PeopleTotal++;      
    }

    creatureWaitingList.push(newCreature);
    allCollideSpritesGroup.add(newCreature.sprite);
} 


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// select a random person based on their chances
function selectPeople() {
    let min = 1;
    let max = peopleSelectionRanges[peopleSelectionRanges.length-1].max;
    let selectedNum = game.math.between(min, max);

    let character = peopleSelectionRanges.find(x => x.min <= selectedNum && x.max >= selectedNum);

    return character.personTypeId;
}

// select a random enemy based on their chances
function selectEnemy() {
    let min = 1;
    let max = enemySelectionRanges[enemySelectionRanges.length-1].max;
    let selectedNum = game.math.between(min, max);

    let character = enemySelectionRanges.find(x => x.min <= selectedNum && x.max >= selectedNum);

    return character.personTypeId;
}

// load the arrays of peopleSelectionRanges and enemySelectionRanges
function insertCharactersRanges() {
    let newObj;
    let max_people = 0;
    let max_enemy = 0;

    for(let i=0; i < characters.length; i++){

        let min_people = max_people + 1;
        let min_enemy = max_enemy + 1;

        // Enemy
        max_enemy = max_enemy + characters[i].enemyChance;
        newObj = new characterRangeObj(characters[i].personType, min_enemy, max_enemy);
        enemySelectionRanges.push(newObj);

        // People
        max_people = max_people + characters[i].peopleChance;
        newObj = new characterRangeObj(characters[i].personType, min_people, max_people);
        peopleSelectionRanges.push(newObj);
    }
}

/**************************************************************************************************/



//this is being used for the audio defaut function
function start() {

}


function handleUpdatesAndBulletOverlap() {

    // update the boss' movements
    boss.update();

    // handle player's bullets hit the boss
    game.physics.arcade.overlap(weapon.bullets, boss.sprite, playerBulletHitBoss, null, this);
   
    for (var i = 0; i < people.length; i++)
    {
        if (people[i].alive)
        {   
            // handle player bullets hit any person                 
            game.physics.arcade.overlap(weapon.bullets, people[i].sprite, bulletHitPeople, null, this);

            // handle enemy's bullets hit player and boss
            if(people[i].enemyWeapon != null){
                if(people[i].enemyWeapon.shots > 0){
                    game.physics.arcade.overlap(people[i].enemyWeapon.bullets, player.sprite, bulletHitPlayer, null, this);
                    game.physics.arcade.overlap(people[i].enemyWeapon.bullets, boss.sprite, bulletHitBoss, null, this);                    
                }
            }

            // trigger update method on each person
            people[i].update();
        }      
    }

}


function gameOver(reason){

    // if mission is accomplished already, don't do anything
    if(gameConfig.isMissionCompleted || gameConfig.isGameOver) {
        return;
    }

    gameConfig.isGameOver = true;
    var message;

    switch(reason) {
      case "boss-dead":
        message = "BOSS IS DEAD!";
        break;
      case "player-dead":
        message = "YOU DIED!";
        break;
      case "fired":
        message = "YOU'RE Fired!";
        break;        
      default:
        message = "";
    }

    saveGameResultValues("failed", reason);

    //var styleGameOver = { font: "60px Arial", fill: "#951717", align: "center", backgroundColor:null, fontWeight: "bold"};
    //var timerText = game.add.text(game.world.centerX-150, game.world.centerY-100, 'GAME OVER', styleGameOver);

    var styleMessage = { font: "60px Arial", fill: "#951717", align: "center", backgroundColor:null, fontWeight: "bold"};
    var timerTextMessage = game.add.text(game.world.centerX-160, game.world.centerY-100, message, styleMessage);

    // stop all the sounds
    game.time.events.add(5000, stopAllSounds, this);

    game.time.events.add(5000, StartStateGameOver, this);
}


function missionCompleted(){

    // if game is over already, don't do anything
    if(gameConfig.isGameOver) {
        return;
    }

    game.time.events.add(5000, stopAllSounds, this);

    gameConfig.isMissionCompleted = true;   

    saveGameResultValues("passed", null);

    missionAccomplished_audio.play();
    var timerText = game.add.image(game.world.centerX, game.world.centerY, 'mission-accomplished').anchor.set(0.5);

    game.time.events.add(5000, StartStateGameOver, this);    
}

function stopAllSounds() {
    // stop the long audios, the audio may have been playing from the last level.
    /*
    crowdLongCheering_audio.stop();
    crowdPanicedLong_Audio.stop();
    gameMusic_audio.stop();
    crowdPanicedManScreem_Audio.stop();
    crowdPanicedFemaleScreem_Audio.stop();
    */

    game.sound.stopAll();
}


function StartStateGameOver(){
    game.state.start('GameOver');   
}


function saveGameResultValues(status, failureReason) {

    gameResult.Status = status;
    gameResult.FailureReason = failureReason;
    gameResult.gameTimeMin = currentTimeMin;
    gameResult.gameTimeSec = currentTimeSeconds;    
    gameResult.SatisfactionScore = satisfactionRate;
    gameResult.BossHealth = boss.health;
    gameResult.PlayerHealth = player.health;
}



/*********************************************************************************************/
/******************************* Check Shooting/Safe mode ************************************/

// monitor the safe mode and make the respective changes.
function monitorCrowdMode() {
    // don't execute if game is over
    if(gameConfig.isMissionCompleted || gameConfig.isGameOver)
        return;

    // Mode changes to Safe
    if (isSafeMode && crowdCurrentSpeedMode == "scared") 
    {
        crowdCurrentSpeedMode = "safe";

        stopCrowdPaniced(2000);

        // play game music
        setTimeout(function() { if(isSafeMode == true){ gameMusic_audio.fadeIn(2000, true); } }, 4000);
    }
    // Mode changes to Not Safe
    else if (!isSafeMode && crowdCurrentSpeedMode == "safe")
    {        
        // delay from shooting till people get scared
        setTimeout(function() { makeScaredPeopleRun(); }, 500);

        // delay from shooting till people get started to walk
        setTimeout(function() { makeScaredPeopleStopGreeting(); }, 500);

        // stopping the crowd cheering
        crowdLongCheering_audio.fadeOut(3000);

        // stopping the game music
        gameMusic_audio.fadeOut(2000);

        // play paniced crowd sound
        setTimeout(function() { if(isSafeMode == false){ playCrowdPaniced(1000); } }, 1000);

        crowdCurrentSpeedMode = "scared";        
    }
    // play people cheering when it's safe and count goes up.
    else if(isSafeMode && crowdCurrentSpeedMode == "safe") {

        // determine the count of greeting people and increase satisfaction
        increaseSatisfactionByGreeting(); 

        // play/stop the cheering crowd
        if(peopleCountGreeting >= 2 && !crowdLongCheering_audio.isPlaying)
        {
            setTimeout(function() {  if(peopleCountGreeting >= 2 && !crowdLongCheering_audio.isPlaying && !gameConfig.isMissionCompleted && !gameConfig.isGameOver){ crowdLongCheering_audio.fadeIn(2000, true); }  }, 3000);           
        } 
        else if (peopleCountGreeting < 2 && crowdLongCheering_audio.isPlaying) 
        {
            crowdLongCheering_audio.fadeOut(2000);
        }
    }

}


// check the number of greeting people, and increase the satisfaction rate accoringly
function increaseSatisfactionByGreeting() {

    if(this.game.time.now > nextCheckGreetingStatus) 
    {
        peopleCountGreeting = 0;

        // first get the new count of greeting people by selecting the standing people
        let standingPeople = people.filter(x => x.currentAnimation == "stand" && x.isInsidetheWorld == true && x.alive == true && x.sprite.x > 1 && x.sprite.x < game.world.bounds.width);

        // for each standing person, check if they're greeting based on angle and distance to boss
        for (var i = 0; i < standingPeople.length; i++)
        {
            var angleBetweenBossAndObject = standingPeople[i].game.physics.arcade.angleBetweenCenters(standingPeople[i].sprite, boss.sprite);
            var distanceBetweenBossAndObject = standingPeople[i].game.physics.arcade.distanceBetween(standingPeople[i].sprite, boss.sprite, false, true);

            // determine if the person is greeting the Boss
            if (distanceBetweenBossAndObject < gameConfig.distanceToGreetBossMax && gameConfig.angleToGreetBossMin < angleBetweenBossAndObject && angleBetweenBossAndObject < gameConfig.angleToGreetBossMax)
            {
                peopleCountGreeting++;
            }
        }

        // increase satisfaction based on the number of greeting people
        switch(true) {
          case (peopleCountGreeting >= 7):         
            updateSatisfaction("add", satisfactionPoints.peopleGreetingMin+3);
            analyticsFlags.bigCrowdCheering = true;
            break;
          case (peopleCountGreeting >= 5):        
            updateSatisfaction("add", satisfactionPoints.peopleGreetingMin+2);
            analyticsFlags.bigCrowdCheering = true;            
            break;
          case (peopleCountGreeting >= 3):          
            updateSatisfaction("add", satisfactionPoints.peopleGreetingMin+1);
            analyticsFlags.smallCrowdCheering = true;            
            break;
          case (peopleCountGreeting == 2):         
            updateSatisfaction("add", satisfactionPoints.peopleGreetingMin);
            analyticsFlags.smallCrowdCheering = true;
            break;
          default:
            // code block
        }

        nextCheckGreetingStatus = this.game.time.now + checkGreetingStatusRate;       
    }
}


function checkShootingStatus() {

    if(this.game.time.now > nextRunShootingStatus) 
    {
        checkIsEnemyShooting();
        checkIsPlayerShooting();
        checkIsSafeMode();

        //console.log("is Safe mode: " + isSafeMode + ", Enemy shooting: " + isEnemyShooting + ", Player shooting: " + isPlayerShooting);

        nextRunShootingStatus = this.game.time.now + runShootingStatusRate;       
    }
}


function checkIsEnemyShooting() {

    if(isEnemyShooting){
        // Run it every once a while
        if(this.game.time.now > nextCheckIsEnemgyShooting) 
        {
            isEnemyShooting = false;
        }
    }
}


function checkIsPlayerShooting() {

    if(isPlayerShooting){
        // Run it every once a while
        if(this.game.time.now > nextCheckIsPlayerShooting) 
        {
            isPlayerShooting = false;
        }
    }
}


function checkIsSafeMode() {

    // if it's not safe, but no one is shooting (change to safe mode)
    if (!isSafeMode && !isPlayerShooting && !isEnemyShooting){
        // start the time for the grace period of safe mode if no shooting is happening
        if(isWaitingForSafeMode == false) {
            nextCheckSafeMode = this.game.time.now + checkSafeModeRate;
            isWaitingForSafeMode = true;
        }

        // check if the waiting time is over, then set the safe mode flag
        if(this.game.time.now > nextCheckSafeMode && isWaitingForSafeMode == true) 
        {
            isSafeMode = true;
            isWaitingForSafeMode = false;            
        }
    }
    // if it's safe, but someone starts shooting (change to un-safe mode)
    else if (isSafeMode && (isPlayerShooting || isEnemyShooting)){
        isSafeMode = false;
        isWaitingForSafeMode = false;        
    }
}

/*********************************************************************************************/


/*********************************************************************************************/
/******************************* Top Menu ************************************/

function initializeTopMenuValues() {

    // display the level on top
    setLevel();

    // Set and initialize the countdown clock on top-menu
    initializeClock('clockdiv');

    // if the html bar element hasn't been generated, create it (at game level 1)
    if(satisfactionBar == null) {
        // Initialize the satisfaction bar
        satisfactionBar = new ProgressBar.Line(satisfactionbarelement, {
          strokeWidth: 4,
          easing: 'easeInOut',
          duration: 600,
          color: '#FFEA82',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '100%', height: '100%'},
          from: {color: '#ED6A5A'},
          to: {color: '#aeff9e'},
          step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
          }
        });
    }

    // for Level 1, it should be 100%, for other levels, it carries over
    if(gameResult.Level == 1)
        satisfactionRate = satisfactionRateScale;   

    satisfactionBar.animate(satisfactionRate);  // Number from 0.0 to 1.0

    // create the text objects as placeholders
    textTemp = game.add.text(345, 0, "");
}


// Update the vaues of Health bar, Satisfaction bar, and Boss' Messages
function updateTopMenuValues(playerHealth, bossHealth){

    // Update the Healthbar values 
    setHealthbarValues(playerHealth, bossHealth);

    // Update the value of the satisfaction bar based on its current value
    setSatisfactionBarValue();

    // Set the text message
    generateMessage();
}

// Update Level
function setLevel() {
  const level = document.getElementById("levelElem");
  level.innerHTML =  gameResult.Level  
}


// Update healthbar
function setHealthbarValues(playerHealth, bossHealth) {

    if(this.game.time.now > nextUpdateHealthbar) {
        /* construct manually */
        var healthBar1 = new ldBar("#HealthBar1");
        var healthBar2 = new ldBar("#HealthBar2");    
        healthBar1.set(playerHealth);
        healthBar2.set(bossHealth);

        nextUpdateHealthbar = this.game.time.now + updateHealthbarRate;
    }
}

// change the satisfaction bar value
function setSatisfactionBarValue(){

    // only animate the bar if the satifaction value has changed
    if(satisfactionLastRate != satisfactionRate){
        satisfactionBar.animate(satisfactionRate);
        satisfactionLastRate = satisfactionRate;
    }

    if(satisfactionRate == 0)
        gameOver("fired");
}

// Calculate countdown time
function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);

  // set the global variables for current min and sec
  currentTimeMin = minutes;
  currentTimeSeconds = seconds;

  return {
    total,
    minutes,
    seconds
  };
}

// Initialize countdown clock
function initializeClock(id) {

  // note: currently the seconds should be 60, if you change it, it will 
  // change the calculation of min and sec.
  const timeInMinutes = gameConfig.gameDurationMin;
  const currentTime = Date.parse(new Date());
  const endtime = new Date(currentTime + timeInMinutes*60*1000);

  //const endtime = new Date(Date.parse(new Date()) + gameConfig.gameDurationMin * gameConfig.gameDurationSec * 1000);
  const clock = document.getElementById(id);
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    // when countdown is over
    if (t.total <= 0 || gameConfig.isGameOver || gameConfig.isMissionCompleted) {
      missionCompleted();
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}


// updateSatisfaction("add/deduct", satisfaction.killCivilian)
function updateSatisfaction(change, percentValue) {
    let value = (percentValue/100) * satisfactionRateScale;

    if(change == "add"){
        satisfactionRate = satisfactionRate + value;
    } else {
        satisfactionRate = satisfactionRate - value;
    }

    if(satisfactionRate < 0)
        satisfactionRate = 0;

    if(satisfactionRate < 0.005 && satisfactionRate > 0)
        satisfactionRate = 0.005;

    if(satisfactionRate > satisfactionRateScale)
        satisfactionRate = satisfactionRateScale;

}

/*********************************************************************************************/

/************************************* Game Sounds *******************************************/

function playCrowdPaniced(fedeInDuration){

    let duration;
    let rand = game.math.between(1, 3);

    if(fedeInDuration == null) {
        duration = 0;
    } else {
        duration = fedeInDuration;
    }

    if(rand == 1)
    {  
        crowdPanicedManScreem_Audio.fadeIn(duration, false);
    }
    else if(rand >= 2)
    {    
        crowdPanicedLong_Audio.fadeIn(duration, false);
    }
}


function stopCrowdPaniced(fedeOutDuration){

    let duration;

    if(fedeOutDuration == null) {
        duration = 0;
    } else {
        duration = fedeOutDuration;
    }

    if(crowdPanicedLong_Audio.isPlaying)
    {
        crowdPanicedLong_Audio.fadeOut(duration);
    }
    else if(crowdPanicedManScreem_Audio.isPlaying)
    {
        crowdPanicedManScreem_Audio.fadeOut(duration);    
    }
    else if(crowdPanicedFemaleScreem_Audio.isPlaying)
    {
        crowdPanicedFemaleScreem_Audio.fadeOut(duration);    
    }         
}


/*********************************************************************************************/

