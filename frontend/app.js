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
        // runningHero.content.drawStaticBox();
        // stayingHero.content.drawStaticBox();
        zombies.spawner.restart();
        girls.spawner.restart();
        zombies.logic();
        girls.logic();
        runningHero.drawManElements();
        runningHero.newtonLaw(1);
       
        constObj.cam.move(constObj.point(dx, dy));

        runningHero.content.move(constObj.point(dx, dy));
        stayingHero.content.move(constObj.point(dx, dy));

        if (constObj.key.isDown('RIGHT')) {
            dx = 1.3;
            runningHero.content.setFlip(0, 0);
            runningHero.content.draw();


        } else if (constObj.key.isDown('LEFT')) {
            dx = -1.3;
            runningHero.content.setFlip(1, 0);
            stayingHero.content.y = 0;
            stayingHero.content.h = 0;
            runningHero.content.draw();
        } else {
            dx = 0;
            stayingHero.content.y = 220;
            stayingHero.content.h = 140;
            stayingHero.content.draw();

        }

        if (constObj.key.isPress('UP')) {
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
