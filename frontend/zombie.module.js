'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./game').constObj;
const man = require('./man.module').man;

const point = constObj.pjs.vector.point;

const zombieDead = constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_1_dead.png', 184, 115, 1);

const zombies = [];
zombies.spawner = constObj.pjs.OOP.newTimer(1000, function () {
    zombies.push(constObj.game.newAnimationObject({
        animation: constObj.pjs.tiles.newAnimation('img/sprites/zombie_75_115_10.png', 73.72, 115, 10),
        w: 73.65,
        h: 115,
        x: constObj.pjs.math.random(man.getPosition().x + 320, man.getPosition().x + 850), // x 1280
        y: 240,
        delay: 10,
        scale: 1,
    }));
});


zombies.logic = function() { return constObj.pjs.OOP.forArr(zombies, function (zombie) {
            
            if (!zombie.flag) {
                zombie.draw();
                zombie.move(point(-1, 0));
            } else {
                zombie.setAnimation(zombieDead);
                zombie.setFlip(1,0);
                zombie.move(point(0, 0));
                zombie.y = 285;
                zombie.draw();
            }
            zombie.drawStaticBox();
            if (man.isStaticIntersect(zombie.getStaticBox())) {
                zombie.flag = true;
            }

        });
};

exports.zombies = zombies;
