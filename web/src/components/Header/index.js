import React, {useEffect, useState} from "react";
import * as S from './styles';
import{ Link } from 'react-router-dom';

//ASSETS
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png'

//API
import api from '../../services/api';
import isConnected from '../../utils/isConnected';

function Header({ clickNotification }) {
    const [lateCount , setLateCount] = useState();

    async function lateVerify(){
        await api.get(`/task/filter/late/${isConnected}`)
            .then(response =>{
                setLateCount(response.data.length);
            })
    }

    async function logout(){
        localStorage.removeItem('@todo/macaddress');
        window.location.reload();
    }
    
    useEffect(() =>{
        lateVerify();
    })

    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="Logo"/>
            </S.LeftSide>
            <S.RightSide>
                <Link to="/">INÍCIO</Link>
                <span className="dividor"></span>
                <Link onClick={() => window.location.href = '/task'}>NOVA TAREFA</Link>
                <span className="dividor"></span>
                {!isConnected 
                ?
                <Link to="/qrcode">ENTRAR</Link> 
                :
                <button type="button" onClick={logout}>SAIR</button>
                }
                {lateCount > 0 &&
                    <>
                    <span className="dividor"></span>
                       <button onClick={clickNotification} id="notification">
                            <img src={bell} alt="Notificação" />
                            <span>{lateCount}</span>
                        </button>
                    </>
                }
            </S.RightSide>
        </S.Container>
    )
}
  
  export default Header;
  