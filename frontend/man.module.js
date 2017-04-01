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

man.name = "Charlie";
man.drawName = function () {
    constObj.pjs.brush.drawText({
        x: this.x + this.w / 2 + 10,
        y: this.y - 20,
        text: this.name,
        color: '#FFF',
        size: '20',
        align: 'center',
    });
};

man.drawGun = function () {
    constObj.pjs.brush.drawImage({
        file: "img/gun1.png",
        x: this.x + this.w / 2 + 40,
        y: this.y + 45,
    });
};

man.drawManElements = function() {
    man.draw();
    man.drawName();
    man.drawGun();
}

exports.man = man;
