const constObj = require('./const').constObj;
const hero = require('./man.module').hero;
const bgHeight = 454;
const fogWidth = 642;
const fogHeight = 628;
const bgPos = constObj.height - bgHeight;
const fogPosX = hero.content.getPosition().x + constObj.width - fogWidth - hero.content.x;

const clouds = returnBG('img/background/clouds-bg.png');
const trees = returnBG('img/background/trees-bg.png');
const further = returnBG('img/background/further-bg.png');
const road = returnBG('img/background/road-bg.png');
const houses = returnBG('img/background/houses-bg.png');
const grass = returnBG('img/background/grass-bg.png');

const fog = constObj.game.newImageObject({
    file: 'img/fog.png',
    scale: 1,
});

const K1 = 0.5;
const K2 = 0.2;
const K3 = 0.8;
const K4 = 1;

var moveBG = function (k, dx) { // k = 1 OR -1

    for (let i = 0; i <= 2; i++) {

        houses[i].move(constObj.point(k*K1*dx, 0));
        trees[i].move(constObj.point(k*K2*dx, 0));
        clouds[i].move(constObj.point(k*K3*dx, 0));
        further[i].move(constObj.point(k*K4*dx, 0));

    }

};

function returnBG (path) {

    const backgr1 = constObj.game.newImageObject({
        x: 0,
        y: bgPos,
        file: path,
        scale: 1,
        onload: function () {
            backgr2.x = backgr1.x + backgr1.w;
            backgr3.x = backgr1.x - backgr1.w;
        }

    });

    const backgr2 = constObj.game.newImageObject({
        x: backgr1.x + backgr1.w,
        y: bgPos,
        file: path,
        scale: 1,

    });

    const backgr3 = constObj.game.newImageObject({
        x: backgr1.x - backgr1.w,
        y: bgPos,
        file: path,
        scale: 1,

    });

    return arr = [backgr1, backgr2, backgr3];
    console.log(arr);
}


 function endlessBackGround (arr) {

     let backgr1 = arr[0];
     let backgr2 = arr[1];
     let backgr3 = arr[2];

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

function drawBackground (arr) {

    let backgr1 = arr[0];
    let backgr2 = arr[1];
    let backgr3 = arr[2];

    backgr1.draw();
    backgr2.draw();
    backgr3.draw();

    endlessBackGround(arr);
}


function resetBG (arr) {

    let backgr1 = arr[0];
    let backgr2 = arr[1];

    backgr1.x = 0;
    backgr2.x = backgr1.x + backgr1.w;
}


background = {
    drawPreLoadBG : function () {


        drawBackground(houses);
        drawBackground(road);
        drawBackground(grass);

    },

    drawBackground : function () {

        drawBackground(further);
        drawBackground(houses);
        drawBackground(clouds);

        for (let i = 0; i <= 2; i++) {
            clouds[i].move(constObj.point(0.1, 0));
        }

        drawBackground(trees);
        drawBackground(road);
        drawBackground(grass);
        fog.setPositionS(constObj.point(fogPosX, 0));
    },

    resetBG: function () {

        resetBG(further);
        resetBG(houses);
        resetBG(clouds);
        resetBG(trees);
        resetBG(road);
        resetBG(grass);
    },

    'moveBG' : moveBG,
    'fog' : fog

}

module.exports = background;
