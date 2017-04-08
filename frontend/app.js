'use strict';


const Man = require('./man.module').Man;
const startButtons = require('./preLoad.module').startButtons;
const background = require('./background').background;
const zombies = require('./zombie.module').zombies;
const constObj = require('./const').constObj;
const girls = require('./girl.module').girls;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;

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
        zombies.spawner.restart();
        girls.spawner.restart();
        //zombies.logic();
        //girls.logic();
        hero.drawManElements();
        hero.newtonLaw(1);
        if (hero.died) {
            hero.content.drawFrame(13);
            hero.content.drawFrame(14);
        }
        else {
            constObj.cam.move(constObj.point(dx, dy));
            hero.content.move(constObj.point(dx, dy));
            if (constObj.key.isDown('RIGHT')) {
                dx = 1.3;
                if (hero.content.getPosition().x  <= 125) {
                    constObj.cam.move(constObj.point(-dx, -dy));
                }
                if (hero.content.getPosition().x  >= constObj.cam.getPosition().x+125) {
                    constObj.cam.move(constObj.point(dx*2, dy*2));
                }
                hero.content.setFlip(0, 0);
                if (hero.jumpFlag == 'STOP' ) {
                    hero.content.drawFrames(0, 5);
                }


            } else if (constObj.key.isDown('LEFT')) {
                if (hero.content.getPosition().x  >= 0) {
                    dx = -1.3;
                    if (hero.content.getPosition().x -125 <= 0) {
                        constObj.cam.move(constObj.point(-dx, -dy));
                    }
                    else if (hero.content.getPosition().x  <= constObj.cam.getPosition().x+125){
                        constObj.cam.move(constObj.point(dx*2, dy*2));
                    }
                }
                else if (hero.content.getPosition().x < 0){
                    dx = 0;
                }
                hero.content.setFlip(1, 0);
                if (hero.jumpFlag == 'STOP' ) {
                    hero.content.drawFrames(0, 5);
                }

            } else {
                dx = 0;
                //hero.content.y = 220;
                //hero.content.h = 140;
                if (hero.jumpFlag == 'STOP' ) {
                    hero.content.drawFrames(6, 8);
                }

            }

            if (constObj.key.isPress('UP')) {
                hero.jumping();
            }

            if (constObj.key.isDown('SPACE')) {
                hero.shooting();
            }
            if (hero.content.isArrIntersect(zombies.filter(function(item) {
                    return (item.dead) ?  false :  true;
                }))) {
                timer++;
                if (timer >= 50) {
                    timer = 0;
                    if (i < 5) {
                        background.counterLife[i].visible = false;
                        i++;
                    }
                    else {
                        hero.died = true;
                        constObj.game.setLoop('gameOver');
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
    }
    this.exit = function () {
        constObj.log('End!');
    }
};

constObj.game.newLoopFromClassObject('1', new Game());
//constObj.game.startLoop('1');

const preLoadScreen = function () {
    this.update = function () {
        constObj.game.clear();
        background.first.draw();
        hero.content.draw();
    };
    this.entry = function () {
        constObj.log('PreloadScreen loaded');
    };
    this.exit = function () {
        constObj.log('preloadScreen End!');
    }
}

const gameOverScreen = function () {
    this.update = function () {
        startButtons.startButton.setStyle({
            display: 'block'
        });
    };
    this.entry = function () {
        constObj.log('GameOverScreen loaded');
    };
    this.exit = function () {
        constObj.log('preloadScreen End!');
    }
}



constObj.game.newLoopFromClassObject('preLoad', new preLoadScreen());
constObj.game.newLoopFromClassObject('gameOver', new gameOverScreen());
constObj.game.startLoop('preLoad');
