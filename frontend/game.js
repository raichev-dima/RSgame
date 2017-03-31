const PointJS = require('./point').PointJS;
const pjs = new PointJS('2D', 1280, 720, {
    backgroundColor: 'yellow',
});
const game = pjs.game;
//pjs.system.initFullScreen();
const log = pjs.system.log;
const point = pjs.vector.point;
const cam = pjs.camera;
const brush = pjs.brush;
const OOP = pjs.OOP;
const math = pjs.math;
// const mouse = pjs.mouseControl.initMouseControl();
const key = pjs.keyControl.initKeyControl();
// key.initKeyControl();
const width = game.getWH().w;
const height = game.getWH().h;
const r = game.getResolution();



exports.constObj = {
    pjs: pjs,
    game: game
}