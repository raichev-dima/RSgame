function loadAudio(arr, vol, loop) {

    var audio = window.document.createElement('audio');
    audio.style.zIndex = -1000;
    audio.controls = true;
    for (var i = 0, len = arr.length; i < len; i++) {
        var source = document.createElement('source');
        source.src = arr[i];
        audio.appendChild(source);
    }

    var o = {
        dom : false,
        state : 'stop',

        play : function () {
            this.dom.currentTime = 0;
            this.dom.play();
            this.state = 'play';
        },

        pause: function () {
            this.dom.pause();
            this.state = 'pause';
        },

        stop : function () {
            this.dom.pause();
            this.dom.currentTime = 0;
            this.state = 'stop';
        },

        setVolume : function (vol) {
            this.dom.volume = vol;
        }
    };

    o.dom = audio;
    o.dom.volume = vol || 1;
    o.dom.loop = loop || false;

    return o;
}

module.exports = loadAudio;
