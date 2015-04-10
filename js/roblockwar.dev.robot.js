var RoBlockWar = RoBlockWar || {};

RoBlockWar.Settings = RoBlockWar.Settings || {};
RoBlockWar.Settings.Robot = RoBlockWar.Settings.Robot || {};

RoBlockWar.Settings.Robot.CannonCoolDown = 5;
var forwardPosition = 0;

function RoBlockWar_Robot(processId, robotName, userCode){
  this.processId = processId;
  this.RobotPlayer = null;
  this.RobotTurret = null;
  this.RobotName = robotName;
  this.CodeToRun = userCode;
  this.newPosition = null;
}

RoBlockWar_Robot.prototype.init = function(body, turret){
    this.RobotPlayer = body;
    this.RobotTurret = turret;
};

RoBlockWar_Robot.prototype.update = function() {
    
    if(this.RobotPlayer.body.x >= forwardPosition) {
        this.RobotPlayer.body.velocity.x = 0;
        this.RobotPlayer.body.velocity.y = 0;  
        this.RobotPlayer.animations.stop();
        this.RobotPlayer.frame = 1;
    } else {
        this.RobotPlayer.body.velocity.x = 23;
        this.RobotPlayer.body.velocity.y = 0;
        this.RobotPlayer.animations.play('move');
        this.RobotPlayer.body.x += 1;
        if(this.RobotPlayer.body.x >= forwardPosition) {
            this.RobotPlayer.body.velocity.x = 0;
            this.RobotPlayer.body.velocity.y = 0;
            this.RobotPlayer.animations.stop();
            this.RobotPlayer.frame = 1;
        }
    }
    console.log("x position: ", this.RobotPlayer.body.x);
};

RoBlockWar_Robot.prototype.moveForwardBackward = function(direction, numPixels) {
    console.log("moveForward");
    console.log("direction: " + direction);
    console.log("numPixels: " + numPixels);
    if(direction === "forwardDirection") {
        forwardPosition += numPixels;
    } else if(direction === "backwardDirection") {
        forwardPosition -= numPixels;
    }
    console.log("forwardPosition: " + forwardPosition);
}

RoBlockWar_Robot.prototype.waitFor = function (seconds, callback) {
    setTimeout(function(){
        if(callback != null){
            callback();
        }
    }, (seconds * 1000));
};

RoBlockWar_Robot.prototype.devPause = function () {
    this.RobotPlayer.game.DevPause(true);
};

RoBlockWar_Robot.prototype.createInterpreterInitializer = function(highlightBlock) {
    var robot = this;
    return function (interpreter, scope, helper) {
        var highlightWrapper = function(id) {
            id = id ? id.toString() : '';
            return interpreter.createPrimitive(highlightBlock(id));
        };
        
        var pauseWrapper = function() {
            return interpreter.createPrimitive(robot.devPause);
        };
        
        interpreter.setProperty(scope, 'Registers', helper.nativeValueToInterpreter(robot.Registers));
        interpreter.setProperty(scope, 'fireAtDistance', helper.nativeValueToInterpreter(robot.fireAtDistance));
        interpreter.setProperty(scope, 'moveForwardBackward', helper.nativeValueToInterpreter(robot.moveForwardBackward));
        interpreter.setProperty(scope, 'sendRadarPulse', helper.nativeValueToInterpreter(robot.sendRadarPulse));
        interpreter.setProperty(scope, 'waitFor', helper.nativeValueToInterpreter(robot.waitFor));;
        interpreter.setProperty(scope, 'highlightBlock',  helper.nativeValueToInterpreter(highlightWrapper));
        interpreter.setProperty(scope, 'devPause',  helper.nativeValueToInterpreter(pauseWrapper));
    };
};


