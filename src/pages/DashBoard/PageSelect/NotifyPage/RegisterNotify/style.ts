import styled from "styled-components";

export const Main = styled.main`
  flex: 1;
  background-color: ${(props) => props.theme.colors.gray1};
  display: flex;
  padding: 2rem 4rem;
  flex-direction: column;
  justify-content: start;
  gap: 50px;
  padding: 16px;
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
  color: ${(props) => props.theme.colors.gray4};
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 600;
`;

export const Button = styled.button`
  height: 52px;
  background-color: transparent;
  border: none;
  border-radius: 12px;
  color: ${(props) => props.theme.colors.gray3};
  font-size: 1rem;
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 500;
  padding: 0 16px 0 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    outline: none;
    box-shadow: none;
  }
`;
export const SectionCustom = styled.section<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => props.gap};
  align-items: start;
  margin-bottom: 50px;
`;
export const DivCustom = styled.div<{ width?: string }>`
  display: flex;
  width: ${(props) => props.width || "100%"};
  align-items: center;
  justify-content: start;
  gap: 16px;
  @media(max-width: 550px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;
export const DivDrop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
`;

export const LabelCustom = styled.p`
  margin: 0;
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 500;
`;

export const DivBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  flex-wrap: wrap;
  height: auto;
  gap: 8px;
`;

export const ContainerSelectResponse = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  padding: 0px 14px;
  width: 259.5px;
  height: 52px;
  border: 0.75px ${(props) => props.theme.colors.gray0} solid;
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: 400;
  `;

export const TitleBLock = styled.h4`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0px;
  `;

export const ButtonEnvio = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.primary};  
`

export const ButtonAgenda = styled.button`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => props.theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;
