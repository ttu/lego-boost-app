const legoBoostTypes = `
declare module 'lego-boost-browser' {
    export declare type State = 'Turn' | 'Drive' | 'Stop' | 'Back' | 'Manual' | 'Seek';
    export declare type Motor = 'A' | 'B';
    export declare type TurnDirection = 'left' | 'right';
    /** Information from Lego Boost motors and sensors */
    export declare type DeviceInfo = {
        ports: {
            A: {
                action: string;
                angle: number;
            };
            B: {
                action: string;
                angle: number;
            };
            AB: {
                action: string;
                angle: number;
            };
            C: {
                action: string;
                angle: number;
            };
            D: {
                action: string;
                angle: number;
            };
            LED: {
                action: string;
                angle: number;
            };
        };
        tilt: {
            roll: number;
            pitch: number;
        };
        distance: number;
        rssi: number;
        color: string;
        error: string;
        connected: boolean;
        err?: any;
    };
    /** Input data to used on manual and AI control */
    export declare type ControlData = {
        input: string;
        speed: number;
        turnAngle: number;
        turnDirection?: TurnDirection;
        tilt: {
            roll: number;
            pitch: number;
        };
        /** Force state change manually */
        forceState: State;
        /** Manually toggle input mode */
        updateInputMode: (controlData: ControlData) => void;
        /** Time stamp when control data was updated */
        controlUpdateTime?: number;
        state?: State;
        motorA?: number;
        motorB?: number;
    };
    export declare type RawData = {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9?: number;
        10?: number;
        11?: number;
        12?: number;
        13?: number;
        14?: number;
    };

    export default class LegoBoost {
        private hub;
        private hubControl;
        private color;
        private updateTimer;
        private configuration;
        private logDebug;
        /**
         * Information from Lego Boost motors and sensors
         * @property LegoBoost#deviceInfo
         */
        deviceInfo: DeviceInfo;
        /**
         * Input data to used on manual and AI control
         * @property LegoBoost#controlData
         */
        controlData: ControlData;
        /**
         * Drive forward until wall is reaced or drive backwards 100meters
         * @method LegoBoost#connect
         * @param {BoostConfiguration} [configuration={}] Lego boost motor and control configuration
         * @returns {Promise}
         */
        connect(configuration?: BoostConfiguration): Promise<void>;
        private initHub;
        private handleGattDisconnect;
        /**
         * Change the color of the led between pink and orange
         * @method LegoBoost#changeLed
         * @returns {Promise}
         */
        changeLed(): Promise<void>;
        /**
         * Drive forward until wall is reaced or drive backwards 100meters
         * @method LegoBoost#driveToDirection
         * @param {number} [direction=1] Direction to drive. 1 or positive is forward, 0 or negative is backwards.
         * @returns {Promise}
         */
        driveToDirection(direction?: number): Promise<{}>;
        /**
         * Disconnect Lego Boost
         * @method LegoBoost#disconnect
         * @returns {boolean|undefined}
         */
        disconnect(): boolean | undefined;
        /**
         * Start AI mode
         * @method LegoBoost#ai
         */
        ai(): void;
        /**
         * Stop engines A and B
         * @method LegoBoost#stop
         * @returns {Promise}
         */
        stop(): Promise<{}>;
        /**
         * Update Boost motor and control configuration
         * @method LegoBoost#updateConfiguration
         * @param {BoostConfiguration} configuration Boost motor and control configuration
         */
        updateConfiguration(configuration: BoostConfiguration): void;
        /**
         * Control the LED on the Move Hub
         * @method LegoBoost#led
         * @param {boolean|number|string} color
         * If set to boolean 'false' the LED is switched off, if set to 'true' the LED will be white.
         * Possible string values: 'off', 'pink', 'purple', 'blue', 'lightblue', 'cyan', 'green', 'yellow', 'orange', 'red',
         * 'white'
         */
        led(color: boolean | number | string): void;
        /**
         * Control the LED on the Move Hub
         * @method LegoBoost#ledAsync
         * @param {boolean|number|string} color
         * If set to boolean 'false' the LED is switched off, if set to 'true' the LED will be white.
         * Possible string values: 'off', 'pink', 'purple', 'blue', 'lightblue', 'cyan', 'green', 'yellow', 'orange', 'red',
         * 'white'
         * @returns {Promise}
         */
        ledAsync(color: boolean | number | string): Promise<{}>;
        /**
         * Run a motor for specific time
         * @param {string|number} port possible string values: 'A', 'B', 'AB', 'C', 'D'.
         * @param {number} seconds
         * @param {number} [dutyCycle=100] motor power percentage from '-100' to '100'. If a negative value is given rotation
         * is counterclockwise.
         */
        motorTime(port: string | number, seconds: number, dutyCycle?: number): void;
        /**
         * Run a motor for specific time
         * @method LegoBoost#motorTimeAsync
         * @param {string|number} port possible string values: 'A', 'B', 'AB', 'C', 'D'.
         * @param {number} seconds
         * @param {number} [dutyCycle=100] motor power percentage from '-100' to '100'. If a negative value is given rotation
         * is counterclockwise.
         * @param {boolean} [wait=false] will promise wait unitll motorTime run time has elapsed
         * @returns {Promise}
         */
        motorTimeAsync(port: string | number, seconds: number, dutyCycle?: number, wait?: boolean): Promise<void>;
        /**
         * Run both motors (A and B) for specific time
         * @param {number} seconds
         * @param {number} dutyCycleA motor power percentage from '-100' to '100'. If a negative value is given rotation
         * is counterclockwise.
         * @param {number} dutyCycleB motor power percentage from '-100' to '100'. If a negative value is given rotation
         * is counterclockwise.
         * @param {function} callback
         */
        motorTimeMulti(seconds: number, dutyCycleA?: number, dutyCycleB?: number): void;
        /**
         * Run both motors (A and B) for specific time
         * @method LegoBoost#motorTimeMultiAsync
         * @param {number} seconds
         * @param {number} [dutyCycleA=100] motor power percentage from '-100' to '100'. If a negative value is given rotation
         * is counterclockwise.
         * @param {number} [dutyCycleB=100] motor power percentage from '-100' to '100'. If a negative value is given rotation
         * is counterclockwise.
         * @param {boolean} [wait=false] will promise wait unitll motorTime run time has elapsed
         * @returns {Promise}
         */
        motorTimeMultiAsync(seconds: number, dutyCycleA?: number, dutyCycleB?: number, wait?: boolean): Promise<void>;
        /**
         * Turn a motor by specific angle
         * @param {string|number} port possible string values: 'A', 'B', 'AB', 'C', 'D'.
         * @param {number} angle - degrees to turn from '0' to '2147483647'
         * @param {number} [dutyCycle=100] motor power percentage from '-100' to '100'. If a negative value is given
         * rotation is counterclockwise.
         */
        motorAngle(port: string | number, angle: number, dutyCycle?: number): void;
        /**
         * Turn a motor by specific angle
         * @method LegoBoost#motorAngleAsync
         * @param {string|number} port possible string values: 'A', 'B', 'AB', 'C', 'D'.
         * @param {number} angle - degrees to turn from '0' to '2147483647'
         * @param {number} [dutyCycle=100] motor power percentage from '-100' to '100'. If a negative value is given
         * rotation is counterclockwise.
         * @param {boolean} [wait=false] will promise wait unitll motorAngle has turned
         * @returns {Promise}
         */
        motorAngleAsync(port: string | number, angle: number, dutyCycle?: number, wait?: boolean): Promise<void>;
        /**
         * Turn both motors (A and B) by specific angle
         * @method LegoBoost#motorAngleMulti
         * @param {number} angle degrees to turn from '0' to '2147483647'
         * @param {number} dutyCycleA motor power percentage from '-100' to '100'. If a negative value is given
         * rotation is counterclockwise.
         * @param {number} dutyCycleB motor power percentage from '-100' to '100'. If a negative value is given
         * rotation is counterclockwise.
         */
        motorAngleMulti(angle: number, dutyCycleA?: number, dutyCycleB?: number): void;
        /**
         * Turn both motors (A and B) by specific angle
         * @method LegoBoost#motorAngleMultiAsync
         * @param {number} angle degrees to turn from '0' to '2147483647'
         * @param {number} [dutyCycleA=100] motor power percentage from '-100' to '100'. If a negative value is given
         * rotation is counterclockwise.
         * @param {number} [dutyCycleB=100] motor power percentage from '-100' to '100'. If a negative value is given
         * rotation is counterclockwise.
         * @param {boolean} [wait=false] will promise wait unitll motorAngle has turned
         * @returns {Promise}
         */
        motorAngleMultiAsync(angle: number, dutyCycleA?: number, dutyCycleB?: number, wait?: boolean): Promise<void>;
        /**
         * Drive specified distance
         * @method LegoBoost#drive
         * @param {number} distance distance in centimeters (default) or inches. Positive is forward and negative is backward.
         * @param {boolean} [wait=true] will promise wait untill the drive has completed.
         * @returns {Promise}
         */
        drive(distance: number, wait?: boolean): Promise<{}>;
        /**
         * Turn robot specified degrees
         * @method LegoBoost#turn
         * @param {number} degrees degrees to turn. Negative is to the left and positive to the right.
         * @param {boolean} [wait=true] will promise wait untill the turn has completed.
         * @returns {Promise}
         */
        turn(degrees: number, wait?: boolean): Promise<{}>;
        /**
         * Drive untill sensor shows object in defined distance
         * @method LegoBoost#driveUntil
         * @param {number} [distance=0] distance in centimeters (default) or inches when to stop. Distance sensor is not very sensitive or accurate.
         * By default will stop when sensor notices wall for the first time. Sensor distance values are usualy between 110-50.
         * @param {boolean} [wait=true] will promise wait untill the bot will stop.
         * @returns {Promise}
         */
        driveUntil(distance?: number, wait?: boolean): Promise<any>;
        /**
         * Turn until there is no object in sensors sight
         * @method LegoBoost#turnUntil
         * @param {number} [direction=1] direction to turn to. 1 (or any positive) is to the right and 0 (or any negative) is to the left.
         * @param {boolean} [wait=true] will promise wait untill the bot will stop.
         * @returns {Promise}
         */
        turnUntil(direction?: number, wait?: boolean): Promise<any>;
        /**
         * Send raw data
         * @param {object} raw raw data
         */
        rawCommand(raw: RawData): void;
        private preCheck;
    }
}
`;

export { legoBoostTypes };