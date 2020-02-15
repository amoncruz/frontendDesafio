import React from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Login from '../Pages/Login';
import Admin from '../Pages/Admin';
import Coordenador from '../Pages/Coordenador';
import Aluno from '../Pages/Aluno';
import SignUp from '../Pages/SignUp';

const isAuthenticated=()=>{
    if(localStorage.getItem("@TOKEN")){
        return true;
    } 
    return false;
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={props =>
        isAuthenticated() ?
            (
                <Component {...props} />
            ) :
            (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
    }
    />)
}

const CommonRoute = ({ component: Component, ...rest }) =>
    (<Route {...rest} render={props =>
        isAuthenticated() ?
            (
                <Redirect to={{ pathname: "/coordenador", state: { from: props.location } }} />
            ) :

            (
                <Component {...props} />
            )
    }
    />);




const Routes = () =>{
    return(
            <Router>
                <Switch>
                    <CommonRoute path="/" exact component={SignUp}/>
                    <CommonRoute path="/login" component={Login}/>
                    <ProtectedRoute path="/admin" component={Admin}/>
                    <ProtectedRoute path="/coordenador"component={Coordenador}/>
                    <ProtectedRoute path="/aluno" component={Aluno}/>
                </Switch>
            </Router>
    );
}

export default Routes;