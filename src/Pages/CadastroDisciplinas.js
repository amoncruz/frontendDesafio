import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Form,FormGroup,Input,Label,Button,Container,Alert} from 'reactstrap';
import {semestres as arraySemestres} from '../utils/semestres.js'
const CadastroDisciplinas=()=>{

    const[initialState,setInitialState]=useState();
    const[disciplina,setDisciplina]=useState({nome:'',qtdCreditos:''});
    const[cursos, setCursos]=useState([]);
    const[cursoId,setCursoId]=useState();
    const[semestre,setSemestre]=useState({numero:''});
    const[semestres,setSemestres]=useState([]);

    useEffect(()=>{

    setInitialState(disciplina);

    Axios.get('http://localhost:8080/api/cursos',{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            setCursos(res.data);
    })


    },[])

    const handleSelectCurso=(e)=>{
        let cursoId=e.target.value;
        setCursoId(cursoId);
        cursos.map(curso=>{
            if(curso.id===parseInt(cursoId)){
                console.log(curso);
                setSemestres(arraySemestres.slice(0,curso.qtdSemestres));
            }
        })

    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(disciplina.nome!=='' && disciplina.nome.trim().length>0){
            Axios.post(`http://localhost:8080/api/cursos/${cursoId}/semestres/${semestre.numero}`,{nome:disciplina.nome,qtdCreditos:disciplina.qtdCreditos},{headers:{"authorization":localStorage.getItem("@TOKEN")}})
            .then(res=>{    
                if(res.status===200){
                    swal("Usuário Atualizado com Sucesso!", {
                        icon: "success",
                      }).then(res=>{
                        setDisciplina(initialState);
                    })
                }
            })
        }
    }
    
    if(cursos.length>0){
    return(
    <Container>
        <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
            <FormGroup>
                <Label>Curso</Label>
                <Input type="select" name="curso" onChange={(e)=>handleSelectCurso(e)}>
                 <option></option>
                 {cursos.map(curso=>{
                     return(
                     <option value={curso.id} key={curso.id}>{curso.nome}</option>
                     );
                 })}
                </Input>
            </FormGroup>
            {semestres.length>0 &&(
                <>
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
                    <Input type="text" name="disciplina" value={disciplina.nome} placeholder="Nome da Disciplina" onChange={(e)=>setDisciplina({...disciplina,nome:e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Quantidade de Créditos</Label>
                    <Input type="text" name="creditos" value={disciplina.qtdCreditos} onChange={(e)=>setDisciplina({...disciplina,qtdCreditos:e.target.value})} />
                </FormGroup>
                </>
            )}
            <Button type="submit">Submit</Button>
        </Form>
    </Container>
    )
                }else{
                    return(<Alert color="info">
                    Você não pode inserir disciplinas pois não possui nenhum curso cadastrado!
                            </Alert>);
                }
};

export default CadastroDisciplinas;