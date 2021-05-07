import React, { Component } from 'react';
import NavBar2 from '../Components/NavBar2'
import Container from '@material-ui/core/Container'
import Translate from '../Components/Translate'
import Music from '../Components/Reproducir';
import AudioM from '../Components/Audio';

export default class Traductor extends Component {

    render() {
        return (
            <>
            <NavBar2 />
            <Container maxWidth="lg">
                <Translate/>
            </Container>
            </>
        )
    }
}