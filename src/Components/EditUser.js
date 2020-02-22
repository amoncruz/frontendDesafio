import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button,Form,Input,FormGroup,Label} from 'reactstrap'
import Axios from 'axios';
import swal from 'sweetalert';


const EditUser=({data,setUserChanges,userChanges})=>{
    const [user,setUser]=useState();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

    useEffect(()=>{
        setUser({username:data.username,role:{name:"ROLE_USER",description:"ROLE_USER"}});
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        let usuario={
            id:data.id,
            username:user.username,
            role:user.role
        }
        Axios.put(`http://localhost:8080/api/v1/users`,usuario,{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            if(res.status===200){
                swal("Usuário Atualizado com Sucesso!", {
                    icon: "success",
                  }).then(res=>{
                    toggle();
                    setUserChanges(!userChanges);
                })
            }
        })
    }

    const handleRoleChange=(e)=>{
        let value= e.target.value;
        let role={
            name:value,
            description:value
        }
        setUser({...user,role:role})
    }

return(
    <> 
        <FontAwesomeIcon icon={faEdit} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>toggle()}/>
        <Modal isOpen={modal} toggle={toggle}  external={externalCloseBtn}>
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalBody>
            <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label for="exampleEmail">Usuario</Label>
                    <Input type="text" name="username" defaultValue={data.username} placeholder="with a placeholder" onChange={(e)=>setUser({...user,username:e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label for="role">Papel</Label>
                    <Input type="select" name="role"  defaultValue="ROLE_USER" onChange={(e)=>handleRoleChange(e)} >
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_COORDENADOR">ROLE_COORDENADOR</option>
                    </Input>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
            </ModalBody>
        </Modal>
    </>
);
}

export default EditUser;