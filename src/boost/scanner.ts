export class Scanner {
  public static run() {
    const log = console.log.bind(console);

    // let filters = [];

    // let filterService = "heart_rate";
    // if (filterService.startsWith('0x')) {
    //    filterService = parseInt(filterService, 16);
    // }
    // if (filterService) {
    //   filters.push({ services: [filterService] });
    // }

    const options = { acceptAllDevices: true };
    // const options = { filters: filters };

    log("Requesting Bluetooth Device...");

    navigator.bluetooth
      .requestDevice(options)
      .then(device => {
        log("> Name:             " + device.name);
        log("> Id:               " + device.id);
        log("> UUIDs:            " + device.uuids.join("\n" + " ".repeat(20)));
        log("> Connected:        " + device.gatt.connected);
      })
      .catch(error => log(error));
  }
}
