const PointJS = require('./point').PointJS;
const pjs = new PointJS('2D', 900, 390, {
    backgroundColor: 'yellow',
});
const game = pjs.game;
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
    game: game,
    key: key,
    log:log,
    point:point,
    cam:cam,
    brush:brush,
    OOP:OOP,
    math:math,
    width:width,
    height:height,
    r:r
}