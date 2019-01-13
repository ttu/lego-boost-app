import * as React from "react";
import { Container, Table, List, Header, Divider } from "semantic-ui-react";

type AboutProps = {
  version?: string;
  date?: string;
};

// const About: React.FunctionComponent<AboutProps> = ({  version, date  }) =>
const Info = ({ version, date }: AboutProps) => (
  <Container>

    <Container textAlign="left">
      <Header as="h4">General Info</Header>
      <List bulleted>
        <List.Item>Works only with computers (Windows, macOS, Linux) and Android 6.0 Marshmallow or later </List.Item>
        <List.Item>Supported Browsers Chrome (from version 70 onwards) and Opera</List.Item>
        <List.Item>Works in offline mode after initial load, so airplane mode can be switched on if needed (remember to turn the bluetooth back on)</List.Item>
        <List.Item>Read more from: <a href="https://github.com/ttu/lego-boost-app">https://github.com/ttu/lego-boost-app</a></List.Item>
      </List>
    </Container>

    <Divider />

    <Container textAlign="left"> 
      <Header as="h4">Common Problems</Header>
      <List bulleted>
        <List.Item>Connect-button doesn't work: check troubleshoot guide from below</List.Item>
        <List.Item>Lego Boost's distance sensor doesn't work: Remove the sensor from the Lego Boost and attach it again</List.Item>
        <List.Item>Manual control won't work: Refresh the page and reconnect</List.Item>
        <List.Item>In case of any unknown problem: Refresh the page and reconnect</List.Item>
        <List.Item>Page shows no connection, but Boost's led shows it is connected: Remove batteries from the Lego Boost and try again</List.Item>
      </List>
    </Container>

    <Divider />

    <Container textAlign="left">
      <Header as="h4">Web Bluetooth troubleshoot</Header>

      <p>If Connect-button doesn't work, check this troubleshoot guide</p>

      <Header as="h5">Try with Google’s tester</Header>

      <List bulleted>
        <List.Item>Go to <a href="https://googlechrome.github.io/samples/web-bluetooth/device-info.html?allDevices=true">Web Bluetooth / Device Info Sample</a></List.Item>
        <List.Item>Select All Devices</List.Item>
        <List.Item>Click Get Bluetooth Device Info button</List.Item>
        <List.Item>Pairing device chooser window should appear</List.Item>
      </List>

      <p>
        Pairing device chooser window looks like this <a href="https://developers.google.com/web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/bluetooth-device-chooser.webm">bluetooth-device-chooser.webm</a>
      </p>

      <Header as="h5">If Goolge's tester works: Check that legoboost-site uses https</Header>

      <p>Web Bluetooth API can only be used with a secured connection (HTTP over SSL)</p>
      <List bulleted>
        <List.Item>Won't work: http://legoboost.azurewebsites.net</List.Item>
        <List.Item>Will work: https://legoboost.azurewebsites.net</List.Item>
      </List>

      <p>NOTE: legoboost.azurewebsites.net should automatically redirect to https</p>

      <Header as="h5">If Google's tester didn't work: Check that Chrome's version is 70 or newer</Header>

      <pre><code>Chrome -&gt; Open menu (three small dots) -&gt; Help -&gt; About Google Chrome</code></pre>

      <Header as="h5">If Chrome has supported version: Check that Operating System is supported</Header>

      <p>Check that OS version is on supported list:</p>
      <a href="https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md#notes">
        https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md#notes
      </a>
    </Container>

    <Divider />

    <Header as="h3">Version info</Header>

    <Container textAlign="left">
      <Container>Version: {version}</Container>
      <Container>Build date: {date}</Container>
    </Container>

    <Divider />

    <Header as="h3">Changelog</Header>

    <Container textAlign="left">
      <List bulleted>
        <List.Item>0.3.0 (13.1.2019)
          <List.List>
            <List.Item>Individual motor controls</List.Item>
          </List.List>
        </List.Item>
        <List.Item>0.2.0 (7.1.2019)
          <List.List>
            <List.Item>Click and Arcade manual modes</List.Item>
            <List.Item>Change led color button</List.Item>
            <List.Item>Show execution error in code control</List.Item>
            <List.Item>Use Monaco code editor in code control</List.Item>
          </List.List>
        </List.Item>
        <List.Item>0.1.0 (1.1.2019)
          <List.List>
            <List.Item>Manual control</List.Item>
            <List.Item>AI mode</List.Item>
            <List.Item>Code execution control</List.Item>
          </List.List>
        </List.Item>
      </List>

      <Divider />

      <Container>
        Development version with possible unreleased features and fixes: <a href="https://legoboostdev.azurewebsites.net">https://legoboostdev.azurewebsites.net</a>
      </Container>
      <Container>This version may not work all the time as it is the active development version.</Container>

      <Divider />

    </Container>

  </Container>
);

export default Info;
