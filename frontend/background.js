const constObj = require('./const').constObj;
const hero = require('./man.module').hero;

let countOfZombee = 0;
let countOfGirl = 0;
let counterZ = constObj.game.newTextObject( {
    text : '',
    size : 20,
    padding : 10,
    color : "#000000",
});
let counterG = constObj.game.newTextObject( {
    text : '',
    size : 20,
    padding : 10,
    color : "#000000",
});

function createCounterLife() {
    let x = 5;
    let life = [];
    for (let i = 0; i < 5; i++) {
        x += 50;
        life.push(addPartOfLife(x));
    }
    function addPartOfLife(x) {
        let partOfLife =  constObj.game.newRectObject( {
            x : x,
            y : 60,
            w : 50,
            h : 20,
            fillColor : "green",
        });
        return partOfLife;
    }
    return life;
}
let counterLife = createCounterLife();

const backgr1 = constObj.game.newImageObject({
    x: 0,
    y: 0,
    file: 'img/bg2_wide.jpg',
    scale: 1.4,
    onload: function () {
        backgr2.x = backgr1.x + backgr1.w;
    }

});
const backgr2 = constObj.game.newImageObject({
    x: backgr1.x + backgr1.w,
    y: 0,
    file: 'img/bg2_wide.jpg',
    scale: 1.4,

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

let drawBackground = function() {
    backgr1.draw();
    backgr2.draw();
    endlessBackGround();
    counterZ.setPositionCS( constObj.point(100, 30));
    counterG.setPositionCS( constObj.point(100, 50));
    counterZ.reStyle({
        text: "Убито зомби: " + countOfZombee
    })
    counterZ.draw();
    counterG.reStyle({
        text: "Убито герлов: " + countOfGirl
    })
    counterG.draw();
    counterLife.reduce(function(prevResult, item) {
        item.setPositionCS( constObj.point(50 + prevResult, 30));
        return 50+prevResult;
    },600);
    constObj.pjs.OOP.drawArr(counterLife);
}


exports.background = {'first': backgr1,
    //'second':backgr2,
    //'endlessBackGround':endlessBackGround,
    'counterZ': counterZ,
    'counterG': counterG,
    'countOfZombee':countOfZombee,
    'countOfGirl':countOfGirl,
    'counterLife':counterLife,
    'drawBackground':drawBackground
}