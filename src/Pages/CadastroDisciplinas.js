import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Form,FormGroup,Input,Label,Button,Container} from 'reactstrap';

const CadastroDisciplinas=()=>{
    const[disciplina,setDisciplina]=useState({nome:''});
    const[cursos, setCursos]=useState([]);
    const[cursoId,setCursoId]=useState();
    const[semestre,setSemestre]=useState({numero:''});
    const[semestres,setSemestres]=useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:8080/curso/cursos',{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            setCursos(res.data);
    })

    Axios.get('http://localhost:8080/api/semestres',{headers:{"authorization":localStorage.getItem("@TOKEN")}})
    .then(res=>{
        setSemestres(res.data);
    })

    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(disciplina.nome!=='' && disciplina.nome.trim().length>0){

            Axios.post(`http://localhost:8080/api/curso/${cursoId}/semestre/${semestre.numero}`,{nome:disciplina.nome},{headers:{"authorization":localStorage.getItem("@TOKEN")}})
            .then(res=>{    
            console.log(res);

            })
        }
    }
    
    return(
    <Container>
        <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
            <FormGroup>
                <Label>Curso</Label>
                <Input type="select" name="curso" onChange={(e)=>setCursoId(e.target.value)}>
                 <option></option>
                 {cursos.map(curso=>{
                     return(
                     <option value={curso.id} key={curso.id}>{curso.nome}</option>
                     );
                 })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Semestre</Label>
                <Input type="select" name="curso" onChange={(e)=>setSemestre({numero:e.target.value})}>
                 <option></option>
                 {semestres.map(semestre=>{
                     return(
                     <option value={semestre.numero} key={semestre.id}>{semestre.numero}</option>
                     );
                 })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Disciplina</Label>
                <Input type="text" name="disciplina" placeholder="Nome da Disciplina" onChange={(e)=>setDisciplina({...disciplina,nome:e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Quantidade de Créditos</Label>
                <Input type="text" name="creditos" onChange={(e)=>setDisciplina({...disciplina,qtdCreditos:e.target.value})} />
            </FormGroup>
            <Button type="submit">Submit</Button>
        </Form>
    </Container>
    )
};

export default CadastroDisciplinas;