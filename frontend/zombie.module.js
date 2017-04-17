'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const birds = require('./bird.module').birds;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
//const background = require('./background').background;
const zombieH = 110;
const zombiePos = constObj.height - (zombieH + constObj.persPos);

////////////////    AUDIO    ///////////////////////////////////////////////////
const loadAudio = require('./audio');
const zombieAttackSound = loadAudio(['audio/zombie_attack.mp3'], 0.5, false);
const zombieDeathCrySound = loadAudio(['audio/zombie_death_cry.mp3'], 0.5, false);
////////////////////////////////////////////////////////////////////////////////


const point = constObj.pjs.vector.point;

const zombieDead = constObj.pjs.tiles.newAnimation('img/sprites/zombie_dead_120_110_15.png', 120, zombieH, 15);
const zombieMedium = constObj.pjs.tiles.newAnimation('img/sprites/zombie_medium_70_110_14.png', 70, zombieH, 10);
const zombieSimple = constObj.pjs.tiles.newAnimation('img/sprites/zombie_70_110_14.png', 70, zombieH, 10);

let zombies = [];

zombies.spawner = constObj.pjs.OOP.newTimer(2000, function () {
    let zombie = constObj.game.newAnimationObject({
        animation: zombieSimple,
        w: 70,
        h: zombieH,
        x: constObj.pjs.math.random(hero.content.getPosition().x + 900, hero.content.getPosition().x + 1100), // x 1280
        y: zombiePos,
        delay: 10,
        scale: 1,
    });
    let zombieType = function () {
        let prop;
        if (!prop) {
            (function () {
                prop = {};
                let random = constObj.pjs.math.random(1, 2);
                switch (random) {
                    case 1:
                        prop.type = 'simple';
                        prop.health = 1;
                        zombie.setAnimation(zombieSimple);
                        break;
                    case 2:
                        prop.type = 'medium';
                        prop.health = 2;
                        zombie.setAnimation(zombieMedium);
                        break;
                    case 3:
                        type = 'hard';
                        break;
                }
            }());
        }
        return prop;
    }

    zombie.setUserData({
        zomboType: zombieType().type,
        health: zombieType().health,
        banned: function (timerInSeconds) {
            if (timerInSeconds) {
                zombie.bannedTime = Date.now();
                zombie.bannedForTime = timerInSeconds;
            }
            return (Date.now() - zombie.bannedTime < zombie.bannedForTime * 1000);
        }
    });
    zombies.push(zombie);
});

zombies.logic = function () {

    constObj.pjs.OOP.forArr(zombies, function (zombie, index) {
        if (!zombie.dead && !zombie.banned()) {
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
                if (zombieAttackSound.dom.paused) {
                    zombieAttackSound.play();
                }
                zombie.move(point(0, 0));
                zombie.setDelay(20);
                zombie.drawFrames(10, 12);
            } else {
                zombie.moveTo(point(hero.content.getPosition().x, constObj.height - zombie.h - constObj.persPos), .5);
                zombie.draw();
            }
        } else if(zombie.banned() && !zombie.dead) {
            zombie.move(point(0, 0));
            zombie.drawFrames(13, 13);
        } else {
            zombie.setAnimation(zombieDead);
            zombie.move(point(0, 0));
            zombie.w = 120;
            zombie.setDelay(3);
            zombie.dead++;
            zombie.drawFrames(0, 14);
        }

        if (zombie.isArrIntersect(bullets) && !zombie.dead) {
            zombie.health--;
            zombie.health === 0 ? zombie.dead = true : null;
            zombie.frame = 0;
            hero.setScore(hero.level);

            zombieDeathCrySound.play();

            for (let i = 0; i < bullets.length; i++) {
                let bullet = bullets[i];
                if (bullet.isArrIntersect(zombies)) {
                    bullets.splice(i, 1);
                }
            }
        }

        if (zombie.isArrIntersect(birds.getFreezeBoxes()) && !zombie.dead) {
            zombie.banned(2);
        }

        if (zombie.dead > 70) {
            zombies.splice(index, 1);
        }
    });
};

exports.zombies = zombies;
