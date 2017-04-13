'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
const background = require('./background').background;
const pennyH = 110;
const pennyPos = constObj.height - (pennyH + constObj.persPos);

const point = constObj.pjs.vector.point;
const size = constObj.pjs.vector.size;

const loadAudio = require('./audio');
const girlDeathCry = loadAudio(['audio/girl_death_cry.mp3'], 1, false);

const girlDead = constObj.pjs.tiles.newAnimation('img/sprites/penny_dead_120_110_15.png', 120, pennyH, 15);


const girls = [];

girls.spawner = constObj.pjs.OOP.newTimer(5000, function () {
    girls.push(constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/penny_70_110_12.png', 70, pennyH, 12),
        w: 70,
        h: pennyH,
        x: constObj.pjs.math.random(hero.content.getPosition().x + 900, hero.content.getPosition().x + 1100), // x 1280
        y: pennyPos,
        delay: 3,
        scale: 1,
    }));
});

girls.logic = function () {
    constObj.pjs.OOP.forArr(girls, function (girl, index) {
        if (!girl.dead) {
            // decrease the girl's box
            girl.setBox({
                offset: point(30, 50),
                size: size(-60, -40)
            });
            girl.draw();
            girl.move(point(-1.3, 0));
        } else {
            girl.setBox({
                offset: point(0, 150),
            });
            girl.setAnimation(girlDead);
            girl.move(point(0, 0));
            girl.w = 120;
            girl.dead++;
            girl.drawFrames(0, 14);
        }

        //girl.drawStaticBox();
        //console.log(bullets);

        if (girl.isArrIntersect(bullets) && !girl.dead) {
            console.log('dima');
            girl.dead = 1;
            girl.frame = 0;
            hero.score -= hero.level*5;
            if (hero.score < 0) {
                hero.score = 0;
            }
            girlDeathCry.play();

            for (let i = 0; i < bullets.length; i++) {
                //let bullet = bullets[i];
                if (bullets[i].isArrIntersect(girls)) {
                    bullets.splice(i, 1);
                };
            }
        }
        if (girl.dead > 70) {
            girls.splice(index, 1);
        }

    });
};

exports.girls = girls;
