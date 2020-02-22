import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button,Form,Input,FormGroup,Label} from 'reactstrap'
import Axios from 'axios';
import swal from 'sweetalert';

const EditSemestre=({data,cursoId})=>{
    const [semestre,setSemestre]=useState({numero:''});
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

    useEffect(()=>{
        setSemestre({numero:data.numero});
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        let semestreDetail={
            id:data.id,
            numero:semestre.numero,
        }
        Axios.put(`http://localhost:8080/api/cursos/${cursoId}/semestres`,semestreDetail,{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            if(res.status===200){
                swal("Semestre Atualizado com Sucesso!", {
                    icon: "success",
                  }).then(res=>{
                    toggle();
                })
            }
        })
    }

return(
    <> 
        <FontAwesomeIcon icon={faEdit} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>toggle()}/>
        <Modal isOpen={modal} toggle={toggle}  external={externalCloseBtn}>
            <ModalHeader>Editar Semestre</ModalHeader>
            <ModalBody>
            <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label for="numero">Numero</Label>
                    <Input type="text" name="numero" defaultValue={data.numero} placeholder="Numero do semestre"  defaultValue={data.numero} onChange={(e)=>setSemestre({...semestre,numero:e.target.value})} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
            </ModalBody>
        </Modal>
    </>
);
}

export default EditSemestre;