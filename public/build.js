var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const app = __webpack_require__(0);
const testMan = __webpack_require__(2);
console.log(testMan);

const pjs = new PointJS('2D', 1280, 720, {
    backgroundColor: 'yellow',
});

//pjs.system.initFullScreen();
const log = pjs.system.log;
const game = pjs.game;
const point = pjs.vector.point;
const cam = pjs.camera;
const brush = pjs.brush;
const OOP = pjs.OOP;
const math = pjs.math;
// const mouse = pjs.mouseControl.initMouseControl();
const key = pjs.keyControl.initKeyControl();
// key.initKeyControl();

const width = game.getWH().w;
const height = game.getWH().h;
const r = game.getResolution();

pjs.system.setTitle('My mega game');


// *** Objects like a man or zombie ***
const backgr = game.newImageObject({
        file: 'img/bg2_wide.jpg',
        scale: 1.4,
    });

 const man = game.newAnimationObject({
        animation: pjs.tiles.newAnimation('img/sprites/human_114_8.png', 114, 114, 8),
        w: 114,
        h: 114,
        x: 120,
        y: 240,
        delay: 10,
        scale: 1,
        // onload: function () {
        //     console.log('hello i am a onload');
        // },
    });

    man.name = "Charlie";
    man.drawName = function () {
        brush.drawText({
            x: this.x + this.w / 2 + 10,
            y: this.y - 20,
            text: this.name,
            color: '#FFF',
            size: '20',
            align: 'center',
        });
    };

    const zombies = [];

    let zombieSpawner = OOP.newTimer(3000, function () {
        zombies.push(game.newAnimationObject({
            animation: pjs.tiles.newAnimation('img/sprites/zombie_75_115_10.png', 73.72, 115, 10),
            w: 73.65,
            h: 115,
            x: math.random(320, 1280),
            y: 240,
            delay: 10,
            scale: 1,
        }));
    });

// *** ***

const Game = function() {
    
    this.update = function() {
        game.clear();
        backgr.draw();
        man.draw();
        man.drawName();
        zombieSpawner.restart();
        OOP.forArr(zombies, function (el) {
            el.draw();
            el.move(point(-1,0));
        });
        if (key.isDown('RIGHT')) {
            cam.move(point(.5, 0));
            man.move(point(.5, 0));

        };
    };
    this.entry = function() {
        log(man);
        log('start!');
    };
    this.exit = function() {
        log('End!');
    }
};

game.newLoopFromClassObject('1', new Game());
game.startLoop('1');




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




exports.app = app;


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const testMan = {
    xaxa: "test",
}

exports.testMan = testMan;


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map