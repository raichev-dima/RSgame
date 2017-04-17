'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const backendless = require('./backendless.service').backendless;

const width = constObj.game.getWH().w;
const height = constObj.game.getWH().h;

const hero = require('./man.module').hero;


let skins = [
    ["img/sprites/newhero.png", 205, 236, 15, 'Howard'],
    ["img/sprites/human_90_110_8_staying.png", 90, 110, 8, 'Leonard'],
    ["img/sprites/bernadett_test.png", 205, 236, 15, 'Bernadett'],
];

skins.count = skins.length;

let startButton = constObj.pjs.GUI.newButton({
    text: "START",
    style: {
        backgroundColor: 'rgba(93, 93, 93, 0.59)',
        top: '50%',
        left: '50%',
        width: '400px',
        height: '80px',
        marginLeft: '-200px',
        marginTop: '-70px',
        borderRadius: '20px',
        fontSize: '28px',
        cursor: 'pointer',
        boxShadow: '0 0 15px 5px #fff',
    },
    events: {
        mouseOver: function () {
            startButton.setStyle({
                boxShadow: '0 0 15px 5px #f00'
            });
        },
        mouseOut: function () {
            startButton.setStyle({
                boxShadow: '0 0 15px 5px #fff'
            });
        },
        click: function () {
            constObj.game.setLoop('1');

            startButton.setStyle({
                display: 'none'
            });
            if (changeHeroButton) changeHeroButton.setStyle({
                display: 'none'
            });
        }
    }
});

let changeHeroButton = constObj.pjs.GUI.newButton({
    text: "CHANGE HERO",
    style: {
        backgroundColor: 'rgba(93, 93, 93, 0.59)',
        top: '50%',
        left: '50%',
        width: '400px',
        height: '80px',
        marginLeft: '-200px',
        marginTop: '30px',
        borderRadius: '20px',
        fontSize: '26px',
        cursor: 'pointer',
        boxShadow: '0 0 15px 5px #fff',
    },
    events: {
        mouseOver: function () {
            changeHeroButton.setStyle({
                boxShadow: '0 0 15px 5px #f00'
            });
        },
        mouseOut: function () {
            changeHeroButton.setStyle({
                boxShadow: '0 0 15px 5px #fff'
            });
        },
        click: function () {
            if (skins.count === skins.length) {
                skins.count = 0;
                skins.count++;
                hero.changeSkin(...skins[0]);
            } else {
                skins.count++;
                hero.changeSkin(...skins[skins.count - 1]);
            }
        }
    }
});

let restartButton = constObj.pjs.GUI.newButton({
    text: "PLAY AGAIN",
    style: {
        backgroundColor: 'rgba(93, 93, 93, 0.69)',
        color: 'white',
        border: '2px solid white',
        top: 'auto',
        bottom: '20px',
        left: '50%',
        width: '400px',
        height: '50px',
        marginLeft: '-200px',
        borderRadius: '20px',
        fontSize: '26px',
        cursor: 'pointer',
        display: 'none',
    },
    events: {
        click: function () {
            restartButton.setStyle({
                display: 'none'
            });
            gameOverText.setStyle({
                display: 'none'
            });
            constObj.game.startLoop('preLoad');
            document.body.removeChild(SCORE_TABLE);
            SCORE_TABLE = document.createElement('ul');
        }

    }
});

let submitButton = constObj.pjs.GUI.newButton({
    text: "SUBMIT",
    style: {
        backgroundColor: 'rgba(93, 93, 93, 0.59)',
        top: '50%',
        left: '50%',
        width: '400px',
        height: '80px',
        marginLeft: '-200px',
        marginTop: '30px',
        borderRadius: '20px',
        fontSize: '28px',
        cursor: 'pointer',
        boxShadow: '0 0 15px 5px #fff',
        display: 'none',
    },
    events: {
        mouseOver: function () {
            submitButton.setStyle({
                boxShadow: '0 0 15px 5px #f00'
            });
        },
        mouseOut: function () {
            submitButton.setStyle({
                boxShadow: '0 0 15px 5px #fff'
            });
        },
        click: function () {
            sendData();
            submitButton.setStyle({
                display: 'none'
            });
            inpt.setStyle({
                display: 'none'
            });
            inpt.el.value = '';
            restartButton.setStyle({
                display: 'block'
            });
        }
    }
});

let gameOverText = constObj.pjs.GUI.newButton({
    text: "GAME OVER",
    style: {
        color: 'white',
        border: '2px solid white',
        top: '20px',
        left: '50%',
        width: '600px',
        padding: '10px',
        marginLeft: '-300px',
        fontSize: '50px',
        display: 'none',
        background: '#000000',
    },
});
let name = '';
var inpt = constObj.pjs.GUI.newInput({
    text : "ENTER YOUR NAME",
    style: {
        backgroundColor: 'rgba(93, 93, 93, 0.59)',
        top: '50%',
        left: '50%',
        width: '400px',
        height: '80px',
        marginLeft: '-200px',
        marginTop: '-100px',
        borderRadius: '20px',
        fontSize: '26px',
        display: 'none',
        padding: '15px',
        boxSizing: 'border-box'
    },
    events : {
        mouseOut: function () {
            name = inpt.el.value;
        }
    }
});



let nextLevelText = constObj.game.newTextObject({
    x: 300,
    y: 100,
    text: "You have reached the next level!",
    size: 50,
    padding: 10,
    color: "#000000",
});

function sendData() {
    backendless.useData('GET').then(
        (data) => {
        let result = data.find((elem) => name === elem.Name);
    let score;
    if (result) {
        score = result.Score > hero.getScore() ? result.Score : hero.getScore();
    } else {
        score = hero.getScore();
    }

    return backendless.useData('PUT', {
        Name: name,
        Score: score,
    }, result ? result.objectId : null);
}
).then(() => backendless.useData('GET'))
.then(new_data => {
        let data = new_data;
    data.sort((a,b) => a.Score < b.Score);

    for (let i = 0; i < data.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = i + 1 + ' ' + data[i].Name + ' -- ' + data[i].Score;
        SCORE_TABLE.appendChild(li);
    }

});
}


let SCORE_TABLE = document.createElement('ul');
const score = function () {
    let elements = document.querySelectorAll('canvas');
            SCORE_TABLE.setAttribute('id', 'score');
            SCORE_TABLE.setAttribute('style',
                `position: fixed;
                         border: 1px solid black;
                         top: 50%;
                         left: 50%;
                         width: 500px;
                         height: 325px;
                         overflow: auto;
                         border-radius: 20px;
                         font-size: 28px;
                         list-style-type:none;
                         background-color:rgba(255,255,255,.7);
                         z-index: 1000;
                         margin: 0;
                         padding: 20px;
                         transform: translateY(-50%) translateX(-50%);
                    `);
                    document.body.appendChild(SCORE_TABLE);







};

exports.startButtons = {
    startButton: startButton,
    changeHeroButton: changeHeroButton,
    restartButton: restartButton,
    submitButton:submitButton,
    inpt:inpt,
    turnOnGameOverButton: function () {
        gameOverText.setStyle({
            display: 'block'
        });
        submitButton.setStyle({
            display: 'block'
        });
    },
    turnOnStartButton: function () {
        startButton.setStyle({
            display: 'block'
        });
        changeHeroButton.setStyle({
            display: 'block'
        });

    },
};

exports.gameOverText = gameOverText;
exports.nextLevelText = nextLevelText;
exports.score = score;
