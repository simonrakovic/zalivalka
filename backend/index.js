const express = require('express')
const Promise = require('bluebird')
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
const moment = require('moment')
const path = require('path');
const app = express();


const port = process.env.PORT || 5000;
const dbPromise = sqlite.open('./sensordata.db', { Promise });
app.use(express.static('/home/pi/Projects/mymiflora/webapp/build'));
app.use(bodyParser.json())

app.post('/set/sensors/data', async (req, res, next) => {
  const data = req.body

  let statement = "INSERT INTO sensorsData (temperature, luminosity, humidity, fertility, timestamp, sensor) VALUES "

  Object.values(req.body).forEach((data, i) =>{
    let {temperature, lux, moisture, fertility} = data.sensorValues
    let datetime = moment().format("YYYY-MM-DD HH:mm:ss")

    let sensorId = data.address.replace(/:/g, "")

    if( i === 0) statement += `(${temperature}, ${lux}, ${moisture}, ${fertility}, "${datetime}", "${sensorId}")`
    else statement += `, (${temperature}, ${lux}, ${moisture}, ${fertility}, "${datetime}", "${sensorId}")`
  })

  try {
    const db = await dbPromise;
    console.log(statement)
    const sensors = await db.all(statement)

    return res.send("success")
  } catch (err) {
    next(err);

  }

});

app.get('/sensors', async (req, res, next) => {
  try {
    const db = await dbPromise;

    const sensors = await db.all('SELECT * FROM sensors')

    return res.send(sensors)
  } catch (err) {
    next(err);

  }
})

app.get('/sensors/:id/data/weekly', async (req, res, next) => {
  try {
    const db = await dbPromise;
    let dateFrom = moment().subtract(7,"days").format("YYYY-MM-DD HH:mm:ss")
    let dateTo = moment().format("YYYY-MM-DD HH:mm:ss")
    const sensors = await db.all(`SELECT * FROM sensorsData WHERE sensor = "${req.params.id}" and timestamp between Datetime("${dateFrom}") and Datetime("${dateTo}")`)

    return res.send(sensors)
  } catch (err) {
    next(err);
  }
})

app.get('/', (req, res)=>{
  res.sendFile('/home/pi/Projects/mymiflora/webapp/build/index.html');
})

app.listen(5000, "192.168.0.108");
