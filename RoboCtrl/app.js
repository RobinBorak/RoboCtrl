/*
	Install Java
	Install JDK 1.8
	npm install --global --production windows-build-tools
		(Installs python 2.x for u)
	npm install -g node-gyp
	npm install java
	
	
	Add path to Java
	npm run test
*/

// This is the server-side file of our mobile remote controller app.
// It initializes socket.io and a new express instance.
// Start it by running 'node app.js' from your terminal.


// Creating an express server

const express = require('express');
const app = express();
//const java = require('java');
//const Robot = java.import('java.awt.Robot');
//const MouseInfo = java.import('java.awt.MouseInfo');
//const InputEvent = java.import('java.awt.event.InputEvent');
//const KeyEvent = java.import('java.awt.event.KeyEvent');
const audio = require('win-audio').speaker;



const robot = new Robot();
const port = process.env.PORT || 666;
const io = require('socket.io').listen(app.listen(port));



const appSettings = {
	mouseSpeed: 3,
	secret: 'kittens'
};

// App Configuration
// Make the files in the public folder available to the world
app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));

/*
// This is a secret key that prevents others from opening your presentation
// and controlling it. Change it to something that only you know.
// Initialize a new socket.io application

var presentation = io.on('connection', function (socket) {

	// A new client has come online. Check the secret key and 
	// emit a "granted" or "denied" message.

	socket.on('load', function(data){
		socket.emit('access', {
			access: (data.key === appSettings.secret ? "granted" : "denied")
		});

	});
	

	var touchStartMousePos = {
		x: null,
		y: null
	};
	
	socket.on('mousestart', function(data){
		touchStartMousePos.x = data.position.x;
		touchStartMousePos.y = data.position.y;
	});

	socket.on('mousemove', function(data){
		
		var pointerInfo = MouseInfo.getPointerInfoSync().getLocationSync();

		if(data.key === appSettings.secret) {
			//Get data.position from web and update server cursor (here)
			var newX = (pointerInfo.x) + ((data.position.x - touchStartMousePos.x)* appSettings.mouseSpeed);
			var newY = (pointerInfo.y) + ((data.position.y - touchStartMousePos.y)* appSettings.mouseSpeed );
				newX = parseInt(newX);
				newY = parseInt(newY);
			touchStartMousePos.x = data.position.x;
			touchStartMousePos.y = data.position.y;
			try{
				robot.mouseMoveSync(newX, newY);
			}catch(e){
				console.log(e);
				console.log('newX: ' + newX);
				console.log('data.position.x: ' + data.position.x);
				console.log('newY: ' + newY);
				console.log('data.position.y: ' + data.position.y);
			}
		}
	});


	socket.on('mouseclick', function(data){
		if(data.key === appSettings.secret) {

			robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
			robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
			
		}
	});
	
	socket.on('mouserightclick', function(data){
		if(data.key === appSettings.secret) {

			robot.mousePress(InputEvent.BUTTON3_DOWN_MASK);
			robot.mouseRelease(InputEvent.BUTTON3_DOWN_MASK);
			
		}
	});
	
	socket.on('scrollDown', function(data){
		if(data.key === appSettings.secret) {

			robot.mouseWheel(1);
			
		}
	});
	
	socket.on('scrollUp', function(data){
		if(data.key === appSettings.secret) {

			robot.mouseWheel(-1);
			
		}
	});

	
	socket.on('keyPress', function(data){
		if(data.key === appSettings.secret) {
			var keyCode = data.keyCode;
			var keyEventEnumString = 'VK_' + data.keyChar;
			var paramValue = (Number.isInteger(data.keyChar) ? data.keyChar : KeyEvent[keyEventEnumString.toUpperCase()]);
			try{
				robot.keyPressSync(paramValue);
			}catch(e){
				console.log('Could not trigger key: ', paramValue);
				console.log('Error: ', e);
			}
			
		}
	});
	
	

	socket.on('volumeUp', function(data){
		if(data.key === appSettings.secret) {
			audio.increase(1);
			socket.emit('volume', audio.get());
		}
	});
	
	socket.on('volumeDown', function(data){
		if(data.key === appSettings.secret) {
			audio.decrease(1);
			socket.emit('volume', audio.get());
		}
	});
	
	socket.on('volumeMuteToggle', function(data){
		if(data.key === appSettings.secret) {
			audio.toggle();
		}
	});
	
	
	
	socket.on('sysout', function(data){
		var d = new Date,
		dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
			   
		console.log(dformat + 'Client log');
		console.log(data);
	});
	
});
*/
console.log('Your presentation is running on http://localhost:' + port);
