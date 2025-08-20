import styled from "styled-components";
export const ContainerMain = styled.main`
  display: flex;
  height: 100vh;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 80px;
  margin-left: 5rem;
`;
export const ContainerLeft = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.colors.gray1};
  display: flex;
  align-items: center;
  justify-content: end;
`;
export const ContainerRigth = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const Logo = styled.img`
  position: static;
  width: 25.63vw;
  height: auto;
  margin-right: 5rem;
`;
export const H1 = styled.h1`
  font-size: 2.25rem;
  line-height: 1.1;
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.fonts.primary};
  text-align: left;
  margin: 0;
  padding: 0;
  font-weight: 600;
`;
export const P = styled.p`
  font-size: 1.12rem;
  line-height: 1.1;
  color: ${(props) => props.theme.colors.gray5};
  font-family: ${(props) => props.theme.fonts.primary};
  text-align: left;
  margin: 0;
  padding: 0;
  font-weight: 400;
`;
export const DivTextForm = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: start;
`;
export const DivFooterForm = styled.div`
  width: 100%;
  display: flex;
  gap: 40px;
  flex-direction: column;
`;
export const DivInputsForm = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export const ErrorMessage = styled.p`
  position: absolute;
  top: 66.2%;
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.feedback.negative};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
`;
