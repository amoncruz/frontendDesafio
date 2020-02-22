import React, { useEffect, useState } from 'react';
import { Creditos } from '../assets/styles';

const Disciplinas=({semestre})=>{

    const[disciplinas,setDisciplinas]=useState([]);

    useEffect(()=>{
        setDisciplinas(semestre.disciplinas);
    },[])
    return(
        <ul>
        {disciplinas.map(disciplina=>{ 
            console.log(disciplina);
                return(         
                        <li style={{marginBottom:"1rem",cursor:"pointer"}}>{disciplina.nome} - {disciplina.qtdCreditos}</li>
                )   
        })}
        </ul>  
    );
}

export default Disciplinas;