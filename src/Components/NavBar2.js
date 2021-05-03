import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../img/shaka2.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    fontWeight: 'bold'
  },
  menu:{
    background: 'linear-gradient(45deg, #AC88C2 100%, #5f4b6b 80%)'
  },
  boton:{
    color: 'white',
    fontSize: '16px'
  }
}));

function NavBar2() {

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <a href="./home"><img src={logo} width="100px"/></a>
          <Typography variant="h5" className={classes.title}>
            
          </Typography>
          <Button color="inherit" className={classes.boton} onClick={()=>{window.location.href='./hablar';}}>Hablar</Button>
          <Button color="inherit" className={classes.boton} onClick={()=>{window.location.href='./aprender';}}>Aprender</Button>
        </Toolbar>
      </AppBar> 
    </div>
  )
}

export default NavBar2