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
    this.update = function () {
        constObj.game.clear();
        background.first.draw();
        background.second.draw();
        background.endlessBackGround();
        background.counterZ.setPositionCS( constObj.point(100, 30));
        background.counterG.setPositionCS( constObj.point(100, 50));
        background.counterZ.reStyle({
            text: "Убито зомби: " + background.countOfZombee
        })
        background.counterZ.draw();
        background.counterG.reStyle({
            text: "Убито герлов: " + background.countOfGirl
        })
        background.counterG.draw();
        zombies.spawner.restart();
        girls.spawner.restart();
        zombies.logic();
        girls.logic();
        hero.drawManElements();
        hero.newtonLaw(1);
        background.counterLife.reduce(function(prevResult, item) {
            item.setPositionCS( constObj.point(50 + prevResult, 30));
            return 50+prevResult;
        },600);
        constObj.pjs.OOP.drawArr(background.counterLife);
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
                hero.content.drawFrames(0, 5);

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
                hero.content.drawFrames(0, 5);

            } else {
                dx = 0;
                hero.content.y = 220;
                hero.content.h = 140;
                hero.content.drawFrames(6, 8);
            }

            if (constObj.key.isPress('UP')) {
                hero.jumping();
            }

            if (constObj.key.isDown('SPACE')) {
                hero.shooting();
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
};

constObj.game.newLoopFromClassObject('preLoad', new preLoadScreen());
constObj.game.startLoop('preLoad');
