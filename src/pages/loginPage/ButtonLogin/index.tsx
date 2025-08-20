/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const ButtonLogin = ({ handleClick, loading }: any) => {
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  // const handleClick = () => {
  //   setLoading(true);
  //   setTimeout(() => navigate("/controle"), 2000); // Simula um carregamento
  // };
  const theme = useTheme();
  return (
    <Button
      onClick={handleClick}
      loading={loading}
      loadingPosition="start"
      type="submit"
      sx={{
        height: "52px",
        backgroundColor: "#0094FF",
        borderRadius: "12px",
        fontFamily: theme.fonts.primary,
        fontSize: "1.12rem",
        fontWeight: "500",
        textTransform: "none",
        color: theme.colors.white,
        "&:hover": {
          backgroundColor: "#007ACC",
        },
        "&:active": { outline: "none", boxshadow: "none" },
        "&.MuiButton-loading": {
          backgroundColor: "#c8c8d1",
          color: theme.colors.white,
        },
        "&.MuiButton-loading .MuiButton-loadingIndicator": {
          color: theme.colors.white,
        },
      }}
      fullWidth
      variant="outlined"
    >
      Entrar
    </Button>
  );
};

export default ButtonLogin;
