# Lego Boost Browser Application

Control Lego Boost from the browser without any installations.

Deployed to: https://legoboost.azurewebsites.net/


Uses [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API). Works with most computers (__Windows, Mac, Linux__) and __Android__ devices with __Chrome__ and __Opera__ browsers. Unfortunately Apple iOS doesn't support Web Bluetooth. 


### Problems

* Web Bluetooth only work with __https__
* Won't work with __iOS__ (iPhonen and iPad)
* Known bluetooth problems with:
  * Microsoft Surface Book 2
  * ...

If connection doesn't work, test connection to Lego Boost with [Google's sample tester](https://googlechrome.github.io/samples/web-bluetooth/read-characteristic-value-changed.html).

### Run locallly

```sh
$ npm install
$ npm start
```

### Build

```sh
$ npm install
$ npm run build
```

### Docker

For easier deployment.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Disclaimer

LEGO and BOOST are Trademarks from The LEGO Company, which do not support this project. 

Project maintaines are not responsible for any damage on your LEGO BOOST devices - use it at your own risk.

## License

Licensed under the [MIT](https://github.com/ttu/lego-boost-app/blob/master/LICENSE) License.