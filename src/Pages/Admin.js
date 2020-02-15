import React from 'react'
import {Table, Container} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../Components/NavBar'

const Admin=()=>{
    return(
        <>
        <NavBar/>
        <Container>
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
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td><FontAwesomeIcon icon={faEdit}/></td>
                    <td><FontAwesomeIcon icon={faTrashAlt}/></td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td><FontAwesomeIcon icon={faEdit}/></td>
                    <td><FontAwesomeIcon icon={faTrashAlt}/></td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td><FontAwesomeIcon icon={faEdit}/></td>
                    <td><FontAwesomeIcon icon={faTrashAlt}/></td>
                </tr>
                </tbody>
            </Table>
        </Container>
        </>
    );
}

export default Admin;