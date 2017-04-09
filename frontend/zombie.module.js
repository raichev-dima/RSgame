'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const background = require('./background').background;
const zombieH = 110;
const zombiePos = constObj.height - (zombieH + constObj.persPos);


////////////////    AUDIO    /////////////////////////////////////////
const loadAudio = require('./audio');
const zombieAttack = loadAudio(['audio/zombie_attack.mp3'], 1, false);
const zombieDeathCry = loadAudio(['audio/zombie_death_cry.mp3'], 1, false);
//////////////////////////////////////////////////////////////////////

const point = constObj.pjs.vector.point;

const zombieDead = constObj.pjs.tiles.newAnimation('img/sprites/zombie_dead_120_110_15.png', 120, zombieH, 15);

let zombies = [];

zombies.spawner = constObj.pjs.OOP.newTimer(2000, function () {
    zombies.push(constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/zombie_70_110_13.png', 70, zombieH, 10),
        w: 70,
        h: zombieH,
        x: constObj.pjs.math.random(hero.content.getPosition().x + 900, hero.content.getPosition().x + 1100), // x 1280
        y: zombiePos,
        delay: 10,
        scale: 1,
    }));
});

zombies.logic = function () {

    constObj.pjs.OOP.forArr(zombies, function (zombie, index) {
        // zombie.drawStaticBox();
        if (!zombie.dead) {
            let heroPos = hero.content.getPosition().x;
            let zombiePos = zombie.getPosition().x;
            if (heroPos - zombiePos > 0) {
                zombie.setFlip(true, false);
                zombie.goTo = 'right';
            } else {
                if (zombie.goTo === 'right') {
                    zombie.goTo = 'left';
                    zombie.setFlip(false, false);
                }
            }
            if (zombie.isIntersect(hero.content)) {
                  console.log('hit!'); // зомби жрет героя

                  zombieAttack.play();//zombie attack sound

                zombie.move(point(0, 0));
                zombie.setDelay(20);
                zombie.drawFrames(10,12);
            } else {
                zombie.moveTo(point(hero.content.getPosition().x, constObj.height - zombie.h - 20), .5);
                zombie.draw();
            }
        } else {
            zombie.setAnimation(zombieDead);
            zombie.move(point(0, 0));
            zombie.w = 120;
            zombie.setDelay(3);
            zombie.dead++;
            zombie.drawFrames(0, 14);
        }

        // zombie.drawStaticBox();
        if (zombie.isArrIntersect(bullets) && !zombie.dead) {

            zombie.dead = 1;
            zombie.frame = 0;
            background.countOfZombee++;

            zombieDeathCry.play();//zombie death sound


            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                if (bullet.isArrIntersect(zombies)) {
                    bullets.splice(i, 1);
                }
            }
        }

        if (zombie.dead > 70) {
            zombies.splice(index, 1);
        }
    });
};

exports.zombies = zombies;
