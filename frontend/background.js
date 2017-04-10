const constObj = require('./const').constObj;
const hero = require('./man.module').hero;
let nextLevelText = require('./preLoad.module').nextLevelText;
const bgHeight = 280;
const bgPos = constObj.height - bgHeight;

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

const backgr1 = constObj.game.newImageObject({
    x: 0,
    y: bgPos,
    file: 'img/main-bg.png',
    scale: 1,
    onload: function () {
        backgr2.x = backgr1.x + backgr1.w;
    }

});
const backgr2 = constObj.game.newImageObject({
    x: backgr1.x + backgr1.w,
    y: bgPos,
    file: 'img/main-bg.png',
    scale: 1,

});
const endlessBackGround = function () { // аргумент s — это скорость движения фона

    if (backgr1.x + backgr1.w < hero.content.getPosition().x - 320) { // если ушел
        backgr1.x = backgr2.x + backgr2.w; // перемещаем его сразу за вторым
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w < hero.content.getPosition().x - 320) {
        backgr2.x = backgr1.x + backgr1.w; // позиционируем за первым
    }

    if (backgr1.x + backgr1.w < hero.content.getPosition().x - 320) { // если ушел
        backgr1.x = backgr2.x + backgr2.w; // перемещаем его сразу за вторым
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w < hero.content.getPosition().x - 320) {
        backgr2.x = backgr1.x + backgr1.w; // позиционируем за первым
    }
};

let drawBackground = function () {
    backgr1.draw();
    backgr2.draw();
    endlessBackGround();
    counter.setPositionCS(constObj.point(150, 50));
    nextLevelText.setPositionCS(constObj.point(450, 100));
    counter.draw();
    counterLife.reduce(function (prevResult, item) {
        item.setPositionCS(constObj.point(50 + prevResult, 50));
        return 50 + prevResult;
    }, 600);
    constObj.pjs.OOP.drawArr(counterLife);
}

exports.background = {
    'first': backgr1,
    'bgPos': bgPos,
    'counter': counter,
    'score': score,
    'counterLife': counterLife,
    'drawBackground': drawBackground,
    resetBG: function () {
        backgr1.x = 0;
        backgr2.x = backgr1.x + backgr1.w;
        score = 0;
    }
}
