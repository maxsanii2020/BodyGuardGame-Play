// DEF:(x,y) range of values from 0 to 1 - the higher number sets the higher velocity of bouncing after the collision with other objects or the world bound.
    // Note: it only affects the bounce effect, basically it determines after collision with an obejct, how much of the velocity will be reduced, 1 means it moves with the same velocity as it was before the collision
    // Note: it sets how fast this objects moves after colliding with an object, it doesnt' set the distance that it travels after colliding, it is only the speed.
    //------ king_sprite.body.bounce.setTo(.8, .8);

    // DEF: range from 0 to 100, the higher number the less distance it travels after this object has been pushed by another object.
    // Note: Drag is acceleration against an object's velocity, the number determines how frequent the velocity should be reduced in relation to time.
    // ----- king_sprite.body.drag.setTo(100);

    //DEF: When two bodies collide their mass is used in the calculation to determine the exchange of velocity. Mass determines how much two bodies react upon collision.
    // Range: 0 to 5 or higher.
    // Default value: 1
    // ------ king_sprite.body.mass = 1.3;

    // DEF: The amount of movement that will occur if another object 'rides' this one. don't know much about this.
    // Range: 0 to 5 or so
    //king_sprite.body.friction.x = 0;
    // ----- king_sprite.body.friction.y = 0;


function sprite (name) {
    this.name = name;
    this.position_x=100;
    this.position_y=100;
    this.image;
    this.audio_getShot;
    this.body_collideWorldBounds = true;
    this.body_bounce_x;
    this.body_bounce_y;
    this.body_drag;
    this.body_mass;
    this.anchor;
    this.maxVelocity;
}

/***************** BG_Sprite configs *****************/

var BG_Sprite = new sprite('BG_Sprite');
    BG_Sprite.image = "gunMan";
    BG_Sprite.body_bounce_x = 1;
    BG_Sprite.body_bounce_y = 1;
    BG_Sprite.body_drag = 170;
    BG_Sprite.body_mass = 1;
    BG_Sprite.anchor = 0.5;
    BG_Sprite.maxVelocity = 120;

/****************************************************/

/***************** boss_Sprite configs *****************/

var boss_Sprite = new sprite('boss_Sprite');
    boss_Sprite.image = "figure_man";
    boss_Sprite.audio_getShot = "death_man";
    boss_Sprite.position_x = 200;
    boss_Sprite.position_y = 200;   
    boss_Sprite.body_bounce_x = 0.8;
    boss_Sprite.body_bounce_y = 0.8;
    boss_Sprite.body_drag = 100;
    boss_Sprite.body_mass = 1.3;
    boss_Sprite.anchor = 0.5;

/****************************************************/

/***************** enemy_Sprite configs *****************/

var enemy_Sprite = new sprite('enemy_Sprite');
    enemy_Sprite.body_bounce_x = 0.8;
    enemy_Sprite.body_bounce_y = 0.8;
    enemy_Sprite.body_drag = 100;
    enemy_Sprite.body_mass = 1.6;
    enemy_Sprite.body_collideWorldBounds = false;
    enemy_Sprite.anchor=0.5;

/****************************************************/

/***************** people_Sprite configs *****************/

var people_Sprite = new sprite('people_Sprite');   
    people_Sprite.position_x = 300;
    people_Sprite.position_y = 400;   
    people_Sprite.body_bounce_x = 0.8;
    people_Sprite.body_bounce_y = 0.8;
    people_Sprite.body_drag = 100;
    people_Sprite.body_mass = 1.3;
    people_Sprite.body_collideWorldBounds = false;

/****************************************************/



/*************************** Player Sprite *************************/

function CreateTestSprite(index, x, y, game, bullets,image, frameName){

    this.game = game;
    this.health = 4;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.sprite = game.add.sprite(x, y, image, frameName);
    //this.turret = game.add.sprite(x, y, 'enemy', 'turret');

    this.sprite.name = index.toString();
    game.physics.arcade.enable(this.sprite);   
    this.sprite.body.immovable = false;

}


CreateTestSprite.prototype.attack = function() {

    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        this.nextFire = this.game.time.now + this.fireRate;

        //var bullet = enemy.bullets.getFirstDead();

        weaponEnemy.fire();

        //bullet.reset(enemy.sprite.x, enemy.sprite.y);

        //bullet.rotation = enemy.game.physics.arcade.moveToObject(bullet, enemy.player, 500);
    }
};

/*************************** Player Sprite *************************/

function CreatePlayerSprite(index, x, y, game, bullets,image){

    this.game = game;
    this.health = gameConfig.maxHealthScore;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
    this.audio_Death = death_man_audio;

    this.sprite = game.add.sprite(x, y, image);
    //this.turret = game.add.sprite(x, y, 'enemy', 'turret');

    this.sprite.name = "Player";
    game.physics.arcade.enable(this.sprite);   
    this.sprite.body.immovable = false;

   
    if (BG_Sprite.anchor != null){
        this.sprite.anchor.set(BG_Sprite.anchor, BG_Sprite.anchor);
    }

    if (BG_Sprite.body_collideWorldBounds != null && BG_Sprite.body_collideWorldBounds == true){
        this.sprite.body.collideWorldBounds = true;
    }

    if (BG_Sprite.body_bounce_x != null && BG_Sprite.body_bounce_y != null){
        this.sprite.body.bounce.setTo(BG_Sprite.body_bounce_x, BG_Sprite.body_bounce_y);
    }

    if (BG_Sprite.body_drag != null){
        this.sprite.body.drag.set(BG_Sprite.body_drag);
    }

    if (BG_Sprite.maxVelocity != null){
        this.sprite.body.maxVelocity.set(BG_Sprite.maxVelocity);
    }

    if (BG_Sprite.body_mass != null){
        this.sprite.body.mass = BG_Sprite.body_mass;
    }
}

CreatePlayerSprite.prototype.damage = function(bulletType) {

    var healthLostPoint = getBulletPoint(bulletType);

    this.health -= healthLostPoint;
    bulletHitBody_audio.play();    

    if (this.health <= 0)
    {
        this.alive = false;
        this.sprite.kill();
        this.audio_Death.play();

        return true;
    }

    return false;
};


/*************************** Boss Sprite *************************/

function CreateBossSprite(index, x, y, game,image){

    this.game = game;
    this.health = gameConfig.maxHealthScore;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
    this.audio_Death = death_man_audio;

    this.sprite = game.add.sprite(x, y, image);
    //this.turret = game.add.sprite(x, y, 'enemy', 'turret');

    this.sprite.name = "Boss";
    game.physics.arcade.enable(this.sprite);   
    this.sprite.body.immovable = false;

    
    if (boss_Sprite.anchor != null){
        this.sprite.anchor.set(boss_Sprite.anchor);
    }

    if (boss_Sprite.body_collideWorldBounds != null && boss_Sprite.body_collideWorldBounds == true){
        this.sprite.body.collideWorldBounds = true;
    }

    if (boss_Sprite.body_bounce_x != null && boss_Sprite.body_bounce_y != null){
        this.sprite.body.bounce.setTo(boss_Sprite.body_bounce_x, boss_Sprite.body_bounce_y);
    }

    if (boss_Sprite.body_drag != null){
        this.sprite.body.drag.set(boss_Sprite.body_drag);
    }

    if (boss_Sprite.maxVelocity != null){
        this.sprite.body.maxVelocity.set(boss_Sprite.maxVelocity);
    }

    if (boss_Sprite.body_mass != null){
        this.sprite.body.mass = boss_Sprite.body_mass;
    } 
}

CreateBossSprite.prototype.damage = function(spriteName, bulletType) {

    var healthLostPoint = getBulletPoint(bulletType);

    if(spriteName == 'Player'){
        this.health -= healthLostPoint;
    } else {
        this.health -= healthLostPoint;      
    }

    bulletHitBody_audio.play();    

    if (this.health <= 0)
    {
        this.alive = false;
        this.sprite.kill();
        this.audio_Death.play();

        return true;
    }

    return false;
};


CreateBossSprite.prototype.update = function() {

    let x = boss.sprite.x;
    let y = boss.sprite.y;
    let isBossOnSide = false;
    let moveX = 0;
    let moveY = 0;


    // determine if boss is in side area
    if(x < sideAreas.west){
        moveX = 0.7;
        isBossOnSide = true;
    }
    else if(x > sideAreas.east){
        moveX = -0.7;
        isBossOnSide = true;            
    }

    if(y < sideAreas.north){
        moveY = 0.7;
        isBossOnSide = true;            
    }
    else if(y > sideAreas.south){
        moveY = -0.7;
        isBossOnSide = true;            
    }


    if(!isBossOnSide)
        wasBossOnSide = false;

    // when boss goes from central to side
    if(isBossOnSide && wasBossOnSide == false){
        wasBossOnSide = true;
        nextBossMoveTime = this.game.time.now + game.math.between(2000, bossMoveDelayRate); 
    }

    // if Boss is on the side, move him
    if(isBossOnSide && this.game.time.now > nextBossMoveTime){
        if(moveX != 0)
            boss.sprite.x = boss.sprite.x + moveX;        

        if(moveY != 0)
            boss.sprite.y = boss.sprite.y + moveY;
    }



    // run it once a while, every 10 sec
    // if all conditions apply, select a quarter randomly
    // set the x and y as global variables of the selected quarter.
    // once you select a destination, set a travel durationTime, and during that travel duration, we don't pick new destination
    // boss moves toward that quarter until the travel duration is over
    // if boss goes to the side, it's okay he can find his way toward the destniation.calculate the new x and y even if he's pushed to a side.

    /*
    if(x < sideAreas.west)
        console.log("Boss is on west side-----------------");

    if(x > sideAreas.east)
        console.log("Boss is on east side-----------------");

    if(y < sideAreas.north)
        console.log("Boss is on north side-----------------");

    if(y > sideAreas.south)
        console.log("Boss is on south side-----------------");

    */            

};


/*************************** People Sprite *************************/

CreatePeopleSprite = function (isEnemy, SpriteType, index, game, player, xVal, yVal){

    //var x = game.world.randomX;
    //var y = game.world.randomY;
    var x;
    var y;
    var image;
    this.game = game;
    this.isEnemy = isEnemy;
    this.bullets = enemyBullets;
    this.enemyWeapon;
    this.enemyWeaponType="pistol";
    this.alive = true;           
    this.isPopulated = false;
    this.isInsidetheWorld = true;
    this.currentAnimation;
    this.player = player;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.isExposed = false;
    //this.isGreetingBoss = false;

    this.nextWalkTime = 0; 
    this.walkRate = 4000;
    this.nextWelcomeBossTime = 0;
    this.nextWelcomeBossRate = 10000;
    this.welcomeBossDuration = 8000;
    this.angleBetweenPlayerEnemy;
    this.currentAttackMode = "rotation";
    this.nextTimetoRun = 0;
    this.nextAttackDecision = 0;
    this.selectedAttack_GreetAction = null;
    this.distanceToKillBoss;
    this.distanceToGreetBoss;

    // unique properties based on spriteType
    this.bulletXPosition = 0;
    this.bulletYPosition = 0;
    this.audio_Death;    
    this.audio_gunShot = pistol_shot_2_audio;
    // 1 radiant is 57 degree, keep it under .3 to prevent too much shake
    this.shootingAngleErrorRange = 0.3;


    if(xVal == 0){
        x = -200;       
    }else{x = xVal;}

    if(yVal == 0){
        y = game.math.between(20, game.world.height-50);       
    }else{y = yVal;}


    // Set Sprite Image based on Sprite Type
    switch(SpriteType) {
      case 1:// santa first
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 45;
        this.bulletYPosition = 0;      
        break;
      case 2:// simple blond girl
        image = 'AllCharacters';
        this.audio_Death = death_female_audio;
        this.bulletXPosition = 53;
        this.bulletYPosition = -23; 
        break;
      case 3://office guy
        image = 'AllCharacters';
        this.audio_Death = death_man_2_audio;
        this.bulletXPosition = 50;
        this.bulletYPosition = -20;
        break;
      case 4:
        image = 'walkingGuy';
        this.audio_Death = death_man_2_audio;
        this.bulletXPosition = 0;
        this.bulletYPosition = 0;
        break;
      case 5:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 32;
        this.bulletYPosition = -2;
        this.audio_gunShot = pistol_shot_2_audio;
        break;
      case 6:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 40;
        this.bulletYPosition = -2;
        this.audio_gunShot = pistol_shot_2_audio;
        break;
      case 7:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 37;
        this.bulletYPosition = 0;
        this.audio_gunShot = machinegun_1_audio;
        break;
      case 8:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 32;
        this.bulletYPosition = -10;
        this.audio_gunShot = RPG_shot_audio;
        this.enemyWeaponType = "RPG";
        break;
      case 9:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 45;
        this.bulletYPosition = -5;
        this.audio_gunShot = pistol_shot_2_audio;
        break;
      case 10:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 45;
        this.bulletYPosition = -3;
        this.audio_gunShot = pistol_shot_2_audio;
        break;            
      case 11:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 50;//higher number distance it from the center
        this.bulletYPosition = 0;// positive number bring it lower, negative number bring it higher
        this.audio_gunShot = pistol_shot_2_audio;
        break;
      case 12:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 40;//higher number distance it from the center
        this.bulletYPosition = 3;// positive number bring it lower, negative number bring it higher
        this.audio_gunShot = machinegun_1_audio;
        break;
      case 13:
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 38;//higher number distance it from the center
        this.bulletYPosition = 1;// positive number bring it lower, negative number bring it higher
        this.audio_gunShot = machinegun_1_audio;
        break;
      case 14:// santa second
        image = 'AllCharacters';
        this.audio_Death = death_man_audio;
        this.bulletXPosition = 48;
        this.bulletYPosition = -5;      
        break;
      default:
        image = 'walkingGuy';
        this.audio_Death = death_man_2_audio;
        this.bulletXPosition = 0;
        this.bulletYPosition = 0;
    }


    //create the sprite using the passed image
    this.sprite = game.add.sprite(x, y, image);
    this.sprite.name = index.toString();
    this.sprite.type = SpriteType;
    this.sprite.anchor.set(0.5, 0.5);
    game.physics.arcade.enable(this.sprite);


    // Set Sprite Animation setting based on Sprite Type
    switch(SpriteType) {
      case 1:// santa first
        this.sprite.scale.setTo(0.42,0.42);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('santa_1_Walk_', 0, 10, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('santa_1_Attack_', 0, 10, '.png', 3), 7, false,false);        
        this.sprite.animations.play('walk');    
        this.defaultFrame = 11;
        this.shootingAngleErrorRange = 0.25;
        break;
      case 2:// simple blond girl
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('girl_Walk_', 0, 6, '.png', 3), 14, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('girl_Attack_', 0, 3, '.png', 3), 7, false,false);        
        this.sprite.animations.play('walk');    
        this.defaultFrame = 2;
        this.shootingAngleErrorRange = 0.4;        
        break;
      case 3://office guy
        this.sprite.scale.setTo(0.44,0.44);
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('officeGuy_Walk_', 0, 4, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('officeGuy_Attack_', 0, 6, '.png', 3), 7, false,false);   
        this.defaultFrame = 10;
        break;
      case 4://walking guy
        this.sprite.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15, true);
        this.sprite.animations.play('walk');
        this.defaultFrame = 0;
        break;       
      case 5://police
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);             
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('police_Walk_', 1, 8, '.png', 3), 10, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('police_attack_Attack3_', 1, 5, '.png', 3), 7, false,false);    
        this.sprite.animations.play('walk');
        this.defaultFrame = 6;//1; // it's based on the json file where the idle image is, first image starts from 0
        this.shootingAngleErrorRange = 0.3;
        break;
      case 6://state police
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('StatePolice_Walk_', 1, 8, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('StatePolice__Attack3_', 1, 5, '.png', 3), 7, false,false);    
        this.sprite.animations.play('walk');
        this.defaultFrame = 8;//1;
        this.shootingAngleErrorRange = 0.15;
        break;
      case 7://security police
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('security_police_Walk_', 1, 8, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('security_police_attack_', 1, 6, '.png', 3), 7, false,false);  
        this.sprite.animations.play('walk');
        this.defaultFrame = 7;
        this.shootingAngleErrorRange = 0.3;
        this.fireRate = 450;
        break;
      case 8://terrorist blackMask
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('terrorist_3_Walk_', 0, 7, '.png', 3), 12, true,false);// Don't include the 00 after terrorist_3_Walk_
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('terrorist_3_Attack1_', 0, 5, '.png', 3), 7, false,false); // Don't include the 00 after terrorist_3_Attack1_
        this.sprite.animations.play('walk');
        this.defaultFrame = 9;//15;
        this.shootingAngleErrorRange = 0.3;
        this.fireRate = 1800;
        break;
      case 9://masked bandit
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('maskbandit_Walk_', 0, 7, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('maskBandit_Attack_', 0, 4, '.png', 3), 7, false,false);    
        this.sprite.animations.play('walk');
        this.defaultFrame = 0;//3;//0;
        this.shootingAngleErrorRange = 0.25;
        break;
      case 10://hat bandit boy
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('hatBanditBoy_Walk_', 0, 7, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('hatBanditBoy_Attack_', 0, 4, '.png', 3), 7, false,false);    
        this.sprite.animations.play('walk');
        this.defaultFrame = 3;//1;//19;
        this.shootingAngleErrorRange = 0.25;
        break; 
      case 11://gang bandit
        this.sprite.scale.setTo(0.50,0.50);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('GangBandit_Walk_', 0, 7, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('GangBandit_Attack_', 0, 4, '.png', 3), 7, false,false);    
        this.sprite.animations.play('walk');
        this.defaultFrame = 1;//0;//6;
        this.shootingAngleErrorRange = 0.25;
        break;
      case 12://headphone soldier
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);         
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('headphoneSoldier_Walk_', 0, 6, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('headphoneSoldier_Attack_', 0, 5, '.png', 3), 7, false,false);  
        this.sprite.animations.play('walk');
        this.defaultFrame = 4;//2;//6;
        this.shootingAngleErrorRange = 0.2;
        this.fireRate = 400;
        break;
      case 13://military soldier
        //this.sprite.scale.setTo(0.11,0.11);
        this.sprite.scale.setTo(0.50,0.50);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('militarySoldier_Walk_', 0, 7, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('militarySoldier_Attack_', 0, 5, '.png', 3), 7, false,false);  
        this.sprite.animations.play('walk');
        this.defaultFrame = 5;//6;
        this.shootingAngleErrorRange = 0.2;
        this.fireRate = 350;
        break;
      case 14:// santa second
        this.sprite.scale.setTo(0.42,0.42);      
        this.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('santa_2_Walk_', 0, 10, '.png', 3), 12, true,false);
        this.sprite.animations.add('attack', Phaser.Animation.generateFrameNames('santa_2_Attack_', 0, 9, '.png', 3), 7, false,false);        
        this.sprite.animations.play('walk');    
        this.defaultFrame = 12;
        this.shootingAngleErrorRange = 0.25;
        break;
      default://walking guy     
        this.sprite.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15, true);
        this.sprite.animations.play('walk');
        this.defaultFrame = 0;
    }

    setPeopleProperties(this);

}

/************** People Update ****************/
// Tasks:
// When objects go outside the world, insert them inside the waiting list
// Make the Object walk and stand
// Handle the anmimation when objects gets close to the Player
// Handle the anmimation when objects gets close to the Boss
/*********************************************/
CreatePeopleSprite.prototype.update = function() {

    // if object goes outside of the world, push it into the waitingList again
    if (this.isInsidetheWorld && (this.sprite.x >= (game.world.width + 200) || this.sprite.y >= (game.world.height-10) || this.sprite.y <= -10)){
        //console.log("sprite went outside of worldX and worldY.");
        this.sprite.x = -200; 
        this.isInsidetheWorld = false;
        this.sprite.animations.stop();
        this.sprite.rotation = 0;
        this.currentAnimation = null;
        creatureWaitingList.push(this);      
    }    

    if(this.isEnemy) {
        enemyUpdate(this);
    }
    else {
        peopleUpdate(this);
    }
};


CreatePeopleSprite.prototype.damage = function(bulletType) {

    var healthLostPoint = getBulletPoint(bulletType);

    this.health -= healthLostPoint;
    bulletHitBody_audio.play();

    if (this.health <= 0)
    {
        this.alive = false;
        this.sprite.kill();
        this.audio_Death.play();

        if(this.isEnemy){
            gameResult.EnemiesKilled++;
            updateSatisfaction("add", satisfactionPoints.killEnemy); 
            flags.enemyKilled = true;
        }else{
            gameResult.PeopleKilled++;
            updateSatisfaction("deduct", satisfactionPoints.killCivilian);
            flags.civilianKilled = true;
        }

        return true;
    }

    return false;
};


CreatePeopleSprite.prototype.attack = function(target) {

    let angleBetweenPlayerEnemy;
    isEnemyShooting = true;
    nextCheckIsEnemgyShooting = this.game.time.now + checkIsEnemgyShootingRate;
    this.isExposed = true;

    // do nothing if boss is dead
    if(bossIsDead || gameConfig.isMissionCompleted)
        return;

    // Phase 1: play holding gun animation, if attack hasn't started.
    if(this.currentAnimation != "attack")
    {
        this.sprite.animations.stop();        
        this.sprite.animations.play('attack');
        // initiate the attack mode by setting this property
        this.currentAnimation = "attack";
    }
    // perform the rotation/shooting, if the holding gun animation is already done.
    else if(this.currentAnimation == "attack" && this.sprite.animations._anims.attack.isFinished)
    {            
        // angle between player and enemy's weapon point, this won't get the correct angle until the weapon fires first.
        angleBetweenPlayerEnemy = game.physics.arcade.angleBetween(this.enemyWeapon, target.sprite);

        // Phase 2: first time rotation, after the enemy has pulled the gun, rotate the enemy slowly toward the player before shooting starts.
        if(this.currentAttackMode == "rotation"){
            // use angle between enemy's sprite and player, since enemy's weapon point won't get active until the fire() starts.
            let angleBetweenPlayer_EnemySprite = game.physics.arcade.angleBetween(this.sprite, target.sprite);

            // slowly rotate the enemy toward player, based on angle between player and enemy's sprite
            // Radiant angle: top right and left are negative values, bottom right and left are positive radiant values.
            // if radiant angle is positive, add to rotation so it rotates down, if angle is negative, deduct so it rotates up.
            if(angleBetweenPlayer_EnemySprite > 0){
                this.sprite.rotation = this.sprite.rotation + 0.02;
            } else {
                this.sprite.rotation = this.sprite.rotation - 0.02;                
            }

            // when the sprite rotation reaches/equals the angle-between-player-enemy's sprite, then stop the rotation by setting the property. 
            // do the comparison by rounding the angles to 1 decimal point
            if(this.sprite.rotation.toFixed(1) == angleBetweenPlayer_EnemySprite.toFixed(1)){
                // set this property so it moves to phase 3
                this.currentAttackMode = "shooting";
                // set this value to the angle between player and enemy's sprite for the first time only, because we use this in phase 3, and the weapon angle hasn't been set yet.
                angleBetweenPlayerEnemy = angleBetweenPlayer_EnemySprite;                 
            }        
        }
        // Phase 4: rotate the enemy to player's current angle, whenever it changes, so that enemy rotates as player moves; only start doing this after the first time rotation is over.
        else if(angleBetweenPlayerEnemy != this.angleBetweenPlayerEnemy){
            this.sprite.rotation = angleBetweenPlayerEnemy;
            this.angleBetweenPlayerEnemy = angleBetweenPlayerEnemy;           
        }

        // Phase 3: Perform shooting, after the first time rotation is over
        if(this.game.time.now > this.nextFire && this.currentAttackMode == "shooting")
        {
            // random doesn't work with decimal, that's why I have to multiple/divde by 100
            let errorAngle = game.math.between(0, (this.shootingAngleErrorRange*100))/100;
            let shootUpOrDown = game.math.between(0,2);

            // shoot up and down with error angle
            if(shootUpOrDown == 1){
                this.sprite.rotation = angleBetweenPlayerEnemy + errorAngle;
            }else{
                this.sprite.rotation = angleBetweenPlayerEnemy - errorAngle;
            }

            // perform fire
            this.nextFire = this.game.time.now + this.fireRate;
            this.enemyWeapon.fire();
            this.audio_gunShot.play();
        }
    }

    // reset the delay between shooting and running by 1 sec
    this.nextTimetoRun = this.game.time.now + 500;

};



//move this lower
CreatePeopleSprite.prototype.run = function(){

    // if sprite is rotated, gradually make it straight
    if (this.sprite.rotation.toFixed(1) != 0) {
        if(this.sprite.rotation < 0){
            this.sprite.rotation = this.sprite.rotation + 0.02;
        } else {
            this.sprite.rotation = this.sprite.rotation - 0.02;                
        }        
    }
    // whenever sprite is almost rotated to 0, start the run
    else {
        if(this.currentAnimation != "run"){
            this.sprite.rotation = 0;
            this.sprite.animations.stop();        
            this.sprite.animations.play('walk');
            this.currentAnimation = "run";        
        }

        this.sprite.x = this.sprite.x + gameConfig.runSpeed;
    }
}

















function enemyUpdate(enemy) {
    let enemyIsCloseToBoss = false;

   if(enemy.isInsidetheWorld)
    {
        var angleBetweenPlayerAndObject = enemy.game.physics.arcade.angleBetweenCenters(enemy.sprite, player.sprite);
        var distanceBetweenPlayerAndObject = enemy.game.physics.arcade.distanceBetween(enemy.sprite, player.sprite, false, true);
        var angleBetweenBossAndObject = enemy.game.physics.arcade.angleBetweenCenters(enemy.sprite, boss.sprite);
        var distanceBetweenBossAndObject = enemy.game.physics.arcade.distanceBetween(enemy.sprite, boss.sprite, false, true);

        // Determine between attack and greeting action when the enemy gets in to the close territory of Boss.
        if(distanceBetweenBossAndObject < enemy.distanceToKillBoss && gameConfig.angleToKillBossMin < angleBetweenBossAndObject && angleBetweenBossAndObject < gameConfig.angleToKillBossMax)
        {
            enemyIsCloseToBoss = true;

            // if enemy is running or already attacking
            if(enemy.currentAnimation == 'attack' || (enemy.currentAnimation == 'run' && enemy.isExposed)){
                enemy.selectedAttack_GreetAction = 'enter-attack';                
            }
            // if enemy is not in attack mode yet (just got close to boss for first time or is still greeting boss)
            else if(this.game.time.now > enemy.nextAttackDecision){

                if(Math.random() > gameConfig.EnemyGreetingChance){
                    enemy.selectedAttack_GreetAction = 'enter-attack';
                }
                else {
                    enemy.selectedAttack_GreetAction = 'enter-greet';                
                }                
                
                enemy.nextAttackDecision = this.game.time.now + gameConfig.EnemyNextDecideToAttackRate;                
            }
        }


        // perform attack/greet the boss action after determining it in the previous section
        if(enemyIsCloseToBoss)
        {
            if(enemy.selectedAttack_GreetAction == 'enter-attack'){
                enemy.attack(boss);
            }
            else if (enemy.selectedAttack_GreetAction == 'enter-greet'){
                greetBossAction(enemy, distanceBetweenBossAndObject, angleBetweenBossAndObject);
            }
        }
        // perform attack player or run if enemy in attack/run mode
        else if(enemy.currentAnimation == 'attack' || enemy.currentAnimation == 'run')
        {
            // got close to player while attacking
            if(enemy.currentAnimation == 'attack' && distanceBetweenPlayerAndObject < gameConfig.distanceToKillPlayer && gameConfig.angleToKillPlayerMin < angleBetweenPlayerAndObject && angleBetweenPlayerAndObject < gameConfig.angleToKillPlayerMax)
            {
                enemy.attack(player);
            }
            // got close to player while running - then use the smaller distance with the player.
            else if((enemy.currentAnimation == 'run' && enemy.isExposed) && distanceBetweenPlayerAndObject < gameConfig.distanceToAttackPlayerWhenRunning && gameConfig.angleToKillPlayerMin < angleBetweenPlayerAndObject && angleBetweenPlayerAndObject < gameConfig.angleToKillPlayerMax)
            {
                enemy.attack(player);
            }            
            // start running or keep running (When enemy is not close to either boss or player, and is in attack mode)
            else if(enemy.nextTimetoRun <= enemy.game.time.now)
            {
                enemy.run();
            }            
        }


        // if enemy is Not in attack/run animation
        if(enemy.currentAnimation == 'walk' || enemy.currentAnimation == 'stand' || enemy.currentAnimation == null)
        {
            // enemy is called Stop by player within a distance/angle, and decided to attack
            if(gameConfig.isStopKeyPressed && distanceBetweenPlayerAndObject < gameConfig.distanceToStopByPlayer && gameConfig.angleToStopByPlayerMin < angleBetweenPlayerAndObject && angleBetweenPlayerAndObject < gameConfig.angleToStopByPlayerMax)
            {
                // enemy decides to attack
                if(Math.random() <= gameConfig.EnemysReactionChance){
                    enemy.attack(player);
                } 
                else {
                //enemy decided to stop
                    enemy.sprite.animations.stop();
                    enemy.currentAnimation = 'stand';             
                    enemy.sprite.frame = enemy.defaultFrame;
                    // make him stand for enemy duration
                    enemy.nextWalkTime = enemy.game.time.now + enemy.walkRate;
                }
            }    
            // when the sprite is initially populated
            else if (enemy.currentAnimation == null){
                enemy.sprite.animations.play('walk');
                enemy.currentAnimation = 'walk';
            }
            // default for walking animation
            else if (enemy.currentAnimation == 'walk')
            {
                enemy.sprite.x = enemy.sprite.x + gameConfig.walkSpeed;
            }     
            // when the sprite is standing and the wait time for standing is over (either through Boss or Player)
            else if (enemy.currentAnimation == 'stand' && enemy.game.time.now > enemy.nextWalkTime)
            {  
                enemy.sprite.animations.play('walk');
                enemy.currentAnimation = 'walk';
            }
        }

    }
}



function peopleUpdate(person) {

   if(person.isInsidetheWorld)
    {
        var angleBetweenPlayerAndObject = person.game.physics.arcade.angleBetweenCenters(person.sprite, player.sprite);
        var distanceBetweenPlayerAndObject = person.game.physics.arcade.distanceBetween(person.sprite, player.sprite, false, true);
        var angleBetweenBossAndObject = person.game.physics.arcade.angleBetweenCenters(person.sprite, boss.sprite);
        var distanceBetweenBossAndObject = person.game.physics.arcade.distanceBetween(person.sprite, boss.sprite, false, true);


        // if the object is called Stop by player within a distance/angle, stand and show the default frame
        if (gameConfig.isStopKeyPressed && distanceBetweenPlayerAndObject < gameConfig.distanceToStopByPlayer && gameConfig.angleToStopByPlayerMin < angleBetweenPlayerAndObject && angleBetweenPlayerAndObject < gameConfig.angleToStopByPlayerMax)
        {
            person.sprite.animations.stop();
            person.currentAnimation = 'stand';             
            person.sprite.frame = person.defaultFrame;
            // make him stand for person duration
            person.nextWalkTime = person.game.time.now + person.walkRate;
        }
        // when the object gets close to the Boss
        else if (distanceBetweenBossAndObject < person.distanceToGreetBoss && gameConfig.angleToGreetBossMin < angleBetweenBossAndObject && angleBetweenBossAndObject < gameConfig.angleToGreetBossMax)
        {
            greetBossAction(person, distanceBetweenBossAndObject, angleBetweenBossAndObject);
        }
        // when the sprite is initially populated
        else if (person.currentAnimation == null){
            person.sprite.animations.play('walk');
            person.currentAnimation = 'walk';
        }
        // default for walking animation
        else if (person.currentAnimation == 'walk')
        {
            person.sprite.x = person.sprite.x + gameConfig.walkSpeed;
        }
        // running scenario
        else if (person.currentAnimation == 'run')
        {
            person.run();
        }              
        // when the sprite is standing and the wait time for standing is over (either through Boss or Player)
        else if (person.currentAnimation == 'stand' && person.game.time.now > person.nextWalkTime)
        {  
            person.sprite.animations.play('walk');
            person.currentAnimation = 'walk';     
        }
    }

}



// handle the actions that takes place when a person sees the boss for the first time and after
// the person walks away from the boss after a certain time of greeting.
function greetBossAction(creature, distBossAndObject, angleBossAndObject){

    // if the object is walking and he hasn't welcomed the boss for a while
    if (creature.currentAnimation != 'stand' && creature.game.time.now > creature.nextWelcomeBossTime)
    {
        creature.sprite.animations.stop();
        creature.currentAnimation = 'stand';             
        creature.sprite.frame = creature.defaultFrame;
        // make him stand for creature duration
        creature.nextWalkTime = creature.game.time.now + creature.welcomeBossDuration;
        // set the next time that the object should greet the boss again      
        creature.nextWelcomeBossTime = creature.game.time.now + creature.nextWelcomeBossRate + creature.welcomeBossDuration;
    }
    // if the object already finished with welcoming the boss, then make him walk and move vertically.            
    else if (creature.game.time.now > creature.nextWalkTime){          
        if(angleBossAndObject >= 0){
            creature.sprite.y = creature.sprite.y - 2;
        }
        else if(angleBossAndObject < 0){
            creature.sprite.y = creature.sprite.y + 2;
        }

        creature.sprite.animations.play('walk');
        creature.currentAnimation = 'walk';         
    }
}


function setPeopleProperties(creature) {

    if(creature.isEnemy)
    {
        // Enemy properties
        creature.health = health.enemyHealth;
        creature.walkRate = 4000;
        creature.nextWelcomeBossRate = 10000;
        creature.welcomeBossDuration = 8000;

        // set the distance to kill boss longer for enemy with RPG
        if (creature.enemyWeaponType == "RPG") {
            creature.distanceToKillBoss = game.math.between(gameConfig.distanceToKillBossMin + 100, gameConfig.distanceToKillBossMax + 250); 
        }
        else {
            creature.distanceToKillBoss = game.math.between(gameConfig.distanceToKillBossMin, gameConfig.distanceToKillBossMax);            
        }

        // Enemy Weapon properties
        if (creature.enemyWeaponType == "RPG"){
            creature.enemyWeapon = game.add.weapon(5, 'bullet-RPG');
            creature.enemyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            creature.enemyWeapon.bulletSpeed = 800;
            creature.enemyWeapon.fireRate = 20;
            creature.enemyWeapon.bullets.type = 2;  
        }
        else {
            creature.enemyWeapon = game.add.weapon(20, 'bullet');
            creature.enemyWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            creature.enemyWeapon.bulletSpeed = 1500;
            creature.enemyWeapon.fireRate = 100;
            creature.enemyWeapon.bullets.type = 1;            
        }

      

        // x,y starts from the most top left side of the sprite, so you have to add to x and y to bring it to the center. Test it in the develper Tool first.
        creature.enemyWeapon.trackSprite(creature.sprite, creature.bulletXPosition, creature.bulletYPosition, true);


        // Enemy physics
        if (enemy_Sprite.anchor != null){
            creature.sprite.anchor.set(enemy_Sprite.anchor, enemy_Sprite.anchor);
        }

        if (enemy_Sprite.body_collideWorldBounds != null && enemy_Sprite.body_collideWorldBounds == true){
            creature.sprite.body.collideWorldBounds = true;
        }

        if (enemy_Sprite.body_bounce_x != null && enemy_Sprite.body_bounce_y != null){
            creature.sprite.body.bounce.setTo(enemy_Sprite.body_bounce_x, enemy_Sprite.body_bounce_y);
        }

        if (enemy_Sprite.body_drag != null){
            creature.sprite.body.drag.set(enemy_Sprite.body_drag);
        }

        if (enemy_Sprite.maxVelocity != null){
            creature.sprite.body.maxVelocity.set(enemy_Sprite.maxVelocity);
        }

        if (enemy_Sprite.body_mass != null){
            creature.sprite.body.mass = enemy_Sprite.body_mass;
        } 
    }
    else 
    {
        // People properties
        creature.health = health.peopleHealth;
        creature.walkRate = 4000;
        creature.nextWelcomeBossRate = 10000;
        creature.welcomeBossDuration = game.math.between(gameConfig.welcomeBossDurationMin, gameConfig.welcomeBossDurationMax);
        creature.distanceToGreetBoss = game.math.between(gameConfig.distanceToGreetBossMin, gameConfig.distanceToGreetBossMax);

        // Poeple physics
        if (people_Sprite.anchor != null){
            creature.sprite.anchor.set(people_Sprite.anchor);
        }

        if (people_Sprite.body_collideWorldBounds != null && people_Sprite.body_collideWorldBounds == true){
            creature.sprite.body.collideWorldBounds = true;
        }

        if (people_Sprite.body_bounce_x != null && people_Sprite.body_bounce_y != null){
            creature.sprite.body.bounce.setTo(people_Sprite.body_bounce_x, people_Sprite.body_bounce_y);
        }

        if (people_Sprite.body_drag != null){
            creature.sprite.body.drag.set(people_Sprite.body_drag);
        }

        if (people_Sprite.maxVelocity != null){
            creature.sprite.body.maxVelocity.set(people_Sprite.maxVelocity);
        }

        if (people_Sprite.body_mass != null){
            creature.sprite.body.mass = people_Sprite.body_mass;
        } 
    }
}


function getBulletPoint(bulletType){
    var healthLostPoint;

    if(bulletType == "bullet-RPG"){
        healthLostPoint = health.rpgHitPoint;
    }
    else {
        healthLostPoint = health.gunHitPoint;        
    }

    //console.log("bullet type: " + bulletType + ", Health Lost: " + healthLostPoint);

    return healthLostPoint;
}


// creates an object of the character's min and max range of selection (used for both enemy and people)
characterRangeObj = function (personTypeId, min, max){
    this.personTypeId = personTypeId;
    this.min = min;
    this.max = max;
}


// make a random person to run every once a while
function makeSomeoneRun() {
    
    if(this.game.time.now > nextMakeSomeoneRunTime){

        let candidatesArray = people.filter(x => x.sprite.x <= game.world.centerX && x.sprite.y > (boss.sprite.y-160) && x.sprite.y < (boss.sprite.y+160) && x.isInsidetheWorld == true && x.alive == true && x.currentAnimation == "walk");

        if(candidatesArray.length != 0) {
            let chanceToRun;

            let candidateObj = candidatesArray[game.math.between(0,candidatesArray.length - 1)];

            if(candidateObj.isEnemy){
                chanceToRun = gameConfig.enemyStartsRunningChance;
            } else {
                chanceToRun = gameConfig.peopleStartsRunningChance;
            }

            if(chanceToRun < Math.random())
                candidateObj.currentAnimation = "run";
        }

        nextMakeSomeoneRunTime = this.game.time.now + gameConfig.makeSomeoneRunRate;    
    }
}


// make some random people to run
function makeScaredPeopleRun() {

    let candidatesArray = people.filter(x => x.isInsidetheWorld == true && x.sprite.x > 1 && x.sprite.x < game.world.bounds.width && x.alive == true && x.currentAnimation == "walk");

    if(candidatesArray.length != 0) {
        for(let i=0; i < candidatesArray.length; i++)
        {
            let chanceToRun;
            let candidateObj = candidatesArray[i];

            if(candidateObj.isEnemy){
                chanceToRun = gameConfig.enemyRunScaredChance;
            } else {
                chanceToRun = gameConfig.peopleRunScaredChance;
            }

            let r = Math.random();

            if(chanceToRun > r) {
                // delay running for each person             
                let randomTime = game.math.between(0,2500);

                // start the run for each person with a delay, and check the same conditions at the time of applying the run.
                setTimeout(function() {
                    if(candidateObj.isInsidetheWorld == true && candidateObj.sprite.x > 1 && candidateObj.sprite.x < game.world.bounds.width && candidateObj.alive == true && candidateObj.currentAnimation == "walk"){
                        candidateObj.currentAnimation = "run";      
                    }
                }, randomTime);
            }

        }
    }
}


// when shooting starts and it gets unsafe, some civilians who are greeting start walking.
function makeScaredPeopleStopGreeting() {

    let candidatesArray = people.filter(x => x.currentAnimation == "stand" && x.isEnemy == false && x.isInsidetheWorld == true && x.sprite.x > 1 && x.sprite.x < game.world.bounds.width && x.alive == true);

    if(candidatesArray.length != 0) {
        for(let i=0; i < candidatesArray.length; i++)
        {
            let chanceToRun = gameConfig.peopleScaredStopGreetingChance;
            let candidateObj = candidatesArray[i];

            let r = Math.random();

            if(chanceToRun >= r) {
                // delay running for each person             
                let randomTime = game.math.between(0,2000);

                // start the walk for each person with a delay, and check the same conditions at the time of applying the run.
                setTimeout(function() {
                    if(candidateObj.currentAnimation == "stand" && candidateObj.isInsidetheWorld == true && candidateObj.sprite.x > 1 && candidateObj.sprite.x < game.world.bounds.width && candidateObj.alive == true){
                        candidateObj.nextWalkTime = 0;      
                    }
                }, randomTime);
            }

        }
    }
}
