# NodeJS DeepSpeech Example

This example loads .wav audio files and transcribes them to the console.

## Install

Download the pre-trained model (1.4GB):

```
mkdir models
cd models
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.7.4/deepspeech-0.7.4-models.pbmm
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.7.4/deepspeech-0.7.4-models.scorer
cd ..
```

Download test audio files:

```
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.7.0/audio-0.7.0.tar.gz
tar xfvz audio-0.7.0.tar.gz
```

Install NPM dependencies:

```
npm install
```

## Run

```
node index.js
```

Result should be:

```
result: experience proves this

```

Try other wav files with an argument:

```
node index.js audio/2830-3980-0043.wav
node index.js audio/8455-210777-0068.wav
node index.js audio/4507-16021-0012.wav
```
