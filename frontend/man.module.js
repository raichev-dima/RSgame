'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./game').constObj;

const point = constObj.pjs.vector.point;

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

const bullets = [];

man.shooting = function () {

    if (!this.shootFlag) {
        this.shootFlag = true;
        console.log('shooting');
        let bullet = constObj.game.newRoundRectObject({
            x: this.x + this.w / 2 + 110,
            y: this.y + 45,
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
    man.draw();
    man.drawName();
    man.drawGun();
    man.bulletFly();
}

exports.man = man;
exports.bullets = bullets;
