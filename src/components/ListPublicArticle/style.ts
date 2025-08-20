import styled from "styled-components";

export const divCustom = styled.div`
display: flex;

`

export const Title = styled.h2`
font-size: 1rem;
color: #8C8C8C;
text-align: left;
font-weight: 500;
`

export const Flex = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem; /* opcional, evita corte na rolagem */
  scrollbar-width: thin; /* Firefox */
  -webkit-overflow-scrolling: touch; /* iOS scroll suave */
`;
