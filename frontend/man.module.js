'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./game').constObj;

const point = constObj.pjs.vector.point;

const man = constObj.game.newAnimationObject({
    animation: constObj.pjs.tiles.newAnimation('img/sprites/run-rigth.png', 190, 377, 5),
    w: 100,
    h: 140,
    x: 120,
    y: 220,
    delay: 10,
    scale: 1,
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
        setTimeout(() => this.shootFlag = false, 1500);
    };
};

man.bulletFly = function () {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        bullet.draw();
        bullet.move(point(10, 0));
    };
}

man.jumping = function () {
    let position = this.getPosition(1);
    man.jumpFlag = true;
}

man.newtonLaw = function (zeroOrOneOrTwo) {
    let position = this.getPosition(zeroOrOneOrTwo);
    if (man.jumpFlag === true) {
        console.log(man.jumpFlag, position);
        man.move(point(0, -8.8));
    }

    if (position.y < 160) {
        man.jumpFlag = false;
    }

    if (position.y < 295 && man.jumpFlag === false) {
        this.move(point(0, 3.9));
    }
    //console.log(position);
}

man.drawManElements = function () {
    man.bulletFly();
    man.drawName();
    man.newtonLaw(1);
}

exports.man = man;
exports.bullets = bullets;
