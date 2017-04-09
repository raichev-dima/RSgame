'use strict';

const Man = require('./man.module').Man;
const startButtons = require('./preLoad.module').startButtons;
const background = require('./background').background;
const zombies = require('./zombie.module').zombies;
const constObj = require('./const').constObj;
const girls = require('./girl.module').girls;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const heroPos = require('./man.module').heroPos;
const loadAudio = require('./audio');

//////////////////////      AUDIO      /////////////////////////////////////////
const jumpSound = loadAudio(['audio/smb_jump-small.wav'], 1);
const mainTheme = loadAudio(['audio/make_them_suffer.mp3'], 0.05, true);
const intro = loadAudio(['audio/hellraiser.mp3'], 0.1, true);
const shot = loadAudio(['audio/shot.mp3'], 1);

///////////////////////////////////////////////////////////////////////////////

constObj.pjs.system.setTitle('My mega game');

const Game = function () {
    constObj.log('pls push start!');
    let dx = 2;
    let dy = 0;
    let timer = 0;
    let i = 0;

    intro.play();

    (function loop() {
        fn();
        requestAnimationFrame(loop);
    })();

    function fn() {
        if (constObj.key.isUp('ESC')) {
            intro.stop();
        }
    }




    this.update = function () {

                //    SOUNDS     //
////////////////////////////////////////////////////////////////

    if (constObj.key.isPress('ESC')) {
        mainTheme.stop();
    }

    if (constObj.key.isPress('UP')) {
        jumpSound.play();
    }

    if (constObj.key.isPress('SPACE')) {
        shot.play();
    }

////////////////////////////////////////////////////////////////



        constObj.game.clear();
        background.drawBackground();
        background.counterZ.reStyle({
            text: "Убито зомби: " + background.countOfZombee
        });
        background.counterG.reStyle({
            text: "Убито герлов: " + background.countOfGirl
        });
        zombies.spawner.restart();
        zombies.logic();
        girls.spawner.restart();
        girls.logic();
        hero.drawManElements();
        hero.newtonLaw(1);
        if (hero.died) {
            hero.content.drawFrame(13);
            hero.content.drawFrame(14);
            constObj.game.setLoop('gameOver');
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
        intro.stop();
        mainTheme.play();
    }
    this.exit = function () {
        constObj.log('End!');
    }
};

const preLoadScreen = function () {
    this.update = function () {
        restartButton.setStyle({
            display: 'none'
        });
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
        restartButton.setStyle({
            display: 'block'
        });
        gameOverText.draw();

    };
    this.entry = function () {
        constObj.log('GameOverScreen loaded');
    };
    this.exit = function () {
        constObj.log('GameOverScreen End!');
    }

}



constObj.game.newLoopFromClassObject('preLoad', new preLoadScreen());
constObj.game.newLoopFromClassObject('gameOver', new gameOverScreen());
constObj.game.newLoopFromClassObject('1', new Game());
constObj.game.startLoop('preLoad');

let restartButton = constObj.pjs.GUI.newButton({
    x: 10,
    y: 10,
    w: 100,
    h: 30,
    text: "PLAY AGAIN",
    style: {
        backgroundColor: 'rgba(76, 175, 80, 0.59)',
        top: '350px',
        left: '350px',
        width: '200px',
        height: '50px',
        borderRadius: '20px',
        fontSize: '18px',
        cursor: 'pointer'
    },
    events: {
        click: function () {
            constObj.game.newLoopFromClassObject('1', new Game());
            constObj.game.setLoop('1');
        }
    }
});

var gameOverText = constObj.game.newTextObject( {
    x : 300,
    y : 100,
    text : "GAME OVER",
    size : 50,
    padding: 10,
    color : "#000000",
    strokeWidth : 6,
});
