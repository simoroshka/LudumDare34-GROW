function explosion() {
	poof.playing = true;
	poofSound.play();
}

var poof = {
		pos: 	[200, 100],
		sprite: new Sprite('img/poof.png',
										   [0, 0],
										   [200, 200],
										   16,
										   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
										   null,
										   true),
		playing: false,
		update: function (deltaTime) {
				
				if (this.playing) {
					if (!this.sprite.done) {
						
						this.sprite.update(deltaTime);						
					}
					else {
						this.sprite.done = false;
						this.sprite._index = 0;
						this.playing = false;
					}					
				}
				
		},
		render: function (context) {
			
			if (this.playing) {				
				context.save();
				context.translate(this.pos[0], this.pos[1]);
				this.sprite.render(context);						
				context.restore();
			}			
		}
	}	

var object = {
	
	current: 1,	
	getImg: function() {
		return resources.get("img/o"+this.current+".jpg");
	},
	
	growTime: 0,	
	level: 0,
	last: false,	
	isLeftChoice: true,
	
	grow: function(when, left) {
		this.growTime = when + 0.5;
		this.isLeftChoice = left;
	},
	
	update: function () {		
		if (this.growTime > 0 && this.growTime <= gameTime) {
			this.getNext();
			this.growTime = 0;
		}
	},
	render: function () {
		context.drawImage(object.getImg(), 
				canvas.width / 2 - obj.width / 2, 
				canvas.height / 2 - obj.height / 2);
	},
	
	getNext: function () {
		switch (this.current) {
			case 1: 	if (this.isLeftChoice) 	{this.current = 2;}
						else 					{this.current = 9;}			
						this.level++;
						break;
			case 2:  	if (this.isLeftChoice)	{this.current = 3;}
						else 					{this.current = 7;}		
						this.level++;						
						break;
			case 3:  	if (this.isLeftChoice)  {this.current = 4;}
						else 					{this.current = 8;}	
						this.level++;												
						break;
			case 4:  	if (this.isLeftChoice)  {this.current = 5;}
						else 					{this.current = 22;}
						this.level++;												
						break;
			case 5:  	if (this.isLeftChoice)  {this.current = 6;}
						else 					{this.current = 23;}
						this.level++;												
						break;
			case 6:  	if (this.isLeftChoice)  {this.current = 25;}
						else 					{this.current = 24;}
						this.level++;												
						break;
			case 7:  	if (this.isLeftChoice)  {this.current = 19;}
						else 					{this.current = 18;}
						this.level++;												
						break;
			case 8:  	if (this.isLeftChoice)  {this.current = 21;}
						else 					{this.current = 20;}
						this.level++;												
						break;
			case 9:  	if (this.isLeftChoice)  {this.current = 10;}
						else 					{this.current = 12;}
						this.level++;												
						break;
			case 10:  	if (this.isLeftChoice)  {this.current = 11;}
						else 					{this.current = 15;}	
						this.level++;												
						break;
			case 11:  	if (this.isLeftChoice)  {this.current = 17;}
						else 					{this.current = 16;}	
						this.level++;												
						break;
			case 12:  	if (this.isLeftChoice)  {this.current = 14;}
						else 					{this.current = 13;}
						this.level++;												
						break;		
						
		}
		if (this.current > 12) {
			this.last = true;
			explosion();	
			isGameOver = true;
		}
		
	}
}

var choices = {
	
	update: function () {		
		
	},
	render: function () {
		if (!isGameOver && !poof.playing) {
			context.drawImage(this.getLeftImg(), 
					leftButton.x, leftButton.y);
			context.drawImage(this.getRightImg(), 
					rightButton.x, rightButton.y);
		}
		
	},
	
	getLeftImg: function () {
		return resources.get("img/"+object.current+ "a.jpg");
	},
	getRightImg: function () {
		return resources.get("img/"+object.current+"b.jpg");
	}
}


var endingInfo = {
	xPos: 210,
	yPos: -5,
	speed: 30,
	endPos: 40,
	
	update: function (deltaTime) {		
		if (this.yPos < this.endPos) {
			this.yPos += this.speed * deltaTime;
		}
		else this.yPos = this.endPos;
	},
	
	render: function () {
		context.drawImage(resources.get("img/level"+object.level+".png"), this.xPos, this.yPos);
		context.drawImage(resources.get("img/replay.png"), 270, 300);		
	}
	
	
	
}
