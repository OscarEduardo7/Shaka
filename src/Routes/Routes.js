import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Inicio from '../Pages/Inicio'
import Registro from '../Pages/Registro'
//importamos nuestras pagias

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route exact path="/signup" component={Registro}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;