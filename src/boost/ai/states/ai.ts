const MIN_DISTANCE = 75;
const OK_DISTANCE = 100;

const EXECUTE_TIME_SEC = 60;
const CHECK_TIME_MS = 59000;

// Speeds must be between -100 and 100
const TURN_SPEED = 30;
const TURN_SPEED_OPPOSITE = -10;
const DRIVE_SPEED = 30;
const REVERSE_SPEED = -15;

function seek() {
  if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
    this.control.driveInput = Date.now();
    this.hub.motorTimeMulti(EXECUTE_TIME_SEC, TURN_SPEED, TURN_SPEED_OPPOSITE);
  } 
  
  if (Date.now() - this.control.driveInput < 250)
    return;

  if (this.device.distance > this.prevDevice.distance) {
    this.control.turnDirection = 'right';
    this.setNextState('Turn');
  } else {
    this.control.turnDirection = 'left';
    this.setNextState('Turn');
  }
}

function turn() {
  if (this.device.distance < MIN_DISTANCE){
    this.control.turnDirection = null;      
    this.setNextState('Back');
    return;
  } else if (this.device.distance > OK_DISTANCE) {
    this.control.turnDirection = null;      
    this.setNextState('Drive');
    return;
  }

  if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
    const motorA = this.control.turnDirection == 'right' ? TURN_SPEED : TURN_SPEED_OPPOSITE;
    const motorB = this.control.turnDirection == 'right' ? TURN_SPEED_OPPOSITE : TURN_SPEED;

    this.control.driveInput = Date.now();
    this.hub.motorTimeMulti(EXECUTE_TIME_SEC, motorA, motorB);
  }
}
  
function drive() {
  if (this.device.distance < MIN_DISTANCE){
    this.setNextState('Back');
    return;
  } else if (this.device.distance < OK_DISTANCE) {
    this.setNextState('Seek');
    return;
  }

  if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
    this.control.driveInput = Date.now();
    this.hub.motorTimeMulti(EXECUTE_TIME_SEC, DRIVE_SPEED, DRIVE_SPEED);
  }
}
  
function back() {
  if (this.device.distance > OK_DISTANCE) {
    this.setNextState('Seek');
    return;
  }

  if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
    this.control.driveInput = Date.now();
    this.hub.motorTimeMulti(EXECUTE_TIME_SEC, REVERSE_SPEED, REVERSE_SPEED);
  }
}
  
function stop() {
  this.control.speed = 0;
  this.control.turnAngle = 0;

  if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
    this.control.driveInput = Date.now();
    this.hub.motorTimeMulti(EXECUTE_TIME_SEC, 0, 0);
  }
}

export {
  stop,
  back,
  drive,
  turn,
  seek
}