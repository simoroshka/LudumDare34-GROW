var	backgroundMusic	= new BackgroundMusicClass();
var	clickSound = new SoundOverlapsClass("sounds/1stroke.mp3");
var poofSound = new SoundOverlapsClass("sounds/poof.mp3");
var replaySound = new SoundOverlapsClass("sounds/3strokes.mp3");

var muted = false;


function SoundOverlapsClass(filenameWithPath)	{
	
	var	altSoundTurn = false;
	var	mainSound = new Audio(filenameWithPath);
	var	altSound = new Audio(filenameWithPath);
	
	
	this.play = function() {
		if(this.altSoundTurn) {
			altSound.currentTime = 0;
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			mainSound.play();
		}
				
		altSoundTurn = !altSoundTurn;	
	}
}

function BackgroundMusicClass() {
	var	musicSound = null;
				
	this.loopSong = function(filenameWithPath) {
					
		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath);
		musicSound.loop	= true;
		musicSound.play();
	}
		
	this.startOrStopMusic = function()	{
		
		if(musicSound.paused) {
			musicSound.play();
		} else {
			musicSound.pause();
		}	
		
	}
	this.play = function () {
		if (musicSound) musicSound.play();
	}
	this.pause = function() {
		if (musicSound) musicSound.pause();
	}
}