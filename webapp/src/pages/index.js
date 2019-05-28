import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import withRoot from '../withRoot';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import LinearGraphContainer from './components/LinearGraphContainer'

import SensorStatCard from './components/SensorStatCard'

import {fetchAllSensors, fetchWeeklySensorData} from './../controller'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    position: "relative",

  },
  row:{
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-bewteen",

  },
  column:{
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //marginLeft: -drawerWidth, /// uncomment if need drawe
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  /// sensors

  sensorPaper:{
    minHeight: 100,
  }


});

class Index extends React.Component {
  state = {
    open: false,
    sensors: null,
    selectedSensor: null,
    showGraphs: false,
    showStats: false,
    sensorsData: {}
  };

  componentDidMount(){
    fetchAllSensors().then((data)=>this.setState({sensors: data}))
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  selectSensor = (sensorId)=>{

    this.setState({selectedSensor: sensorId, showStats: true})
    if(!this.state.sensorsData[this.stateselectedSensor])fetchWeeklySensorData(sensorId).then((data)=>this.setState({sensorsData: {...this.state.sensorsData, [sensorId]: data}}))

  }

  render() {
    const { classes, theme } = this.props;
    const { open, sensors, selectedSensor,  sensorsData, showGraphs, showStats} = this.state;
    let sensorData = sensorsData[selectedSensor]
    let currentSensorData = sensorData && sensorData[sensorData.length - 1]

    if(!sensors) return null

    return (
      <div className={classes.root}>
        <CssBaseline />
        {
          /*<AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>

            </Toolbar>
          </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />

        </Drawer>
          */
        }
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {/*<div className={classes.drawerHeader} />*/}
          <Grid container>
            <Grid item xs={12}>
              <Slide direction="down" in={!Boolean(selectedSensor)} >
                <Grid container spacing={32} style={Boolean(selectedSensor) ? { height:0, overflow: "hidden", transition: "height 2s"  } : null}>
                  {
                    sensors.map((sensor)=>{
                      return(
                        <Grid key={sensor.id} item xs={12} >
                          <Paper onClick={()=>this.selectSensor(sensor.id)} className={classes.sensorPaper}>
                            <div className={classes.column} style={{ height: "100%"}}>
                              <img style={{padding: theme.spacing.unit * 1,}} height="100px" width="auto" src="https://i.imgur.com/0XEwmAR.png"/>

                              <Typography
                                align="center"
                                style={{
                                  width: "100%",
                                  fontWeight: 600,
                                  fontSize: 16,
                                  color: "white",
                                  background: theme.palette.primary.main,
                                  padding: theme.spacing.unit * 1,
                                  borderTop: "1px solid black",
                                  textTransform: "uppercase"
                                }}
                              >
                                {sensor.name}
                            </Typography>
                            </div>

                          </Paper>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Slide>
            </Grid>
            <Grid item xs={12} >
              <Slide in={showGraphs && Boolean(sensorsData[selectedSensor])} mountOnEnter unmountOnExit>
                <Grid container spacing={32}>
                  <Grid item xs={12}>
                      <LinearGraphContainer
                        sensorData={sensorsData[selectedSensor]}
                        label={"Vlaga"}
                        type={"humidity"}
                        position={0}
                        checked={showGraphs && Boolean(sensorsData[selectedSensor])}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <LinearGraphContainer
                        sensorData={sensorsData[selectedSensor]}
                        label={"Temperatura"}
                        type={"temperature"}
                        position={1}
                        checked={showGraphs && Boolean(sensorsData[selectedSensor])}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <LinearGraphContainer
                        sensorData={sensorsData[selectedSensor]}
                        label={"Svetlost"}
                        type={"luminosity"}
                        position={2}
                        checked={showGraphs && Boolean(sensorsData[selectedSensor])}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <LinearGraphContainer
                        sensorData={sensorsData[selectedSensor]}
                        label={"Rodovitnost"}
                        type={"fertility"}
                        position={3}
                        checked={showGraphs && Boolean(sensorsData[selectedSensor])}
                      />
                  </Grid>
                </Grid>
              </Slide>
              <Slide direction="up" in={showStats && Boolean(currentSensorData)} mountOnEnter unmountOnExit>
                <Grid container spacing={32}>
                  <Grid item xs={12}>
                    <SensorStatCard
                      value={currentSensorData && currentSensorData.humidity+"%"}
                      icon={"https://i.imgur.com/dDJEkFZ.png"}
                      theme={theme}
                      classes={classes}
                      checked={showStats && Boolean(currentSensorData)}
                      position={0}
                      label="VLAŽNOST ZEMLJE"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SensorStatCard
                      value={currentSensorData && currentSensorData.temperature+ " C"}
                      icon={"https://i.imgur.com/l6Q7alN.png"}
                      theme={theme}
                      classes={classes}
                      checked={showStats && Boolean(currentSensorData)}
                      position={1}
                      label="TEMPERATURA ZRAKA"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SensorStatCard
                      value={currentSensorData && currentSensorData.luminosity}
                      icon={"https://i.imgur.com/sfq1tRX.png"}
                      theme={theme}
                      classes={classes}
                      checked={showStats && Boolean(currentSensorData)}
                      position={2}
                      label="SVETLOST"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SensorStatCard
                      value={currentSensorData && currentSensorData.fertility}
                      icon={"https://i.imgur.com/6ielIgo.png"}
                      theme={theme}
                      classes={classes}
                      checked={showStats && Boolean(currentSensorData)}
                      position={3}
                      label="PLODNOST"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center" style={{fontSize: 10}}>Sync {currentSensorData && currentSensorData.timestamp}</Typography>
                  </Grid>
                </Grid>
              </Slide>
            </Grid>
          </Grid>
          <Slide direction="up" in={showStats || showGraphs}>
            <Fab onClick={()=>this.setState({selectedSensor: null, showStats: false, showGraphs: false})} style={{position:"fixed", bottom: 24, right: 24}} color="primary">
              <img src="https://i.imgur.com/0XEwmAR.png" height="40px" width="auto"/>
            </Fab>
          </Slide>
          <Slide direction="up" in={showStats}>
            <Fab onClick={()=>this.setState({showStats: false, showGraphs: true})} style={{position:"fixed", bottom: 24, left: 24}} color="secondary">
              <img src="https://i.imgur.com/0TTXrWY.png" height="35px" width="auto"/>
            </Fab>
          </Slide>
          <Slide direction="up" in={showGraphs}>
            <Fab onClick={()=>this.setState({showStats: true, showGraphs: false})} style={{position:"fixed", bottom: 24, left: 24}} color="secondary">
              <img src="https://i.imgur.com/ERKQi7h.png" height="35px" width="auto"/>
            </Fab>
          </Slide>
        </main>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(Index));
