const constObj = require('./const').constObj;
const hero = require('./man.module').hero;
let nextLevelText = require('./preLoad.module').nextLevelText;
const bgHeight = 280;
const bgPos = constObj.height - bgHeight;

let counter = constObj.game.newTextObject({
    text: '',
    size: 36,
    padding: 15,
    color: "darkred",
});

let counterLife = createCounterLife();

let drawCounters = function () {
    counter.setPositionCS(constObj.point(80, constObj.height - 130));
    nextLevelText.setPositionCS(constObj.point(550, 150));
    counter.draw();
    hero.counterLife.reduce(function (prevResult, item) {
        item.setPositionCS(constObj.point(50 + prevResult, constObj.height - 130));
        return 50 + prevResult;
    }, 800);
    constObj.pjs.OOP.drawArr(hero.counterLife);
}

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


exports.counters = {
    'counter': counter,
    'counterLife': counterLife,
    'drawCounters': drawCounters,

}
