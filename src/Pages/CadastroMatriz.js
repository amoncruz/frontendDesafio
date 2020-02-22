import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import NavBar from '../Components/NavBar'
import CadastroCurso from './CadastroCurso';
import Axios from 'axios';
import CadastroDisciplinas from './CadastroDisciplinas';
import { Link } from 'react-router-dom';

const CadastroMatriz = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const[qtdSemestre,setQtdSemestre]=useState(0);
    const[cursoId,setCursoId]=useState('');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(()=>{

      if(cursoId!==''){
            Axios.post(`http://localhost:8080/api/cursos/${cursoId}/semestres/teste`,semestres.slice(0,qtdSemestre),{headers:{"authorization":localStorage.getItem("@TOKEN")}})
            .then(res=>{
                console.log(res);
        })
    }

},[cursoId])

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
                <CardTitle>Cadastro Curso</CardTitle>
                <CadastroCurso/>
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