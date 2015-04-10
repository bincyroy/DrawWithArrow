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