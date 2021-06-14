import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    
`

export const FilterArea = styled.div`


    display: flex;
    justify-content: space-around;
    justify-content: center;
    margin: 25px 10px;
    
    
    button{
        width: 100%;
        background: none;
        border: none;
    }
`

export const Content = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

`

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #20295F;
    margin-bottom: 30px;

    h3{
        color: #20295F;
        position: relative;
        top: 30px;
        background: #FFF;
        paddig: 0 20px;
    }
`
