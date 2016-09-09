import InlineWorker from 'inline-worker';

let self = {};
const worker = new InlineWorker(function() {
  importScripts(`${process.env.HOSTNAME}/assets/libs/libmp3lame.min.js`);

  let recLength = 0,
    recBuffers = [],
    sampleRate,
    numChannels,
    mp3codec;

  self.onmessage = function(e) {
    switch (e.data.command) {
      case 'init':
        init(e.data.config);
        break;
      case 'record':
        record(e.data.buffer);
        break;
      case 'exportAudio':
        exportAudio(e.data.type);
        break;
      case 'getBuffer':
        getBuffer();
        break;
      case 'clear':
        clear();
        break;
    }
  };

  function init(config) {
    sampleRate = config.sampleRate;
    numChannels = config.numChannels;
    initBuffers();

    mp3codec = Lame.init();
    Lame.set_mode(mp3codec, Lame.MONO);
    Lame.set_num_channels(mp3codec, config.channels || 1);
    Lame.set_num_samples(mp3codec, config.samples || -1);
    Lame.set_in_samplerate(mp3codec, config.sampleRate || 44100);
    Lame.set_out_samplerate(mp3codec, config.sampleRate || 44100);
    Lame.set_bitrate(mp3codec, config.bitrate || 16);

    Lame.init_params(mp3codec);
    console.log('Version :', Lame.get_version() + ' / ',
      'Mode: '+Lame.get_mode(mp3codec) + ' / ',
      'Samples: '+Lame.get_num_samples(mp3codec) + ' / ',
      'Channels: '+Lame.get_num_channels(mp3codec) + ' / ',
      'Input Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
      'Output Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
      'Bitlate :' +Lame.get_bitrate(mp3codec) + ' / ',
      'VBR :' + Lame.get_VBR(mp3codec));
  }

  function record(inputBuffer) {
    for (var channel = 0; channel < numChannels; channel++) {
      recBuffers[channel].push(inputBuffer[channel]);
    }
    recLength += inputBuffer[0].length;
  }

  function exportAudio(type) {
    let buffer = mergeBuffers(recBuffers[0], recLength);
    let mp3data = Lame.encode_buffer_ieee_float(mp3codec, buffer, buffer);
    let mp3Blob = new Blob(
      [ new Uint8Array(mp3data.data) ],
      { type: 'audio/mp3' }
    );
    self.postMessage({ command: 'exportAudio', data: mp3Blob });
  }

  function getBuffer() {
    let buffers = [];
    for (let channel = 0; channel < numChannels; channel++) {
      buffers.push(mergeBuffers(recBuffers[channel], recLength));
    }
    self.postMessage({ command: 'getBuffer', data: buffers });
  }

  function clear() {
    recLength = 0;
    recBuffers = [];
    initBuffers();
  }

  function initBuffers() {
    for (let channel = 0; channel < numChannels; channel++) {
      recBuffers[channel] = [];
    }
  }

  function mergeBuffers(recBuffers, recLength) {
    let result = new Float32Array(recLength);
    let offset = 0;
    for (let i = 0; i < recBuffers.length; i++) {
      result.set(recBuffers[i], offset);
      offset += recBuffers[i].length;
    }
    return result;
  }

  function interleave(inputL, inputR) {
    let length = inputL.length + inputR.length;
    let result = new Float32Array(length);

    let index = 0,
      inputIndex = 0;

    while (index < length) {
      result[index++] = inputL[inputIndex];
      result[index++] = inputR[inputIndex];
      inputIndex++;
    }
    return result;
  }

  function floatTo16BitPCM(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  function encodeWAV(samples) {
    let buffer = new ArrayBuffer(44 + samples.length * 2);
    let view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, numChannels, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * numChannels * 2, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, numChannels * 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);

    return view;
  }
}, self);

export default worker;