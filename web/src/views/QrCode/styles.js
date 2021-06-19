import styled from 'styled-components';

export const Container = styled.div`
    
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Content = styled.div`

    margin-top: 15px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        text-align: center;
        color:#EE6B26;
    }
    p{
        text-align: center;
        color: #20295F;
        font-size: 18px;
    }
`
export const QrCodeArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
export const ValidationCode = styled.div`
    display: flex;
    flex-direction: column;
    margin: 70px;
    span{
        text-transform: uppercase;
        font-weight: bold;
    }

    input{
        width: 500px;
        font-size: 18px;
        padding: 10px;
        text-align: center;
       
    }

    button{
        font-weight: bold;
        background: #EE6B26;
        color: #FFF;
        font-size: 18px;
        padding: 10px;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        margin-top: 10px;

        &:hover{
            background: #20295F;
        }
    }
`