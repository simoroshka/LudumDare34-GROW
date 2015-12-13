var leftButton =  {	width: 130,	height: 130,	x: 0, y: 0}
var rightButton = {	width: 130,	height: 130,	x: 0, y: 0}
var obj = {width: 200, height: 200}

function backgroundDraw() {
	context.drawImage(resources.get("img/background.jpg"), 0, 0);	
}

function smallButtonsDraw () {
	if (!muted) context.drawImage(resources.get("img/soundOn.png"), 0, 0);	
	else context.drawImage(resources.get("img/soundOff.png"), 0, 0);	
	
	context.drawImage(resources.get("img/info.png"), canvas.width - 60, 0);	
}

function buttonsDraw() {
	if (!leftButton.y) {
		leftButton.y = canvas.height / 2 - leftButton.height / 2;
		rightButton.x = canvas.width - rightButton.width;
		rightButton.y = canvas.height / 2 - rightButton.height / 2;
	}
	
	context.drawImage(resources.get("img/buttonLeft.jpg"), leftButton.x, leftButton.y);	
	context.drawImage(resources.get("img/buttonRight.jpg"), rightButton.x, rightButton.y);	
	
	
}



// sprite animation support
(function() {
    function Sprite(url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
    };

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed * dt;
        },

        render: function(ctx) {
			
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                frame = 0;
            }


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            ctx.drawImage(resources.get(this.url),
                          x, y,
                          this.size[0], this.size[1],
                          0, 0,
                          this.size[0], this.size[1]);
        }
    };

    window.Sprite = Sprite;
})();