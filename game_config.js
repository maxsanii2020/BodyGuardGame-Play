
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
    EnemyGreetingChance: .30,// the lower number gives the enemy higher chance to decide to attack when get close to boss
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
    makeSomeoneRunRate: 5000,
    enemyStartsRunningChance: .40,
    peopleStartsRunningChance: .20,
    enemyRunScaredChance: .40,// this chance is the actual chance of running, cause people decide to run only once per shooting
    peopleRunScaredChance: .70,// this chance is the actual chance of running, cause people decide to run only once per shooting
    peopleScaredStopGreetingChance: .50,

    // distance/angle to Boss/player
    distanceToGreetBossMax: 350,
    distanceToGreetBossMin: 200,
    angleToGreetBossMax: 0.9,
    angleToGreetBossMin: -0.9,
    distanceToKillBossMax: 350,
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
    killCivilian: 15,
    playerBulletHitBoss: 20,
    enemyBulletHitBoss: 0,//5,
    bossCompalinStopping: 7,
    bossComplainPushing: 5,
    breakSafeMode: 3,
    peopleGreetingMin: 2
}

/* Health Values */
var health = {
    maxHealthScore: 1000,//100,
    peopleHealth: 8,
    enemyHealth: 16,
    gunHitPoint: 4,
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
        gameConfig.gameDurationSec = 40;
        gameConfig.creatureTotal = 50;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.30;// higher number gives higher chance to create enemies
        gameConfig.EnemysReactionChance = 0.30;// higher number gives higher chance for enemy to shoot
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 1000;//1000;
        gameConfig.nextCreationTime = 2000;//6000;
        gameConfig.nextEntranceTime = 0;
        gameConfig.entranceWaitingTime = 2000;//5000;
        gameConfig.nextStopCommandTime = 0;
        satisfactionRate = satisfactionRateScale;
        break;
      case 2:
        gameConfig.gameDurationMin = 2;
        gameConfig.gameDurationSec = 0;
        gameConfig.creatureTotal = 30;
        gameConfig.creatureCount = 0;
        gameConfig.EnemyCreationChance = 0.50;
        gameConfig.EnemysReactionChance = 0.30;
        gameConfig.MaxPeopleInWorldThreshold = 0;
        gameConfig.initialPeopleCreationTime = 0;
        gameConfig.creationTime = 700;
        gameConfig.nextCreationTime = 1000;
        gameConfig.nextEntranceTime = 0;
        gameConfig.entranceWaitingTime = 1000;
        gameConfig.nextStopCommandTime = 0;
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
    sideAreas.north = 200;
    sideAreas.south = game.world.height - 200;
    sideAreas.west = 200;
    sideAreas.east = game.world.width - 200;

    // turn over the satisfaction from each level, here we have to get the value from gameResult 
    // since it catches the satisfaction value at the time of ending the game, not counting afterwards.
    if(gameLevel != 1)
        satisfactionRate = gameResult.SatisfactionScore;

}


// name: the character name, you can name it anything, not binded to any logic.
// personType: the key that references that person, should match with personType in sprite config file.
// enemyChance: percentage to be an enemy
var characters = [
    {
        name: 'santaFirst',
        personType: 1,
        enemyChance: 90,
        peopleChance: 80
    },
    {
        name: 'walkingGuy',
        personType: 4,
        enemyChance: 0,
        peopleChance: 100        
    },
    {
        name: 'Police',
        personType: 5,
        enemyChance: 20,
        peopleChance: 60        
    },
    {
        name: 'StatePolice',
        personType: 6,
        enemyChance: 20,
        peopleChance: 60        
    },
    {
        name: 'SecurityPolice',
        personType: 7,
        enemyChance: 30,
        peopleChance: 50        
    },
    {
        name: 'TerroristBlackMask',
        personType: 8,
        enemyChance: 60,
        peopleChance: 15        
    },    
    {
        name: 'GangBandit',
        personType: 11,
        enemyChance: 80,
        peopleChance: 40        
    },        
    {
        name: 'HatBanditBoy',
        personType: 10,
        enemyChance: 20,
        peopleChance: 60        
    },
    {
        name: 'MaskedBandit',
        personType: 9,
        enemyChance: 20,
        peopleChance: 70        
    },    
    {
        name: 'HeadphoneSoldier',
        personType: 12,
        enemyChance: 40,
        peopleChance: 30        
    },
    {
        name: 'MilitarySoldier',
        personType: 13,
        enemyChance: 50,
        peopleChance: 20        
    },
    {
        name: 'simpleGirl',
        personType: 2,
        enemyChance: 90,
        peopleChance: 100        
    },
    {
        name: 'officeGuy',
        personType: 3,
        enemyChance: 90,
        peopleChance: 100        
    },
    {
        name: 'santaSecond',
        personType: 14,
        enemyChance: 90,
        peopleChance: 80
    }/**/                                      
]
