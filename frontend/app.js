'use strict';


const Man = require('./man.module').Man;
const startButton = require('./preLoad.module').startButton;
const zombies = require('./zombie.module').zombies;
const constObj = require('./const').constObj;
const bullets = require('./man.module').bullets;
const stayingHero = require('./man.module').stayingHero;
const runningHero = require('./man.module').runningHero;

constObj.pjs.system.setTitle('My mega game');

// *** Objects like a man or zombie ***
const backgr1 = constObj.game.newImageObject({
    x: 0,
    y: 0,
    file: 'img/bg2_wide.jpg',
    scale: 1.4,
    onload: function () {
        backgr2.x = backgr1.x + backgr1.w;
    }

});

const backgr2 = constObj.game.newImageObject({
    x: backgr1.x + backgr1.w,
    y: 0,
    file: 'img/bg2_wide.jpg',
    scale: 1.4,

});



const endlessBackGround = function () { // аргумент s — это скорость движения фона

 if (backgr1.x + backgr1.w < runningHero.content.getPosition().x-320) { // если ушел
  backgr1.x = backgr2.x+backgr2.w; // перемещаем его сразу за вторым
 }
 // аналогично для второго
 if (backgr2.x + backgr2.w < runningHero.content.getPosition().x-320) {
  backgr2.x = backgr1.x+backgr1.w; // позиционируем за первым
 }

    if (backgr1.x + backgr1.w < runningHero.content.getPosition().x - 320) { // если ушел
        backgr1.x = backgr2.x + backgr2.w; // перемещаем его сразу за вторым
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w < runningHero.content.getPosition().x - 320) {
        backgr2.x = backgr1.x + backgr1.w; // позиционируем за первым
    }


};

// *** ***

const Game = function () {
    let dx = 2;
    let dy = 0;

    this.update = function () {
        constObj.game.clear();
        backgr1.draw();
        backgr2.draw();
        endlessBackGround();
        //man.drawStaticBox();
        zombies.spawner.restart();
        zombies.logic();
        constObj.cam.move(constObj.point(dx, dy));

        runningHero.content.move(constObj.point(dx, dy));
        stayingHero.content.move(constObj.point(dx, dy));

        if (constObj.key.isDown('RIGHT')) {
            dx = 1;
            runningHero.content.setFlip(0,0);
            runningHero.content.draw();


        } else if (constObj.key.isDown('LEFT')) {
            dx = -1;

            runningHero.content.setFlip(1,0);
            runningHero.content.draw();
        }

        else {
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
constObj.game.startLoop('1');