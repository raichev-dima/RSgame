'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;

const width = constObj.game.getWH().w;
const height = constObj.game.getWH().h;

let startButton = constObj.pjs.GUI.newButton({
            x: 10,
            y: 10,
            w: 100,
            h: 30,
            text: "Start",
            style: {backgroundColor: 'rgba(76, 175, 80, 0.59)', top: height/2+'px', left: width/2-100+'px', width:'200px', height: '50px', borderRadius: '20px', fontSize: '18px', cursor: 'pointer'},
            events: {
                click: function () {
                    constObj.game.startLoop('1');
                    startButton.setStyle({display: 'none'});
                }
            }
        });




exports.startButton = startButton;
