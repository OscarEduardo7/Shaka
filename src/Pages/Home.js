import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import NavBar2 from '../Components/NavBar2'
import Tarjeta from "../Components/Tarjeta";
import {Slide} from "material-auto-rotating-carousel";
import { blue, green } from "@material-ui/core/colors";
import { Container, Grid, Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

import abc from  '../img/abc.jpeg';
import alimentos from  '../img/alimentos.png';
import calendario from  '../img/calendario.jpeg';
import colores from  '../img/colores.jpeg';
import cuerpo from  '../img/cuerpo.jpeg';
import familia from  '../img/familia.jpeg';
import numeros from  '../img/numeros.jpeg';
import A from  '../img/A.png';

const useStyles = makeStyles({
    contenedor: {
        paddingTop: '30px',
        paddingBottom: '30px',
        backgroundColor: '#F2C45A',
    },
    div:{
        paddingTop: '10px',
        paddingBottom: '10px',
    }
  });

export default function Home () {

    const classes = useStyles();

    const gato1 =<Slide
        media={
        <img src={A} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
        title="A"
        subtitle="Con la mano cerrada, se muestran las uñas
        y se estira el dedo pulgar hacia un lado. La
        palma mira al frente."/>

    const gato2 = <Slide
        media={
        <img src="https://www.frecuenciageek.com/wp-content/uploads/2020/11/gato-marron_0.jpg" />
        }
        mediaBackgroundStyle={{ backgroundColor: blue[400] }}
        style={{ backgroundColor: green }}
        title="A"
        subtitle="Con la mano cerrada, se muestran las uñas
        y se estira el dedo pulgar hacia un lado. La
        palma mira al frente."/>

    const [imagenes, guardarImagenes] = useState([]);

    useEffect(()=>{
        //peticion a la api
        const url = "https://t2ncqidnye.execute-api.us-east-2.amazonaws.com/Primera";
        axios.get(url)
        .then(response=>{
            console.log(response.data.Items);
            guardarImagenes(response.data.Items);
        })
        .catch(error=>{
            console.log(error)
        })
    },[]);

    const datosI = imagenes.map((item, i) => (
        <p key={i}>Hola{item.nombre}</p>
    ));

    var datosAbc = imagenes.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: blue[400] }}
        style={{ backgroundColor: green }}
        title={item.nombre}
        subtitle={item.descripcion}/>);
    });



    return (
        <>
        <NavBar2/>
        
        <Container className={classes.contenedor}>
            <Typography variant="h2" align="center" color="initial">Diccionario Básico</Typography>
            <Typography variant="h5" align="center" color="initial">Aprenderas a comunicarte con las personas sordas que utilizan lenguaje de señas.</Typography>
        
        <Container className={classes.div}>
        <Divider variant="middle"/>
        </Container>
        <Grid container spacing={3} justify="center">
            <Grid className={classes.tarjeta} item md={3} sm={6} xs={12} spacing={3}>
                <Tarjeta Titulo = "ABECEDARIO" fotos={datosAbc} imagen={abc}/>
            </Grid>
            <Grid item md={3} sm={6} xs={12} spacing={3}>
                <Tarjeta Titulo = "ALIMENTOS" fotos={gato2} imagen={alimentos}/>
            </Grid>
            <Grid item md={3} sm={6} xs={12} spacing={3}>
                <Tarjeta Titulo = "CALENDARIO" fotos={gato2} imagen={calendario}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "COLORES" fotos={gato2} imagen={colores}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "CUERPO HUMANO" fotos={gato2} imagen={cuerpo}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "FAMILIA" fotos={gato2} imagen={familia}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "NUMEROS" fotos={gato2} imagen={numeros}/>
            </Grid>
            <Grid>
            </Grid>
            
        </Grid>
        </Container>

        </>
    );
}