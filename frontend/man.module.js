'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;


function Man(path, width, heigth, count){
    this.name = "Charlie";
    this.content = constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/run-rigth.png', 190, 377, 5),
        w: 100,
        h: 140,
        x: 120,
        y: 220,
        delay: 10,
        scale: 1,
    })
}


Man.prototype.drawName = function () {
    constObj.pjs.brush.drawText({
        x: this.content.x + this.content.w / 2 + 10,
        y: this.content.y - 20,
        text: this.name,
        color: '#FFF',
        size: '20',
        align: 'center',
    });
};

const bullets = [];

Man.prototype.shooting = function () {

    if (!this.shootFlag) {
        this.shootFlag = true;
        console.log('shooting');
        let bullet = constObj.game.newRoundRectObject({
            x: this.content.x + this.content.w / 2 + 32,
            y: this.content.y + 64,
            w: 3,
            h: 3,
            radius: 1,
            fillColor: "#FBFE6F",
        });
        bullets.push(bullet);
        setTimeout(() => this.shootFlag = false, 1500);
    };
};

Man.prototype.bulletFly = function () {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        bullet.draw();
        bullet.move(constObj.point(10, 0));
    };
}

Man.prototype.jumping = function () {
    let position = this.content.getPosition(1);
    this.jumpFlag = true;
}

Man.prototype.newtonLaw = function (zeroOrOneOrTwo) {
    let position = this.content.getPosition(zeroOrOneOrTwo);
    if (this.jumpFlag === true) {
        console.log(this.jumpFlag, position);
        this.content.move(constObj.point(0, -8.8));
    }

    if (position.y < 160) {
        this.jumpFlag = false;
    }

    if (position.y < 295 && this.jumpFlag === false) {
        this.content.move(constObj.point(0, 3.9));
    }
    //console.log(position);
}

Man.prototype.drawManElements = function () {
    this.bulletFly();
    this.drawName();
    this.newtonLaw(1);
}

let stayingHero = new Man("img/sprites/staying.png", 190, 377, 1);
let runningHero = new Man("img/sprites/staying.png", 190, 377, 5);

exports.Man = Man;
exports.bullets = bullets;
exports.stayingHero = stayingHero;
exports.runningHero = runningHero;

