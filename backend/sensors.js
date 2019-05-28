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
    }).catch((err)=>{
      console.log(err)
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
