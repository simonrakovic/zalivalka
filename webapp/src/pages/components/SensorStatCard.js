import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';

const SensorStatCard = ({classes, theme, icon, value, label, checked, position})=>(
  <Fade
    in={checked}
    style={{ transformOrigin: '0 0 0' }}
    {...(checked ? { timeout: 1000 * position} : {})}
  >
    <Paper style={{height: 200, width: "100%"}}  className={classes.column} style={{justifyContent:"space-between"}}>
      <div className={classes.row} >
        <div style={{width: "60%"}} className={classes.column}>
          <Typography align="center" style={{fontWeight: 500, fontSize: 60}} >{value}</Typography>
        </div>
        <div style={{width: "40%", padding: 16}} className={classes.column}>
          <img  src={icon} height="auto" width="90%"/>
        </div>
      </div>
      <div style={{width:"100%", background: theme.palette.primary.main,paddingBottom: 8}}>
        <Divider style={{width:"100%", background:"black", marginBottom: 8}}/>
        <Typography align="center" style={{fontWeight: 600, fontSize: 16, color: "white"}}>{label}</Typography>
      </div>

    </Paper>
  </Fade>

)

export default SensorStatCard
