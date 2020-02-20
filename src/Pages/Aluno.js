import React,{useState, useEffect} from 'react';
import {Container,Button,Card,CardBody,Collapse,ListGroup,ListGroupItem, UncontrolledCollapse} from 'reactstrap'
import { Title } from '../assets/styles/index';
import axios from 'axios';
import Disciplinas from '../Components/Disciplinas';
import NavBar from '../Components/NavBar'


const Aluno=()=>{
  const [matrizes,setMatriz] = useState([]);

  useEffect(()=>{

    axios.get('http://localhost:8080/api/cursos',{headers:{"authorization":localStorage.getItem("@TOKEN")}
  }).then(res=>{
    setMatriz(res.data);
  })
  },[])

  return(
    <>
    <NavBar/>
<Container>
  <h2>Lista de Cursos</h2>
  {matrizes.map(curso=>{
    console.log(curso.semestres);
    return(
      <div key={curso.id}>
    <ListGroup>
        <ListGroupItem style={{marginBottom:"1rem",cursor:"pointer"}} id={`toggler${curso.id}`}>{curso.nome}</ListGroupItem>
    </ListGroup>
      <UncontrolledCollapse toggler={`#toggler${curso.id}`} style={{marginBottom:"1rem"}}>
        <Card style={{border:0}}>
            {curso.semestres.map(semestre=>{   
                return(
                  <>
                    <h6>Semestre {semestre.id}</h6> 
                    <Disciplinas semestre={semestre}/>
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
}

export default Aluno;