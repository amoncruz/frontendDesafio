import React, { useEffect, useState } from 'react';
import {ListGroupItem,ListGroup} from 'reactstrap'

const Disciplinas=({semestre})=>{

    const[disciplinas,setDisciplinas]=useState([]);

    useEffect(()=>{
        setDisciplinas(semestre.disciplinas);
        console.log(semestre.disciplinas);
    },[])
    return(
        <ListGroup>
        {disciplinas.map(disciplina=>{ 
                return(         
                    <ListGroupItem style={{marginBottom:"1rem",cursor:"pointer"}}>{disciplina.nome}</ListGroupItem>
                  )   
        })}
        </ListGroup>  
    );
}

export default Disciplinas;