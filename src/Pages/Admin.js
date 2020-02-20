import React, { useEffect, useState } from 'react'
import {Table, Container, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../Components/NavBar'
import axios from 'axios'
import EditUser from '../Components/EditUser'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SignUp from './SignUp'


const Admin=(props)=>{

    const {
        buttonLabel,
        className
      } = props;
    
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);

    const[users,setUsers]=useState([]);
    const[user,setUser]=useState();

    useEffect(()=>{
        axios.get('http://localhost:8080/api/v1/users',{headers:{"authorization":localStorage.getItem("@TOKEN")}
    }).then(res=>{
        setUsers(res.data)
    })
    },[])

    const handleDelete=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:8080/api/v1/users/${id}`,{headers:{"authorization":localStorage.getItem("@TOKEN")}}).then(res=>{
            console.log(res);
        })
    }

    const handleSubmit=(e)=>{
        console.log(user);
        e.preventDefault();
        axios.post(`http://localhost:8080/api/v1/users`,{username:user.username,password:user.password},{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            console.log(res);
        })
    }

    return(
        <>
        <NavBar/>
        <Container>
            <Table hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Papel</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user=>{
                        return(
                        <tr>
                             <th scope="row">{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            {user.role!==null ?(
                            <td>{user.role.name}</td>) :
                            (<td>Null</td>)}
                            
                            <td ><EditUser data={user}/></td>
                            <td ><FontAwesomeIcon icon={faTrashAlt} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>handleDelete(user.id)}/></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button onClick={()=>{toggle()}}>Criar Novo Usuário</Button>

            <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Cadastro de Usuario</ModalHeader>
                <ModalBody>
                    <SignUp handleSubmit={handleSubmit} setUser={setUser} user={user}/>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>Criar</Button>{' '}
                </ModalFooter>
            </Modal>
        </Container>
        </>
    );
}

export default Admin;