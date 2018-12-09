import { BoostConnector } from "./boostConnector";
import { Scanner } from "./scanner";
// import { Hub } from "./hub/hub";
import { HubAsync } from "./hub/hubAsync";
import { HubControl } from "./ai/hub-control";

export class LegoBoost {
  hub: HubAsync;
  color: string;
  hubControl: HubControl;

  deviceInfo = {
    ports: {
      A: { action: '', angle: 0 },
      B: { action: '', angle: 0 },
      AB: { action: '', angle: 0 },
      C: { action: '', angle: 0 },
      D: { action: '', angle: 0 },
      LED: { action: '', angle: 0 },
    },
    tilt: { roll: 0, pitch: 0 },
    distance: Number.MAX_SAFE_INTEGER,
    rssi: 0,
    color: '',
    error: '',
    connected: false
  };

  controlData = {
    input: null,
    speed: 0,
    turnAngle: 0,
    tilt: { roll: 0, pitch: 0 },
    forceState: null,
    updateInputMode: null
  };

  async connect(): Promise<void> {
    try {
      const characteristic = await BoostConnector.connect();
      this.hub = new HubAsync(characteristic);

      this.hub.emitter.on("disconnect", async evt => {
        await BoostConnector.reconnect();
      });

      this.hub.emitter.on("connect", async evt => {
        await this.hub.ledAsync("purple");
      });
    } catch (e) {
      console.log("Error from connect: " + e);
    }
  }

  async changeLed(): Promise<void> {
    if (!this.hub || this.hub.connected === false) return;
    this.color = this.color === 'pink' ? 'orange' : 'pink';
    await this.hub.ledAsync(this.color);
  }

  async drive(): Promise<void> {
    if (!this.hub || this.hub.connected === false) return;
    await this.hub.motorTimeMultiAsync(2, 10, 10);
  }

  async disconnect(): Promise<void> {
    if (!this.hub || this.hub.connected === false) return;
    this.hub.disconnect();
    await BoostConnector.disconnect();
  }

  async ai(): Promise<void> {
    if (!this.hub || this.hub.connected === false) return;

    if (!this.hubControl) {
      this.hubControl = new HubControl(this.deviceInfo, this.controlData);
      await this.hubControl.start(this.hub);
      setInterval(() => {
        this.hubControl.update();
      }, 100);
    } else {
      this.hubControl.setNextState('Drive');
    }
  }

  async stop(): Promise<void> {
    this.controlData.speed = 0;
    this.controlData.turnAngle = 0;
    this.hubControl.setNextState('Manual');
    // control datas values might have always been 0, execute force stop
    await this.hub.motorTimeMultiAsync(1, 0, 0);
  }

  scan(): void {
    try {
      Scanner.run();
    } catch (e) {
      console.log("Error from scan: " + e);
    }
  }
}

// export { connect, scan, changeLed, drive, disconnect, ai, stop };
