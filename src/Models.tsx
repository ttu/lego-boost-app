import { IConfiguration } from 'lego-boost-browser/dist/hub/hubAsync';

export interface IControlData {
  speed: number;
  turnAngle: number;
  input: any;
  forceState: boolean;
  updateInputMode: any;
}

export interface IDeviceInfo {
  connected: boolean;
  distance: number;
  color: string;
  error: string;
  rssi: number;
  ports: {
    A: { action: string; angle: number };
    B: { action: string; angle: number };
    AB: { action: string; angle: number };
    C: { action: string; angle: number };
    D: { action: string; angle: number };
    LED: { action: string; angle: number };
  };
}

export interface IBoostConfig extends IConfiguration {
  driveModifier?: number;
  turnModifier?: number;
}