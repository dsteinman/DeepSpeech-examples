const DeepSpeech = require('deepspeech');
const fs = require('fs');
const wav = require('wav');

// create the model
let modelPath = './models/deepspeech-0.7.4-models.pbmm';
let scorerPath = './models/deepspeech-0.7.4-models.scorer';
let model = new DeepSpeech.Model(modelPath);
model.enableExternalScorer(scorerPath);

// create a file/model stream and return the recognition results
function recognizeFile(path) {
	return new Promise(function (resolve, reject) {
		fs.exists(path, function (exists) {
			if (!exists) {
				reject('file not found: '+path);
			}
			else {
				let modelStream = model.createStream();
				const bufferSize = 512;
				const file = fs.createReadStream(path, {highWaterMark: bufferSize});
				const reader = new wav.Reader();
				reader.on('format', function (format) {
					if (format.sampleRate !== model.sampleRate()) {
						modelStream.finishStream();
						reject('invalid sample rate: ' + format.sampleRate);
					}
					else {
						reader.on('end', function () {
							const results = modelStream.finishStream();
							resolve(results);
						});
						reader.on('data', function (data) {
							modelStream.feedAudioContent(data);
						});
					}
				});
				file.pipe(reader);
			}
		});
	});
}

// select a wav file
let audioFile = process.argv[2] || './audio/2830-3980-0043.wav';

// process the file
recognizeFile(audioFile)
.then(function (results) {
	console.log('results:', results);
})
.catch(function (e) {
	console.error(e);
	process.exit();
});
