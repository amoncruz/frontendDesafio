import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditDisciplinas from './EditDisciplinas';

const Disciplinas=({semestre,setMatrizChanges,matrizChanges})=>{

    const[disciplinas,setDisciplinas]=useState([]);

    const[matrizHandler,setMatrizHandlerChanges]=useState(false);

    useEffect(()=>{
        setDisciplinas(semestre.disciplinas);
    },[])

    useEffect(()=>{
        setMatrizChanges(!matrizChanges);
    },[matrizHandler])

    if(localStorage.getItem("@ROLE")!=="ROLE_COORDENADOR"){
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

    }else{
        return(
            <>
            <ul>
            {disciplinas.map(disciplina=>{ 
                console.log(disciplina);
                    return(     
                           
                            <li style={{marginBottom:"1rem",cursor:"pointer"}} className="disciplinas">{disciplina.nome} - {disciplina.qtdCreditos}
                            <div className="actions">
                                <EditDisciplinas data={disciplina} semestreId={semestre.id} setMatrizHandlerChanges={setMatrizHandlerChanges} matrizHandler={matrizHandler}/>
                                <FontAwesomeIcon icon={faTrashAlt} className="delete-icon"/>
                             </div>
                            </li>
                            
                    )   
            })}
            </ul> 
            
        </>
        );
        
    }

}

export default Disciplinas;