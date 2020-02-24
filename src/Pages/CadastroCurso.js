import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Form,FormGroup,Input,Label,Button,Container} from 'reactstrap';
import {semestres as arraySemestres} from '../utils/semestres';
const CadastroCurso=()=>{

    const [initialState,setInitalState]=useState();
    const [curso,setCurso]=useState({nome:'',qtdSemestres:''});

    useEffect(()=>{
        setInitalState(curso);
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(curso.nome!=='' && curso.nome.trim().length>0){
            Axios.post(`http://localhost:8080/api/cursos`,{nome:curso.nome,qtdSemestres:curso.qtdSemestres},{headers:{"authorization":localStorage.getItem("@TOKEN")}})
           .then(res=>{
              
                //Buscar curso pelo nome
                Axios.get(`http://localhost:8080/api/cursos/${curso.nome}`,{headers:{"authorization":localStorage.getItem("@TOKEN")}})
                .then(res=>{
                    console.log(res);
                    if(res.status===200){
                        let cursoId=res.data.id;
                        //Cadastrar semestres do curso
                        Axios.post(`http://localhost:8080/api/cursos/${cursoId}/semestres/teste`,arraySemestres.slice(0,curso.qtdSemestres),{headers:{"authorization":localStorage.getItem("@TOKEN")}})
                        .then(res=>{

                            //verificar se deu tudo certo :D
                            if(res.status===200){

                                swal("Curso cadastrado com Sucesso!", {
                                    icon: "success",
                                }).then(res=>{
                                    setCurso(initialState);
                                })
                            }

                        })
                    }
                })
            })       
        }
    }
    
    return(
    <Container className="container-matriz">
        <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
            <FormGroup>
                <Label for="exampleEmail">Curso</Label>
                <Input type="text" name="curso" value={curso.nome} placeholder="Nome do Curso" onChange={(e)=>setCurso({...curso,nome:e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Qtd Semestres</Label>
                <Input type="text" name="qtdSemestres" value={curso.qtdSemestres} placeholder="Quantidade de Semestres" onChange={(e)=>setCurso({...curso,qtdSemestres:e.target.value})} />
            </FormGroup>
            <Button type="submit">Submit</Button>
        </Form>
    </Container>
    )
};

export default CadastroCurso;