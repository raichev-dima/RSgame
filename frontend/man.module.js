'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;



function Man(path, width, height, count, name){
    this.name = name || "Where is my Name?";
    this.content = constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation(path, width, height, count),
        w: 100,
        h: 140,
        x: 120,
        y: 220,
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
        if (bullet.x >= stayingHero.content.getPosition().x + 780 || bullet.x <= stayingHero.content.getPosition().x - 780) {
            bullets.splice(i, 1);
        }
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
        if (constObj.key.isDown('RIGHT')) {
            runningHero.content.move(constObj.point(2, 0));
            stayingHero.content.move(constObj.point(2, 0));
        }
        if (constObj.key.isDown('LEFT')) {
            runningHero.content.move(constObj.point(-2, 0));
            stayingHero.content.move(constObj.point(-2, 0));
        }
        this.content.move(constObj.point(0, -8.8));
    }

    if (position.y < 80) {
        this.jumpFlag = false;
    }

    if (position.y < 287 && this.jumpFlag === false) {
        this.content.move(constObj.point(0, 3.9));
        if (constObj.key.isDown('RIGHT')) {
            runningHero.content.move(constObj.point(2, 0));
            stayingHero.content.move(constObj.point(2, 0));
        }
        if (constObj.key.isDown('LEFT')) {
            runningHero.content.move(constObj.point(-2, 0));
            stayingHero.content.move(constObj.point(-2, 0));
        }
    }
    //console.log(position);
}

Man.prototype.drawManElements = function () {
    this.bulletFly();
    this.drawName();
    this.newtonLaw(1);
}

let stayingHero = new Man("img/sprites/staying_by_Egor.png", 192, 358, 1);
let runningHero = new Man("img/sprites/run-right.png", 192, 358, 5);

exports.Man = Man;
exports.bullets = bullets;
exports.stayingHero = stayingHero;
exports.runningHero = runningHero;


