var canvas;
var context;

var isGameOver = false;
var gameTime = 0;
var showingCredits = false;

// the game loop
var lastTime;
function main() {
    var now = Date.now();
    var deltaTime = (now - lastTime) / 1000.0;

    update(deltaTime);
    render();

    lastTime = now;
    requestAnimFrame(main);
};

// the update 
function update(deltaTime) {
	gameTime += deltaTime;	
	
	object.update();
	poof.update(deltaTime);

	if (isGameOver) {
		endingInfo.update(deltaTime);
	}
}

// draw everything!
function render() {
	backgroundDraw();
	smallButtonsDraw();
	
	object.render();
	poof.render(context);
	
	if (!isGameOver) {
		buttonsDraw();	
		
		if (!object.last) choices.render();			
	}	
	else {		
		endingInfo.render();
	}
	
	if (showingCredits) {
		showCredits();
	}
	
}


function handleMouseClick(event) {
	var pos = calcMousePos(event);
	
	if (!isGameOver) {
		//left button
		if (pos.x > leftButton.x && pos.x < leftButton.x + leftButton.width &&
			pos.y > leftButton.y && pos.y < leftButton.y + leftButton.height) {
						
			explosion();
			object.grow(gameTime, true);
		
		}
		
		//right button
		if (pos.x > rightButton.x && pos.x < rightButton.x + rightButton.width &&
			pos.y > rightButton.y && pos.y < rightButton.y + rightButton.height) {
				
			explosion();	
			object.grow(gameTime, false);
		
		}	
	}
	else {
		console.log("gameover");
		// replay button area 
		if (pos.x > 270 && pos.x < 330 &&
			pos.y > 300 && pos.y < 360) {
			
			replaySound.play();
			reset();
		}
	}
	
	
	// mute button area
	if (pos.x < 50 && pos.y < 50) {
		clickSound.play();
		mute();
	}
	
	// info button area 
	if (pos.x > canvas.width - 60 && pos.y < 60) {
		clickSound.play();
		showingCredits = !showingCredits;
	}
}

//get mouse click coordinates
function calcMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = event.clientX - rect.left - root.scrollLeft;
	var mouseY = event.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}


// start the game
function init() {
	reset();
    lastTime = Date.now();
    main();
}

// reset to the initial state
function reset() {
	//erase game state
	isGameOver = false;	
	gameTime = 0;
	
	object.current = 1;
	object.level = 0;
	object.last = false;
	
	
	endingInfo.yPos = -5;
	
}



// get the canvas and display loading screen, setup mouse input thing
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');
	
	canvas.addEventListener('mousedown', handleMouseClick);
	
	displayLoadingScreen();
	
	//load and start music
	backgroundMusic.loopSong("sounds/bgmusic.mp3");
	
	//load graphics and start the game once it's done
	resources.load(getLoadArray());
	resources.onReady(init);
	
}

var numberOfObjects = 25;
var numberOfForks = 12;
function getLoadArray() {
	var array =	[
		'img/buttonLeft.jpg',	
		'img/buttonRight.jpg',
		'img/poof.png',
		'img/background.jpg',
		'img/soundOn.png',
		'img/soundOff.png',
		'img/info.png',
		'img/replay.png',
		'img/credits.jpg',
	];
	for (var i = 1; i <= numberOfObjects; i++) {
		array.push('img/o' + i + '.jpg');
	}
	for (var i = 1; i <= numberOfForks; i++) {
		array.push('img/' + i + 'a.jpg');
		array.push('img/' + i + 'b.jpg');
	}
	for (var i = 3; i <= 6; i++) {
		array.push('img/level' + i + '.png');
	}
	
	return array;
}

function displayLoadingScreen() {
	//blank the screen
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//display message
	context.fillStyle = '#ddd';
	context.font = 'bold 40px Roboto Condensed';
	context.fillText("LOADING...", canvas.width / 2 - 100, canvas.height / 2 - 10);
}
function showCredits() {
	context.drawImage(resources.get("img/credits.jpg"), 0, 0);	
}


// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function mute() {
	if (!muted) {
		backgroundMusic.pause();
		muted = true;
	}
	else {
		backgroundMusic.play();
		muted = false;
	}
	
}