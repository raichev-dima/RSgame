'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const manH = 140;
const heroPos = constObj.height - (manH + constObj.persPos);

function Man(path, width, height, count, name) {
    this.jumpFlag = 'STOP';
    this.name = name || "Bernadett";
    this.levelIsChanged = false;
    this.level = 1;
    this.timer = 0;
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
    if (this.jumpFlag !== 'UP' && this.jumpFlag !== 'DOWN') {
        this.jumpFlag = 'UP';
    }
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

Man.prototype.banned = function (timerInSeconds) {
    if (timerInSeconds) {
        Man.prototype.bannedTime = Date.now();
        Man.prototype.bannedForTime = timerInSeconds;
    }
    return (Date.now() - Man.prototype.bannedTime < Man.prototype.bannedForTime*1000);
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

Man.prototype.getLevel = function() {
    this.levelIsChange = false;
    if (this.content.getPosition().x < 1000 && this.level == 1 ) {
        this.level = 1;
    }
    if ((this.content.getPosition().x < 2000 && this.content.getPosition().x > 1000) && this.level != 3) {
        if (this.level != 2) {
            this.level = 2;
            this.levelIsChange = true;
        }
    }
    if ((this.content.getPosition().x < 3000 && this.content.getPosition().x > 2000) || this.level == 3) {
        if (this.level != 3) {
            this.level = 3;
            this.levelIsChange = true;
        }
    }
    if (this.content.getPosition().x > 4000) {
        console.log('FINAL PAGE');
    }
    return this.levelIsChange;
}

let hero = new Man("img/sprites/bernadett_test.png", 205, 236, 15);

exports.Man = Man;
exports.bullets = bullets;
exports.hero = hero;
exports.heroPos = heroPos;
