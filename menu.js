
var menu = {

	preload: function() {

		game.load.image('menu', 'assets/StartMenu.png');
		game.load.image('Start', 'assets/Start.png');
},

	create: function() {

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var s = game.add.sprite(200, 80, 'menu');

		var btn1 = game.add.button(490 , 340, "Start", function(){
			game.state.start('main');
		});
		btn1.anchor.set(0.5, 0.5);


		}



	}
