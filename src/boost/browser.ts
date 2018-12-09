import { LegoBoost } from "./legoBoost";

var boost = new LegoBoost();

// Add as a window globals, so these can be called from HTML
// @ts-ignore
window.connect = boost.connect.bind(boost);
// @ts-ignore
window.scan = boost.scan.bind(boost);
// @ts-ignore
window.led = boost.changeLed.bind(boost);
// @ts-ignore
window.drive = boost.drive.bind(boost);
// @ts-ignore
window.disconnect = boost.disconnect.bind(boost);
// @ts-ignore
window.ai = boost.ai.bind(boost);
// @ts-ignore
window.stop = boost.stop.bind(boost);