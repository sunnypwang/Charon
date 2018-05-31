# Charon
Charon is a Word Guessing Game Application using auto speech recognition to detect the answer.

## Setup
1. This project uses React. In order to run React you need `npm`, which can be installed with `node.js` installer.
2. Replace `HCLC.fst` and `words.txt` provided in `model` in your ASR model.
3. Set up and start your kaldi gstreamer server.
4. Go to `src/lib/client.js` and replace the web socket address with your kaldi gstreamer address.
```
server : "ws://192.168.1.107:8080/client/ws/speech",
serverStatus : "ws://192.168.1.107:8080/client/ws/status",
```
5. Go to the project root directory.
6. Before start the web application, type the following command in command line.
```
 npm install
```
7. To start the web application, type the following command in command line.
```
npm start
```
8. React will start your browser automatically. If it fails to do so, you can manually go to `http://localhost:3000/`


## How to play

There should be at least two people to play this game. 
The first will try to guess the word displayed on screen while the second will look at the word on screen try to hint the first player without speaking the actual word.

To pass, the guesser should say "ผ่าน" as an asnwer.
