import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar, Button, Link, Paper, TextField, Typography, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PageviewIcon from '@material-ui/icons/Pageview';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

import Reproducir from './Reproducir';
import AudioM from './Audio';

const tr = 'https://31dwp2xyk8.execute-api.us-east-2.amazonaws.com/Traducir';
const pl = 'http://localhost:9000/polly';
//https://31dwp2xyk8.execute-api.us-east-2.amazonaws.com/Traducir
const cookie = new Cookies();
let traduccion = 'Traduccion';
let opcionP = 'Español';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
      padding: 20,
      height: '95vh',
      width: 800,
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

const Translate = () =>{

    const classes = useStyles();

    const [datos, setDatos] = useState({
        text: '',
        op: ''
    })

    const handleInputChange = (event) =>{
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = (event) =>{
        console.log(datos)
        traducir();
    }

    const voz = (event) =>{
        console.log(traduccion + " "+ opcionP);
        pollyPocket();
    }

    const traducir = async()=>{
        if (datos.op != ''){
            let idioma = 'es';
            if (datos.op == 'Francés'){
                idioma = 'fr';
            } 
            else if (datos.op == 'Italiano'){
                idioma = 'it';
            }
            else if (datos.op == 'Coreano'){
                idioma = 'ko';
            }
            else if (datos.op == 'Ruso'){
                idioma = 'ru';
            }
            else if (datos.op == 'Inglés'){
                idioma = 'en';
            } 
            else if (datos.op == 'Español'){
                idioma = 'es';
            } 
            axios.post(tr,{text: datos.text, opcion: idioma})
            .then(response=>{
                //console.log(response.data);
               if(response.data != ""){
                    console.log(response.data);
                    /*setDatos({
                        text: response.data,
                        op: datos.op
                    })*/
                    traduccion = response.data;
                    opcionP = datos.op;
                    console.log("Traduccion: " + traduccion + "Idioma: " + opcionP);
                    datos.text = response.data;
                    console.log(datos);
                }
                else{
                    console.log('error al traducir');
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Elige un idioma.',
                showConfirmButton: false,
                timer: 2000
              })
            console.log('otro error?');
        }
    }

    const pollyPocket = async()=>{
        let lan = 'es-MX';
        let voz = 'Miguel';
        if (opcionP == 'Francés'){
            lan = 'fr-FR';
            voz = 'Mathieu';
        } 
        else if (opcionP == 'Italiano'){
            lan = 'it-IT';
            voz = 'Giorgio';
        }
        else if (opcionP == 'Coreano'){
            lan = 'ko-KR';
            voz = 'Seoyeon';
        }
        else if (opcionP == 'Ruso'){
            lan = 'ru-RU';
            voz = 'Tatyana';
        }
        else if (opcionP == 'Inglés'){
            lan = 'en-US';
            voz = 'Joanna';
        } 
        else if (opcionP == 'Español'){
            lan = 'es-MX';
            voz = 'Miguel';
        } 
        axios.post(pl,{text: traduccion, voz: voz, lan: lan})
            .then(response=>{
                //console.log(response.data);
               if(response.data != ""){
                    console.log(response.data);
                }
                else{
                    console.log('error al traducir');
                }
            })
    }


    return(
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
                <Grid align="center">
                <Avatar className={classes.avatar}>
                    <PageviewIcon />
                    </Avatar>
                    <h2>Traductor</h2>
                </Grid>
  
                           
                <div class="form-group">
                <label for="txta">Ingresa un texto</label>
                <textarea onChange={handleInputChange} name="text" class="form-control" id="txta" rows="3" placeholder="Ingresa un texto"></textarea>
                </div>
                <div class="form-group">
                <label for="slc">Selecciona un idioma</label>
                    <select class="form-control" id="slc" onChange={handleInputChange} name="op">
                    <option>Idioma</option>
                    <option>Inglés</option>
                    <option>Español</option>
                    <option>Ruso</option>
                    <option>Coreano</option>
                    <option>Italiano</option>
                    <option>Francés</option>
                    </select>
                </div>
                <Button onClick={enviarDatos} className={classes.btn} type="submit"  variant="contained" fullWidth>Traducir</Button>
                <Grid align="center">
                    <Typography><h5>Traduccion</h5></Typography>
                    <textarea class="form-control" id="txta" rows="3" placeholder={traduccion}></textarea>
                </Grid>
                <Grid align="center">
                <Button onClick={voz} className={classes.btn} type="submit"  variant="contained" fullWidth>Crea un audio</Button>
                <br></br>
                <Typography>Reproduce el audio</Typography>
                <br></br>
                    <AudioM/>
                </Grid>
          </Paper>
        </Grid>
    )


}

export default Translate