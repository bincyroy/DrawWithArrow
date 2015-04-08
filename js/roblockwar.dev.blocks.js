////// When run Block //////////////////////////////

Blockly.Blocks['whenrun'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("When Run");
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['whenrun'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};

/////// Repeat Block ///////////////////////////////////

Blockly.Blocks['repeatblock'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(160);
    this.appendStatementInput("Repeat")
        .appendField("Repeat")
        .appendField(new Blockly.FieldTextInput("0"), "numRepeat")
        .appendField("times");
    this.appendDummyInput()
        .appendField("Do");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['repeatblock'] = function(block) {
  var statements_repeat = Blockly.JavaScript.statementToCode(block, 'Repeat');
  var text_numrepeat = block.getFieldValue('numRepeat');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};

////// Right-Left Block///////////////////////////////////////////

Blockly.Blocks['rightleft'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendStatementInput("forward")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldTextInput("turn"), "turnLabel")
        .appendField(new Blockly.FieldDropdown([["right", "rightDirection"], ["left", "leftDirection"]]), "directions")
        .appendField(new Blockly.FieldTextInput("by"), "byLabel")
        .appendField(new Blockly.FieldTextInput("0"), "numDegrees")
        .appendField(new Blockly.FieldTextInput("degrees"), "degreesLabel");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['rightleft'] = function(block) {
  var statements_forward = Blockly.JavaScript.statementToCode(block, 'forward');
  var text_turnlabel = block.getFieldValue('turnLabel');
  var dropdown_directions = block.getFieldValue('directions');
  var text_bylabel = block.getFieldValue('byLabel');
  var text_numdegrees = block.getFieldValue('numDegrees');
  var text_degreeslabel = block.getFieldValue('degreesLabel');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};

////// Forward - Backward Block//////////////////////////////

Blockly.Blocks['forward'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendStatementInput("forward")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldTextInput("move"), "moveLabel")
        .appendField(new Blockly.FieldDropdown([["forward", "forwardDirection"], ["backward", "backwardDirection"]]), "directions")
        .appendField(new Blockly.FieldTextInput("by"), "byLabel")
        .appendField(new Blockly.FieldTextInput("0"), "numPixels")
        .appendField(new Blockly.FieldTextInput("pixels"), "pixelsLabel");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['forward'] = function(block) {
  var statements_forward = Blockly.JavaScript.statementToCode(block, 'forward');
  var text_movelabel = block.getFieldValue('moveLabel');
  var dropdown_directions = block.getFieldValue('directions');
  var text_bylabel = block.getFieldValue('byLabel');
  var text_numpixels = block.getFieldValue('numPixels');
  var text_pixelslabel = block.getFieldValue('pixelsLabel');
  // TODO: Assemble JavaScript into code variable.
  console.log("forward block executing......")
  var code = 'moveForwardBackward(\'' + dropdown_directions + '\', ' + text_numpixels + '); ';
  return code;
};

////////////////////////////////////////////////////////////////










//////////////////////////////////++++++++++++++++++++-----------------------

/*************************************
 * Modify Blockly's Procedures Blocks
**************************************/
Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = 'Define Instruction Group';
var old_defNoReturn_init = Blockly.Blocks.procedures_defnoreturn.init; 
Blockly.Blocks.procedures_defnoreturn.init = function(){
  old_defNoReturn_init.call(this);
  this.setMutator(undefined);
};

Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS = '';
Blockly.Msg.PROCEDURES_DEFRETURN_RETURN = 'all done';
Blockly.Blocks.procedures_defreturn = undefined;


Blockly.Blocks.logic.HUE = Blockly.Blocks.loops.HUE;

/*************************************
 * Modify Blockly's While Block
  * TODO: see if we really need to remove 'Until' option
var old_controls_whileUntil_init = Blockly.Blocks.controls_whileUntil.init; 
Blockly.Blocks.controls_whileUntil.init = function(){
  old_controls_whileUntil_init.call(this);  
  this.setMutator(undefined);
  this.getInput('BOOL').removeField('MODE');
  this.getInput('BOOL')
      .appendField("while", 'MODE');
};
**************************************/

/*************************************
 * Modify Blockly's if Block
**************************************/
var old_controls_if_init = Blockly.Blocks.controls_if.init; 
Blockly.Blocks.controls_if.init = function(){
  old_controls_if_init.call(this);  
  this.setMutator(undefined);
};

/*************************************
 * Radar Block
**************************************/

Blockly.Blocks['roblockwar_radar'] = {
  init: function() {
    this.setColour(359);
    this.appendDummyInput()
        .appendField("Send Radar Ping");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Ping your Radar');
  }
};

Blockly.JavaScript['roblockwar_radar'] = function(block) {
  var code = 'sendRadarPulse(asyncWait)';
  return code;
};
Blockly.JavaScript.addReservedWords('sendRadarPulse');

/*************************************
 * Fire/shoot Block
**************************************/

Blockly.Blocks['roblockwar_fire'] = {
  init: function() {
    this.setColour(359);
    this.appendValueInput("BlastDelay")
        .setCheck("Number")
        .appendField("Fire at Distance:");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Fire your Cannon at the target distance');
  }
};

Blockly.JavaScript['roblockwar_fire'] = function(block) {
  var value_blastdelay = Blockly.JavaScript.valueToCode(block, 'BlastDelay', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'fireAtDistance(' + value_blastdelay + ');';
  return code;
};
Blockly.JavaScript.addReservedWords('fireAtDistance');

/*************************************
 * Get Register Block
**************************************/

Blockly.Blocks['roblockwar_getRegister'] = {
  init: function() {
    this.setColour(260);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["X", "X"],
                                                ["Y", "Y"],
                                                ["SPEEDX", "SPEEDX"],
                                                ["SPEEDY", "SPEEDY"],
                                                ["DAMAGE", "DAMAGE"],
                                                ["AIM", "AIM"],
                                                ["COOLDOWN", "COOLDOWN"],
                                                ["DISTANCE", "DISTANCE"],
                                                ["DATA", "DATA"],
                                                ["INDEX", "INDEX"],
                                                ["RANDOM", "RANDOM"],
                                                ["A", "A"],
                                                ["B", "B"],
                                                ["C", "C"],
                                                ["D", "D"],
                                                ["E", "E"],
                                                ["F", "F"],
                                                ["G", "G"],
                                                ["H", "H"],
                                                ["I", "I"],
                                                ["J", "J"],
                                                ["K", "K"],
                                                ["L", "L"],
                                                ["M", "M"],
                                                ["N", "N"],
                                                ["O", "O"],
                                                ["P", "P"],
                                                ["Q", "Q"],
                                                ["R", "R"],
                                                ["S", "S"],
                                                ["T", "T"],
                                                ["U", "U"],
                                                ["V", "V"],
                                                ["W", "W"],
                                                ["Z", "Z"]]), "RegisterName");
    this.setOutput(true, "Number");
    this.setTooltip('Get Value from Register');
  }
};

Blockly.JavaScript['roblockwar_getRegister'] = function(block) {
  var dropdown_registername = block.getFieldValue('RegisterName');
  
  var code = 'Registers.getR(\'' + dropdown_registername + '\')';
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.addReservedWords('Registers');

/*************************************
 * Get Register Block
**************************************/

Blockly.Blocks['roblockwar_setRegister'] = {
  init: function() {
    this.setColour(260);
    this.appendValueInput("RegisterValue")
        .setCheck("Number")
        .appendField("set ")
        .appendField(new Blockly.FieldDropdown([["SPEEDX", "SPEEDX"],
                                                ["SPEEDY", "SPEEDY"],
                                                ["AIM", "AIM"],
                                                ["INDEX", "INDEX"],
                                                ["RANDOM", "RANDOM"],
                                                ["A", "A"],
                                                ["B", "B"],
                                                ["C", "C"],
                                                ["D", "D"],
                                                ["E", "E"],
                                                ["F", "F"],
                                                ["G", "G"],
                                                ["H", "H"],
                                                ["I", "I"],
                                                ["J", "J"],
                                                ["K", "K"],
                                                ["L", "L"],
                                                ["M", "M"],
                                                ["N", "N"],
                                                ["O", "O"],
                                                ["P", "P"],
                                                ["Q", "Q"],
                                                ["R", "R"],
                                                ["S", "S"],
                                                ["T", "T"],
                                                ["U", "U"],
                                                ["V", "V"],
                                                ["W", "W"],
                                                ["Z", "Z"]]), "RegisterName")
        .appendField(" to ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Save Value to Register');
  }
};

Blockly.JavaScript['roblockwar_setRegister'] = function(block) {
  var value_registervalue = Blockly.JavaScript.valueToCode(block, 'RegisterValue', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_registername = block.getFieldValue('RegisterName');
  
  var code = ' Registers.setR(\'' + dropdown_registername + '\', ' + value_registervalue + '); ';
  
  return code;
};
Blockly.JavaScript.addReservedWords('Registers');

/*************************************
 * Wait Block
**************************************/

Blockly.Blocks['roblockwar_wait'] = {
  init: function() {
    this.setColour(260);
    this.appendValueInput("sleepTime")
        .setCheck("Number")
        .appendField("Wait for seconds: ");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Wait for this Seconds');
  }
};

Blockly.JavaScript['roblockwar_wait'] = function(block) {
  var value_sleeptime = Blockly.JavaScript.valueToCode(block, 'sleepTime', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'waitFor(' + value_sleeptime + ', asyncWait);';
  return code;
};
Blockly.JavaScript.addReservedWords('waitFor');

Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
Blockly.JavaScript.addReservedWords('devPause');