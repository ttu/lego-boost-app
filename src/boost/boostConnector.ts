const BOOST_HUB_SERVICE_UUID = "00001623-1212-efde-1623-785feabcd123";
const BOOST_CHARACTERISTIC_UUID = "00001624-1212-efde-1623-785feabcd123";

export class BoostConnector {
  private static device: BluetoothDevice;

  public static async connect(): Promise<BluetoothRemoteGATTCharacteristic> {
    const options = {
      acceptAllDevices: false,
      filters: [{ services: [BOOST_HUB_SERVICE_UUID] }],
      optionalServices: [BOOST_HUB_SERVICE_UUID]
    };

    this.device = await navigator.bluetooth.requestDevice(options);

    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(BOOST_HUB_SERVICE_UUID);
    const characteristic = await service.getCharacteristic(
      BOOST_CHARACTERISTIC_UUID
    );
    return characteristic;
  }

  public static async reconnect(): Promise<boolean> {
    if (this.device) {
      await this.device.gatt.connect();
      return true;
    }
    return false;
  }

  public static async disconnect(): Promise<boolean> {
    if (this.device) {
      await this.device.gatt.disconnect();
      return true;
    }
    return false;
  }
}
