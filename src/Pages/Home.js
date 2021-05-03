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

    const [imagenes, guardarImagenes] = useState([]);

    const [alimentosS, setAlimentos] = useState([]);
    const [coloresS, setColores] = useState([]);
    const [cuerpoS, setCuerpo] = useState([]);
    const [calendarioS, setCalendario] = useState([]);
    const [familiaS, setFamilia] = useState([]);
    const [numerosS, setNumeros] = useState([]);

    useEffect(()=>{
        //peticion a la api
        const url = "https://t2ncqidnye.execute-api.us-east-2.amazonaws.com/Primera";
        axios.get(url)
        .then(response=>{
            guardarImagenes(response.data.Items);
            console.log(imagenes)
        })
        .catch(error=>{
            console.log(error)
        })

        //alimenots
        const urlA = "https://gde8r1la63.execute-api.us-east-2.amazonaws.com/Primera";
        axios.get(urlA)
        .then(response=>{
            setAlimentos(response.data.Items);
        })
        .catch(error=>{
            console.log(error)
        })

        //colores
        const urlCo = "https://q82ln2ofji.execute-api.us-east-2.amazonaws.com/colores";
        axios.get(urlCo)
        .then(response=>{
            setColores(response.data.Items);
        })
        .catch(error=>{
            console.log(error)
        })

        //cuerpo
        const urlCu = "https://sz6xk2v7ek.execute-api.us-east-2.amazonaws.com/cuerpo";
        axios.get(urlCu)
        .then(response=>{
            setCuerpo(response.data.Items);
        })
        .catch(error=>{
            console.log(error)
        })

        //calendario
        const urlCa = "https://nwpec6ql45.execute-api.us-east-2.amazonaws.com/calendario";
        axios.get(urlCa)
        .then(response=>{
            setCalendario(response.data.Items);
        })
        .catch(error=>{
            console.log(error)
        })

        //familia
        const urlF = "https://xnvtaqoovj.execute-api.us-east-2.amazonaws.com/familia";
        axios.get(urlF)
        .then(response=>{
            setFamilia(response.data.Items);
        })
        .catch(error=>{
            console.log(error)
        })

        //numeros
        const urlN = "https://rmuzun1rkl.execute-api.us-east-2.amazonaws.com/numeros";
        axios.get(urlN)
        .then(response=>{
            setNumeros(response.data.Items);
        })
        .catch(error=>{
            console.log(error)
        })
    },[]);

    const listaOrdenada = [...imagenes].sort((a,b)=>(a.nombre > b.nombre) ? 1 : a.nombre < b.nombre ? -1 : 0);
    var datosAbc = listaOrdenada.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
        title={item.nombre}
        subtitle={item.descripcion}/>);
    });

    var datosAlimentos = alimentosS.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
        title={item.nombre}
        subtitle={item.descripcion}/>);
    });

    var datosColores = coloresS.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
        title={item.nombre}
        subtitle={item.descripcion}/>);
    });

    var datosCuerpo = cuerpoS.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
        title={item.nombre}
        subtitle={item.descripcion}/>);
    });

    var datosCalendario = calendarioS.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
        title={item.nombre}
        subtitle={item.descripcion}/>);
    });

    var datosFamilia = familiaS.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
        title={item.nombre}
        subtitle={item.descripcion}/>);
    });

    var datosNumeros = numerosS.map((item, i) => {
        return (<Slide
        media={
        <img src={item.ubicacion} />
        }
        mediaBackgroundStyle={{ backgroundColor: '#9CC7CE' }}
        style={{ backgroundColor: '#5AA2AE' }}
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
                <Tarjeta Titulo = "ALIMENTOS" fotos={datosAlimentos} imagen={alimentos}/>
            </Grid>
            <Grid item md={3} sm={6} xs={12} spacing={3}>
                <Tarjeta Titulo = "CALENDARIO" fotos={datosCalendario} imagen={calendario}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "COLORES" fotos={datosColores} imagen={colores}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "CUERPO HUMANO" fotos={datosCuerpo} imagen={cuerpo}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "FAMILIA" fotos={datosFamilia} imagen={familia}/>
            </Grid>
            <Grid item md={3} sm={6}  xs={12} spacing={3}>
                <Tarjeta Titulo = "NUMEROS" fotos={datosNumeros} imagen={numeros}/>
            </Grid>
            <Grid>
            </Grid>
            
        </Grid>
        </Container>

        </>
    );
}