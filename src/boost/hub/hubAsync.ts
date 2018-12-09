import { Hub } from "./hub";

const CALLBACK_TIMEOUT_MS = 1000 / 3;
const METRIC_MODIFIER = 28.5;
const IMPERIAL_MODIFIER = METRIC_MODIFIER / 4;
const TURN_MODIFIER = 2.56;
const DRIVE_SPEED = 25;
const TURN_SPEED = 20;
const DEFAULT_STOP_DISTANCE = 105;
const DEFAULT_CLEAR_DISTANCE = 120;

const waitForValueToSet = function(
  valueName,
  compareFunc = valueName => this[valueName],
  timeoutMs = 0
) {
  if (compareFunc.bind(this)(valueName))
    return Promise.resolve(this[valueName]);

  return new Promise((resolve, reject) => {
    setTimeout(
      async () =>
        resolve(
          await waitForValueToSet.bind(this)(valueName, compareFunc, timeoutMs)
        ),
      timeoutMs + 100
    );
  });
};

export class HubAsync extends Hub {
  /**
   * Disconnect Hub
   * @method Hub#disconnectAsync
   * @returns {Promise<boolean>} disconnection successful
   */
  disconnectAsync = function() {
    this.disconnect();
    return waitForValueToSet.bind(this)("hubDisconnected");
  };

  /**
   * Execute this method after new instance of Hub is created
   * @method Hub#afterInitialization
   */
  afterInitialization = function() {
    this.hubDisconnected = null;
    this.ports = {
      A: { angle: 0 },
      B: { angle: 0 },
      AB: { angle: 0 },
      C: { angle: 0 },
      D: { angle: 0 },
      LED: { angle: 0 }
    };
    this.useMetric = true;
    this.modifier = 1;

    this.on(
      "rotation",
      rotation => (this.ports[rotation.port].angle = rotation.angle)
    );
    this.on("disconnect", () => (this.hubDisconnected = true));
    this.on("distance", distance => (this.distance = distance));
  };

  /**
   * Control the LED on the Move Hub
   * @method Hub#ledAsync
   * @param {boolean|number|string} color
   * If set to boolean `false` the LED is switched off, if set to `true` the LED will be white.
   * Possible string values: `off`, `pink`, `purple`, `blue`, `lightblue`, `cyan`, `green`, `yellow`, `orange`, `red`,
   * `white`
   * @returns {Promise}
   */
  ledAsync = function(color) {
    return new Promise((resolve, reject) => {
      this.led(color, () => {
        // Callback is executed when command is sent and it will take some time before MoveHub executes the command
        setTimeout(resolve, CALLBACK_TIMEOUT_MS);
      });
    });
  };

  /**
   * Run a motor for specific time
   * @method Hub#motorTimeAsync
   * @param {string|number} port possible string values: `A`, `B`, `AB`, `C`, `D`.
   * @param {number} seconds
   * @param {number} [dutyCycle=100] motor power percentage from `-100` to `100`. If a negative value is given rotation
   * is counterclockwise.
   * @param {boolean} [wait=false] will promise wait unitll motorTime run time has elapsed
   * @returns {Promise}
   */
  motorTimeAsync = function(port, seconds, dutyCycle = 100, wait = false) {
    return new Promise((resolve, reject) => {
      this.motorTime(port, seconds, dutyCycle, () => {
        setTimeout(
          resolve,
          wait ? CALLBACK_TIMEOUT_MS + seconds * 1000 : CALLBACK_TIMEOUT_MS
        );
      });
    });
  };

  /**
   * Run both motors (A and B) for specific time
   * @method Hub#motorTimeMultiAsync
   * @param {number} seconds
   * @param {number} [dutyCycleA=100] motor power percentage from `-100` to `100`. If a negative value is given rotation
   * is counterclockwise.
   * @param {number} [dutyCycleB=100] motor power percentage from `-100` to `100`. If a negative value is given rotation
   * is counterclockwise.
   * @param {boolean} [wait=false] will promise wait unitll motorTime run time has elapsed
   * @returns {Promise}
   */
  motorTimeMultiAsync = function(
    seconds,
    dutyCycleA = 100,
    dutyCycleB = 100,
    wait = false
  ) {
    return new Promise((resolve, reject) => {
      this.motorTimeMulti(seconds, dutyCycleA, dutyCycleB, () => {
        setTimeout(
          resolve,
          wait ? CALLBACK_TIMEOUT_MS + seconds * 1000 : CALLBACK_TIMEOUT_MS
        );
      });
    });
  };

  /**
   * Turn a motor by specific angle
   * @method Hub#motorAngleAsync
   * @param {string|number} port possible string values: `A`, `B`, `AB`, `C`, `D`.
   * @param {number} angle - degrees to turn from `0` to `2147483647`
   * @param {number} [dutyCycle=100] motor power percentage from `-100` to `100`. If a negative value is given
   * rotation is counterclockwise.
   * @param {boolean} [wait=false] will promise wait unitll motorAngle has turned
   * @returns {Promise}
   */
  motorAngleAsync = function(port, angle, dutyCycle = 100, wait = false) {
    return new Promise((resolve, reject) => {
      this.motorAngle(port, angle, dutyCycle, async () => {
        if (wait) {
          let beforeTurn;
          do {
            beforeTurn = this.ports[port].angle;
            await new Promise(res => setTimeout(res, CALLBACK_TIMEOUT_MS));
          } while (this.ports[port].angle !== beforeTurn);
          resolve();
        } else {
          setTimeout(resolve, CALLBACK_TIMEOUT_MS);
        }
      });
    });
  };

  /**
   * Turn both motors (A and B) by specific angle
   * @method Hub#motorAngleMultiAsync
   * @param {number} angle degrees to turn from `0` to `2147483647`
   * @param {number} [dutyCycleA=100] motor power percentage from `-100` to `100`. If a negative value is given
   * rotation is counterclockwise.
   * @param {number} [dutyCycleB=100] motor power percentage from `-100` to `100`. If a negative value is given
   * rotation is counterclockwise.
   * @param {boolean} [wait=false] will promise wait unitll motorAngle has turned
   * @returns {Promise}
   */
  motorAngleMultiAsync = function(
    angle,
    dutyCycleA = 100,
    dutyCycleB = 100,
    wait = false
  ) {
    return new Promise((resolve, reject) => {
      this.motorAngleMulti(angle, dutyCycleA, dutyCycleB, async () => {
        if (wait) {
          let beforeTurn;
          do {
            beforeTurn = this.ports["AB"].angle;
            await new Promise(res => setTimeout(res, CALLBACK_TIMEOUT_MS));
          } while (this.ports["AB"].angle !== beforeTurn);
          resolve();
        } else {
          setTimeout(resolve, CALLBACK_TIMEOUT_MS);
        }
      });
    });
  };

  /**
   * Use metric units (default)
   * @method Hub#useMetricUnits
   */
  useMetricUnits = function() {
    this.useMetric = true;
  };

  /**
   * Use imperial units
   * @method Hub#useImperialUnits
   */
  useImperialUnits = function() {
    this.useMetric = false;
  };

  /**
   * Set friction modifier
   * @method Hub#setFrictionModifier
   * @param {number} modifier friction modifier
   */
  setFrictionModifier = function(modifier) {
    this.modifier = modifier;
  };

  /**
   * Drive specified distance
   * @method Hub#drive
   * @param {number} distance distance in centimeters (default) or inches. Positive is forward and negative is backward.
   * @param {boolean} [wait=true] will promise wait untill the drive has completed.
   * @returns {Promise}
   */
  drive = function(distance, wait = true) {
    const angle =
      Math.abs(distance) *
      ((this.useMetric ? METRIC_MODIFIER : IMPERIAL_MODIFIER) * this.modifier);
    const dutyCycleA = DRIVE_SPEED * (distance > 0 ? 1 : -1);
    const dutyCycleB = DRIVE_SPEED * (distance > 0 ? 1 : -1);
    return this.motorAngleMultiAsync(angle, dutyCycleA, dutyCycleB, wait);
  };

  /**
   * Turn robot specified degrees
   * @method Hub#turn
   * @param {number} degrees degrees to turn. Negative is to the left and positive to the right.
   * @param {boolean} [wait=true] will promise wait untill the turn has completed.
   * @returns {Promise}
   */
  turn = function(degrees, wait = true) {
    const angle = Math.abs(degrees) * TURN_MODIFIER;
    const dutyCycleA = TURN_SPEED * (degrees > 0 ? 1 : -1);
    const dutyCycleB = TURN_SPEED * (degrees > 0 ? -1 : 1);
    return this.motorAngleMultiAsync(angle, dutyCycleA, dutyCycleB, wait);
  };

  /**
   * Drive untill sensor shows object in defined distance
   * @method Hub#driveUntil
   * @param {number} [distance=0] distance in centimeters (default) or inches when to stop. Distance sensor is not very sensitive or accurate.
   * By default will stop when sensor notices wall for the first time. Sensor distance values are usualy between 110-50.
   * @param {boolean} [wait=true] will promise wait untill the bot will stop.
   * @returns {Promise}
   */
  driveUntil = async function(distance = 0, wait = true) {
    const distanceCheck =
      distance !== 0
        ? this.useMetric
          ? distance
          : distance * 2.54
        : DEFAULT_STOP_DISTANCE;
    this.motorTimeMulti(60, DRIVE_SPEED, DRIVE_SPEED);
    if (wait) {
      await waitForValueToSet.bind(this)(
        "distance",
        () => distanceCheck >= this.distance
      );
      await this.motorAngleMultiAsync(0);
    } else {
      return waitForValueToSet
        .bind(this)("distance", () => distanceCheck >= this.distance)
        .then(_ => this.motorAngleMulti(0, 0, 0));
    }
  };

  /**
   * Turn until there is no object in sensors sight
   * @method Hub#turnUntil
   * @param {number} [direction=1] direction to turn to. 1 (or any positive) is to the right and 0 (or any negative) is to the left.
   * @param {boolean} [wait=true] will promise wait untill the bot will stop.
   * @returns {Promise}
   */
  turnUntil = async function(direction = 1, wait = true) {
    const directionModifier = direction > 0 ? 1 : -1;
    this.turn(360 * directionModifier, false);
    if (wait) {
      await waitForValueToSet.bind(this)(
        "distance",
        () => this.distance >= DEFAULT_CLEAR_DISTANCE
      );
      await this.turn(0, false);
    } else {
      return waitForValueToSet
        .bind(this)("distance", () => this.distance >= DEFAULT_CLEAR_DISTANCE)
        .then(_ => this.turn(0, false));
    }
  };
}
