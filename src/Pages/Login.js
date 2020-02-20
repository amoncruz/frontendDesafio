import React, { useState } from 'react'
import {Form,Label,Input,FormGroup,Button,Container} from 'reactstrap'
import Axios from 'axios';

const Login=(props)=>{
    const[user,setUser]=useState({username:"",password:""});

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(user)
        Axios.post(`http://localhost:8080/login`,{username:user.username,password:user.password}).then(res=>{
           console.log(res);
            if(res.status==200){       
                localStorage.setItem("@TOKEN",res.data.token);
                localStorage.setItem("@ROLE",res.data.role);
                props.history.push("/pagina_inicial");
            }
        })
    }

    return(
        <Container className="container-login">
            <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label for="exampleEmail">Usuario</Label>
                    <Input type="text" name="username" id="exampleEmail" placeholder="with a placeholder" onChange={(e)=>setUser({...user,username:e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Senha</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={(e)=>setUser({...user,password:e.target.value})} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
}

export default Login;