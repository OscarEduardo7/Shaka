import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import { Avatar, Button, Link, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

const url = "http://3.20.204.148:9000/login";
const cookiess = new Cookies();

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

const Login = () =>{


  const classes = useStyles();

  const [datos, setDatos] = useState({
    username: '',
    pass: '',
  })

  const handleInputChange = (event) =>{
    //los tres puntos realiza una especie de copia del estado
    setDatos({
      ...datos,
      [event.target.name]: event.target.value 
    })
  }

  const enviarDatos = (event) =>{
    console.log(datos)
    login();
  }

  const login = async()=>{
    axios.post(url,{username: datos.username, password: datos.pass})
    .then(response=>{
      var usuario = response.data.idToken.payload;
      console.log(response);
      if(response.data.code == "NotAuthorizedException"){
        Swal.fire({
          icon: 'error',
          title: 'Usuario no existe o contraseña incorrecta.',
          showConfirmButton: false,
          timer: 2000
        })
      }else if(response.data.code == "InvalidParameterException"){
        Swal.fire({
          icon: 'error',
          title: 'Los campos no pueden estar vacios.',
          showConfirmButton: false,
          timer: 2000
        })
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Se inicio sesion correctamente.',
          showConfirmButton: false,
          timer: 2000
        })
        cookiess.set('name', usuario.name, {path: "/"});
        cookiess.set('email', usuario.email, {path: "/"});
        cookiess.set('username', datos.username, {path: "/"});
        setTimeout("location.href='./home'", 2000);
      }
    })
    .catch(error=>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error2.',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  return(
      <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
              <Grid align="center">
                  <Avatar className={classes.avatar}><FaceIcon/></Avatar>
                  <h2>Login</h2>
              </Grid>

              <TextField onChange={handleInputChange} name="username" placeholder="Please enter username." label="Username" fullWidth required></TextField>
              <TextField onChange={handleInputChange} name="pass"placeholder="Please enter password." label="Password"  type="password" fullWidth required></TextField>
              <Button onClick={enviarDatos} className={classes.btn} type="submit"  variant="contained" fullWidth>Iniciar</Button>
              <Grid align="center">
              <Typography> ¿No tienes una cuenta? </Typography>
              <Link href="./signup">
                    Crea una ahora
              </Link>
              </Grid>
        </Paper>
      </Grid>
  )
}

export default Login