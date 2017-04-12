'use strict';
require("./css/landing-page.css");
require("./css/reset.css");
const Man = require('./man.module').Man;
const startButtons = require('./preLoad.module').startButtons;
let gameOverText = require('./preLoad.module').gameOverText;
let nextLevelText = require('./preLoad.module').nextLevelText;
const background = require('./background').background;
let zombies = require('./zombie.module').zombies;
const constObj = require('./const').constObj;
const girls = require('./girl.module').girls;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const heroPos = require('./man.module').heroPos;
const loadAudio = require('./audio');

//////////////////////      AUDIO      /////////////////////////////////////////
const jumpSound = loadAudio(['audio/smb_jump-small.wav'], 1);
const mainTheme = loadAudio(['audio/main_theme.mp3'], 0.2, true);
const introTheme = loadAudio(['audio/hellraiser.mp3'], 0.1, true);
const shotSound = loadAudio(['audio/shot.mp3'], 1);
const gameOverTheme = loadAudio(['audio/hellraiser.mp3'], 0.1, true);
///////////////////////////////////////////////////////////////////////////////

constObj.pjs.system.setTitle('My mega game');

const Game = function () {
    constObj.log('pls push start!');
    let dx = 2;
    let dy = 0;
    let timer = 0;
    let i = 0;


    this.update = function () {

        constObj.game.clear();
        background.drawBackground();


        if (hero.getLevel()) {
            hero.timer = constObj.pjs.game.getTime();
        }
        if (constObj.pjs.game.getTime() < hero.timer + 1000) {
            nextLevelText.draw();
        }
        else {
            hero.timer = 0;
        }
        background.counter.reStyle({
            text: "Level" + hero.level + "     Score: " + background.score
        });
        zombies.spawner.restart([5000 - 1000*hero.level]);
        zombies.logic();
        girls.spawner.restart([5000 - 1000*hero.level]);
        girls.logic();


        hero.drawManElements();
        hero.newtonLaw(1);


        if (hero.died) {
            hero.content.drawFrame(13);
            hero.content.drawFrame(14);
            constObj.game.setLoop('gameOver');
        } else {
            if (!hero.banned()) {

                constObj.cam.move(constObj.point(dx, dy));
                hero.content.move(constObj.point(dx, dy));

                if (constObj.key.isDown('RIGHT')) {
                    dx = 1.3;
                    if (hero.content.getPosition().x <= 125) {
                        constObj.cam.move(constObj.point(-dx, -dy));
                    }
                    if (hero.content.getPosition().x >= constObj.cam.getPosition().x + 125) {
                        constObj.cam.move(constObj.point(dx * 2, dy * 2));
                    }
                    hero.content.setFlip(0, 0);
                    if (hero.jumpFlag == 'STOP') {
                        hero.content.drawFrames(0, 5);
                    }
                } else if (constObj.key.isDown('LEFT')) {
                    if (hero.content.getPosition().x >= 0) {
                        dx = -1.3;
                        if (hero.content.getPosition().x - 125 <= 0) {
                            constObj.cam.move(constObj.point(-dx, -dy));
                        } else if (hero.content.getPosition().x <= constObj.cam.getPosition().x + 125) {
                            constObj.cam.move(constObj.point(dx * 2, dy * 2));
                        }
                    } else if (hero.content.getPosition().x < 0) {
                        dx = 0;
                    }
                    hero.content.setFlip(1, 0);
                    if (hero.jumpFlag == 'STOP') {
                        hero.content.drawFrames(0, 5);
                    }

                } else {
                    dx = 0;
                    if (hero.jumpFlag == 'STOP') {
                        hero.content.drawFrames(6, 8);
                    }

                }

                if (constObj.key.isPress('UP')) {
                    jumpSound.play();
                    hero.jumping();
                }


                if (constObj.key.isPress('SPACE')) {
                    hero.shooting();
                }

/////////////////////////////// AUDIO /////////////////////////////////////////
                if (constObj.key.isPress('ESC')) {


                    if(mainTheme.state == 'play') {
                        mainTheme.stop();
                        mainTheme.state = 'stop';
                    } else {
                        mainTheme.play();
                        mainTheme.state = 'play';
                    }

                }
///////////////////////////////////////////////////////////////////////////////
                if (hero.content.isArrIntersect(girls)) {
                    hero.banned(1.5); // на сколько секунд обездвиживаем hero
                }
            } else {
                hero.content.drawFrames(14, 14);
            }

            if (hero.content.isArrIntersect(zombies.filter(function (item) {
                    return (item.dead) ? false : true;
                }))) {
                timer++;
                if (timer >= 50) {
                    timer = 0;
                    if (i < 5) {
                        background.counterLife[i].visible = false;
                        i++;
                    } else {
                        hero.died = true;
                        i = 0;
                    }
                }
            }
            if (!hero.content.isArrIntersect(zombies)) {
                timer = 0;
            }
        }
    }
    this.entry = function () {
        constObj.log(Man);
        constObj.log('start!');
        mainTheme.play();
    }
    this.exit = function () {
        constObj.log('End!');
        mainTheme.stop();
    }
};

const preLoadScreen = function () {
    this.update = function () {
        constObj.game.clear();
        background.first.draw();
        hero.content.draw();

//////////////// AUDIO ////////////////////////////////////

        if (constObj.pjs.keyControl.isPress('ESC')) {

            if(introTheme.state == 'play') {
                introTheme.stop();
                introTheme.state = 'stop';
            } else {
                introTheme.play();
                introTheme.state = 'play';
            }

        }

/////////////////////////////////////////////////////////////

    };
    this.entry = function () {
        constObj.log('PreloadScreen loaded');
        startButtons.turnOnStartButton();
        gameOverTheme.stop();
        introTheme.play();
    };
    this.exit = function () {
        constObj.log('preloadScreen End!');
        introTheme.stop();
        mainTheme.play();
    }
}

const gameOverScreen = function () {
    this.update = function () {
        gameOverText.draw();


    };
    this.entry = function () {
        constObj.log('GameOverScreen loaded');
        gameOverTheme.play();
        hero.reset();
        zombies.length = 0;
        girls.length = 0;
        background.counterLife.forEach(function (item) {
            item.visible = true;
        })
        background.resetBG();
        startButtons.turnOnGameOverButton();
    };
    this.exit = function () {
        constObj.log('GameOverScreen End!');
    }

}

constObj.game.newLoopFromClassObject('preLoad', new preLoadScreen());
constObj.game.newLoopFromClassObject('gameOver', new gameOverScreen());
constObj.game.newLoopFromClassObject('1', new Game());
constObj.game.startLoop('preLoad');
