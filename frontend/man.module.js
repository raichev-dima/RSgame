'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./game').constObj;

const point = constObj.pjs.vector.point;

const man = constObj.game.newAnimationObject({
    animation: constObj.pjs.tiles.newAnimation('img/sprites/human_114_8.png', 90, 110, 8),
    w: 90,
    h: 110,
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

const bullets = [];

man.shooting = function () {

    if (!this.shootFlag) {
        this.shootFlag = true;
        console.log('shooting');
        let bullet = constObj.game.newRoundRectObject({
            x: this.x + this.w / 2 + 32,
            y: this.y + 64,
            w: 3,
            h: 3,
            radius: 1,
            fillColor: "#FBFE6F",
        });
        bullets.push(bullet);
        setTimeout( () => this.shootFlag = false, 300);
    };
};

man.bulletFly = function () {
    for (let i=0; i<bullets.length; i++) {
        let bullet = bullets[i];
        bullet.draw();
        bullet.move(point(1, 0));
    };
}

man.drawManElements = function () {
    man.bulletFly();
    man.draw();
    man.drawName();
}

exports.man = man;
exports.bullets = bullets;
