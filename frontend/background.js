const constObj = require('./const').constObj;
const runningHero = require('./man.module').runningHero;

let countOfZombee = 0;
let counter = constObj.game.newTextObject( {
    text : '',
    size : 20,
    padding : 10,
    color : "#000000",
    strokeWidth : 2,
});

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

    if (backgr1.x + backgr1.w < runningHero.content.getPosition().x - 320) { // если ушел
        backgr1.x = backgr2.x + backgr2.w; // перемещаем его сразу за вторым
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w < runningHero.content.getPosition().x - 320) {
        backgr2.x = backgr1.x + backgr1.w; // позиционируем за первым
    }

    if (backgr1.x + backgr1.w < runningHero.content.getPosition().x - 320) { // если ушел
        backgr1.x = backgr2.x + backgr2.w; // перемещаем его сразу за вторым
    }
    // аналогично для второго
    if (backgr2.x + backgr2.w < runningHero.content.getPosition().x - 320) {
        backgr2.x = backgr1.x + backgr1.w; // позиционируем за первым
    }
};


exports.background = {'first': backgr1,
    'second':backgr2,
    'endlessBackGround':endlessBackGround,
    'counter': counter,
    'countOfZombee':countOfZombee
}