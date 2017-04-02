'use strict';

const app = require('./app');
const man = require('./man.module').man;

const zombies = require('./zombie.module').zombies;
const constObj = require('./game').constObj;
const PointJS = require('./point').PointJS;
const bullets = require('./man.module').bullets;



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
const backgr = constObj.game.newImageObject({
    file: 'img/bg2_wide.jpg',
    scale: 1.4,
});


// *** ***

const Game = function () {

    this.update = function () {
        constObj.game.clear();
        backgr.draw();
        man.drawManElements();
        //man.drawStaticBox();
        zombies.spawner.restart();
        zombies.logic();

        if (key.isDown('RIGHT')) {
            cam.move(point(.5, 0));
            man.move(point(.5, 0));

        };
        if (key.isDown('LEFT')) {
            cam.move(point(-.5, 0));
            man.move(point(-.5, 0));

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
constObj.game.startLoop('1');




// game.newLoopFromConstructor('game_one', function () {
//     let back = game.newImageObject({
//         file: 'img/bg2_wide.jpg',
//         scale: 1.4,
//     });

//     const man = game.newAnimationObject({
//         animation: pjs.tiles.newAnimation('img/sprites/human_114_8.png', 114, 114, 8),
//         w: 114,
//         h: 114,
//         x: 120,
//         y: 220,
//         delay: 10,
//         scale: 1.2,
//         onload: function () {
//             console.log('hello i am a onload')
//         }
//     });


//     man.drawName = function () {
//         brush.drawText({
//             x: this.x + this.w / 2 + 10,
//             y: this.y - 20,
//             text: this.name,
//             color: '#FFF',
//             size: '20',
//             align: 'center',
//         });
//     };

//     const zombies = [];

//     let timer = OOP.newTimer(3000, function () {
//         zombies.push(game.newAnimationObject({
//             animation: pjs.tiles.newAnimation('img/sprites/zombie_75_115_10.png', 73.72, 115, 10),
//             w: 73.65,
//             h: 115,
//             x: math.random(320, 1280),
//             y: 220,
//             delay: 10,
//             scale: 1.2,
//         }));
//     });


//     this.update = function () {
//         game.clear();
//         back.draw();
//         man.draw();
//         man.drawName();
//         timer.restart();
//         OOP.forArr(zombies, function (el) {
//             el.draw();
//             el.move(point(-1,0));
//         });


//         if (key.isDown('RIGHT')) {
//             cam.move(point(.5, 0));
//             man.move(point(.5, 0));

//         }
//     };

//     this.entry = function () {
//         log('lets start!');
//         timer.start();
//     };



//     pjs.OOP.drawArr(arr);

// if (mouse.isDown('LEFT')) {
//     createRect()
// }



// if (mouse.isInObject(man)) {
//     man.drawStaticBox('red');
// }

// if (man.isIntersect(zombies)) {
//     man.drawStaticBox('blue');
// }
// });

// game.startLoop('game_one');

// const rect = game.newRectObject( {
//     positionC: point(100,100),
//     w: 50, h:50,
//     fillColor: "red",
// });

// rect.control = function() {
//     if (key.isDown('RIGHT')) {
//         this.move(point(1,0));
//     }
//     if (key.isDown('LEFT')) {
//         this.move(point(-1,0));
//     }
//     if (key.isDown('UP')) {
//         this.y--;
//     }
//     if (key.isDown('DOWN')) {
//         this.y++;
//     }
// };
// console.log(key.getKeyList());




//exports.app = app;
