'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const background = require('./background').background;

const point = constObj.pjs.vector.point;

const zombieDead = constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_1_dead.png', 123, 75, 1);

const zombies = [];

zombies.spawner = constObj.pjs.OOP.newTimer(2000, function () {
    zombies.push(constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_10.png', 74, 115, 10),
        w: 74,
        h: 115,
        x: constObj.pjs.math.random(hero.content.getPosition().x + 320, hero.content.getPosition().x + 850), // x 1280
        y: 240,
        delay: 10,
        scale: 1,
    }));
});


zombies.logic = function () {
    
    constObj.pjs.OOP.forArr(zombies, function (zombie, index) {
        zombie.drawStaticBox();
        if (!zombie.dead) {
            zombie.draw();
            zombie.moveTo( point(hero.content.getPosition().x, 228), .65 );
            //zombie.move(point(-1, 0));
        } else {
            zombie.setAnimation(zombieDead);
            zombie.move(point(0, 0));
            zombie.y = 330;
            zombie.w = 123;
            zombie.h = 75;
            zombie.dead++;
            zombie.draw();
        }
        // if (zombie.isIntersect(hero.content)) {
        //     console.log('hey');
        //     zombie.move(point(1, 0));
        // }
        if (zombie.isArrIntersect(bullets)) {
            zombie.dead = 1;
            background.countOfZombee++;
            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                if (bullet.isArrIntersect(zombies)) {
                    bullets.splice(i, 1);
                }
            }
        }
        if (zombie.dead > 300) {
            zombies.splice(index, 1);
        }
    });
};

exports.zombies = zombies;
