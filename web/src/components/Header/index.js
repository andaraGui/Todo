import React from "react";
import * as S from './styles';
import{ Link } from 'react-router-dom';

//ASSETS
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png'

function Header({lateCount, clickNotification}) {
    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="Logo"/>
            </S.LeftSide>
            <S.RightSide>
                <Link to="/">INÍCIO</Link>
                <span className="dividor"></span>
                <Link to="/task">NOVA TAREFA</Link>
                <span className="dividor"></span>
                <a href="#">SINCRONIZAR CELULAR</a>
                <span className="dividor"></span>
                <button onClick={clickNotification} id="notification">
                    <img src={bell} alt="Notificação" />
                    <span>{lateCount}</span>
                </button>
            </S.RightSide>
        </S.Container>
    )
}
  
  export default Header;
  