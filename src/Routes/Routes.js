import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../Pages/Home';
import Inicio from '../Pages/Inicio'
import Registro from '../Pages/Registro'
import Eleccion from '../Pages/Eleccion'
import Traductor from '../Pages/Traductor';
//importamos nuestras pagias

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route exact path="/signup" component={Registro}/>
                <Route exact path="/home" component={Eleccion}/>
                <Route exact path="/aprender" component={Home}/>
                <Route exact path="/translate" component={Traductor}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;