import styled from "styled-components";

export const EditorWrapper = styled.div<{ hasError?: boolean }>`
  width: 100%;
  text-align: left;

  .ql-toolbar {
    border-radius: 8px 8px 0 0;
    background-color: #f9f9f9;
  }

  .ql-container {
    border-radius: 0 0 8px 8px;
    min-height: 200px;
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: 1rem;
  }

  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border: 1px solid
      ${(props) => (props.hasError ? "#E53E3E" : "#ccc")}; // vermelho se erro
  }
`;
