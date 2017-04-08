'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const background = require('./background').background;
const zombieH = 115;
const zombiePos = constObj.height - (zombieH + constObj.persPos);

const point = constObj.pjs.vector.point;

const zombieDead = constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_1_dead.png', 123, zombieH, 1);

const zombies = [];

zombies.spawner = constObj.pjs.OOP.newTimer(2000, function () {
    zombies.push(constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_10.png', 74, zombieH, 10),
        w: 74,
        h: zombieH,
        x: constObj.pjs.math.random(hero.content.getPosition().x + 900, hero.content.getPosition().x + 1100), // x 1280
        y: zombiePos,
        delay: 10,
        scale: 1,
    }));
});

let timer = 0;
let i = 0;
zombies.logic = function () {
    constObj.pjs.OOP.forArr(zombies, function (zombie, index) {
        if (!zombie.dead) {
            zombie.draw();
            zombie.move(point(-1, 0));
        } else {
            zombie.setAnimation(zombieDead);
            zombie.move(point(0, 0));
            zombie.w = 123;
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


        if (hero.content.isArrIntersect(zombies.filter(function(item) {
                return (item.dead) ?  false :  true;
            }))) {
            timer++;
            if (timer >= 500) {;
                timer = 0;
                if (i < 5) {
                    background.counterLife[i].visible = false;
                    i++;
                }
            }
        }
        if (!hero.content.isArrIntersect(zombies)) {
            timer = 0;
        }

        if (zombie.dead > 300) {
            zombies.splice(index,1);
        }

    });
};

exports.zombies = zombies;
