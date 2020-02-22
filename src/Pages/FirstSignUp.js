import React, { useState } from 'react'
import {Table, Container,FormGroup,Form,Label,Input,Button} from 'reactstrap'


const FirstSignUp=()=>{
    const[user,setUser]=useState();
    
    const handleSubmit=(e)=>{
        
    }

    return(
        <Container>
            <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label for="exampleEmail">Usuario</Label>
                    <Input type="text" name="username" id="exampleEmail" placeholder="with a placeholder" onChange={(e)=>setUser({...user,username:e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Senha</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={(e)=>setUser({...user,password:e.target.value})} />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
}

export default FirstSignUp;