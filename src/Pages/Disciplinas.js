import React from 'react'
import {Form,Label,Input,FormGroup,Button,Container} from 'reactstrap'

const Login=()=>{
    return(
        <Container className="container-login">
            <Form className="form-login">
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="qtdCreditos">Quantidade de Creditos</Label>
                    <Input type="text" name="qtdCreditos" placeholder="Quantidade de creditos"/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default Login;