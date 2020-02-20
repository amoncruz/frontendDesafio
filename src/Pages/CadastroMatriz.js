import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import NavBar from '../Components/NavBar'
import CadastroCurso from './CadastroCurso';
import Axios from 'axios';
import CadastroDisciplinas from './CadastroDisciplinas';

const semestres=[
    {
        "numero":1,
    },
    {
        "numero":2,
    },
    {
        "numero":3,
    },
    {
        "numero":4,
    },
    {
        "numero":5,
    },
    {
        "numero":6,
    },
    {
        "numero":7,
    },
    {
        "numero":8,
    },
    {
        "numero":9,
    },
    {
        "numero":10,
    }
]

const CadastroMatriz = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const[curso,setCurso]=useState({nome:''});
    const[qtdSemestre,setQtdSemestre]=useState(0);
    const[cursoId,setCursoId]=useState('');
    const[disciplina,setDisciplina]=useState({nome:''});

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(()=>{

        if(localStorage.getItem("@TOKEN")!=="ROLE_COORDENADOR"){
            props.history.push("/pagina_inicial");
        }

      if(cursoId!==''){
            Axios.post(`http://localhost:8080/api/curso/${cursoId}/semestres/teste`,semestres.slice(0,qtdSemestre),{headers:{"authorization":localStorage.getItem("@TOKEN")}})
            .then(res=>{
                console(res);
        })
}

},[cursoId])

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(curso.nome!=='' && curso.nome.trim().length>0){
        console.log(curso);
         Axios.post(`http://localhost:8080/curso`,{nome:curso.nome},{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{  

            if(res.status===200){
            Axios.get(`http://localhost:8080/curso/${curso.nome}`,{headers:{"authorization":localStorage.getItem("@TOKEN")}})
            .then(res=>{    
                if(res.status===200){
                    setCursoId(res.data.id);
            }
            
        })
        }

        })
    }

    console.log(semestres.slice(0,qtdSemestre));
    console.log(curso);
}

  return (
      <>
    <NavBar/>
    <Container>
    <div className="form-wrapper">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Concurso
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Disciplina
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <Row>
            <Col sm="12">
              <Card body>
                <CardTitle>Cadastro Concurso</CardTitle>
                <CadastroCurso setQtdSemestre={setQtdSemestre} setCurso={setCurso} handleSubmit={handleSubmit}/>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card body>
                <CardTitle>Cadastro Disciplina</CardTitle>
                <CadastroDisciplinas />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      
      </div>
    </Container>
    </>
  );
}

export default CadastroMatriz;