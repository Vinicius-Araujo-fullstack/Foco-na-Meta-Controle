import React, { memo, useCallback, useContext } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ContextLogOutController } from "../../../context/context.ts"
import IconDialog from "../../../assets/IconLogOutDialog/Frame 5569.svg"
import { IconCustomDialog } from "./style.ts"

// Constantes de estilo extraídas
const FONT_FAMILY = "Poppins, sans-serif"
const PRIMARY_COLOR = "#1F1F1F"
const SECONDARY_COLOR = "#8C8C8C"
const BLUE_COLOR = "#0783FF"
const WHITE_COLOR = "#FFFFFF"

const dialogPaperStyles = {
  width: "22.44vw",
  display: "flex",
  alignItems: "center",
  margin: 0,
  padding: "24px",
  borderRadius: "12px",
  backgroundColor: WHITE_COLOR,
  border: "0.75px solid #E2E8F0",
  gap: "16px",
} as const

const dialogContentStyles = {
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column" as const,
  gap: "8px",
} as const

const titleTextStyles = {
  fontFamily: FONT_FAMILY,
  fontSize: "1.75rem",
  fontWeight: 600,
  textAlign: "center" as const,
  color: PRIMARY_COLOR,
} as const

const subtitleTextStyles = {
  fontFamily: FONT_FAMILY,
  fontSize: "1rem",
  fontWeight: 400,
  textAlign: "center" as const,
  color: PRIMARY_COLOR,
  marginBottom: "18px",
} as const

const dialogActionsStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: 0,
  marginTop: "20px",
  alignItems: "center",
  margin: 0,
  padding: 0,
} as const

const baseButtonStyles = {
  width: "90%",
  height: "52px",
  borderRadius: "12px",
  padding: "0 24px",
  fontFamily: FONT_FAMILY,
  fontSize: "1.125rem",
  fontWeight: 500,
  "&:focus, &:active": {
    outline: "none",
    boxShadow: "none",
  },
} as const

const cancelButtonStyles = {
  ...baseButtonStyles,
  background: "transparent",
  color: SECONDARY_COLOR,
} as const

const confirmButtonStyles = {
  ...baseButtonStyles,
  background: BLUE_COLOR,
  color: WHITE_COLOR,
  margin: 0,
} as const

const DialogLogOut: React.FC = memo(() => {
  const { openLogOut = false, setOpenLogOut } = useContext(
    ContextLogOutController
  )
  const navigate = useNavigate()

  const handleLogOut = useCallback(() => {
    navigate("/")
    setOpenLogOut?.(false)
  }, [navigate, setOpenLogOut])

  const handleClose = useCallback(() => {
    setOpenLogOut?.(false)
    navigate("/controle")
  }, [navigate, setOpenLogOut])

  return (
    <Dialog
      open={openLogOut}
      keepMounted
      disableEscapeKeyDown
      aria-describedby="logout-dialog-description"
      PaperProps={{ sx: dialogPaperStyles }}
    >
      <DialogTitle sx={{ padding: 0 }}>
        <IconCustomDialog src={IconDialog} alt="Logout icon" />
      </DialogTitle>

      <DialogContent sx={dialogContentStyles}>
        <DialogContentText id="logout-dialog-description" sx={titleTextStyles}>
          Tem certeza que deseja sair?
        </DialogContentText>

        <DialogContentText sx={subtitleTextStyles}>
          Para retornar, faça o login novamente.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={dialogActionsStyles}>
        <Button sx={cancelButtonStyles} onClick={handleClose}>
          Fechar
        </Button>

        <Button sx={confirmButtonStyles} onClick={handleLogOut}>
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  )
})

DialogLogOut.displayName = "DialogLogOut"

export default DialogLogOut
