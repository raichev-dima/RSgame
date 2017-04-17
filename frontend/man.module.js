'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const manH = 140;
const heroPos = constObj.height - (manH + constObj.persPos);


////////////////       AUDIO       ///////////////////////////////
const loadAudio = require('./audio');
//////////////////////////////////////////////////////////////////

function Man(path, width, height, count, name) {
    this.jumpFlag = 'STOP';
    this.name = name || "Bernadett";
    this.levelIsChanged = false;
    this.level = 1;
    this.score = 0;
    this.timer = 0;
    this.counterLife = createCounterLife();
    this.counterLife.lastVisiblePartOfLife = 0;
    this.content = constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation(path, width, height, count),
        w: 100,
        h: manH,
        x: constObj.heroPosX,
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
        color: 'black',
        size: '26',
        align: 'center',
    });
};

const bullets = [];
let bullet;
let shot;

Man.prototype.shooting = function () {
    let start = performance.now();
    // if(!bullet.start || start - bullet.start>= 200) {
    const CONTENT = this.content.x + this.content.w / 2;
    const FLIP = hero.content.flip.x;
    bullet = constObj.game.newRoundRectObject({
        x: FLIP ? CONTENT - 30 : CONTENT + 30,
        y: this.content.y + 78,
        w: 3,
        h: 3,
        radius: 1,
        fillColor: "#FBFE6F",
        userData: {
            direction: FLIP ? -1 : 1,
            life: 2000,
            start: start
        }
    });
    bullets.push(bullet);
    shot = loadAudio(['audio/shot.mp3'], 0.5);
    shot.play();
    // }
};

Man.prototype.bulletFly = function () {
    constObj.OOP.forArr(bullets, function (el) {
        if (performance.now() - el.start <= el.life) {
            if (el.direction == 1) {
                el.draw();
                el.move(constObj.point(7, 0));
            }
            if (el.direction == -1) {
                el.draw();
                el.move(constObj.point(-7, 0));
            }
        } else {
            bullets.splice(el, 1);
        }
    });
}

Man.prototype.jumping = function () {
    if (this.jumpFlag !== 'UP' && this.jumpFlag !== 'DOWN') {
        this.jumpFlag = 'UP';
    }
}

Man.prototype.newtonLaw = function (zeroOrOneOrTwo) {
    let position = this.content.getPosition(zeroOrOneOrTwo);
    if (this.jumpFlag === 'UP') {
        this.content.move(constObj.point(0, -3.9));
        // this.content.drawFrames(9);
        if (!this.banned()) {
            this.content.drawFrames(9);
        }
    }

    if (position.y < (heroPos - manH * 2 + 20) || this.jumpFlag === 'DOWN') {
        this.jumpFlag = 'DOWN';
        this.content.move(constObj.point(0, 3.9));
        if (constObj.key.isDown('SPACE')) {
            if (!this.banned()) {
                hero.content.drawFrame(1);
            };
        } else {
            if (!this.banned()) {
                this.content.drawFrames(10);
            }
        }
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
    return (Date.now() - Man.prototype.bannedTime < Man.prototype.bannedForTime * 1000);
}

Man.prototype.drawManElements = function () {
    this.bulletFly();
    this.drawName();
    this.newtonLaw(1);
}

Man.prototype.reset = function () {
    this.content.w = 100;
    this.content.h = manH;
    this.content.x = constObj.heroPosX;
    this.content.y = heroPos;
    this.content.delay = 10;
    this.content.scale = 1;
    this.died = false;
    this.level = 1;
    heroScore = 0;
};

Man.prototype.getLevel = function () {
    this.levelIsChange = false;
    if (this.getScore() < 10 && this.level == 1 ) {
        this.level = 1;
    }
    if ((this.getScore() < 30 && this.getScore()  > 10) && (this.level != 3 && this.level != 4 && this.level != 5 ) ) {
        if (this.level != 2) {
            this.level = 2;
            this.levelIsChange = true;
        }
    }
    if ((this.getScore() < 70 && this.getScore()  > 30) && (this.level != 4 && this.level != 5 )) {
        if (this.level != 3) {
            this.level = 3;
            this.levelIsChange = true;
        }
    }
    if ((this.getScore()  < 150 && this.getScore()  > 70)  && this.level != 5 ) {
        if (this.level != 4) {
            this.level = 4;
            this.levelIsChange = true;
        }
    }
    if ((this.getScore() > 150) || this.level == 5) {
        if (this.level != 3) {
            this.level = 3;
            this.levelIsChange = true;
        }
    }
    /*
    if (this.content.getPosition().x > 6000) {
        this.isWin = true;
    }
    */
    return this.levelIsChange;
}

let heroScore = 0;

Man.prototype.getScore = function() {
    return heroScore;
}

Man.prototype.setScore = function(value) {
    heroScore += value;
    if (heroScore < 0) {
        heroScore = 0;
    }
}

let counter = constObj.game.newTextObject({
    text: '',
    size: 30,
    padding: 10,
    color: "#000000",
});


function createCounterLife() {
    let x = 5;
    let life = [];
    for (let i = 0; i < 5; i++) {
        x += 50;
        life.push(addPartOfLife(x));
    }

    function addPartOfLife(x) {
        let partOfLife = constObj.game.newRectObject({
            x: x,
            y: 60,
            w: 50,
            h: 20,
            fillColor: "darkred",
        });
        return partOfLife;
    }
    return life;
}


let hero = new Man("img/sprites/bernadett_test.png", 205, 236, 15);

exports.Man = Man;
exports.bullets = bullets;
exports.hero = hero;
exports.heroPos = heroPos;
