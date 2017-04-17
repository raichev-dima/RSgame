'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const man = require('./man.module').man;
const bullets = require('./man.module').bullets;
const hero = require('./man.module').hero;
//const background = require('./background').background;
const birdH = 182;
const birdPos = constObj.height - (birdH + constObj.persPos);

const point = constObj.pjs.vector.point;
const size = constObj.pjs.vector.size;

const loadAudio = require('./audio');
//const birdDeathCry = loadAudio(['audio/bird_death_cry.mp3'], 1, false);

const birdAlive = constObj.pjs.tiles.newAnimation('img/sprites/bird_with_box_186_182_14.png', 187.5, birdH, 14);
const birdDead = constObj.pjs.tiles.newAnimation('img/sprites/bird_test_186_182_14.png', 187.5, birdH, 14);
let box = constObj.pjs.tiles.newAnimation('img/sprites/box_63_66_1.png', 63, 66, 1);
const bomb = constObj.pjs.tiles.newAnimation('img/sprites/box_63_66_1.png', 63, 66, 1);
const heart = constObj.pjs.tiles.newAnimation('img/sprites/heart_63_66_1.png', 63, 66, 1);

const boxDead = constObj.pjs.tiles.newAnimation('img/sprites/ice_nova_180_140_13.png', 180, 140, 13);


const birds = [];
const boxes = [];

birds.getBoxes = function () {
    return boxes;
};
birds.getFreezeBoxes = function () {
    return boxes.filter((box) => box.freeze);
};
birds.getHeartBoxes = function () {
    return boxes.filter((box) => box.heart);
};

birds.spawner = constObj.pjs.OOP.newTimer(1000, function () {
    birds.push(constObj.game.newAnimationObject({
        animation: birdAlive,
        w: 187.5,
        h: birdH,
        x: constObj.pjs.math.random(hero.content.getPosition().x + 900, hero.content.getPosition().x + 1100), // x 1280
        y: constObj.pjs.math.random(50, constObj.height - 374),
        delay: 3,
        scale: 0.35,
    }));
});

birds.logic = function () {
    boxes.logic();
    constObj.pjs.OOP.forArr(birds, function (bird, index) {
        if (!bird.dead) {
            // decrease the bird's box
            bird.setBox({
                offset: point(25, 25),
                size: size(-25, -30)
            });
            bird.draw();
            bird.move(point(-2.5, 0));

            // let randomFly = constObj.pjs.math.random(0, 100); Experemental
            // if (randomFly < 10) {
            //     bird.move(point(-2.5, 1));
            // } else if (randomFly > 90) {
            //     bird.move(point(-2.5, -1));
            // }
        } else {
            bird.setBox({
                offset: point(-1000, -1000),
                size: size(1, 1)
            });
            bird.setAnimation(birdDead);
            bird.move(point(-5, -1));
            bird.dead++;
            bird.drawFrames(0, 13);
        }

        //bird.drawStaticBox();
        //console.log(bullets);

        if ((bird.isArrIntersect(bullets) && !bird.dead) || !bird.dead && hero.content.getPosition().x >= bird.getPosition().x) {
            bird.dead = 1;
            bird.frame = 0;

            //birdDeathCry.play();

            for (let i = 0; i < bullets.length; i++) {
                //let bullet = bullets[i];
                if (bullets[i].isArrIntersect(birds)) {
                    bullets.splice(i, 1);
                };
            }
            if (Math.random() > 0.2) {
                box = bomb;
            }
            else {
                box = heart;
            }
            boxes.push(constObj.game.newAnimationObject({
                animation: box,
                w: 180,
                h: 140,
                x: bird.getPosition().x,
                y: bird.getPosition().y,
                delay: 3,
                scale: 0.35,
            }));

        }
        if (bird.dead > 150) {
            birds.splice(index, 1);
        }

    });
};

boxes.logic = function () {
    constObj.pjs.OOP.forArr(boxes, function (box, index) {
        if (box.getPosition().y > constObj.height - constObj.persPos - 25) {
            if (box.anim.image.file == 'img/sprites/box_63_66_1.png') {
                box.freeze = true;
            }
            else {
                box.heart = true;
            }
            box.setBox({
                offset: point(-25, 0),
                size: size(50, 0),
            });
            box.setAnimation(boxDead);
            box.drawToFrame(13);
            box.move(point(0, -5));
            if (box.frame === 12) {
                boxes.splice(index, 1);
            };
        } else {
            box.draw();
            box.move(point(0, 5));
        }
    });
};

exports.birds = birds;
