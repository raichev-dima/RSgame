'use strict';

const app = require('./app');
const Man = require('./man.module').Man;

const zombies = require('./zombie.module').zombies;
const constObj = require('./game').constObj;
const PointJS = require('./point').PointJS;
const bullets = require('./man.module').bullets;
const stayingHero = require('./man.module').stayingHero;
const runningHero = require('./man.module').runningHero;

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
    x: 0, y:0,
    file: 'img/bg2_wide.jpg',
    scale: 1.4,
    onload : function (){
        backgr2.x = backgr1.x + backgr1.w;
    }

});

const backgr2 = constObj.game.newImageObject({
    x : backgr1.x+backgr1.w, y : 0,
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

};


// *** ***

const Game = function () {
    let dx = 2;
    let dy = 0;


    this.update = function () {
        constObj.game.clear();
        backgr1.draw();
        backgr2.draw();
        gr1.draw();
        gr2.draw();
        endlessBackGround();
        //man.drawStaticBox();
        zombies.spawner.restart();
        zombies.logic();
        cam.move(point(dx, dy));
        runningHero.content.move(point(dx, dy));
        stayingHero.content.move(point(dx, dy));

        if (key.isDown('RIGHT')) {
            dx = 1;
            runningHero.content.setFlip(0,0);
            runningHero.content.draw();

        }
        else if (key.isDown('LEFT')) {
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
        if (key.isPress('UP')) {
            runningHero.jumpFlag = true;
            runningHero.jumping();

        };

        if (key.isDown('SPACE')) {
            runningHero.shooting();
        };

    };
    this.entry = function () {
        log(Man);
        log('start!');
    };
    this.exit = function () {
        log('End!');
    }
};


constObj.game.newLoopFromClassObject('1', new Game());
constObj.game.startLoop('1');

