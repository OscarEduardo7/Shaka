  
import React, { Component } from 'react';
import NavBar from '../Components/NavBar';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Login from '../Components/Login'

export default class Inicio extends Component {

    render() {
        return (
            <>
            <NavBar/>
            <Container maxWidth="lg">
                <Login/>
            </Container>
            </>
        )
    }
}