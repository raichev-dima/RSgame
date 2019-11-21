'use strict';
const PointJS = require('./point').PointJS;
const constObj = require('./const').constObj;
const startButtons = require('./preLoad.module').startButtons;
  /*
  * Gamepad API Test
  * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
  *
  * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
  *
  * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
  */
  var haveEvents = 'GamepadEvent' in window;
  var controllers = {};
  var rAF = window.mozRequestAnimationFrame ||
    window.requestAnimationFrame;

  function connecthandler(e) {
    addgamepad(e.gamepad);
  }
  function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad; var d = document.createElement("div");
    d.setAttribute("id", "controller" + gamepad.index);
    var b = document.createElement("div");
    b.className = "buttons";
    for (var i=0; i<gamepad.buttons.length; i++) {
      var e = document.createElement("span");
      e.className = "button";
      //e.id = "b" + i;
      e.innerHTML = i;
      b.appendChild(e);
    }
    d.appendChild(b);
    var a = document.createElement("div");
    a.className = "axes";
    for (i=0; i<gamepad.axes.length; i++) {
      e = document.createElement("meter");
      e.className = "axis";
      //e.id = "a" + i;
      e.setAttribute("min", "-1");
      e.setAttribute("max", "1");
      e.setAttribute("value", "0");
      e.innerHTML = i;
      a.appendChild(e);
    }
    d.appendChild(a);
    document.body.appendChild(d);
    rAF(updateStatus);
  }

  function disconnecthandler(e) {
    removegamepad(e.gamepad);
  }

  function removegamepad(gamepad) {
    var d = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(d);
    delete controllers[gamepad.index];
  }

  function updateStatus() {
    scangamepads();
    for (var j in controllers) {
      var controller = controllers[j];
      var d = document.getElementById("controller" + j);
      var buttons = d.getElementsByClassName("button");
      for (var i=0; i<controller.buttons.length; i++) {
        var b = buttons[i];
        var val = controller.buttons[i];
        var pressed = val == 1.0;
        if (typeof(val) == "object") {
          pressed = val.pressed;
          val = val.value;
        }
        var pct = Math.round(val * 100) + "%";
        b.style.backgroundSize = pct + " " + pct;
        if (pressed) {
          b.className = "button pressed";
        } else {
          b.className = "button";
        }
      }
      if (controllers[0].buttons[8].pressed) {
        console.log('pressed')
        constObj.game.setLoop('1');
      
        startButtons.startButton.setStyle({
            display: 'none'
        });
        if (startButtons.changeHeroButton) startButtons.changeHeroButton.setStyle({
            display: 'none'
        });
      }

      // var axes = d.getElementsByClassName("axis");
      // for (var i=0; i<controller.axes.length; i++) {
      //   console.log(controller.axes[i])
      // }
    }
    rAF(updateStatus);
  }

  function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        if (!(gamepads[i].index in controllers)) {
          addgamepad(gamepads[i]);
        } else {
          controllers[gamepads[i].index] = gamepads[i];
        }
      }
    }
  }

  if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
  } else {
    setInterval(scangamepads, 10000);
  }

module.exports.controllers = controllers;
module.exports.scangamepads = scangamepads;