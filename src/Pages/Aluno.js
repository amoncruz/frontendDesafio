import React,{useState, useEffect} from 'react';
import {Container,Button,Card,CardBody,Collapse,ListGroup,ListGroupItem, UncontrolledCollapse} from 'reactstrap'
import { Title } from '../assets/styles/index';
import axios from 'axios';


const Aluno=()=>{
  const [matrizes,setMatriz] = useState([]);

  useEffect(()=>{

    axios.get('http://localhost:8080/curso/cursos',{headers:{"authorization":localStorage.getItem("@TOKEN")}
  }).then(res=>{
    setMatriz(res.data);
  })
  },[])

  return(
<Container>
  <h2>Lista de Cursos</h2>
  {matrizes.map(curso=>{
    return(
      <>
    <ListGroup>
        <ListGroupItem style={{marginBottom:"1rem",cursor:"pointer"}} id={`toggler${curso.id}`}>{curso.nome}</ListGroupItem>
    </ListGroup>
      <UncontrolledCollapse toggler={`#toggler${curso.id}`} style={{marginBottom:"1rem"}}>
        <Card>
          <CardBody>
          Anim pariatur cliche reprehenderit,
           enim eiusmod high life accusamus terry richardson ad squid. Nihil
           anim keffiyeh helvetica, craft beer labore wes anderson cred
           nesciunt sapiente ea proident.
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      </>
    )
  } )}
      
</Container>
  );
}

export default Aluno;