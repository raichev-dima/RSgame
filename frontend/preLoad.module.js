'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;

const width = constObj.game.getWH().w;
const height = constObj.game.getWH().h;

const hero = require('./man.module').hero;

let skins = [
    ["img/sprites/staying_by_Egor.png", 192, 358, 1, 'Howard'],
    ["img/sprites/human_90_110_8_staying.png", 90, 110, 8, 'Leonard'],
    ["img/sprites/bernadett_test.png", 205, 236, 15, 'Bernadett'],
];

skins.count = skins.length;

let startButton = constObj.pjs.GUI.newButton({
    x: 10,
    y: 10,
    w: 100,
    h: 30,
    text: "Start",
    style: {
        backgroundColor: 'rgba(76, 175, 80, 0.59)',
        top: '25%',
        left: '50%',
        width: '200px',
        height: '50px',
        marginLeft: '-100px',
        marginTop: '-75px',
        borderRadius: '20px',
        fontSize: '18px',
        cursor: 'pointer'
    },
    events: {
        click: function () {
            constObj.game.setLoop('1');
            startButton.setStyle({
                display: 'none'
            });
            if (changeHeroButton) changeHeroButton.setStyle({
                display: 'none'
            });
        }
    }
});

let changeHeroButton = constObj.pjs.GUI.newButton({
    x: 0,
    y: 0,
    w: 100,
    h: 30,
    text: "Change HERO!!!",
    style: {
        backgroundColor: 'rgba(176, 80, 176, 0.59)',
        top: '25%',
        left: '50%',
        width: '200px',
        height: '50px',
        marginLeft: '-100px',
        marginTop: '25px',
        borderRadius: '20px',
        fontSize: '18px',
        cursor: 'pointer'
    },
    events: {
        click: function () {
            if (skins.count === skins.length) {
                skins.count = 0;
                skins.count++;
                hero.changeSkin(...skins[0]);
            } else {
                skins.count++;
                hero.changeSkin(...skins[skins.count - 1]);
            }
        }
    }
});

let restartButton = constObj.pjs.GUI.newButton({
    x: 10,
    y: 10,
    w: 100,
    h: 30,
    text: "PLAY AGAIN",
    style: {
        backgroundColor: 'rgba(76, 175, 80, 0.59)',
        top: '75%',
        left: '50%',
        width: '200px',
        height: '50px',
        marginLeft: '-100px',
        marginTop: '-75px',
        borderRadius: '20px',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'none',
    },
    events: {
        click: function () {
            restartButton.setStyle({
                display: 'none'
            });
            // constObj.game.newLoopFromClassObject('1', new Game());
            // constObj.game.setLoop('1');
            constObj.game.startLoop('preLoad');
        }
    }
});

let gameOverText = constObj.game.newTextObject({
    x: 380,
    y: 100,
    text: "GAME OVER",
    size: 50,
    padding: 10,
    color: "#000000",
    strokeWidth: 6,
});

let nextLevelText = constObj.game.newTextObject({
    x: 300,
    y: 100,
    text: "You have reached the next level!",
    size: 50,
    padding: 10,
    color: "#000000",
});

exports.startButtons = {
    startButton: startButton,
    changeHeroButton: changeHeroButton,
    restartButton: restartButton,
    turnOnGameOverButton: function () {
        restartButton.setStyle({
            display: 'block'
        });
    },
    turnOnStartButton: function () {
        startButton.setStyle({
            display: 'block'
        });
        changeHeroButton.setStyle({
            display: 'block'
        });
    },
};

exports.gameOverText = gameOverText;
exports.nextLevelText = nextLevelText;
