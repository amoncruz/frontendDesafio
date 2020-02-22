import React,{useState, useEffect} from 'react';
import {Table, FormGroup, Label, Form,Input, Container,Button,Card,CardBody,UncontrolledCollapse} from 'reactstrap'
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets'
import { CardHeader } from '../assets/styles';
import { qtdSemestres as vetorS } from '../utils/selectOptions';
import NavBar from '../Components/NavBar';
import axios from 'axios';

const pessoas=["Amon","Cruz","Pereira"];
const Coordenador=()=>{

    const [professores,setProfessores]=useState([professores,setProfessores]);
    const [matriz,setMatriz]=useState({
       curso:{
           name:'',
           semestres:[
               
           ]
       },
    });
    const [semestre,setSemestre] = useState([]);
    const [disciplinas,setDisciplinas]=useState([])
    const [data,setData] = useState({});
    const [add,setAdd] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/cursos`,{headers:{"authorization": localStorage.getItem("@TOKEN")}}).then(res=>{
            setData({...data,cursos:res.data});
        })

    },[])

    useEffect(()=>{
        if(disciplinas.length>0 && add===false){
            setAdd(!add);
        }
        
    },[disciplinas])

    useEffect(()=>{
        console.log(semestre);
    },[semestre])

    useEffect(()=>{
        console.log(matriz);
    },[matriz])

    const handleDiscplinasChange=(value)=>{
        // setSemestre([...semestre,value]);
        // let semestreName=`semestre${index}`;
        setDisciplinas(value);
       
    }

    const addSemestre=()=>{
        setSemestre([...semestre,{disciplinas}])
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // axios.post(`http://localhost:8080/martriz`,{matriz},{headers:{"authorization":localStorage.getItem("@TOKEN")}})
        setMatriz({...matriz,curso:{semestres:[semestre]}});

    }

    const handleAdd=()=>{
        setAdd(!add);
    }
    
     return(
         <>
         <Container className="form-wrapper">
            <Form onSubmit={handleSubmit} className="form-matriz">
            {data.cursos && (
                <FormGroup>
                    <Label for="examplePassword">Selecione um Curso</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={(e)=>setMatriz({...matriz,curso:{nome:e.target.value}})}>
                       <option value=""></option>
                        {data.cursos.map(curso=>{
                            return(
                                <option key={curso.id} value={curso.nome}>{curso.nome}</option>
                            );
                        })}
                    </Input>
                </FormGroup>
                )}

                {matriz.curso.name!=='' &&(
                    <>
                    <FormGroup>
                        <Label>Selecione as disciplinas</Label>
                        <Multiselect data={pessoas}  onChange={(val)=>handleDiscplinasChange(val)}/>
                    </FormGroup>
        
                    <Button style={{marginBottom:"0.8rem"}} onClick={(e)=>addSemestre(e)} disabled={!add}>Add Matriz</Button>
                    </>
                 )}

            <Button type="submit">Processar</Button>
            </Form>
        </Container>
        </>
   );
   

}

export default Coordenador;