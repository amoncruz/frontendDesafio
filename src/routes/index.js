import React from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Login from '../Pages/Login';
import Admin from '../Pages/Admin';
import Coordenador from '../Pages/Coordenador';
import Aluno from '../Pages/Aluno';
import SignUp from '../Pages/SignUp';
import CadastroCurso from '../Pages/CadastroCurso';
import CadastroDisciplinas from '../Pages/CadastroDisciplinas';
import CadastroMatriz from '../Pages/CadastroMatriz';
import ConsultaDadosMatriz from '../Pages/Consulta';
import PaginaInicial from '../Pages/PaginaInicial';

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
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
    }
    />)
}

const CommonRoute = ({ component: Component, ...rest }) =>
    (<Route {...rest} render={props =>
        isAuthenticated() ?
            (
                <Redirect to={{ pathname: "/pagina_inicial", state: { from: props.location } }} />
            ) :

            (
                <Component {...props} />
            )
    }
    />);

const Routes = () =>{

    window.addEventListener('storage', function(){
        console.log("localstorage changed!");
    })
    return(
            <Router>
                <Switch>
                    <CommonRoute path="/" exact component={Login}/>
                    <ProtectedRoute path="/pagina_inicial" component={PaginaInicial}/>
                    <ProtectedRoute path="/admin" component={Admin}/>
                    <ProtectedRoute path="/coordenador"component={Coordenador}/>
                    <ProtectedRoute path="/aluno" component={Aluno}/>
                    <ProtectedRoute path="/curso" component={CadastroCurso}/>
                    <ProtectedRoute path="/disciplina" component={CadastroDisciplinas}/>
                    {localStorage.getItem("@ROLE")==="ROLE_COORDENADOR" &&(
                    <ProtectedRoute path="/matriz" component={CadastroMatriz}/>
                    )}
                    <ProtectedRoute path="/consulta" component={ConsultaDadosMatriz}/>
                  
                </Switch>
            </Router>
    );
}

export default Routes;