const CODE_EXAMPLES = [
  {
    header: 'Change the color of the led',
    description: 'Change the color from red to green. Supported colors: off, pink, purple, blue, lightblue, cyan, green, yellow, orange, red, white',
    code: `await boost.ledAsync('red');
await boost.ledAsync('yellow');
await boost.ledAsync('green');`
  },
  {
    header: 'Drive and back',
    description: 'Drive 40cm, turn 180 degrees and drive 40cm',
    code: `await boost.drive(40);
await boost.turn(180);
await boost.drive(40);`
  },
  {
    header: 'Drive for 500 motor degrees',
    description: 'Turn motors A and B for 20% power for 500 degrees',
    code: `await boost.motorAngleMultiAsync(500, 20, 20);`
  },
  {
    header: 'Drive a circle',
    description: 'Drive a circle for 60 seconds',
    code: `await boost.motorTimeMultiAsync(60, 50, 10);`
  },
  {
    header: 'Driva a snake',
    description: 'Repeat motor command for 5 times. Every other time motor A power is 30 and B is 10. Every other power for A is 10 and B is 30.',
    code: `for(let i = 0; i < 6; i++){
  if (i % 2 == 0)
    await boost.motorAngleMultiAsync(500, 30, 10);
  else
    await boost.motorAngleMultiAsync(500, 10, 30);
}`
  },
  {
    header: `Turn Vernie's head`,
    description: `Turn Vernie's head first to the left, wait 1 second, turn to the right, wait 1 second, then back to the center.`,
    code: `await boost.motorAngleAsync('D', 50, 10);
await new Promise(resolve => setTimeout(resolve, 1000));
await boost.motorAngleAsync('D', 100, -10);
await new Promise(resolve => setTimeout(resolve, 1000));
await boost.motorAngleAsync('D', 50, 10);`
  },
  {
    header: 'Drive a square route',
    description: 'Drive 50cm, turn 90 degree. Repeat this 4 times. Should complete a square',
    code: `const distanceToDrive = 50;
const degreestoTurn = 90;

await boost.drive(distanceToDrive);
await boost.turn(degreestoTurn);
await boost.drive(distanceToDrive);
await boost.turn(degreestoTurn);
await boost.drive(distanceToDrive);
await boost.turn(degreestoTurn);
await boost.drive(distanceToDrive);`
  },
  {
    header: 'Drive until reach an object',
    description: 'If distance sendor reading is over 100, drive for 10 angles. Repeat',
    code: `while (true) {
  if (boost.deviceInfo.distance > 100) {
    await boost.motorAngleMultiAsync(10, 100, 100);
  } else {
    break;
  }
}`
  }
];

export { CODE_EXAMPLES };
