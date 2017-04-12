const PointJS = require('./point').PointJS;
const pjs = new PointJS('2D', 1100, 500, {
    backgroundColor: '#85a5cc',
});
const game = pjs.game;
const log = pjs.system.log;
const point = pjs.vector.point;
const size = pjs.vector.size;
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
const persPos = 20;
const bulletPos = 100;

exports.constObj = {
    pjs: pjs,
    game: game,
    key: key,
    log:log,
    point:point,
    size:size,
    cam:cam,
    brush:brush,
    OOP:OOP,
    math:math,
    width:width,
    height:height,
    r:r,
    persPos: persPos,
    bulletPos: bulletPos,
}
