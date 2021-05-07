import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import NavBar2 from '../Components/NavBar2'
import { Button, Container, Grid, Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

import shaka from  '../img/shaka2.png';

const useStyles = makeStyles({
    contenedor: {
        paddingTop: '30px',
        paddingBottom: '30px',
        backgroundColor: '#9CC7CE',
        textAlign: 'center'
    },
    div:{
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    botonA:{
        width: '300px',
        height: '150px',
        fontSize: '25px',
        backgroundColor: '#F2C45A'
    },    
    botonB:{
        width: '300px',
        height: '150px',
        fontSize: '25px',
        backgroundColor: '#F5634A'
    }
});

export default function Home () {

    const classes = useStyles();

    useEffect(()=>{
        
    },[]);

    return (
        <>
        <NavBar2/>
        
        <Container className={classes.contenedor}>
            <Typography variant="h2" align="center" color="initial">Bienvenido a Shaka</Typography>
            <img width='200px' src={shaka}></img>
            <Typography variant="h5" align="center" color="initial">¿Qué deseas utilizar?</Typography>
        
        <Container className={classes.div}>
        <Divider variant="middle"/>
        </Container>
        <Grid container spacing={3} justify="center">
            <Grid item md={3} sm={6} xs={12} spacing={1}>
                <Typography variant="h5" color="initial" align='center'>Utilizar el traductor de texto a voz.</Typography>
                <Button startIcon={<RecordVoiceOverIcon/>} variant='contained' className={classes.botonA} onClick={()=>{window.location.href='./translate';}}>HABLAR</Button>
            </Grid>
            <Grid item md={3} sm={6} xs={12} spacing={1}>
                <Typography variant="h5" color="initial" align='center'>Aprender lenguaje de señas basico.</Typography>
                <Button startIcon={<LocalLibraryIcon/>} variant='contained' className={classes.botonB} onClick={()=>{window.location.href='./aprender';}}>APRENDER</Button>
            </Grid>
        </Grid>
        </Container>
        </>
    );
}