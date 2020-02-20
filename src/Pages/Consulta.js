import React, { useEffect, useState } from 'react';
import {Container,Table, Label} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../Components/NavBar'
import Axios from 'axios';
import { semestres } from '../utils/semestres';

const ConsultaDadosMatriz=()=>{

    const[cursos,setCursos]=useState([]);
    const[disciplinas,setDisciplinas]=useState([]);
    const[semestre,setSemestres]=useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:8080/curso/cursos',{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            setCursos(res.data);
        })

        Axios.get('http://localhost:8080/api/disciplinas',{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
           setDisciplinas(res.data);
        })

        Axios.get('http://localhost:8080/api/semestre/semestres',{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            setSemestres(res.data);
        })
    },[])
    return(
        <>
        <NavBar/>
        <Container>
            <h2>Cursos</h2>
            <Table hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {cursos.map(curso=>{
                        return(
                        <tr>
                             <th scope="row">{curso.id}</th>
                            <td>{curso.nome}</td>
                            <td >edit</td>
                            <td ><FontAwesomeIcon icon={faTrashAlt} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>handleDelete(user.id)}/></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
            <h2>Disciplinas</h2>
            <Table hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {disciplinas.map(disciplina=>{
                        return(
                        <tr>
                             <th scope="row">{disciplina.id}</th>
                            <td>{disciplina.nome}</td>
                            <td >edit</td>
                            <td ><FontAwesomeIcon icon={faTrashAlt} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>handleDelete(user.id)}/></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>

            <h2>Semestres</h2>
            <Table hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Numero</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {semestres.map(semestre=>{
                        return(
                        <tr>
                             <th scope="row">{semestre.id}</th>
                            <td>{semestre.numero}</td>
                            <td >edit</td>
                            <td ><FontAwesomeIcon icon={faTrashAlt} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>handleDelete(user.id)}/></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
        </>
    );
}

export default ConsultaDadosMatriz;