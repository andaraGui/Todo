import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import * as S from './styles';
import Qr from 'qrcode.react';

//COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';


function QrCode() {

    const [mac, setMac] = useState();
    const [redirect, setRedirect] = useState(false);

    async function SaveMac(){
           if(!mac)
           alert('Você precisa informar o número que apareceu no celular.');
           else{
           await localStorage.setItem('@todo/macaddress', mac)
           setRedirect(true);
           window.location.reload();
        }
    }

    return(
        <S.Container>
            {redirect && <Redirect to="/" />}
            <Header/> 

            <S.Content>
                <h1>Digite seu nome completo</h1>
                <S.ValidationCode>
            
                    <input type='text' onChange={e => setMac(e.target.value)} value={mac}/>
                    <button type="button" onClick={SaveMac}>SINCRONIZAR</button>
                </S.ValidationCode>

            </S.Content>

            <Footer/>
        </S.Container>
    )
}

export default QrCode;