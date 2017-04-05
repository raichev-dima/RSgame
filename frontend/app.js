'use strict';

const app = require('./app');
const startButton = require('./preLoad.module').startButton;
const man = require('./man.module').man;

const zombies = require('./zombie.module').zombies;
const constObj = require('./game').constObj;
const PointJS = require('./point').PointJS;
const bullets = require('./man.module').bullets;
const stayingMan = require('./man.module').stayingMan;

//pjs.system.initFullScreen();
const log = constObj.pjs.system.log;

const point = constObj.pjs.vector.point;
const cam = constObj.pjs.camera;
const brush = constObj.pjs.brush;
const OOP = constObj.pjs.OOP;
const math = constObj.pjs.math;
// const mouse = pjs.mouseControl.initMouseControl();
const key = constObj.pjs.keyControl.initKeyControl();
// key.initKeyControl();

const width = constObj.game.getWH().w;
const height = constObj.game.getWH().h;
const r = constObj.game.getResolution();

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

    if (backgr1.x + backgr1.w < man.getPosition().x - 320) { // если ушел
        backgr1.x = backgr2.x + backgr2.w; // перемещаем его сразу за вторым
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w < man.getPosition().x - 320) {
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
        cam.move(point(dx, dy));
        man.move(point(dx, dy));
        stayingMan.move(point(dx, dy));

        if (key.isDown('RIGHT')) {
            dx = 1;
            man.setFlip(0, 0);
            man.draw();

        } else if (key.isDown('LEFT')) {
            dx = -1;
            man.setFlip(1, 0);
            man.draw();
        } else {
            dx = 0;
            stayingMan.draw();

        }
        man.drawManElements();
        man.newtonLaw.call(stayingMan, 1);
        if (key.isPress('UP')) {
            man.jumpFlag = true;
            man.jumping();

        };

        if (key.isDown('SPACE')) {
            man.shooting();
        };

    };
    this.entry = function () {
        log(man);
        log('start!');
    };
    this.exit = function () {
        log('End!');
    }
};


constObj.game.newLoopFromClassObject('1', new Game());
//constObj.game.startLoop('1');
