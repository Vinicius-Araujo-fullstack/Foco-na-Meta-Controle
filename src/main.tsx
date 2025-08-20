import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { mainTheme } from "./theme/theme.ts";
import { themeMui } from "./theme/MuiTheme/theme.ts";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import "./index.css";
import App from "./App.tsx";
import { ContextProvider } from "./context/index.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <MUIThemeProvider theme={themeMui}>
          <StyledThemeProvider theme={mainTheme}>
            <App />
          </StyledThemeProvider>
        </MUIThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
