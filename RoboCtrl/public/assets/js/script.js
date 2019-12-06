$(function() {

	// Connect to the socket

	var socket = io();

	// Variable initialization

	var form = $('form.login');
	var secretTextBox = form.find('input[type=text]');
	var presentation = $('.reveal');

	var key = "kittens", animationTimeout; //Robindev

	var sendClientLogsToServer = true;
	if(window.location.hostname === 'localhost'){
		socket.emit('load', {
			key: key //Robindev 
		});
		sendClientLogsToServer = false;
	}
	// When the page is loaded it asks you for a key and sends it to the server

	form.submit(function(e){

		e.preventDefault();

		key = secretTextBox.val().trim();

		// If there is a key, send it to the server-side
		// through the socket.io channel with a 'load' event.

		if(key.length) {
			socket.emit('load', {
				key: key
			});
		}

	});
	

	// The server will either grant or deny access, depending on the secret key

	socket.on('access', function(data){

		// Check if we have "granted" access.
		// If we do, we can continue with the presentation.

		if(data.access === "granted") {

			// Unblur everything
			presentation.removeClass('blurred');

			form.hide();


			$('#mousePage .content').on('touchstart', function(e) {
				e.preventDefault();
				socket.emit('mousestart', {
					key: key,
					position: {
						x: e.changedTouches[0].pageX,
						y: e.changedTouches[0].pageY
					}
				});
			});
			
			$('#mousePage .content').on('touchmove', function(e) {
				e.preventDefault();
				socket.emit('mousemove', {
					key: key,
					position: {
						x: e.targetTouches[0].pageX,
						y: e.targetTouches[0].pageY
					}
				});
			});

			$( "#mousePage #leftClick" ).on( "click", function() {
				socket.emit('mouseclick', {
					key: key
				});
			});
			$( "#mousePage #rightClick" ).on( "click", function() {
				socket.emit('mouserightclick', {
					key: key
				});
			});
			
			$( "#mousePage #wheelClickDown" ).on( "click", function() {
				socket.emit('scrollDown', {
					key: key
				});
			});
			
			$( "#mousePage #wheelClickUp" ).on( "click", function() {
				socket.emit('scrollUp', {
					key: key
				});
			});



			$( "#keyboardPage #keyboard" ).on( "keyup", function(e) {
				//Not working on mobile...
				var keyCode = e.which;
				var keyChar = e.originalEvent.key;
				
				var $this = $(this);
				var inputKeyChar = $this.val();
				inputKeyChar = inputKeyChar.slice(inputKeyChar.length-1, inputKeyChar.length);
				console.log(inputKeyChar);				
				
				
				socket.emit('keyPress', {
					key: key,
					keyChar: inputKeyChar
				});
			});
			

			$( "#keyboardPage #volumeUp" ).on( "click", function() {
				socket.emit('volumeUp', {
					key: key
				});
			});
			$( "#keyboardPage #volumeDown" ).on( "click", function() {
				socket.emit('volumeDown', {
					key: key
				});
			});
			$( "#keyboardPage #volumeMute" ).on( "click", function() {
				socket.emit('volumeMuteToggle', {
					key: key
				});
			});
			
			socket.on('volume', function(volume){
				$('#volume').html(volume);
			});

			if(sendClientLogsToServer) logToServer();
			initNavigation();
			
		}
		else {

			// Wrong secret key

			clearTimeout(animationTimeout);

			// Addding the "animation" class triggers the CSS keyframe
			// animation that shakes the text input.

			secretTextBox.addClass('denied animation');
			
			animationTimeout = setTimeout(function(){
				secretTextBox.removeClass('animation');
			}, 1000);

			form.show();
		}

	});

	
function navigation(){
		var loc = window.location.hash;
		
		//Make sure page exists....
		switch(loc){
			case '#keyboardPage':
				break;
			case '#mousePage':
				break;
			default:
			loc = '#mousePage';
		}
		
		$('.page').hide();
		$(loc).show();
}

function initNavigation(){
	
	$(window).on( 'hashchange', function(e) {
		navigation();
	});
	navigation();
}



function logToServer(){
	
	window.onerror = function(message, url, lineNumber) {  
	  //save error and send to server for example.
	  
		socket.emit('sysout', ('Line: ' + lineNumber + ' - ' + message) );
					
		return true;
	}; 
	
    var oldLog = console.log;
    console.log = function (message) {
        // DO MESSAGE HERE.
		socket.emit('sysout', message);
        oldLog.apply(console, arguments);
    };
}
	
});