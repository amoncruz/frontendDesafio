import React,{useState, useEffect} from 'react';
import {Container,Card,NavLink,NavItem,ListGroup,ListGroupItem, UncontrolledCollapse,Alert} from 'reactstrap'
import axios from 'axios';
import Disciplinas from '../Components/Disciplinas';
import NavBar from '../Components/NavBar'
import {Link} from 'react-router-dom'

const Aluno=()=>{
  const [matrizes,setMatriz] = useState([]);

  useEffect(()=>{

    axios.get('http://localhost:8080/api/cursos',{headers:{"authorization":localStorage.getItem("@TOKEN")}
  }).then(res=>{
    setMatriz(res.data);
  })
  },[])

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

export default Aluno;