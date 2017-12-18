
var main = {
    preload : function () {
        this.load.tilemap('level','extensions/SuperMarioMap.json', null,Phaser.Tilemap.TILED_JSON); // my map
   	this.load.spritesheet('tiles', 'assets/MarioTileSet.png', 16,16); //tiles 
        this.load.spritesheet('goomba','assets/goomba.png',16,16); // goomba spritesheet
        this.load.spritesheet('coin','assets/coin.png',16,16); // coin spritesheet
        this.load.spritesheet('mario','assets/mario.png',16,16); // mario spritesheet
        this.load.image('mush','assets/mush.png',16,16); // mushroom image
        this.load.audio('jump', 'audio/jump.wav');//Jump sound
	this.load.audio('kling','audio/coin.wav'); // Coin sound
      
     }
    		function create() {
			var style = { font: "bold 14px Arial", fill: "#FFE500", boundsAlignH: "center", boundsAlignV: "middle" };
			text = game.add.text(10, 5, "SCORE:  "+score, style); //Keimeno score
						
			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);
	
			game.stage.backgroundColor = '#5c94fc';
	
			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');


			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			game.camera.follow(player);

			text.fixedToCamera=true;
			livestext.fixedToCamera=true;

			cursors = game.input.keyboard.createCursorKeys();
		}
    function update() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
	    
		if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					jump = game.add.audio('jump');
					jump.play();
					player.body.velocity.y = -190;
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		
}
