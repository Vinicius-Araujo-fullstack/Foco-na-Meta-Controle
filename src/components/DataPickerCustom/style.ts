import styled from "styled-components"

// Constantes para reutilização
const FONT_FAMILY = "Poppins, sans-serif"
const BORDER_RADIUS = "12px"
const TEXT_COLOR = "#8C8C8C"
const BACKGROUND_COLOR = "#FFFFFF"

export const SortByDate = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 16px;
  font-family: ${FONT_FAMILY};
  font-size: 1rem;
  font-weight: 400;
  color: ${TEXT_COLOR};
  background: ${BACKGROUND_COLOR};
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
`

export const ContentSortByDate = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
