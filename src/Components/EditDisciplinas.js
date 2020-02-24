import React,{useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button,Form,Input,FormGroup,Label} from 'reactstrap'
import Axios from 'axios';
import swal from 'sweetalert';


const EditDisciplinas=({data,semestreId,handleRender})=>{
    const [disciplina,setDisciplina]=useState({nome:'',qtdCreditos:'' });
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;

    useEffect(()=>{
        setDisciplina({nome:data.nome,qtdCreditos:data.qtdCreditos});
    },[])

    const handleSubmit=(e)=>{

        e.preventDefault();
        let disciplinaDetail={
            id:data.id,
            nome:disciplina.nome,
            qtdCreditos:disciplina.qtdCreditos
        }

        Axios.put(`http://localhost:8080/api/semestres/${semestreId}/disciplinas`,disciplinaDetail,{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        .then(res=>{
            if(res.status===200){
                swal("Usuário Atualizado com Sucesso!", {
                    icon: "success",
                  }).then(res=>{
                    toggle();
                    handleRender();
                })
            }
        })
    }

return(
    <> 
        <FontAwesomeIcon icon={faEdit} className="delete-icon" style={{cursor:"pointer"}} onClick={()=>toggle()}/>
        <Modal isOpen={modal} toggle={toggle}  external={externalCloseBtn}>
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalBody>
            <Form className="form-login" onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label for="nome">Disciplina</Label>
                    <Input type="text" name="nome" defaultValue={disciplina.nome} placeholder="with a placeholder" onChange={(e)=>setDisciplina({...disciplina,nome:e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label for="qtdCreditos">Quantidade de Creditos</Label>
                    <Input type="text" name="qtdCreditos"  defaultValue={disciplina.qtdCreditos} placeholder="Quantidade de creditos" onChange={(e)=>setDisciplina({...disciplina,qtdCreditos:e.target.value})}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
            </ModalBody>
        </Modal>
    </>
);
}

export default EditDisciplinas;