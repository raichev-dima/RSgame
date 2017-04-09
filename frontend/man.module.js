'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const manH = 140;
const heroPos = constObj.height - (manH + constObj.persPos);

function Man(path, width, height, count, name) {
    this.jumpFlag = 'STOP';
    this.name = name || "Where is my Name?";
    this.content = constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation(path, width, height, count),
        w: 100,
        h: manH,
        x: 120,
        y: heroPos,
        delay: 10,
        scale: 1,
    });
}
Man.prototype.changeSkin = function (path, width, height, count, name) {
    let skin = constObj.pjs.tiles.newAnimation(path, width, height, count);
    this.content.setAnimation(skin);
    this.name = name;
};

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
            y: this.content.y + 82,
            w: 3,
            h: 3,
            radius: 1,
            fillColor: "#FBFE6F",
        });
        bullets.push(bullet);
        setTimeout(() => this.shootFlag = false, 300);
    };
};

Man.prototype.bulletFly = function () {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        bullet.draw();

        if (constObj.key.isDown('LEFT')) {
            bullet.x = bullet.x - 10;
        } else {
            bullet.x = bullet.x + 10;
        }
        if (bullet.x >= hero.content.getPosition().x + 780 || bullet.x <= hero.content.getPosition().x - 780) {
            bullets.splice(i, 1);
        }
    };
}

Man.prototype.jumping = function () {
    this.jumpFlag = 'UP';
}

Man.prototype.newtonLaw = function (zeroOrOneOrTwo) {
    let position = this.content.getPosition(zeroOrOneOrTwo);
    if (this.jumpFlag === 'UP') {
        //console.log(this.jumpFlag, position, this.content);
        this.content.move(constObj.point(0, -3.9));
        this.content.drawFrames(9);
        //console.log(position.y);
    }

    if (position.y < (heroPos - manH * 2 + 20) || this.jumpFlag === 'DOWN') {
        this.jumpFlag = 'DOWN';
        this.content.move(constObj.point(0, 3.9));
        this.content.drawFrames(10);
        if (position.y > (heroPos + manH / 2)) {
            this.jumpFlag = 'STOP';
        }
    }
}

Man.prototype.drawManElements = function () {
    this.bulletFly();
    this.drawName();
    this.newtonLaw(1);
}

Man.prototype.reset = function () {
    this.content.drawStaticBox();
    this.content.w = 100;
    this.content.h = manH;
    this.content.x = 120;
    this.content.y = heroPos;
    this.content.delay = 10;
    this.content.scale = 1;
    this.died = false;
};

let hero = new Man("img/sprites/bernadett.png", 205, 236, 14);

exports.Man = Man;
exports.bullets = bullets;
exports.hero = hero;
exports.heroPos = heroPos;
