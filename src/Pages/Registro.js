import React, { Component } from 'react';
import NavBar from '../Components/NavBar';
import Container from '@material-ui/core/Container'
import Registrar from '../Components/Registrar';

export default class Inicio extends Component {

    render() {
        return (
            <>
            <NavBar/>
            <Container maxWidth="lg">
                <Registrar/>
            </Container>
            </>
        )
    }
}