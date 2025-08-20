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
      @media (max-width: 821px) {
    padding: 24px 20px 24px 20px;
  }
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
  background-color:${(props) => props.theme.buttonColors.simulatedPageButton};
  border: none;
  border-radius: 12px;
  color: ${(props) => props.theme.colors.white};
  padding: 24px 200px 24px 80px;
  font-size: 1rem;
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 500;
  padding: 0 16px 0 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap:8px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &:active {
    outline: none;
    box-shadow: none;
  }
`;


export const SearchBar = styled.div`
  display: flex;
  align-items: center;
 width: 100%;
 height: auto;
  gap: 10px;
  justify-content: end;
  flex-wrap: wrap;
`;

export const MoreButton = styled.button`
  background-color:${(props) => props.theme.colors.black};
  padding: 24px 200px 24px 80px;
  color:${(props) => props.theme.colors.white};
  padding: 24px 200px 24px 80px;
  font-size: 1rem;
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 400;
  border: none;
  height: 46px;
  padding: 0px 16px 0px 16px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  &:active {
    outline: none;
    box-shadow: none;
  }
`;

