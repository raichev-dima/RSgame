'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const background = require('./background').background;
const zombieH = 110;
const zombiePos = constObj.height - (zombieH + constObj.persPos);

const point = constObj.pjs.vector.point;

const zombieDead = constObj.pjs.tiles.newAnimation('img/sprites/zombie_dead_120_110_15.png', 120, zombieH, 15);

const zombies = [];

zombies.spawner = constObj.pjs.OOP.newTimer(2000, function () {
    zombies.push(constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/zombie_71_110_10.png', 71, zombieH, 10),
        w: 71,
        h: zombieH,
        x: constObj.pjs.math.random(hero.content.getPosition().x + 900, hero.content.getPosition().x + 1100), // x 1280
        y: zombiePos,
        delay: 10,
        scale: 1,
    }));
});

zombies.logic = function () {
    constObj.pjs.OOP.forArr(zombies, function (zombie, index) {
        if (!zombie.dead) {
            zombie.draw();
            zombie.move(point(-1, 0));
        } else {
            zombie.setAnimation(zombieDead);
            zombie.move(point(0, 0));
            zombie.w = 120;
            zombie.delay = 3;
            zombie.dead++;
            zombie.drawFrames(0, 14);
        }

        // zombie.drawStaticBox();
        if (zombie.isArrIntersect(bullets) && !zombie.dead) {
            zombie.dead = 1;
            zombie.frame = 0;
            background.countOfZombee++;
            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                if (bullet.isArrIntersect(zombies)) {
                    bullets.splice(i, 1);
                }
            }
        }
        if (zombie.dead > 70) {
            zombies.splice(index,1);
        }
    });
};

exports.zombies = zombies;
