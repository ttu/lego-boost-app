import { manual } from './states/manual';
import { stop, back, drive, turn, seek } from './states/ai';

class HubControl {
  hub: any;
  device: any;
  control: any;
  prevControl: any;
  states: { Turn: any; Drive: any; Stop: any; Back: any; Manual: any; Seek: any; };
  currentState: any;
  prevDevice: any;
  constructor(deviceInfo, controlData) {
    this.hub = null;
    this.device = deviceInfo;
    this.control = controlData;
    this.prevControl = { ...this.control };

    this.states = {
      Turn: turn.bind(this),
      Drive: drive.bind(this),
      Stop: stop.bind(this),
      Back: back.bind(this),
      Manual: manual.bind(this),
      Seek: seek.bind(this)
    };

    this.currentState = this.states['Drive'];
  }

  async start(hub) {
    this.hub = hub;
    this.device.connected = true;

    this.hub.emitter.on('error', err => {
      this.device.err = err;
    });

    this.hub.emitter.on('disconnect', () => {
      this.device.connected = false;
    });

    this.hub.emitter.on('distance', distance => {
      this.device.distance = distance;
    });

    this.hub.emitter.on('rssi', rssi => {
      this.device.rssi = rssi;
    });

    this.hub.emitter.on('port', portObject => {
      const { port, action } = portObject;
      this.device.ports[port].action = action;
    });

    this.hub.emitter.on('color', color => {
      this.device.color = color;
    });

    this.hub.emitter.on('tilt', tilt => {
      const { roll, pitch } = tilt;
      this.device.tilt.roll = roll;
      this.device.tilt.pitch = pitch;
    });

    this.hub.emitter.on('rotation', rotation => {
      const { port, angle } = rotation;
      this.device.ports[port].angle = angle;
    });

    await this.hub.ledAsync('red');
    await this.hub.ledAsync('yellow');
    await this.hub.ledAsync('green');
  }

  async disconnect() {
    if (this.device.connected) {
      await this.hub.disconnectAsync();
    }
  }

  setNextState(state) {
    this.control.driveInput = null;
    this.control.state = state;
    this.currentState = this.states[state];
  }

  update() {
    this.currentState();

    // TODO: Deep clone
    this.prevControl = { ...this.control };
    this.prevControl.tilt = { ...this.control.tilt };
    this.prevDevice = { ...this.device };
  }
}

export { HubControl }