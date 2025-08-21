import React, { memo } from "react"
import { Button, CircularProgress, Tooltip } from "@mui/material"
import { IloginAction } from "../../interfaces/index.ts"

// Estilos extraídos como constantes para evitar recriação
const buttonBaseStyles = {
  color: "#FFFF",
  width: "286px",
  height: "52px !important",
  fontFamily: "Poppins,sans-serif !important",
  fontSize: "1.125rem !important",
  fontWeight: 500,
  letterSpacing: "normal",
  lineHeight: "28px",
  border: "none !important",
  padding: "24px !important",
  borderRadius: "12px",
  textTransform: "none !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:focus, &:active": {
    outline: "none",
    boxShadow: "none",
  },
}

const loadingIndicatorStyles = {
  width: "30px !important",
  height: "30px !important",
  color: "#FFFF",
  margin: "0px 8px",
}

const ButtonSaveCustom: React.FC<IloginAction> = memo(
  ({ open = false, text, disabled = false, handleClick }) => {
    // Computação inline simples - mais eficiente que useState + useEffect
    const backgroundColor = disabled ? "#A5F0C1" : "#00D247"
    const tooltipTitle = disabled ? "Preencha os campos obrigatórios" : ""

    return (
      <Tooltip title={tooltipTitle} arrow placement="top">
        <Button
          onClick={handleClick}
          loading={open}
          disableElevation
          variant="contained"
          sx={{
            ...buttonBaseStyles,
            backgroundColor,
          }}
          loadingIndicator={<CircularProgress sx={loadingIndicatorStyles} />}
        >
          {text}
        </Button>
      </Tooltip>
    )
  }
)

// Adiciona displayName para facilitar debugging
ButtonSaveCustom.displayName = "ButtonSaveCustom"

export default ButtonSaveCustom
