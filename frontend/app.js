'use strict';
require("./css/landing-page.css");
require("./css/reset.css");
const Man = require('./man.module').Man;
const startButtons = require('./preLoad.module').startButtons;
let gameOverText = require('./preLoad.module').gameOverText;
let nextLevelText = require('./preLoad.module').nextLevelText;
let winText = require('./preLoad.module').winText;
let showScore = require('./preLoad.module').score;
const background = require('./background.module');
const counters = require('./counters').counters;
let zombies = require('./zombie.module').zombies;
const constObj = require('./const').constObj;
const girls = require('./girl.module').girls;
const birds = require('./bird.module').birds;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const heroPos = require('./man.module').heroPos;
const loadAudio = require('./audio');
const backendless = require('./backendless.service').backendless;

//////////////////////      AUDIO      /////////////////////////////////////////
const jumpSound = loadAudio(['audio/smb_jump-small.wav'], 0.4);
const mainTheme = loadAudio(['audio/main_theme.mp3'], 0.7, true);
const introTheme = loadAudio(['audio/hellraiser.mp3'], 0.2, true);
const gameOverTheme = loadAudio(['audio/hellraiser.mp3'], 0.2, true);
///////////////////////////////////////////////////////////////////////////////

constObj.pjs.system.setStyle({
    width: '100%',
    height: 'auto',
    top: '50%',
    transform: 'translateY(-50%)'
});
constObj.pjs.system.setTitle('My mega game');

const Game = function () {
    let dx = 2;
    let dy = 0;
    let timer = 0;
    let i = 0;
    this.update = function () {

        constObj.game.clear();
        background.drawBackground();
        counters.drawCounters();
        if (hero.getLevel()) {
            hero.timer = constObj.pjs.game.getTime();
        }
        if (constObj.pjs.game.getTime() < hero.timer + 1000) {
            nextLevelText.draw();
        } else {
            hero.timer = 0;
        }
        counters.counter.reStyle({
            text: "Score: " + hero.getScore()
        });
        zombies.spawner.restart([5000 - 900 * hero.level]);
        zombies.logic();
        girls.spawner.restart([5000 - 450 * hero.level]);
        girls.logic();
        birds.spawner.restart([5000 - 450 * hero.level]);
        birds.logic();

        hero.drawManElements();
        hero.newtonLaw(1);

        background.fog.draw();

        if (hero.died) {
            hero.content.drawFrame(13);
            constObj.game.setLoop('gameOver');
        }
        else {
            if (!hero.banned()) {
                constObj.cam.move(constObj.point(dx, dy));
                hero.content.move(constObj.point(dx, dy));
                background.moveBG(1, dx);
                if (constObj.key.isDown('RIGHT')) {
                    dx = 1.3;
                    if (hero.content.getPosition().x <= constObj.heroPosX) {
                        constObj.cam.move(constObj.point(-dx, -dy));
                        background.moveBG(-1, dx);
                    }
                    if (hero.content.getPosition().x >= constObj.cam.getPosition().x + constObj.heroPosX) {
                        constObj.cam.move(constObj.point(dx * 2, dy * 2));
                    }
                    hero.content.setFlip(0, 0);
                    if (hero.jumpFlag == 'STOP') {
                        hero.content.drawFrames(0, 5);
                    }
                } else if (constObj.key.isDown('LEFT')) {
                    if (hero.content.getPosition().x >= 0) {
                        dx = -1.3;
                        if (hero.content.getPosition().x - constObj.heroPosX <= 0) {
                            constObj.cam.move(constObj.point(-dx, -dy));
                            background.moveBG(-1, dx);
                        } else if (hero.content.getPosition().x <= constObj.cam.getPosition().x + constObj.heroPosX) {
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
                        if (constObj.key.isDown('SPACE')) {
                            hero.content.drawFrame(1);
                        } else {
                            hero.content.drawFrames(6, 8);
                        }
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
                    if (mainTheme.state == 'play') {
                        mainTheme.stop();
                        mainTheme.state = 'stop';
                    } else {
                        mainTheme.play();
                        mainTheme.state = 'play';
                    }
                }
                ///////////////////////////////////////////////////////////////////////////////
                if (hero.content.isArrIntersect(girls) || hero.content.isArrIntersect(birds.getFreezeBoxes())) {
                    hero.banned(1.5); // на сколько секунд обездвиживаем hero
                }
                if (hero.content.isArrIntersect(birds.getHeartBoxes())) {
                    if (hero.counterLife.lastVisiblePartOfLife - 1 >= 0) {
                        hero.counterLife[hero.counterLife.lastVisiblePartOfLife - 1].visible  = true;
                        hero.counterLife.lastVisiblePartOfLife--;
                    }
                }
            } else {
                hero.content.drawFrame(14);
            }

            if (hero.content.isArrIntersect(zombies.filter(function (zombie) {
                    return (zombie.dead || zombie.banned()) ? false : true;
                }))) {
                timer++;
                if (timer >= 50) {
                    timer = 0;
                    if (hero.counterLife.lastVisiblePartOfLife < 5) {
                        hero.counterLife[hero.counterLife.lastVisiblePartOfLife].visible = false;
                        hero.counterLife.lastVisiblePartOfLife++;
                    } else {
                        hero.died = true;
                        hero.counterLife.lastVisiblePartOfLife = 0;
                    }
                }
            }
            if (!hero.content.isArrIntersect(zombies)) {
                timer = 0;
            }
        }
    }
    this.entry = function () {
        mainTheme.play();
    }
    this.exit = function () {
        mainTheme.stop();
    }
};

const preLoadScreen = function () {
    this.update = function () {
        constObj.game.clear();
        background.drawPreLoadBG();
        hero.content.drawFrames(6, 8);

        //////////////// AUDIO ////////////////////////////////////

        if (constObj.pjs.keyControl.isPress('ESC')) {

            if (introTheme.state == 'play') {
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
        hero.reset();
        startButtons.turnOnStartButton();
        gameOverTheme.stop();
        introTheme.play();
    };
    this.exit = function () {
        introTheme.stop();
        mainTheme.play();
    }
}

const gameOverScreen = function () {
    this.update = function () {
        gameOverText.setStyle({
            display: 'block'
        });

        //}
    };
    this.entry = function () {
        showScore();
        gameOverTheme.play();
        zombies.length = 0;
        girls.length = 0;
        birds.length = 0;
        hero.counterLife.forEach(function (item) {
            item.visible = true;
        })
        background.resetBG();
        startButtons.turnOnGameOverButton();
        startButtons.inpt.setStyle({
            display: 'block'
        });
    };
    this.exit = function () {
        this.isWin = false;
    }

}

constObj.game.newLoopFromClassObject('preLoad', new preLoadScreen());
constObj.game.newLoopFromClassObject('gameOver', new gameOverScreen());
constObj.game.newLoopFromClassObject('1', new Game());
constObj.game.startLoop('preLoad');
