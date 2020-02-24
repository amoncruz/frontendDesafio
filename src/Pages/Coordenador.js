import React,{useState, useEffect} from 'react';
import {Container,Card,NavLink,NavItem,ListGroup,ListGroupItem, UncontrolledCollapse,Alert} from 'reactstrap'
import axios from 'axios';
import Disciplinas from '../Components/Disciplinas';
import NavBar from '../Components/NavBar'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import EditCurso from '../Components/EditCurso';
import EditSemestre from '../Components/EditSemestre';

const Coordenador=()=>{
  const [matrizes,setMatriz] = useState([]);
  const [render,setRender]=useState(false);

  useEffect(()=>{

    axios.get('http://localhost:8080/api/cursos',{headers:{"authorization":localStorage.getItem("@TOKEN")}
  }).then(res=>{
    setMatriz(res.data);
  })
  },[render])

  if(matrizes.length>0){

  return(
    <>
  <NavBar/>
    <Container>
      <h2>Lista de Cursos</h2>
      {matrizes.map(curso=>{
        return(
          <div key={curso.id}>
        <ListGroup>
           
            <ListGroupItem style={{marginBottom:"1rem",cursor:"pointer"}} id={`toggler${curso.id}`}>{curso.nome}
                <div className="actions">
                    <EditCurso data={curso} render={render} setRender={setRender}/>
                    <FontAwesomeIcon icon={faTrashAlt} className="delete-icon"/>
                </div>
            </ListGroupItem>
        </ListGroup>
          <UncontrolledCollapse toggler={`#toggler${curso.id}`} style={{marginBottom:"1rem"}}>
            <Card style={{border:0}}>
                {curso.semestres.map(semestre=>{   
                    return(
                      <>
                        <div className="semestre">
                            <h6>Semestre {semestre.numero}</h6> 
                            <div className="actions">
                            <EditSemestre data={semestre} cursoId={curso.id}  render={render} setRender={setRender}/>                                
                            <FontAwesomeIcon icon={faTrashAlt} className="delete-icon"/>
                            </div>
                        </div>
                        <Disciplinas semestre={semestre} render={render} setRender={setRender} />
                      </>
                    )
                })}
            </Card>
          </UncontrolledCollapse>
          </div>
        )
      } )}
          
    </Container>
  </>
  );

    }else{
      return(
      <>
        <NavBar/>
        <Container>
          <Alert color="info">
            Não há nenhum curso cadastrado ainda! :/
          </Alert>
        </Container>
      </>
    );
    }
}

export default Coordenador;