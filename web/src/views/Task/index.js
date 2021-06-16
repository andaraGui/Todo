import React, {useState, useEffect} from 'react';
import * as S from './styles';

//IMPORT AXIOS CONNECTION
import api from '../../services/api';

//COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import typeIcons from '../../utils/TypeIcons';


function Task() {
    const [lateCount, setLateCount] = useState();
    const [type, setType] = useState();

    async function lateVerify(){
        await api.get(`/task/filter/late/333.1.1.1.1.111.1`)
            .then(response =>{
                setLateCount(response.data.length);
            })
    }

    useEffect(() =>{
        lateVerify();
    }, [])


    return (
        <S.Container>
            <Header lateCount={lateCount}/>     

            <S.Form>
                <S.TypeIcons>
                    {
                        typeIcons.map((icon, index) => (
                           index > 0 && 
                           <button type="button" onClick={() => setType(index)}>
                           <img src={icon} alt="Tipo da tarefa" 
                           className={type && type !== index && 'inactive' }/>
                           </button>
                        ))
                    }
                </S.TypeIcons>
                <S.input>
                    <span>Título</span>
                    <input type="text" placeholder="Título da tarefa..."></input>
                </S.input>
                
                <S.TextArea>
                    <span>Descrição</span>
                    <textarea rows={5} placeholder="Detalhes da tarefa..."></textarea>
                </S.TextArea>
                
                <S.input>
                    <span>Data</span>
                    <input type="date" placeholder="Título da tarefa..."></input>
                </S.input>
                
                <S.input>
                    <span>Hora</span>
                    <input type="time" placeholder="Título da tarefa..."></input>              
                </S.input>

                <S.Options>
                    <div>
                        <input type="checkbox"></input>
                        <span>CONCLUIDO</span>
                    </div>
                    <button type="button">EXCLUIR</button>
                </S.Options>

                <S.Save>
                    <button type="button">Salvar</button>
                </S.Save>
            </S.Form>
            <Footer/>        
        </S.Container> 
        
    )
}

export default Task;
