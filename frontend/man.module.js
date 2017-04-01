'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./game').constObj;

const man = constObj.game.newAnimationObject({
    animation: constObj.pjs.tiles.newAnimation('img/sprites/human_114_8.png', 114, 114, 8),
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

exports.man = man;
