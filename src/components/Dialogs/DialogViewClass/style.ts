import styled from "styled-components";

export const DivHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DivList = styled.div`
  display: "flex";
  flex-direction: column;
  padding-bottom: 10px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
