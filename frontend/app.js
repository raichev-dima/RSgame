'use strict';


const Man = require('./man.module').Man;
const startButtons = require('./preLoad.module').startButtons;
const background = require('./background').background;
const zombies = require('./zombie.module').zombies;
const constObj = require('./const').constObj;
const girls = require('./girl.module').girls;
const bullets = require('./man.module').bullets;
const stayingHero = require('./man.module').stayingHero;
const runningHero = require('./man.module').runningHero;

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
        background.counter.setPositionCS( constObj.point(100, 50));
        background.counter.reStyle({
            text: "Убито зомби: " + background.countOfZombee
        })
        background.counter.draw();
        //man.drawStaticBox();
        zombies.spawner.restart();
        girls.spawner.restart();
        zombies.logic();
        girls.logic();
        constObj.cam.move(constObj.point(dx, dy));

        runningHero.content.move(constObj.point(dx, dy));
        stayingHero.content.move(constObj.point(dx, dy));

        if (constObj.key.isDown('RIGHT')) {
            dx = 1;
            runningHero.content.setFlip(0, 0);
            runningHero.content.draw();


        } else if (constObj.key.isDown('LEFT')) {
            dx = -1;
            runningHero.content.setFlip(1, 0);
            runningHero.content.draw();
        } else {
            dx = 0;
            stayingHero.content.draw();

        }
        runningHero.drawManElements();
        runningHero.newtonLaw(1);

        if (constObj.key.isPress('UP')) {
            runningHero.jumpFlag = true;
            runningHero.jumping();


        };

        if (constObj.key.isDown('SPACE')) {
            runningHero.shooting();
        };

    };
    this.entry = function () {
        constObj.log(Man);
        constObj.log('start!');
    };
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
        //runningHero.preLoadContent();
        runningHero.content.draw();
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
