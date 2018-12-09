function stepByStep(controlData) {
  switch (controlData.input) {
    case 'up':
      controlData.speed += 10;
      break;
    case 'down':
      controlData.speed -= 10;
      break;
    case 'left':
      controlData.turnAngle -= 10;
      break;
    case 'right':
      controlData.turnAngle += 10;
      break;
    case 'q':
      controlData.tilt.roll -= 10;
      break;
    case 'w':
      controlData.tilt.roll += 10;
      break;
    case 'a':
      controlData.tilt.pitch -= 10;
      break;
    case 's':
      controlData.tilt.pitch += 10;
      break;
    case 'z':
      controlData.speed = 0;
      controlData.turnAngle = 0;
      controlData.tilt.roll = 0;
      controlData.tilt.pitch = 0;
      break;
    case 't':
      controlData.forceState = controlData.state == 'Manual' ? 'Drive' : 'Manual';
      break;
    case 'y':
      controlData.updateInputMode = manualDrive;
      break;
  }
  
  checkMaximums(controlData);
}
  
function manualDrive(controlData) {
  switch (controlData.input) {
    case 'up':
      if (controlData.speed < 0)
        controlData.speed = 0;
      else
        controlData.speed += 10;

      controlData.turnAngle = 0;
      break;
    case 'down':
      if (controlData.speed > 0)
        controlData.speed = 0;
      else
        controlData.speed -= 10;

      controlData.turnAngle = 0;
      break;
    case 'left':
      if (controlData.turnAngle > 0) 
        controlData.turnAngle = -10;
      else
        controlData.turnAngle -= 10;
      break;
    case 'right':
      if (controlData.turnAngle < 0) 
        controlData.turnAngle = 10;
      else
        controlData.turnAngle += 10;
      break;
    case 'q':
      if (controlData.tilt.roll > 0)
        controlData.tilt.roll = 0;
      else
        controlData.tilt.roll -= 10;
      break;
    case 'w':
      if (controlData.tilt.roll < 0)
        controlData.tilt.roll = 0;
      else
        controlData.tilt.roll += 10;
      break;
    case 'a':
      if (controlData.tilt.pitch > 0)
        controlData.tilt.pitch = 0;
      else
        controlData.tilt.pitch -= 10;
      break;
    case 's':
      if (controlData.tilt.pitch < 0)
        controlData.tilt.pitch = 0;
      else
        controlData.tilt.pitch += 10;
      break;
    case 'z':
      controlData.speed = 0;
      controlData.turnAngle = 0;
      controlData.tilt.roll = 0;
      controlData.tilt.pitch = 0;
      break;
    case 't':
      controlData.forceState = controlData.state == 'Manual' ? 'Drive' : 'Manual';
      break;
    case 'y':
      controlData.updateInputMode = arcadeDrive;
      break;
  }
  
  checkMaximums(controlData);
}

// TODO: Handle for keyup/keydown events, so control can handle forward and turning at the same time
function arcadeDrive(controlData) {
  controlData.speed = 0;
  controlData.turnAngle = 0;
  controlData.tilt.roll = 0;
  controlData.tilt.pitch = 0;

  switch (controlData.input) {
    case 'up':
      controlData.speed = 20;
      break;
    case 'down':
      controlData.speed = -20;
      break;
    case 'left':
      controlData.turnAngle = -10;
      break;
    case 'right':
      controlData.turnAngle = 10;
      break;
    case 'q':
      controlData.tilt.roll = -10;
      break;
    case 'w':
      controlData.tilt.roll = 10;
      break;
    case 'a':
      controlData.tilt.pitch = -10;
      break;
    case 's':
      controlData.tilt.pitch = 10;
      break;
    case 'z':
      break;
    case 't':
      controlData.forceState = controlData.state == 'Manual' ? 'Drive' : 'Manual';
      break;
    case 'y':
      controlData.updateInputMode = stepByStep;
      break;
  }
}

function checkMaximums(controlData){
  // These values have to be between -100 and 100
  controlData.speed = controlData.speed > 100 ? 100 : controlData.speed;
  controlData.speed = controlData.speed < -100 ? -100 : controlData.speed;
  controlData.turnAngle = controlData.turnAngle > 100 ? 100 : controlData.turnAngle;
  controlData.turnAngle = controlData.turnAngle < -100 ? -100 : controlData.turnAngle;
  controlData.tilt.roll = controlData.tilt.roll > 100 ? 100 : controlData.tilt.roll;
  controlData.tilt.roll = controlData.tilt.roll < -100 ? -100 : controlData.tilt.roll;
  controlData.tilt.pitch = controlData.tilt.pitch < -100 ? -100 : controlData.tilt.pitch;
  controlData.tilt.pitch = controlData.tilt.pitch < -100 ? -100 : controlData.tilt.pitch;
}

export {
  stepByStep,
  manualDrive,
  arcadeDrive
}