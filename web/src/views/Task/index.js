import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './styles';
import {format} from 'date-fns';

//IMPORT AXIOS CONNECTION
import api from '../../services/api';
import isConnected from '../../utils/isConnected';

//COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import typeIcons from '../../utils/TypeIcons';
import { set } from 'date-fns';


function Task({match}) {
    const [redirect, setRedirect] = useState(false);
    const [type, setType] = useState();
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const[description, setDescription] = useState();
    const[date, setDate] = useState();
    const[hour, setHour] = useState();
    


    async function LoadTaskDetails(){
        await api.get(`/task/${match.params.id}`)
            .then(response =>{
                setType(response.data.type)
                setDone(response.data.done)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
                setHour(format(new Date(response.data.when), 'HH:mm'))
            })
    }

    async function Save(){
        
        //data validation

        if(!title)
            return alert('Você precisa informar o Título da tarefa');
        else if(!description)
            return alert('Você precisa informar a Descrição');
        else if(!type)
        return alert('Você precisa selecionar o tipo da tarefa');
        else if(!date)
            return alert('Você precisa definir a data da tarefa');
        else if(!hour)
        return alert('Você precisa definir a hora da tarefa');

        
        if(match.params.id){

            await api.put(`/task/${match.params.id}`, {
                macaddress: isConnected,
                done,
                type,
                title,
                description,
                when: `${date}T${hour}:00.000` 
            }).then(() =>
                    setRedirect(true)
                )
        }else{
            await api.post('/task', {
                macaddress: isConnected,
                type,
                title,
                description,
                when: `${date}T${hour}:00.000` 
            }).then(() =>
                    setRedirect(true)
                )
        }
    }

    async function Remove(){
        const res = window.confirm('Deseja realmente REMOVER a tarefa?')
        if(res === true){
           await api.delete(`/task/${match.params.id}`)
            .then(() => setRedirect(true));
        }
    }

    useEffect(() =>{
        if(!isConnected)
            setRedirect(true)
        LoadTaskDetails();
    }, [])
    

    return (
        <S.Container>
            {redirect && <Redirect to="/" />}
            <Header/>     

            <S.Form>
                <S.TypeIcons>
                    {
                        typeIcons.map((icon, index) => (
                           index > 0 && 
                           <button type="button" onClick={() => setType(index)}>
                           <img src={icon} alt="Tipo da tarefa" 
                           className={type && type !== index ? 'inactive' : 'active'}/>
                           </button>
                        ))
                    }
                </S.TypeIcons>
                <S.input>
                    <span>Título</span>
                    <input type="text" placeholder="Título da tarefa..."
                     onChange={e => setTitle(e.target.value)} value={title} />
                </S.input>
                
                <S.TextArea>
                    <span>Descrição</span>
                    <textarea rows={5} placeholder="Detalhes da tarefa..." 
                    onChange={e => setDescription(e.target.value)} value={description} />
                </S.TextArea>
                
                <S.input>
                    <span>Data</span>
                    <input type="date" placeholder="Título da tarefa..."
                    onChange={e => setDate(e.target.value)} value={date} />
                </S.input>
                
                <S.input>
                    <span>Hora</span>
                    <input type="time" placeholder="Título da tarefa..."
                    onChange={e => setHour(e.target.value)} value={hour} />      
                </S.input>

                <S.Options>
                    <div>
                        <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>
                        <span>CONCLUIDO</span>
                    </div>
                    {  
                    match.params.id && <button type="button" onClick={Remove}>EXCLUIR</button>                  
                    }
                </S.Options>

                <S.Save>
                    <button type="button" onClick={Save} >Salvar</button>
                </S.Save>
            </S.Form>
            <Footer/>        
        </S.Container> 
        
    )
}

export default Task;
