import styled from "styled-components";

interface TextLegendProps {
    type: 'Publicado' | 'Aguardando';
}

const backgroundColors = {
    Publicado:'#00b908',
    Aguardando: '#FCC211',
}

export const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const TextLegend = styled.p<TextLegendProps>`
  font-size: 0.7rem;
  border-radius: 50px;
  color: white;
  padding: 2px 8px;
  background-color: ${({ type }) => backgroundColors[type] || '#FFF'};
`;

export const TitleArticle = styled.h2`
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  `;

export const TextCard = styled.p`
    text-align: left;
  font-size: 0.8rem;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  display: block;
  background-color: #f5f5f5; /* opcional, evita fundo branco feio */
`;

export const TextDate = styled.p`
text-align: left;
  font-size: 0.8rem;
  color: #bfbfbf;
`;
