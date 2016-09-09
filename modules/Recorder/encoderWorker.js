import InlineWorker from 'inline-worker';

let mp3codec;

let self = {};
const worker = new InlineWorker(function() {
  importScripts('http://localhost:8080/assets/libs/libmp3lame.min.js');

  self.onmessage = function(e) {
    switch (e.data.cmd) {
      case 'init':
        if (!e.data.config) {
          e.data.config = { };
        }

        mp3codec = Lame.init();

        Lame.set_mode(mp3codec, Lame.MONO);
        Lame.set_num_channels(mp3codec, e.data.config.channels || 2);
        Lame.set_num_samples(mp3codec, e.data.config.samples || -1);
        Lame.set_in_samplerate(mp3codec, e.data.config.samplerate || 44100);
        Lame.set_out_samplerate(mp3codec, e.data.config.samplerate || 44100);
        Lame.set_bitrate(mp3codec, e.data.config.bitrate || 128);

        Lame.init_params(mp3codec);
        console.log('Version :', Lame.get_version() + ' / ',
          'Mode: '+Lame.get_mode(mp3codec) + ' / ',
          'Samples: '+Lame.get_num_samples(mp3codec) + ' / ',
          'Channels: '+Lame.get_num_channels(mp3codec) + ' / ',
          'Input Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
          'Output Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
          'Bitlate :' +Lame.get_bitrate(mp3codec) + ' / ',
          'VBR :' + Lame.get_VBR(mp3codec));
        break;
      case 'encode':
        var mp3data = Lame.encode_buffer_ieee_float(mp3codec, e.data.buf, e.data.buf);
        var mp3Blob = new Blob(
          [ new Uint8Array(mp3data.data) ],
          { type: 'audio/mp3' }
        );
        self.postMessage({cmd: 'data', data: mp3Blob});
        //self.postMessage({cmd: 'data', buf: mp3data.data});
        Lame.encode_flush(mp3codec);
        Lame.close(mp3codec);
        mp3codec = null;
        break;
      default:
        // do nothing
    }
  };
}, self);

export default worker;