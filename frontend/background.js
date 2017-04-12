const constObj = require('./const').constObj;
const hero = require('./man.module').hero;
let nextLevelText = require('./preLoad.module').nextLevelText;
const bgHeight = 280;
const fogWidth = 475;
const bgPos = constObj.height - bgHeight;
const fogPosX = hero.content.getPosition().x + constObj.width - fogWidth - hero.content.x;

let score = 0;
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
            fillColor: "green",
        });
        return partOfLife;
    }
    return life;
}
let counterLife = createCounterLife();

var fog = constObj.game.newImageObject({
    file: 'img/fog.png',
    scale: 1,

});
const backgr1 = constObj.game.newImageObject({
    x: 0,
    y: bgPos,
    file: 'img/main-bg.png',
    scale: 1,
    onload: function () {
        backgr2.x = backgr1.x + backgr1.w;
        backgr3.x = backgr1.x - backgr1.w;
    }

});
const backgr2 = constObj.game.newImageObject({
    x: backgr1.x + backgr1.w,
    y: bgPos,
    file: 'img/main-bg.png',
    scale: 1,

});

const backgr3 = constObj.game.newImageObject({
    x: backgr1.x - backgr1.w,
    y: bgPos,
    file: 'img/main-bg.png',
    scale: 1,

});

const endlessBackGround = function () {

    if (backgr1.x + backgr1.w < hero.content.getPosition().x    ) {
        backgr1.x = backgr3.x + backgr3.w;
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w < hero.content.getPosition().x    ) {
        backgr2.x = backgr1.x + backgr1.w;
    }
    if (backgr3.x + backgr3.w < hero.content.getPosition().x    ) {
        backgr3.x = backgr2.x + backgr2.w;
    }

    if (backgr1.x + backgr1.w > hero.content.getPosition().x + backgr1.w*2) {
        backgr1.x = backgr2.x - backgr2.w;
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w > hero.content.getPosition().x + backgr1.w*2) {
        backgr2.x = backgr3.x - backgr3.w;
    }
    if (backgr3.x + backgr3.w > hero.content.getPosition().x + backgr1.w*2) {
        backgr3.x = backgr1.x - backgr1.w;
    }
};

let drawBackground = function () {
    backgr1.draw();
    backgr2.draw();
    backgr3.draw();
    endlessBackGround();
    fog.setPositionS(constObj.point(fogPosX, bgPos));
    counter.setPositionCS(constObj.point(150, 50));
    nextLevelText.setPositionCS(constObj.point(550, 100));
    counter.draw();
    counterLife.reduce(function (prevResult, item) {
        item.setPositionCS(constObj.point(50 + prevResult, 50));
        return 50 + prevResult;
    }, 780);
    constObj.pjs.OOP.drawArr(counterLife);
}

exports.background = {
    'first': backgr1,
    'bgPos': bgPos,
    'counter': counter,
    'score': score,
    'counterLife': counterLife,
    'drawBackground': drawBackground,
    'fog': fog,
    resetBG: function () {
        backgr1.x = 0;
        backgr2.x = backgr1.x + backgr1.w;
        score = 0;
    }
}
