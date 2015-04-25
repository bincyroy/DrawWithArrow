var RoBlockWar = RoBlockWar || {};

RoBlockWar.Settings = RoBlockWar.Settings || {};
RoBlockWar.Settings.Robot = RoBlockWar.Settings.Robot || {};

RoBlockWar.Settings.Robot.CannonCoolDown = 5;
var position = 150;
var direction = "forwardDirection";
var positionArr = [];
var directionArr = [];
var isCompleted = [];
var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = true;


function RoBlockWar_Robot(processId, robotName, userCode){
  this.processId = processId;
  this.RobotPlayer = null;
  this.RobotName = robotName;
  this.CodeToRun = userCode;
  this.newPosition = null;
}

RoBlockWar_Robot.prototype.init = function(player) {
    this.RobotPlayer = player;
};

RoBlockWar_Robot.prototype.update = function() {
    
    //this.RobotPlayer.body.y = 250;
    var forwardTotal = 0;
    var backwardTotal = 0;
    for(var i = 0; i < directionArr.length; i++) {
        if(directionArr[i] === 'forwardDirection') {
            forwardTotal += positionArr[i];
        } else if(directionArr[i] === 'backwardDirection') {
            backwardTotal += positionArr[i];
        }
        //console.log("forwardTotal: ", forwardTotal);
        //console.log("backwardTotal: ", backwardTotal)
        //console.log("X Position: ", this.RobotPlayer.body.x);
        var count = 0;
        while(!isCompleted[i]) {
            this.RobotPlayer.body.velocity.x = 0;
            this.RobotPlayer.body.velocity.y = 0;
            if(directionArr[i] === "forwardDirection") {
                if(moveUp) {
                    this.RobotPlayer.body.velocity.y = 150;
                    this.RobotPlayer.body.y -= 1;
                    this.RobotPlayer.game.add.sprite(this.RobotPlayer.body.x, this.RobotPlayer.body.y, 'point');
                    count += 1;
                    this.RobotPlayer.animations.play('up');
                    if(count >= positionArr[i]) {
                        console.log("Finished moving UP");
                        this.RobotPlayer.body.velocity.y = 0;
                        isCompleted[i] = true;
                    }
                } else if(moveDown) {
                    this.RobotPlayer.body.velocity.y = 150;
                    this.RobotPlayer.body.y += 1;
                    this.RobotPlayer.game.add.sprite(this.RobotPlayer.body.x, this.RobotPlayer.body.y, 'point');
                    count += 1;
                    this.RobotPlayer.animations.play('down');
                    if(count >= positionArr[i]) {
                        console.log("Finished moving DOWN");
                        this.RobotPlayer.body.velocity.y = 0;
                        isCompleted[i] = true;
                    }
                } else if(moveLeft) {
                    this.RobotPlayer.body.velocity.x = 150;
                    this.RobotPlayer.body.x -= 1;
                    this.RobotPlayer.game.add.sprite(this.RobotPlayer.body.x, this.RobotPlayer.body.y, 'point');
                    count += 1;
                    this.RobotPlayer.animations.play('left');
                    if(count >= positionArr[i]) {
                        console.log("Finished moving LEFT");
                        this.RobotPlayer.body.velocity.x = 0;
                        isCompleted[i] = true;
                    }
                } else if(moveRight) {
                    this.RobotPlayer.body.velocity.x = 150;
                    this.RobotPlayer.body.x += 1;
                    this.RobotPlayer.game.add.sprite(this.RobotPlayer.body.x, this.RobotPlayer.body.y, 'point');
                    count += 1;
                    this.RobotPlayer.animations.play('right');
                    if(count >= positionArr[i]) {
                        console.log("Finished moving RIGHT");
                        this.RobotPlayer.body.velocity.x = 0;
                        isCompleted[i] = true;
                    }
                }
            } else if(directionArr[i] == "backwardDirection") {
                this.RobotPlayer.body.velocity.x = 5;
                this.RobotPlayer.body.velocity.y = 0;
                this.RobotPlayer.body.x -= 1;
                this.RobotPlayer.body.y = 250;
                this.RobotPlayer.animations.play('left');
                if(this.RobotPlayer.body.x <= Math.abs(forwardTotal - backwardTotal)) {
                    this.RobotPlayer.body.velocity.x = 0;
                    this.RobotPlayer.body.velocity.y = 0;
                    //this.RobotPlayer.animations.stop();
                    this.RobotPlayer.frame = 1;
                    isCompleted[i] = true;
                }
            } else if(directionArr[i] == "leftDirection") {
                console.log("TURN LEFT");
                if(directionArr[i-1] == "forwardDirection") {
                    if(positionArr[i] <= 90) {
                        if(moveUp) {
                            moveUp = false;
                            this.RobotPlayer.animations.play('left');
                            moveLeft = true;
                        } else if(moveDown) {
                            moveDown = false;
                            this.RobotPlayer.animations.play('right');
                            moveRight = true;
                        } else if(moveLeft) {
                            moveLeft = false;
                            this.RobotPlayer.animations.play('down');
                            moveDown = true;
                        } else if(moveRight) {
                            moveRight = false;
                            this.RobotPlayer.animations.play('up');
                            moveUp = true;
                        }
                    } else if(positionArr[i] > 90 && positionArr[i] <= 180) {
                        this.RobotPlayer.animations.play('left');
                    } else if(positionArr[i] > 180 && positionArr[i] <= 270) {
                        this.RobotPlayer.animations.play('down');
                    } else if(positionArr[i] > 270 && positionArr[i] <= 360) {
                        this.RobotPlayer.animations.play('right');
                    }
                    isCompleted[i] = true;
                }
            } else if(directionArr[i] == "rightDirection") {
                console.log("TURN RIGHT");
                if(directionArr[i-1] == "forwardDirection") {
                    if(positionArr[i] <= 90) {
                        if(moveUp) {
                            moveUp = false;
                            this.RobotPlayer.animations.play('right');
                            moveRight = true;
                        } else if(moveDown) {
                            moveDown = false;
                            this.RobotPlayer.animations.play('left');
                            moveLeft = true;
                        } else if(moveLeft) {
                            moveLeft = false;
                            this.RobotPlayer.animations.play('up');
                            moveUp = true;
                        } else if(moveRight) {
                            moveRight = false;
                            this.RobotPlayer.animations.play('down');
                            moveDown = true;
                        }
                    } else if(positionArr[i] > 90 && positionArr[i] <= 180) {
                        this.RobotPlayer.animations.play('left');
                    } else if(positionArr[i] > 180 && positionArr[i] <= 270) {
                        this.RobotPlayer.animations.play('down');
                    } else if(positionArr[i] > 270 && positionArr[i] <= 360) {
                        this.RobotPlayer.animations.play('right');
                    }
                    isCompleted[i] = true;
                }
            }
        } // while
    }
};

RoBlockWar_Robot.prototype.moveForwardBackward = function(selectedDirection, numPixels) {
    console.log("direction: " + selectedDirection);
    console.log("numPixels: " + numPixels);
    
    directionArr.push(selectedDirection);
    positionArr.push(numPixels);
    isCompleted.push(false);

}

RoBlockWar_Robot.prototype.turnLeftRight = function(selectedDirection, numDegrees) {
    console.log("direction: " + selectedDirection);
    console.log("numDegrees: " + numDegrees);
    
    directionArr.push(selectedDirection);
    positionArr.push(numDegrees);
    isCompleted.push(false);
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
        
        interpreter.setProperty(scope, 'moveForwardBackward', helper.nativeValueToInterpreter(robot.moveForwardBackward));
        interpreter.setProperty(scope, 'turnLeftRight', helper.nativeValueToInterpreter(robot.turnLeftRight));
        interpreter.setProperty(scope, 'waitFor', helper.nativeValueToInterpreter(robot.waitFor));
        interpreter.setProperty(scope, 'highlightBlock',  helper.nativeValueToInterpreter(highlightWrapper));
        interpreter.setProperty(scope, 'devPause',  helper.nativeValueToInterpreter(pauseWrapper));
    };
};


