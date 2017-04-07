'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;

const width = constObj.game.getWH().w;
const height = constObj.game.getWH().h;

const stayingHero = require('./man.module').stayingHero;
const runningHero = require('./man.module').runningHero;

let skins = [{
    run: ["img/sprites/run-right.png", 192, 358, 5, 'Tvoi-glaza-aa'],
    stay: ["img/sprites/staying_by_Egor.png", 192, 358, 1,'Tvoi-glaza-aa']
},
{
    run: ["img/sprites/human_114_8.png", 90, 110, 8,'Charlie'],
    stay: ["img/sprites/human_90_110_8_staying.png", 90, 110, 8,'Charlie']
}];

skins.flag = false;

let startButton = constObj.pjs.GUI.newButton({
    x: 10,
    y: 10,
    w: 100,
    h: 30,
    text: "Start",
    style: {
        backgroundColor: 'rgba(76, 175, 80, 0.59)',
        top: height / 2 + 'px',
        left: width / 2 - 100 + 'px',
        width: '200px',
        height: '50px',
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
        top: height / 3 + 'px',
        left: width / 2 - 100 + 'px',
        width: '200px',
        height: '50px',
        borderRadius: '20px',
        fontSize: '18px',
        cursor: 'pointer'
    },
    events: {
        click: function () {
            if (!skins.flag) {
                skins.flag = true;
                stayingHero.changeSkin(...skins[1].stay);
                runningHero.changeSkin(...skins[1].run);
            } else {
                skins.flag = false;
                stayingHero.changeSkin(...skins[0].stay);
                runningHero.changeSkin(...skins[0].run);
            }
        }
    }
});




exports.startButtons = {
    startButton: startButton,
    changeHeroButton: changeHeroButton
};
