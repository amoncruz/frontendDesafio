import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button,Form,Input,FormGroup,Label} from 'reactstrap'
import Axios from 'axios';
import swal from 'sweetalert';


const EditCurso=({data,render,setRender})=>{
    const [curso,setCurso]=useState({nome:''});
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

    useEffect(()=>{
        setCurso({nome:data.nome});
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        let cursoDetail={
            id:data.id,
            nome:curso.nome
        }
        Axios.put(`http://localhost:8080/api/cursos`,cursoDetail,{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            if(res.status===200){
                swal("Usuário Atualizado com Sucesso!", {
                    icon: "success",
                  }).then(res=>{
                    toggle();
                    setRender(!render);
                })
            }
        })
    }

return(
    <> 
        <FontAwesomeIcon icon={faEdit} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>toggle()}/>
        <Modal isOpen={modal} toggle={toggle}  external={externalCloseBtn}>
            <ModalHeader>Editar Curso</ModalHeader>
            <ModalBody>
            <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label for="nome">Curso</Label>
                    <Input type="text" name="nome" defaultValue={data.nome} placeholder="Nome do Curso" onChange={(e)=>setCurso({nome:e.target.value})} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
            </ModalBody>
        </Modal>
    </>
);
}

export default EditCurso;