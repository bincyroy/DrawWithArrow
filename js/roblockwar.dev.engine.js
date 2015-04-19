var RoBlockWar = RoBlockWar || {};

RoBlockWar.Boot = function (game) {
};

//setting game configuration and loading the assets for the loading screen
RoBlockWar.Boot.prototype = {
  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  },
    
  preload: function() {
    //this.load.image('preloadbar', './assets/preloader-bar.png');
  },
  create: function() {
    this.state.start('Preloader');
  }
};

//loading the game assets
RoBlockWar.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

RoBlockWar.Preloader.prototype = {
  preload: function() {
    /*
    // show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');

    this.load.setPreloadSprite(this.preloadBar);
    */

    // load game assets
    //this.load.atlas('robot', './assets/tanks.png', './assets/tanks.json');
    this.load.spritesheet('robot', './assets/arrow.png', 68, 68);
    //this.load.spritesheet('robot', './assets/dude.png', 32, 48);
    this.load.image('logo', './assets/logo.png');
    this.load.image('earth', './assets/white.jpg');
    //this.load.image('bullet', './assets/bullet.png');
    this.load.image('point', './assets/point.png');
  },
  create: function() {
    this.state.start('Game');
  }
};

RoBlockWar.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
	
    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words',
    // i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};

RoBlockWar.Game.prototype = {
	create: function () {
	  // allow game to run in background (keep going even if switch tabs/windows)
	  this.game.disableVisibilityChange = true;
	  
	  //  Resize our game world to be a 2000 x 2000 square
    this.game.world.setBounds(0, 0, 500, 500);

    //  Our tiled scrolling background
    this.land = this.game.add.tileSprite(0, 0, 800, 600, 'earth');
    this.land.fixedToCamera = true;

    //  Our tiled scrolling background
    this.land = this.game.add.sprite(0, 0, 'earth');
  
    //create robots
    for(var i = 0; i < this.game.Robots.length; i++)
    { 
      //  The base of our robot
      //var botView = this.game.add.sprite(0, 250, 'robot', 'tank1');
      var botView = this.game.add.sprite(0, 250, 'robot', 3);
      //botView.anchor.setTo(0.5, 0.5);
      //botView.animations.add('move', ['tank1', 'tank2', 'tank3', 'tank4', 'tank5', 'tank6'], 20, true);
      botView.animations.add('right', [3, 3, 3, 3, 3], 10, true);
      botView.animations.add('left', [1, 1, 1, 1, 1], 10, true);
      botView.animations.add('down', [0, 0, 0, 0, 0], 10, true);
      botView.animations.add('up', [2, 2, 2, 2, 2], 10, true);
  
      //  This will force it to decelerate and limit its speed
      this.game.physics.enable(botView, Phaser.Physics.ARCADE);
      botView.body.drag.set(0.2);
      botView.body.maxVelocity.setTo(400, 400);
      botView.body.collideWorldBounds = true;
  
      this.game.Robots[i].init(botView);
      
      var runner = new AsyncInterpreterRunner(this.game.Robots[i].CodeToRun, this.game.Robots[i].createInterpreterInitializer(this.game.highlightBlockFunc));
      this.game.Scheduler.submit(runner, 'process' + this.game.Robots[i].processId);
    }
    
    this.game.Scheduler.run(this.quitGame);
	},
  
	update: function () {
	    var startWith = (this.time.totalElapsedSeconds() % this.game.Robots.length) / 100;
        for(var i = 0; i < this.game.Robots.length; i++){
            this.game.physics.arcade.collide(this.game.Robots[i].RobotPlayer, this.blockedLayer);
            this.game.Robots[i].update();
        }
        for(var i = 0; i < startWith; i++){
            this.game.physics.arcade.collide(this.game.Robots[i].RobotPlayer, this.blockedLayer);
            this.game.Robots[i].update();
        }
	},

	quitGame: function (pointer) {
		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.shutDown();
		this.game.destroy();
		this.destroy();
	}
};

RoBlockWar.BuildGame = function(robotCodes, highlightFunc) {
  
  console.log("robotCodes: ", robotCodes);
  var bots = [];
  // for(var i = 0; i < robotCodes.length; i++){
  for(var i = 0; i < 1; i++) {
      var newRobot = new RoBlockWar_Robot(i, "DevBot" + i, robotCodes[i]);
      bots.push(newRobot);
  }
	var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '');

  game.Robots = bots;
  game.highlightBlockFunc = highlightFunc;
	game.Scheduler = new AsyncScheduler();
	game.Scheduler.paused = false;
	
	var orig_doWork = game.Scheduler._doWork;
	game.Scheduler._doWork = function(doneCallback){
	  if(!game.Scheduler.paused){
	    orig_doWork.call(game.Scheduler, doneCallback);
	  }
	}
  game.DevPause = function(toggle){
    window.console.log('setting pause with toggle {' + toggle + '}');
    this.paused = toggle;
    this.Scheduler.paused = toggle;
    this.Scheduler.run(function(){});
  }

	//	Add the States the game has.
	game.state.add('Boot', RoBlockWar.Boot);
	game.state.add('Preloader', RoBlockWar.Preloader);
	game.state.add('Game', RoBlockWar.Game);
	game.state.add('Done', RoBlockWar.Done);
	
	//	Now start the Boot state.
	game.state.start('Boot');
	return game;
};