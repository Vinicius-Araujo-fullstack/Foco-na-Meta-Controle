import { createTheme } from "@mui/material/styles";

export const themeMui = createTheme({
    fonts: {
      primary: "'Poppins', sans-serif",
    },
    colors: {
      primary: "#00D247",
      secondary: "#0783FF",
      black: "#1F1F1F",
      gray5: "#BFBFBF",
      gray4: "#323232",
      gray3: "#8C8C8C",
      gray2: "#D9D9D9",
      gray1: "#F5F5F5",
      gray0: "#E2E8F0",
      white: "#FFFFFF",
      feedback: {
        negative: "#E60000",
        warning: "#FFCD07",
        success: "#168821",
        information: "#155BCB",
      },
    },
    buttonColors: {
      classPageButton: "#FFA500",
      reviewsPageButton: "#FF4500",
      simulatedPageButton: "#1E90FF",
      notificationsPageButton: "#FFD700",
      articlesPageButton: "#32CD32",
      transparentButton: "transparent",
    },
  });
  