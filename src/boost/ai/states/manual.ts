function manual() {
  if (this.control.speed != this.prevControl.speed || this.control.turnAngle != this.prevControl.turnAngle) {
    let motorA = this.control.speed + (this.control.turnAngle > 0 ? Math.abs(this.control.turnAngle) : 0);
    let motorB = this.control.speed + (this.control.turnAngle < 0 ? Math.abs(this.control.turnAngle) : 0);
        
    if (motorA > 100) {
      motorB -= motorA - 100;
      motorA = 100;
    }
    
    if (motorB > 100) {
      motorA -= motorB - 100;
      motorB = 100;
    }
    
    this.control.motorA = motorA;
    this.control.motorB = motorB;
    
    this.hub.motorTimeMulti(60, motorA, motorB);
  }
    
  if (this.control.tilt.pitch != this.prevControl.tilt.pitch) {
    this.hub.motorTime('C', 60, this.control.tilt.pitch);
  }

  if (this.control.tilt.roll != this.prevControl.tilt.roll) {
    this.hub.motorTime('D', 60, this.control.tilt.roll);
  }
}

export { manual };
