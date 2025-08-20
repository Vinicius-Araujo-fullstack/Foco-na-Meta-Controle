import styled from 'styled-components';

export const Main = styled.main`
  flex: 1;
  background-color:${(props) => props.theme.colors.gray1};
  padding: 24px 200px 24px 80px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 50px;
  overflow-y: auto; 
  overflow-x: hidden;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color:${(props) => props.theme.colors.gray4};
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 600;
`;

export const Button = styled.button`
 height: 52px;
  background-color: transparent;
  border: none;
  border-radius: 12px;
  color:${(props) => props.theme.colors.gray3};
  font-size: 1rem;
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 500;
  padding: 0 16px 0 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap:6px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &:active {
    outline: none;
    box-shadow: none;
  }
`;
export const SectionCustom = styled.section<{gap?:string}>`
    display: flex;
    flex-direction: column;
    width: 80%;
    gap:${(props)=> props.gap };
    align-items: start;
    margin-bottom: 50px;
`;
export const DivCustom = styled.div `
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    gap:16px;
`;
export const DivDrop= styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
`;

export const LabelCustom = styled.p `
  margin: 0;
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 500;
`;


