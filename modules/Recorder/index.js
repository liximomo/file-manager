import InlineWorker from 'inline-worker';

function Uint8ArrayToFloat32Array(u8a){
  var f32Buffer = new Float32Array(u8a.length);
  for (var i = 0; i < u8a.length; i++) {
    var value = u8a[i<<1] + (u8a[(i<<1)+1]<<8);
    if (value >= 0x8000) value |= ~0x7FFF;
    f32Buffer[i] = value / 0x8000;
  }
  return f32Buffer;
}

export class Recorder {

  constructor(source, cfg) {
    this.config = {
      bufferLen: 4096,
      numChannels: 2,
      audioType: 'mp3',
      mimeType: 'audio/mp3'
    };

    this.recording = false;

    this.callbacks = {
      getBuffer: [],
      exportAudio: []
    };

    Object.assign(this.config, cfg);

    this.context = source.context;
    this.node = (this.context.createScriptProcessor ||
      this.context.createJavaScriptNode).call(this.context,
      this.config.bufferLen, this.config.numChannels, this.config.numChannels);

    this.node.onaudioprocess = (e) => {
      if (!this.recording) return;

      var buffer = [];
      for (var channel = 0; channel < this.config.numChannels; channel++) {
        buffer.push(e.inputBuffer.getChannelData(channel));
      }
      this.worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    };

    this.worker = require('./recordWorker.js')['default'];

    this.worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate,
        numChannels: this.config.numChannels
      }
    });

    this.worker.onmessage = e => {
      let data = e.data.data;
      let cb = this.callbacks[e.data.command].pop();
      cb(data);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination); //this should not be necessary
  }


  record() {
    this.recording = true;
  }

  stop() {
    this.recording = false;
  }

  clear() {
    this.worker.postMessage({ command: 'clear' });
  }

  getBuffer(cb) {
    cb = cb || this.config.callback;
    if (!cb) throw new Error('Callback not set');

    this.callbacks.getBuffer.push(cb);

    this.worker.postMessage({ command: 'getBuffer' });
  }

  exportAudio(cb, type) {
    let mimeType = this.config.mimeType;
    cb = cb || this.config.callback;
    if (!cb) throw new Error('Callback not set');

    this.callbacks.exportAudio.push(cb);

    this.worker.postMessage({
      command: 'exportAudio',
      audioType: this.config.audioType,
      type: mimeType
    });
  }

  parseWav(wav) {
    function readInt(i, bytes) {
      var ret = 0,
        shft = 0;

      while (bytes) {
        ret += wav[i] << shft;
        shft += 8;
        i++;
        bytes--;
      }
      return ret;
    }
    if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
    if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
    return {
      sampleRate: readInt(24, 4),
      bitsPerSample: readInt(34, 2),
      samples: wav.subarray(44)
    };
  }

  static
  forceDownload(blob, filename) {
    let url = (window.URL || window.webkitURL).createObjectURL(blob);
    let link = window.document.createElement('a');
    link.href = url;
    link.download = filename || `output_${new Date().getTime()}.mp3`;
    let click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }
}

export default Recorder;
