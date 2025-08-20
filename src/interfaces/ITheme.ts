declare module "@mui/material/styles" {
    interface Theme {
      fonts: {
        primary: string;
      };
      colors: {
        primary: string;
        secondary: string;
        black: string;
        gray5: string;
        gray4: string;
        gray3: string;
        gray2: string;
        gray1: string;
        gray0: string;
        white: string;
        feedback: {
          negative: string;
          warning: string;
          success: string;
          information: string;
        };
      };
      buttonColors: {
        classPageButton: string;
        reviewsPageButton: string;
        simulatedPageButton: string;
        notificationsPageButton: string;
        articlesPageButton: string;
        transparentButton: string;
        
      };
      bgColorIcon:{
          BackGroundIconColor:string;
      }
    }
  
    interface ThemeOptions {
      fonts?: Theme["fonts"];
      buttonColors?: Theme["buttonColors"];
      colors?: Theme["colors"];
      bgColorIcon?: Theme["bgColorIcon"];
    }
  }