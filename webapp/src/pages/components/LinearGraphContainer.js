import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles';

const styles = ()=> theme => ({

})

const LinearGraphContainer = (props)=>{
  const {sensorData, type, label, theme, checked, position} = props

  let ticks = []

  let limitDataByDays = props.limitDataByDays ? props.limitDataByDays : 1

  if(sensorData){
    for(let i = 0; i < sensorData.length; i++){
      let data = sensorData[i]

      let time = moment(data.timestamp, "YYYY-MM-DD HH:mm:ss")
      let value = 0
      let counter = 0

      while(sensorData[i+counter] && time.hours() === moment(sensorData[i+counter].timestamp, "YYYY-MM-DD HH:mm:ss").hours()){
        let tmp = sensorData[i+counter]
        value += tmp[type]
        counter++
      }
      //console.log(type,value, counter)
      value = Number((value / counter).toFixed(2))
      i += counter


      if(time.isBetween(moment().subtract(limitDataByDays-1, "days").set({hours:0, minutes: 0, seconds: 0}),moment().set({hours:23, minutes: 59, seconds: 59})))ticks.push({x: time.format("YYYY-MM-DD HH:mm:ss"),y: value})
    }
  }

  let data = [
    {
      "id": "japan",
      "color": theme.palette.primary.main,

      "data": ticks
    }
  ]

  return(
    <Fade
      in={checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 * position} : {})}
    >
      <Paper>
        <div style={{height:170, position: "relative", padding: 8}}>
          <ResponsiveLine
              data={data}

              margin={{ top: 10, right: 30, bottom: 40, left: 10 }}
              xScale={{ type: 'time',format: '%Y-%m-%d %H:%M:%S', precision:"hour"}}
              xFormat="time:%Y-%m-%d %H:%M:%S"
              yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
              axisTop={null}
              axisLeft={null}
              axisRight={true}
              enableGridY={true}
              enableGridX={false}
              enablePoints={true}

              axisBottom={{
                  format: '%H:00',
                  tickRotation: 60,
                  tickValues: 8
              }}

              axisRight={{
                orient: 'right',

                tickValues:8,
              }}

              colors={theme.palette.secondary.dark}
              pointSize={5}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={false}

          />
        </div>
        <div style={{ background: theme.palette.primary.main, borderTop: "1px solid black"}}>
          <Typography align="center" variant="h6" style={{color: "white", padding: 8, fontWeight: 600, fontSize: 16, textTransform: "uppercase"}}>{label}</Typography>
        </div>
      </Paper>
    </Fade>
  )
}

export default withStyles(styles, { withTheme: true })(LinearGraphContainer)
