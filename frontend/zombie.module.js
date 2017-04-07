'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const bullets = require('./man.module').bullets;
const stayingHero = require('./man.module').stayingHero;
const runningHero = require('./man.module').runningHero;
const background = require('./background').background;

const point = constObj.pjs.vector.point;

const zombieDead = constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_1_dead.png', 123, 75, 1);

const zombies = [];

zombies.spawner = constObj.pjs.OOP.newTimer(2000, function () {
    zombies.push(constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_10.png', 74, 115, 10),
        w: 74,
        h: 115,
        x: constObj.pjs.math.random(stayingHero.content.getPosition().x + 320, stayingHero.content.getPosition().x + 850), // x 1280
        y: 240,
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
            zombie.y = 330;
            zombie.w = 123;
            zombie.h = 75;
            zombie.dead++;
            zombie.draw();
        }

        // zombie.drawStaticBox();
        if (zombie.isArrIntersect(bullets)) {
            zombie.dead = 1;
            background.countOfZombee++
            console.log('зомби = ' + background.countOfZombee);

            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                if (bullet.isArrIntersect(zombies)) {
                    bullets.splice(i, 1);
                };
            }

        };


        if (runningHero.content.isStaticIntersect(zombie.getStaticBox())) {
            zombie.dead = 1;
        };

        if (zombie.dead > 300) {
            zombies.splice(index,1);
        }

    });
};

exports.zombies = zombies;
