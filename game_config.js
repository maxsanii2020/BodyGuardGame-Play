
/****************** Game Properties ******************/
console.log("game config is loaded!");

/*** Game Configuration ***/
var gameConfig = {
    gameDurationMin: 3,
    gameDurationSec: 44,// doesn't take effect, only min
    creatureTotal: 20,
    creatureCount: 0,
    EnemyCreationChance: 0.80,// higher number gives higher chance to create enemies
    EnemysReactionChance: 0.30,// higher number gives higher chance for enemy to shoot
    EnemyGreetingChance: .70,// the higher number gives the enemy higher chance to still greet instead of attack.
    EnemyNextDecideToAttackRate: 1500,// how often the enemy decides between attack or greet the boss
    MaxPeopleInWorldThreshold:0,
    initialPeopleCreationTime:7,
    creationTime: 1000,
    nextCreationTime: 6000,
    nextEntranceTime: 0,
    entranceWaitingTime: 5000,
    nextStopCommandTime: 0,
    isStopKeyPressed: false,
    isMissionCompleted: false,
    isGameOver: false,
    welcomeBossDurationMax: 25000,
    welcomeBossDurationMin: 7000,
    welcomeBossDurationEnemy: 25000,// this is the max time an enemy can greet boss, it might happen earlier
    makeSomeoneRunRate: 4000,
    enemyStartsRunningChance: .50,
    peopleStartsRunningChance: .20,
    enemyRunScaredChance: .40,// this chance is the actual chance of running, cause people decide to run only once per shooting
    peopleRunScaredChance: .70,// this chance is the actual chance of running, cause people decide to run only once per shooting
    peopleScaredStopGreetingChance: .50,

    // distance/angle to Boss/player
    distanceToGreetBossMax: 400,
    distanceToGreetBossMin: 170,
    angleToGreetBossMax: 0.9,
    angleToGreetBossMin: -0.9,
    distanceToKillBossMax: 400,
    distanceToKillBossMin: 120,        
    angleToKillBossMax: 0.9,
    angleToKillBossMin: -0.9,
    distanceToStopByPlayer: 200,
    angleToStopByPlayerMax: 0.5,
    angleToStopByPlayerMin: -0.5,
    distanceToKillPlayer: 500,
    distanceToAttackPlayerWhenRunning: 300,           
    angleToKillPlayerMax: 0.7,
    angleToKillPlayerMin: -0.7,

    // Speeds
    walkRate: 1,
    runRate: 2.8,
    walkScaredRate: 3,
    runScaredRate: 2,
    walkSpeed: 0,
    runSpeed: 0,

    // Boss/Player fixed properties
    maxHealthScore: 100
};

/* Satisfaction Values */
var satisfactionPoints = {
    isSafeMode: 2,
    killEnemy: 10,
    killCivilian: 20,
    playerBulletHitBoss: 25,
    enemyBulletHitBoss: 2,
    bossCompalinStopping: 5,
    bossComplainPushing: 5,
    breakSafeMode: 3,
    peopleGreetingMin: 2,
    NextLevelBonus: 50
}

/* Health Values */
var health = {
    maxHealthScore: 100,
    peopleHealth: 8,
    enemyHealth: 16,
    gunHitPoint: 6,
    rpgHitPoint: 12
}

/* Side Area coordinations */
var sideAreas = {
    north: 0,
    south: 0,
    west: 0,
    east: 0
}



function setGameLevelProperties(gameLevel) {

    switch(gameLevel) {
      case 1:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 50;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.25;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;// higher number gives higher chance for enemy to shoot
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;// first creation time doesn't mean anything, unless you add the current time to it
        gameConfig.nextCreationTime = 3000;//6000;
        gameConfig.nextEntranceTime = game.time.now + 3000;// first character entrance time after game begins
        gameConfig.entranceWaitingTime = 3000;// the interval between the time each character enters the game
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 2:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 50;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.30;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;
        gameConfig.nextCreationTime = 3000;
        gameConfig.nextEntranceTime = game.time.now + 1000;
        gameConfig.entranceWaitingTime = 2500;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 3:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 60;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.35;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;
        gameConfig.nextCreationTime = 3000;
        gameConfig.nextEntranceTime = game.time.now + 1000;
        gameConfig.entranceWaitingTime = 2200;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 4:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 65;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.40;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;
        gameConfig.nextCreationTime = 3000;
        gameConfig.nextEntranceTime = game.time.now + 1000;
        gameConfig.entranceWaitingTime = 2000;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 5:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 70;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.50;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;
        gameConfig.nextCreationTime = 3000;
        gameConfig.nextEntranceTime = game.time.now + 1000;
        gameConfig.entranceWaitingTime = 1700;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 6:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 75;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.55;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;
        gameConfig.nextCreationTime = 3000;
        gameConfig.nextEntranceTime = game.time.now + 1000;
        gameConfig.entranceWaitingTime = 1300;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 7:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 80;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.65;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;
        gameConfig.nextCreationTime = 3000;
        gameConfig.nextEntranceTime = game.time.now + 1000;
        gameConfig.entranceWaitingTime = 1000;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 8:
        gameConfig.gameDurationMin = 3;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 80;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.65;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 0;
        gameConfig.nextCreationTime = 3000;
        gameConfig.nextEntranceTime = game.time.now + 1000;
        gameConfig.entranceWaitingTime = 1000;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      default:
        gameConfig.gameDurationMin = 5;
        gameConfig.gameDurationSec = 0;      
        gameConfig.creatureTotal = 10;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.60;
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 1000;
        gameConfig.nextCreationTime = 6000;
        gameConfig.nextEntranceTime = 0;
        gameConfig.entranceWaitingTime = 5000;
        gameConfig.nextStopCommandTime = 0;
    }

    gameConfig.isStopKeyPressed = false;
    gameConfig.isMissionCompleted = false;
    gameConfig.isGameOver = false;

    // distance/angle to Boss/player
    gameConfig.distanceToGreetBoss = 250;
    gameConfig.angleToGreetBossMax = 0.9;
    gameConfig.angleToGreetBossMin = -0.9;
    gameConfig.distanceToKillBoss = 250;
    gameConfig.angleToKillBossMax = 0.9;
    gameConfig.angleToKillBossMin = -0.9;
    gameConfig.distanceToStopByPlayer = 200;
    gameConfig.angleToStopByPlayerMax = 0.5;
    gameConfig.angleToStopByPlayerMin = -0.5;
    gameConfig.distanceToKillPlayer = 500;
    gameConfig.angleToKillPlayerMax = 1.0;
    gameConfig.angleToKillPlayerMin = -1.0;
    gameConfig.maxHealthScore = health.maxHealthScore;

    // set speeds
    gameConfig.walkSpeed = gameConfig.walkRate;
    gameConfig.runSpeed = gameConfig.runRate;

    // reset global collections
    creatureWaitingList.length = 0;
    people.length = 0;
    stopCount = 0;
    playerCollideBossCount = 0;
    bossIsDead = false;    
    isPlayerShooting = false;    
    isEnemyShooting = false;
    isSafeMode = true;
    isWaitingForSafeMode = false;    
    prevIsSafeMode = true;
    currentTimeMin = gameConfig.gameDurationMin;
    currentTimeSeconds = gameConfig.gameDurationSec;
    crowdCurrentSpeedMode = "safe";
    peopleCountGreeting = 0;
    wasBossOnSide = false;

    // thresholds for health, game time and satisfaction
    halfHealthThreshold = gameConfig.maxHealthScore/2;   
    lowHealthThreshold = gameConfig.maxHealthScore / 10;
    highHealthThreshold = gameConfig.maxHealthScore - (gameConfig.maxHealthScore / 10);
    halfGameTimeMin = Math.floor(gameConfig.gameDurationMin/2);
    halfGameTimeSec = (((gameConfig.gameDurationMin/2) - Math.floor(gameConfig.gameDurationMin/2)) * 60) * 100;
    lowSatisfactionThreshold = satisfactionRate / 10;
    highSatisfactionThreshold = satisfactionRate - (satisfactionRate / 10);
    halfSatisfactionThreshold = satisfactionRate / 2;
    lastQuarterSatisfactionThreshold = satisfactionRate / 4;    
    lastQuarterTimeSec = (gameConfig.gameDurationMin * 60) / 4;    
    firstQuarterTimeMin = Math.floor((((gameConfig.gameDurationMin*60)/4) * 3)/60);
    firstQuarterTimeSec = (((((gameConfig.gameDurationMin*60)/4) * 3)/60) - Math.floor((((gameConfig.gameDurationMin*60)/4) * 3)/60)) * 100;

    // coordinations for side areas
    sideAreas.north = 350;
    sideAreas.south = game.world.height - 350;
    sideAreas.west = 300;
    sideAreas.east = game.world.width - 200;

    // turn over the satisfaction from each level, here we have to get the value from gameResult 
    // since it catches the satisfaction value at the time of ending the game, not counting afterwards.
    if(gameLevel != 1)
        satisfactionRate = gameResult.SatisfactionScore;

    // save initial satisfaciton to the new satisfaction rate
    gameResult.initialSatisfactionScore = gameResult.SatisfactionScore;

}


// name: the character name, you can name it anything, not binded to any logic.
// personType: the key that references that person, should match with personType in sprite config file.
// enemyChance: percentage to be an enemy
// calculating chances: if a terrorist has 90% chance of enemy and 10% person, it means that when you see a terrorist in the game, his chance of being an
// enemy is 90%, on if enemyCreationChance is 50%
var characters = [
    {
        name: 'santaFirst',
        personType: 1,
        enemyChance: 20,
        peopleChance: 80
    },
    {
        name: 'blackGirl',
        personType: 4,
        enemyChance: 15,
        peopleChance: 200        
    },
    {
        name: 'Police',
        personType: 5,
        enemyChance: 30,
        peopleChance: 70        
    },
    {
        name: 'StatePolice',
        personType: 6,
        enemyChance: 30,
        peopleChance: 70        
    },
    {
        name: 'SecurityPolice',
        personType: 7,
        enemyChance: 40,
        peopleChance: 60        
    },
    {
        name: 'TerroristBlackMask',
        personType: 8,
        enemyChance: 90,
        peopleChance: 10        
    },    
    {
        name: 'GangBandit',
        personType: 11,
        enemyChance: 70,
        peopleChance: 30        
    },        
    {
        name: 'HatBanditBoy',
        personType: 10,
        enemyChance: 25,
        peopleChance: 75        
    },
    {
        name: 'MaskedBandit',
        personType: 9,
        enemyChance: 75,
        peopleChance: 30        
    },    
    {
        name: 'HeadphoneSoldier',
        personType: 12,
        enemyChance: 60,
        peopleChance: 40        
    },
    {
        name: 'MilitarySoldier',
        personType: 13,
        enemyChance: 75,
        peopleChance: 25        
    },
    {
        name: 'simpleGirl',
        personType: 2,
        enemyChance: 15,
        peopleChance: 200        
    },
    {
        name: 'officeGuy',
        personType: 3,
        enemyChance: 20,
        peopleChance: 150        
    },
    {
        name: 'santaSecond',
        personType: 14,
        enemyChance: 15,
        peopleChance: 100
    }/**/                                      
]
