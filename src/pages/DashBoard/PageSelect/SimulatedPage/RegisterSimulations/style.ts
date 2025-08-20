import styled from 'styled-components';


export const Main = styled.main`
width: 100%;
  flex: 1;
  padding: 2rem 4rem;
  background-color:${(props) => props.theme.colors.gray1};
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 50px;
  overflow-y: auto; 
  overflow-x: hidden;

  @media (min-width: 900px) {
    padding: 24px 200px 24px 80px;

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
    width: 100%;
    gap:${(props)=> props.gap };
    align-items: start;
    margin-bottom: 50px;
`;
export const DivCustom = styled.div `
    display: flex;
    width: 100%;
    align-items: start;
    justify-content: start;
    gap:16px;
    @media (max-width: 880px) {
    flex-wrap: wrap;
  }
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


export const SortByDate = styled.div`
  font-size: 0.9rem;
  color: #555;
  background:${(props) => props.theme.colors.whitw};
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 400;
  font-size: 1rem;
  color:${(props) => props.theme.colors.gray3};
  cursor: pointer;
  padding: 0px 16px 0px 16px;
  border: solid 0.75px ${(props) => props.theme.colors.gray0};
  
`;
export const ContentSortByDate = styled.div`
 display:flex;
 width: 12.24vw;
  gap: 8px;
`;