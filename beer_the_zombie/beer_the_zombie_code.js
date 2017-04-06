	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 	920;
	canvas.height = 530;
	
	var on_ground = true; 
	var gravity = 0.5; 
	var friction = 0.8;


	document.body.appendChild(canvas);


	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function(){
		bgReady = true;
	}
	bgImage.src = "images/street_bg.png";

	var playerReady = false;
	var playerImage = new Image();
	playerImage.onload = function(){
	playerReady = true;
	}
	playerImage.src = "images/player_dummy.png";
	

	var zombieReady = false;
	var zombieImage = new Image();
	zombieImage.onload = function(){
		zombieReady = true;
	}
	zombieImage.src = "images/enemy_dummy.png";

	var player = {
		speed:3,//movement in pixels
		x:canvas.width/2,
		y:canvas.height/2,
		jumping:false,
		velX:0,
		velY:0
	}
	var zombie = {
		x:canvas.width/2,
		y:265
		
	};	
	
	
	var render = function(){
		console.log("hi");
		if(bgReady){
			ctx.drawImage(bgImage,0,0);
		}
		if(zombieReady){
			ctx.drawImage(zombieImage,zombie.x,zombie.y);
		}
		if(playerReady){
			ctx.drawImage(playerImage,player.x,player.y);
		}
		

	}
	var keysDown = {};
	
	addEventListener("keydown", function(e){
		keysDown[e.keyCode]=true;
		console.log(e.which);
	}, false);
	
	addEventListener("keyup", function(e){
		delete keysDown[e.keyCode];
	});

	var update = function(){
		/*if(38 in keysDown){		//KeyUP
			player.y -= player.speed* modifier;
		}
		if(40 in keysDown){		//KeyDOWN
			player.y += player.speed* modifier;
		}*/
		if(37 in keysDown && player.velX > -player.speed){		//KeyLEFT
			player.velX--;
		}
		if(39 in keysDown && player.velX < player.speed){		//KeyRIGHT
			player.velX++;
		}
		if (32 in keysDown && !player.jumping){
			player.jumping = true; 
			player.velY = -player.speed*2;
		}
		
		player.x += player.velX;
		player.y += player.velY;
		player.velX*=friction;
		player.velY += gravity;
		
		if(player.y >= canvas.height/2){
			player.y = canvas.height/2;
			player.jumping = false;
		}
		

		
	}
var main = function(){
	var now = Date.now();
	var delta = now - then;
	update(); //pixel per second 
	render();
	then = now;
	requestAnimationFrame(main);
}

var then = Date.now();
main();





	
	












		/*ctx.fillStyle ="rgba(250,250,250,0.4)";
		ctx.font = "20px Helvetica";
		ctx.textAlign ="left";
		ctx.textBaseline="top";
		ctx.fillText("zombie gefangen: " +zombiesCaught, 32, 32);
		ctx.fillText("[R]: Zurücksetzen" , 32,425);
*/