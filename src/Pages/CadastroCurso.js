import React, { useState } from 'react';
import Axios from 'axios';
import {Form,FormGroup,Input,Label,Button,Container} from 'reactstrap';

const CadastroCurso=({setQtdSemestre,setCurso,handleSubmit})=>{
    
    return(
    <Container>
        <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
            <FormGroup>
                <Label for="exampleEmail">Curso</Label>
                <Input type="text" name="curso" placeholder="Nome do Curso" onChange={(e)=>setCurso({nome:e.target.value})} />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Qtd Semestres</Label>
                <Input type="text" name="qtdSemestres"  placeholder="Quantidade de Semestres" onChange={(e)=>setQtdSemestre(e.target.value)} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    </Container>
    )
};

export default CadastroCurso;