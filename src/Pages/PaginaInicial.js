import React,{useEffect, useState} from 'react';
import Aluno from './Aluno';
import Admin from './Admin';
import Coordenador from './Coordenador';
import CadastroMatriz from './CadastroMatriz';

const PaginaInicial=()=>{
    const[role,setRole]=useState();

    useEffect(()=>{
        setRole(localStorage.getItem("@ROLE"));
    },[])

    switch(role){
        case "ROLE_ADMIN":
            return<Admin/>;
        case "ROLE_COORDENADOR":
            return <CadastroMatriz/>;
        default:
            return <Aluno/>;
    }
       
}

export default PaginaInicial;