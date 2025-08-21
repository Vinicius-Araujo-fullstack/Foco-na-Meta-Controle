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
import { ContextDialogController } from "../../../context/context.ts"
import { IDialogController } from "../../../interfaces/index.ts"
import { IconCustomDialog } from "./style.ts"

// Constantes de estilo
const FONT_FAMILY = "Poppins, sans-serif"
const PRIMARY_COLOR = "#1F1F1F"
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
} as const

const titleTextStyles = {
  fontFamily: FONT_FAMILY,
  fontSize: "1.75rem",
  fontWeight: 600,
  textAlign: "center" as const,
  color: PRIMARY_COLOR,
  marginBottom: "18px",
} as const

const dialogActionsStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
  alignItems: "center",
  margin: 0,
  padding: 0,
} as const

const buttonStyles = {
  width: "90%",
  height: "52px",
  background: BLUE_COLOR,
  borderRadius: "12px",
  padding: "0 24px",
  color: WHITE_COLOR,
  fontFamily: FONT_FAMILY,
  fontSize: "1.125rem",
  fontWeight: 500,
  "&:focus, &:active": {
    outline: "none",
    boxShadow: "none",
  },
} as const

const DialogSuccess: React.FC<IDialogController> = memo(
  ({ title, textButton, icon, returnPage, setInternalPageControl }) => {
    const { open = false, setOpen } = useContext(ContextDialogController)
    const navigate = useNavigate()

    const handleClose = useCallback(() => {
      if (returnPage === "true") {
        navigate("/controle")
        setOpen?.(false)
        setInternalPageControl?.("lista")
      } else {
        setOpen?.(false)
      }
    }, [returnPage, navigate, setOpen, setInternalPageControl])

    return (
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="success-dialog-description"
        PaperProps={{ sx: dialogPaperStyles }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <IconCustomDialog src={icon} alt="Success icon" />
        </DialogTitle>

        <DialogContent sx={dialogContentStyles}>
          <DialogContentText
            id="success-dialog-description"
            sx={titleTextStyles}
          >
            {title}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={dialogActionsStyles}>
          <Button sx={buttonStyles} onClick={handleClose}>
            {textButton}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)

DialogSuccess.displayName = "DialogSuccess"

export default DialogSuccess
