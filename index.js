
'use strict';
/*
const MiFlora = require('node-mi-flora');

let flora = new MiFlora(); // initialize flora

// start scanning
flora.startScanning();

// set an interval to rescan & get fresh data
setInterval(function () {
  console.log('every 15 seconds, rescan devices');
  flora.startScanning();
}, 15000);


flora.on('data', function (data) {
  console.log('data', data);
  // print DeviceData { deviceId: '1111', temperature: 25.2, lux: 5142, moisture: 46, fertility: 0 }
});
*/
const miflora = require('miflora');

const opts = {
  duration: 30000,
  ignoreUnknown: true,
  addresses: [
    'c4:7c:8d:6a:b0:06',
    'c4:7c:8d:6a:c7:2b'
  ]
};

(async ()=>{
  console.log("Searching devices...")
  let devices = await miflora.discover(opts)
  console.log("Found %d devices...", devices.length)
  console.log("Getting data...")


  setInterval(function callback(){
    let queries = devices.map((device)=>device.query())
    Promise.all(queries).then((sensorsData)=>{
      console.log(sensorsData)
    })
    return callback
  }(), 30000)
  //console.log(data)

  /*
  miflora.discover(opts).then((devices)=>{
    console.log('devices discovered: ', devices.length);

    devices.forEach((device)=>{
      device.query().then((data)=>{
        console.log(data);
      })
    })
  });
  */
})();
