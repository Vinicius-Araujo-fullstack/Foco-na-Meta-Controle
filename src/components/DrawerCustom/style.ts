import styled from "styled-components";

export const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    min-height: 100%;
    /* margin-bottom:56px; */
    
`;

export const DivHeader = styled.div `
    width: 100%;
    display: flex;
    justify-content: space-between;
    
`;

export const Title = styled.h1 `
font-family: ${(props) => props.theme.fonts.primary};
font-size: 20px;
font-weight: 600;
line-height: 30px;
color:${(props) => props.theme.colors.black};
`;

export const BoxDrops = styled.div `
display: flex;
flex-direction: column;

`;