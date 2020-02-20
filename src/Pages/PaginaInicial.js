import React,{useEffect} from 'react';
import Aluno from './Aluno';
import Admin from './Admin';
import Coordenador from './Coordenador';

const PaginaInicial=()=>{
   
    if(localStorage.getItem("@ROLE") === "ADMIN"){
        return<Admin/>;
    }else{
        return<Aluno/>;
    }
    
}

export default PaginaInicial;