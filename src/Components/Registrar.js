import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import { Avatar, Button, Paper, TextField, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import axios from 'axios';
import Swal from 'sweetalert2'

const url = "http://localhost:9000/signup";

const useStyles = makeStyles((theme) => ({
    paperStyle: {
      padding: 20,
      height: '70vh',
      width: 280,
      margin: "20px auto"
    },
    avatar:{
        backgroundColor: '#F2C45A'
    },
    btn:{
        margin: '15px 0',
        backgroundColor: '#F5634A',
        color: 'white'
    }
  }));

const Registrar = () =>{

    const classes = useStyles();

    const [datos, setDatos] = useState({
        username: '',
        name: '',
        email: '',
        pass: '',
        pass2: ''
    })

    const handleInputChange = (event) =>{
      //los tres puntos realiza una especie de copia del estado
      setDatos({
        ...datos,
        [event.target.name]: event.target.value 
      })
    }

    const enviarDatos = (event) =>{
      //event.preventDefault();
      console.log(datos.name)
      verificar();
    }

    const verificar = () =>{
      if(datos.pass === datos.pass2){
        console.log("Contraseñas correctas...");
        registrar();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden.',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout("location.href='./#'", 2000);
      }
    }

    const registrar = async()=>{
      axios.post(url,{username: datos.username, name: datos.name, email: datos.email, nickname: datos.name, password: datos.pass})
      .then(response=>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Registro realizado.',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(error=>{
        console.log(error);
      })
    }

    return(
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
                <Grid align="center">
                    <Avatar className={classes.avatar}><FaceIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField onChange={handleInputChange} name="username" placeholder="Plase enter username." label="Username" fullWidth required></TextField>
                <TextField onChange={handleInputChange} name="name" placeholder="Plase enter name." label="Name" fullWidth required></TextField>
                <TextField onChange={handleInputChange} name="email" placeholder="Plase enter email." label="Email" type="email" fullWidth required></TextField>
                <TextField onChange={handleInputChange} name="pass" placeholder="Place enter password." label="Password"  type="password" fullWidth required></TextField>
                <TextField onChange={handleInputChange} name="pass2" placeholder="Confirm the password." label="Confirm Password"  type="password" fullWidth required></TextField>
                <Button onClick={enviarDatos} className={classes.btn} type="submit"  variant="contained" fullWidth>Sign Up</Button>
          </Paper>
        </Grid>
    )
}

export default Registrar