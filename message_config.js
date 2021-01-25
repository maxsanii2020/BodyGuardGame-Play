
/****************** Message Configuration and functions ******************/

/*
*** Instruciton for adding new message:
1. add the flag name to flags or analyticsFlags
2. add a new object to the messagesList array, and set its property accordingly, add a new categoryID
3. add a case-statement to resetFlagsByCategory(), match the case number with the categoryID, and put the flag name accoringly.
4. add the condition to selectMessageType(), note that the position that you put the condition should match with the priority of the message. (put lower priority ones in the lower areas)
5. if it's analytical message, add the logic of setting its flag in detectAnalyticalChanges().
6. if it's regular flag, find the area in the code that its flag should be set, and then set its flag there. 
*/

/*** Message Configuration ***/
var messageCheckRate = 1000;
var nextMessageCheck = 0;
var messageExpireTime = 0;
var messageVisible = false;
var currentMessagePriority = 0;
var lastMessageDisplayedTime;
var messageTempXPosition = game.world.width/2;
var nextAnalyticsCheck = 0;
var analyticsCheckRate = 4000;
var recentMessagesList = [];

var flags = {
    greetingByBossPart1: false,
    greetingByBossPart2: false,
    greetingByBossNextLevels: false,    
    bossGotHitbyPlayer: false,
    bossGotHitbyEnemy: false,    
    shootingstarted: false,
    enemyKilled: false,
    civilianKilled: false,
    randomPersonGotHit: false,
    bossComplainHitting: false,
    bossComplainStopping: false      
}

var analyticsFlags = {
    satisfactionTooLow: false,
    satisfactionLow: false,
    horribleStart: false,  
    badHalfTime: false,
    goodHalfTime: false,    
    greatEnding: false,
    playerHealthLowGameEnd: false,
    bossHealthTooLow: false,              
    enemyFoundInCrowd: false,
    manyEnemiesFoundInCrowd: false,
    helpIsComing: false,
    smallCrowdCheering: false,
    bigCrowdCheering: false
}

// This funciton has the main logic for handling the message
// It will check if the current message is expired, then hide it
// It will call the functions for selecting a new message, displaying it, and reseting the old values
function generateMessage(){

    let selectedMessage;
    let messageRejected = true;

    // if game is over, don't show any messages
    if(gameConfig.isGameOver || gameConfig.isMissionCompleted) {
        textTemp.visible = false;
        return;
    }

    // Run it every one sec
    if(this.game.time.now > nextMessageCheck) 
    {
        // If a message is showing, check if it's expired, then hide it
        if(messageVisible){
            if(this.game.time.now > messageExpireTime) {
                hideMessage();                
                messageVisible = false;
            }
        }

        // Select a new message if there is any
        selectedMessage = selectMessageType();

        // Reject the new message if it's repeated
        if(selectedMessage != null) {
            messageRejected = messageRepeated(selectedMessage);

            // If rejecting a message, we should reset its old values, so it doesn't get selected again
            if(messageRejected)
                resetFlagsByCategory(selectedMessage.categoryID);    
        }

        // Display the new message if no message is currently displaying OR the new message has higher priority
        if(messageRejected == false) 
        {
            if (messageVisible == false || selectedMessage.priority < currentMessagePriority)
            {
                //console.log("selected message output: " + selectedMessage.message1);

                // Display the new message
                let newMessageDisplayed = displayMessage(selectedMessage);

                // Re-check if a new message is displayed, then set the needed variables
                if(newMessageDisplayed) {
                    messageExpireTime = this.game.time.now + selectedMessage.expirationTime;
                    currentMessagePriority = selectedMessage.priority;
                    resetAllFlags();
                    recentMessagesList.unshift(selectedMessage); // insert the new message in the begining of the array 
                    messageVisible = true;
                    lastMessageDisplayedTime = this.game.time.now;        
                }

                // keep only the last 5 messages in the array
                if(recentMessagesList.length > 10)
                    recentMessagesList.pop(); // remove the last element of the array
            } 
        }

        // Empty the messages list if there has been no new messages in the last 25 sec
        if((this.game.time.now - lastMessageDisplayedTime) > 30000) {
            //console.log("empty the message list!!! " + recentMessagesList);
            recentMessagesList.length = 0
        }

        nextMessageCheck = this.game.time.now + messageCheckRate;
    }

    // Set the flags for analytics once a while
    detectAnalyticalChanges();
}

// Determine if the new message has been repeated in the last 5 messages, unless it's allowed to be repeatable
function messageRepeated(selectedMessage) {

    let messageRejected;
    let repeatedIndex = recentMessagesList.findIndex(m => m.categoryID == selectedMessage.categoryID);

    if (selectedMessage.repeatable == false && repeatedIndex != -1) {

        //console.log("Message List length: " + recentMessagesList.length);       
        //console.log("Check the messageList for the category ID, result: " + recentMessagesList.find(m => m.categoryID == selectedMessage.categoryID));

        repeatedIndex = repeatedIndex + 1;

        // Reject the message if it was repeated less recent than it is allowed e.g. index=1, repeatAfter=2
        if(repeatedIndex <= selectedMessage.repeatAfter){
            messageRejected = true;
        } else {
            messageRejected = false;                  
        }
    } 
    else {
        messageRejected = false;                           
    } 

    return messageRejected;
}


function displayMessage(message) {

    let messageChanged = false;
    let dispMessage;
    let randomNum = Math.floor(Math.random() * 2);

    // different text styles to use
    /*
    var style_black = { font: "15px Arial", fill: "black", align: "center", backgroundColor:"white", wordWrap: true, wordWrapWidth: 700, tabs: 10}; 
    var style_bluegreen = { font: "18px Comic Sans MS", fill: "white", align: "center" , stroke: "black", strokeThickness: 0.5, backgroundColor: "#3CB371", wordWrap: true, wordWrapWidth: 700, tabs: 10 };// blue-green 2
    */
    var style_red = { font: "16px Comic Sans MS", fill: "white", align: "center" , backgroundColor: "#CD6155", wordWrap: true, wordWrapWidth: 700, tabs: 10  };// red
    var style_green = { font: "16px Comic Sans MS", fill: "white", align: "center" , backgroundColor: "#16A085", wordWrap: true, wordWrapWidth: 700, tabs: 10 };//blue    
    var style_blackNeutral = { font: "16px Comic Sans MS", fill: "white", align: "center" , stroke: "black", strokeThickness: 0.5, backgroundColor: "#303030", wordWrap: true, wordWrapWidth: 700, tabs: 10 };// black-nuetral color


    if (message == null)
        return messageChanged;

    // pick between message and message2
    if (randomNum == 0 || message.message2 == null) {
        dispMessage = message.message1;
    } else {
        dispMessage = message.message2;
    }

    dispMessage = " " + dispMessage + " ";

    // center the x coordination of the message based on its length (7 is the conversion between string lenth to pixel)
    textTemp.x = messageTempXPosition - (dispMessage.length/2) * 7;

    // Negative Message
    if (message.state == 0) {
        textTemp.setText(dispMessage);
        textTemp.setStyle(style_red);               
    }
    // Positive Message
    else if (message.state == 2) {
        textTemp.setText(dispMessage);
        textTemp.setStyle(style_green);              
    }
    // Neutral Message
    else {
        textTemp.setText(dispMessage);
        textTemp.setStyle(style_blackNeutral);
    }

    textTemp.visible = true;
    messageChanged = true;

    return messageChanged;
}


function hideMessage() {
    textTemp.visible = false; 
}

function selectMessageType() {

    let selectedCategoryId;
    let selectedMessage;
    
    // if boss is dying, don't show certain messages
    if(boss.health <= lowHealthThreshold) {
        flags.enemyKilled = false;
        flags.civilianKilled = false;
        flags.randomPersonGotHit = false;
        flags.bossComplainStopping = false;
    }


    if(flags.greetingByBossPart1) {
        selectedCategoryId = 100;
    }
    else if(flags.greetingByBossPart2) {
        selectedCategoryId = 101;
    }
    else if(flags.greetingByBossNextLevels) {
        selectedCategoryId = 102;
    }
    else if(analyticsFlags.bossHealthTooLow) {
        selectedCategoryId = 13;
    }
    else if(flags.bossGotHitbyEnemy) {
        selectedCategoryId = 1;
    }
    else if(analyticsFlags.helpIsComing) {
        selectedCategoryId = 19;
    }
    else if(flags.bossGotHitbyPlayer) {
        selectedCategoryId = 2;
    }
    else if(analyticsFlags.satisfactionTooLow) {
        selectedCategoryId = 11;
    }
    else if(analyticsFlags.playerHealthLowGameEnd) {
        selectedCategoryId = 14;
    }        
    else if(flags.shootingstarted) {
        selectedCategoryId = 10;
    }
    else if(flags.enemyKilled) {
        selectedCategoryId = 3;
    }      
    else if(flags.civilianKilled) {
        selectedCategoryId = 4;
    }   
    else if(flags.bossComplainHitting) {
        selectedCategoryId = 8;
    }
    else if(flags.bossComplainStopping) {
        selectedCategoryId = 9;
    }
    else if(analyticsFlags.bigCrowdCheering) {
        selectedCategoryId = 21;
    }
    else if(analyticsFlags.smallCrowdCheering) {
        selectedCategoryId = 20;
    }
    else if(analyticsFlags.horribleStart) {
        selectedCategoryId = 15;
    }    
    else if(analyticsFlags.manyEnemiesFoundInCrowd) {
        selectedCategoryId = 7;
    }
    else if(analyticsFlags.enemyFoundInCrowd) {
        selectedCategoryId = 6;
    }
    else if(analyticsFlags.badHalfTime) {
        selectedCategoryId = 16;
    }    
    else if(analyticsFlags.goodHalfTime) {
        selectedCategoryId = 17;
    }
    else if(analyticsFlags.greatEnding) {
        selectedCategoryId = 18;
    }
    else if(analyticsFlags.satisfactionLow) {
        selectedCategoryId = 12;
    }
    else if(flags.randomPersonGotHit) {
        selectedCategoryId = 5;
    }



    if(selectedCategoryId != null){
        selectedMessage = messagesList.find(m => m.categoryID == selectedCategoryId);
    }

    return selectedMessage;
}

// Reset all the flags
function resetAllFlags() {

    // Set all the values of keys to false
    Object.keys(flags).forEach(key => {
      flags[key] = false;
    });    

}

// Reset the flag by Category
function resetFlagsByCategory(mCategoryId) {

    switch(mCategoryId) {
      case 100:
        flags.greetingByBossPart1 = false;        
        break;
      case 101:
        flags.greetingByBossPart2 = false;        
        break; 
      case 102:
        flags.greetingByBossNextLevels = false;  
        break;           
      case 1:
        flags.bossGotHitbyEnemy = false;        
        break;
      case 2:
        flags.bossGotHitbyPlayer = false;
        break;
      case 3:
        flags.enemyKilled = false;        
        break;      
      case 4:
        flags.civilianKilled = false;   
        break;
      case 5:
        flags.randomPersonGotHit = false;   
        break;
      case 6:
        analyticsFlags.enemyFoundInCrowd = false;   
        break;
      case 7:
        analyticsFlags.manyEnemiesFoundInCrowd = false;   
        break;
      case 8:
        flags.bossComplainHitting = false;   
        break;
      case 9:
        flags.bossComplainStopping = false;  
        break;
      case 10:
        flags.shootingstarted = false;  
        break;
      case 11:
        analyticsFlags.satisfactionTooLow = false;  
        break;
      case 12:
        analyticsFlags.satisfactionLow = false;  
        break;
      case 13:
        analyticsFlags.bossHealthTooLow = false;  
        break;
      case 14:
        analyticsFlags.playerHealthLowGameEnd = false;  
        break;
      case 15:
        analyticsFlags.horribleStart = false;  
        break;
      case 16:
        analyticsFlags.badHalfTime = false;  
        break;
      case 17:
        analyticsFlags.goodHalfTime = false;  
        break;
      case 18:
        analyticsFlags.greatEnding = false;  
        break;
      case 19:
        analyticsFlags.helpIsComing = false;  
        break;
      case 20:
        analyticsFlags.smallCrowdCheering = false;  
        break;
      case 21:
        analyticsFlags.bigCrowdCheering = false;  
        break;

      default:
        // code block
    }

}


// Message Properties:
// State: 0 is negative, 2 is positive, 1 is neutral
var messagesList = [
  {
    categoryID: 100,
    message1: "Hello, today you're going to protect me",
    message2: "Hello, you're my bodyguard today",
    state: 2,
    priority: 1,
    expirationTime: 3000,
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 101,
    message1: "remember I want people to come close and greet me.",
    message2: "I wanna be around people, don't scare them away.",
    state: 2,
    priority: 1,
    expirationTime: 6000,
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 102,
    message1: "Hello again, hope you're ready today",
    message2: "Hello my friend, let's do it again.",
    state: 2,
    priority: 1,
    expirationTime: 7000,
    repeatable: false,
    repeatAfter: 10
  }, 
  {
    categoryID: 1,
    message1: "Shoot the terrorist...hurry up",
    message2: "HELP...I got shot",
    state: 0,
    priority: 1,
    expirationTime: 2000,
    repeatable: true,
    repeatAfter: 0
  },
  {
    categoryID: 2,
    message1: "you just shot me....I will fire you!",
    message2: "what the hell are you doing?",    
    state: 0,
    priority: 1,    
    expirationTime: 5000, 
    repeatable: true,
    repeatAfter: 0
  },
  {
    categoryID: 3,
    message1: "Nice, We got lucky",
    message2: "Nice shooting",     
    state: 2,
    priority: 3,    
    expirationTime: 4000,    
    repeatable: false,
    repeatAfter: 1
  },
  {
    categoryID: 4,
    message1: "you killed a civilan, I'm so disappointed!",
    message2: "Nooo...you killed a civilan!",
    state: 0,
    priority: 2,    
    expirationTime: 5000,    
    repeatable: true,
    repeatAfter: 0
  },
  {
    categoryID: 5,
    message1: "Stop shooting, there's no threat",
    message2: "Hey don't scare people away!",  
    state: 0,
    priority: 4,    
    expirationTime: 5000,    
    repeatable: false,
    repeatAfter: 2
  },
  {
    categoryID: 6,
    message1: "Oh no...I see a Gun!",
    message2: "GUN... I spotted someone with a gun",  
    state: 0,
    priority: 3,    
    expirationTime: 6000,  
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 7,
    message1: "I see many Guns...Stay close to me",
    message2: "I spotted a few people with Guns",  
    state: 0,
    priority: 3,    
    expirationTime: 6000,  
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 8,
    message1: "Stop pushing me around",     
    message2: "Don't push me!",
    state: 0,
    priority: 2,    
    expirationTime: 5000,  
    repeatable: true,
    repeatAfter: 0
  },
  {
    categoryID: 9,
    message1: "hey Don't stop people, let them come my way",
    message2: "hey let them walk to me",
    state: 0,
    priority: 2,    
    expirationTime: 5000,  
    repeatable: true,
    repeatAfter: 0
  },
  {
    categoryID: 10,
    message1: "Kill them, they're after me",
    message2: "Shoot them up",
    state: 0,
    priority: 2,
    expirationTime: 4000,
    repeatable: false,
    repeatAfter: 3
  },
  {
    categoryID: 11,
    message1: "you're almost fired!",
    message2: "my last warning before I fire you",
    state: 0,
    priority: 3,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 5
  },
  {
    categoryID: 12,
    message1: "I'm not happy with your performance",
    message2: "I'm not happy...you can't guarantee my safety",
    state: 0,
    priority: 5,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 6
  },
  {
    categoryID: 13,
    message1: "I'm dying... Save me",
    message2: "Save me plz... shoot at everybody",
    state: 0,
    priority: 4,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 5
  },
  {
    categoryID: 14,
    message1: "Hang in there... help is coming",
    message2: "Watch out for your health!",
    state: 2,
    priority: 3,
    expirationTime: 6000,
    repeatable: false,
    repeatAfter: 5
  },
  {
    categoryID: 15,
    message1: "the worst bodyguard I ever had!",
    message2: "who picked you as my bodyguard? I don't like your work!",
    state: 0,
    priority: 4,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 16,
    message1: "I'm not happy with your performance so far...",
    message2: "you have to work on your aiming",
    state: 0,
    priority: 4,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 17,
    message1: "Keep up your good work...I like it so far",
    message2: "Good job so far...I like your work",
    state: 2,
    priority: 4,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 18,
    message1: "I really like your work...great job my friend!",
    message2: "you're a Hero! I should promote you!",
    state: 2,
    priority: 4,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 10
  },
  {
    categoryID: 19,
    message1: "Help is coming...",
    message2: "the cops are coming...Hang in there",
    state: 2,
    priority: 2,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 3
  },
  {
    categoryID: 20,
    message1: "I like it when people greet me",
    message2: "this is great, let people greet me",
    state: 2,
    priority: 3,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 3
  },
  {
    categoryID: 21,
    message1: "I feel like a celebrity....Great job!",
    message2: "Great job, I love it when people cheer me",
    state: 2,
    priority: 3,
    expirationTime: 5000,
    repeatable: false,
    repeatAfter: 4
  }           

]


function detectAnalyticalChanges(){

    // Run it every once a while
    if(this.game.time.now >= nextAnalyticsCheck) 
    {
        let enemiesFound = 0;

        // Reset all analytics flags
        Object.keys(analyticsFlags).forEach(key => {
          analyticsFlags[key] = false;
        });         

        /*********** Enemies found in the world ***********/
        for (var i = 0; i < people.length; i++)
        {
            if (people[i].alive && people[i].isEnemy && people[i].isInsidetheWorld)
            {   
                enemiesFound++;
            }
        }

        //console.log("Enemies found: " + enemiesFound);


        if(enemiesFound >= 3){
            analyticsFlags.manyEnemiesFoundInCrowd = true;
        }
        else if(enemiesFound > 0){
            analyticsFlags.enemyFoundInCrowd = true;
        }       

        /**** Trigger Greeting message in the beginning of the game ****/

        // show the first part right when the game starts
        if(gameResult.Level == 1 && currentTimeMin == (gameConfig.gameDurationMin))
            flags.greetingByBossPart1 = true;

        // show the sec part before we reach to 50s second of the game
        if(gameResult.Level == 1 && currentTimeMin == (gameConfig.gameDurationMin - 1) && (currentTimeSeconds >= 50 && currentTimeSeconds < 57))
            flags.greetingByBossPart2 = true;

        // show the greeting for the next levels
        if(gameResult.Level != 1 && currentTimeMin == (gameConfig.gameDurationMin))
            flags.greetingByBossNextLevels = true;

        /*********** Detect if any enemy is shooting ***********/
        if(isEnemyShooting && !flags.bossGotHitbyEnemy)
            flags.shootingstarted = true;

        /*********** Boss Satisfaction gets too low ***********/
        if(satisfactionRate <= lowSatisfactionThreshold)
            analyticsFlags.satisfactionTooLow = true;

        /*********** Boss Satisfaction gets in the last quarter ***********/
        if(satisfactionRate <= lastQuarterSatisfactionThreshold)
            analyticsFlags.satisfactionLow = true;

        /*********** Boss is dying ***********/
        if(boss.health <= lowHealthThreshold)      
            analyticsFlags.bossHealthTooLow = true;

        /*********** Help is coming in the last 15 sec ***********/
        if(currentTimeMin == 0 && currentTimeSeconds <= 15){
            analyticsFlags.helpIsComing = true;
            setTimeout(function() { policeAlarm_audio.play(); }, 5000);    
        }

        /*********** Detect low Health for boss/player categorized by game time ***********/

        // first quarter of the game
        if(currentTimeMin > firstQuarterTimeMin || (currentTimeMin == firstQuarterTimeMin && currentTimeSeconds >= firstQuarterTimeSec)) {
            // horrible start
            if(boss.health <= halfHealthThreshold || satisfactionRate <= halfSatisfactionThreshold)
                analyticsFlags.horribleStart = true;
        }

        // last quarter of the game
        else if(currentTimeMin == 0 && currentTimeSeconds <= lastQuarterTimeSec) {
            // great ending
            if(boss.health > halfHealthThreshold && satisfactionRate >= highSatisfactionThreshold)
                analyticsFlags.greatEnding = true;

            // player health is very bad
            if(player.health <= lowHealthThreshold)      
                analyticsFlags.playerHealthLowGameEnd = true;
        }

        // third-quarter of the game
        else if(currentTimeMin < halfGameTimeMin || (currentTimeMin == halfGameTimeMin && currentTimeSeconds <= halfGameTimeSec)) {
            // bad half time
            if(boss.health < halfHealthThreshold || satisfactionRate <= lastQuarterSatisfactionThreshold)
                analyticsFlags.badHalfTime = true;

            // good half time
            if(boss.health > halfHealthThreshold && satisfactionRate > halfSatisfactionThreshold)      
                analyticsFlags.goodHalfTime = true;
        }           


        nextAnalyticsCheck = this.game.time.now + analyticsCheckRate;

        /*
        console.log("half Min: " + halfGameTimeMin + ", half seconds: " + halfGameTimeSec + ", last Quarter Time Sec: " + lastQuarterTimeSec);
        console.log("low health: " + lowHealthThreshold + ", high health: " + highHealthThreshold);
        console.log("low satisfaction: " + lowSatisfactionThreshold + ", high satisfaction: " + highSatisfactionThreshold + ", half satisfaction: " + halfSatisfactionThreshold);
        console.log("last quarter: " + lastQuarterTimeSec + ", Time Remianing: Min: " + currentTimeMin + ", Sec: " + currentTimeSeconds);
        console.log("first quarter Min: " + firstQuarterTimeMin + ", first quarter Sec: " + firstQuarterTimeSec);
        */

        /*
        console.log("satisfaction is Low: " + analyticsFlags.satisfactionLow);        
        console.log("satisfaction Too Low: " + analyticsFlags.satisfactionTooLow);
        console.log("boss Health Low GameEnd: " + analyticsFlags.bossHealthLowGameEnd);
        console.log("horrible Start: " + analyticsFlags.horribleStart);
        console.log("bad HalfTime: " + analyticsFlags.badHalfTime);
        console.log("good HalfTime: " + analyticsFlags.goodHalfTime);
        console.log("great Ending: " + analyticsFlags.greatEnding);
        console.log("playerHealth Low GameEnd: " + analyticsFlags.playerHealthLowGameEnd);
        console.log("Boss is dying: " + analyticsFlags.bossHealthLowGameEnd);        
        */
    }
}


/*

*** Message System Documentary

*** Challenges/scenarios to cover:
- multiple messages rise within a few sec, keep changing the messages, doesn't look good
Solution: assign an expiration time for each message and display it for that long, unless a higher priority message arises.

- a higher priority event happens while displaying a message:
Solution: assign priority property to each message, and if a message arises while displaying another message, check the priority and display the higher priority one.

- showing repeatitive messages back to back (e.g. when boss' health is too low)
SolutioN: create an array of recent messages (size 5), assign Repeatable and RepeatAfter properties to each message, if Repeatable is true, it allows for it to be repeated, 
if not, look at RepeatAfter and look into the array of recentMessages, if the message index is greater than RepeatAfter number, then it means it has passed the acceptable number of repeats, so it can be displayed.
Also reset the old values corresponding to that message, so the old value and current value matches and it doesn't rise again.

- while displaying the higher priority message, the lower priority messages get reset? then we lose those analytics and insights.
Solution: we reset only the old values corresponding to that particular message, and not all old values, we retain the rest of old values so they can arise again.

- if we wait for the repeatAfter number, but the gap between each message is very long, then that repeatAfter message won't get its turn for a long time.
Solution: empty the array of recent messages every 15 sec.

- if we reset the old values only first time that we display the message, and during the next 5 second, we don't falsify the same category, then it will display again after first one
is over.
Solution: we reset all the flags after a message is displayed. so All flags start with flase value unless they are raised by the events again.

- detecting big changes in health and satisfaction, if we reset old values, how to track the big progress or big loss - To-be-done
Solution: every 10 sec, store the current value of health/satisfaction, then compare it with the last value, if the difference was significant, show the message

- detecting continous actions, like second time the boss gets hit, he says something else - To-be-done
Solution: 


*** Overal Business Process
- We check for a new message every x ms
- all messages are sorted by their priority, every time we go through the list to select a message, the raised flag with the highest priority will be selected (1. raised flag 2. highest priority)
- when a message is selected, it will be tested for repeated message, which means it's a valid message if it's either repeatable or its repeatAfter number is passed.
- if no message is displaying, a new selected message will be displayed if it's a valid message.
- if a message is already displaying, and a new message has higher priority, it will remove the current message and starts displaying.
- if a message is already displaying, and a new message has lower priority, it will be ignored.
- if a message is ignored, however it will be displayed after the current expiration time is over, unless a higher priorty message is raised until that time.
- when we display a message, we immediately set all the flags to false, so we cancel the messages for all other scenarios that happened at the same time. however, from the time we 
  set the flags to false until the time the expiration is over (e.g. 5 sec), any flags can be set to true, why do we do this?
  the reason is we want to select and display the messages that have been triggered in the past 5 sec or during the expiration time of the past message. That way we don't display a message that
  had been triggered a while ago and its flag got set long time ago, we only let fresh messages to compete to be displayed. (it works well for event driven messages)
- For analytical messages, we reset their flags every 5 sec or so, so we refresh the analytics so that every time it refelects the new analytics, cause an analytic message could stay new for about 5 sec or so
  and then it may not be valid anymore. e.g. Boss found an enemy in the crowd, or we killed too many civilians lately.


*** Technical Design/process:
- store all the messages and its properties in an array
- store every message that is displayed in an array called recentMessages, we keep that last 5
- we avoid repeated messages by checking if first the message can be repeated in its property, then if not, we check if it exists in the recentMessages array
  if it exist, we check the value of repeatAfter, and if repeatAfter is smaller than the index of the repeated message in the array, then it's ok to repeat.
- selectMessageType function checks any raised flags/events and picks the message with the highest priority
- every one second, we go through the generateMessage() function:
    - check if the message's time is expired, then hide it
    - select a new message
    - check if the message is repeated, then if yes, checks if it's still acceptable. 
    - display the new message if there is no message displaying or if the new message has higher priority
    - if the new message is put for display, do this:
        - set a new expiration time for the message
        - reset the correspongin old values
        - insert the new message into the array of recent messages.
    - empty the recent message array, if no new message has been displayed for the last 15 seconds
- if a message is rejected because of being repeated, then we reset its old value, only for that flag, because if we don't do that, it will be selected everytime, and it
  will block other lower priority messages to be picked.
- so we have a function that is responsible for reseting specific flags based on categoryID. And we have another function that resets all the flags.
- for analytics flags, we check them every 5 sec, and before checking for any changes, we reset all the analytics flags, and start fresh, and if any analytics detected, we set its flag,
  and that's it, the rest of logic for the analytics is the same as other flags and scenarios.
*/