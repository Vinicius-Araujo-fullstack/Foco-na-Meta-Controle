import React, { memo } from "react"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import type { ReactNode } from "react"

interface DialogDeleteConfirmProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  texto?: string
  icon?: ReactNode
  isLoading?: boolean
}

// Constantes de estilo
const FONT_FAMILY = "Poppins, sans-serif"
const PRIMARY_COLOR = "#1F1F1F"
const SECONDARY_COLOR = "#8C8C8C"
const DANGER_COLOR = "#EF4444"
const DANGER_HOVER_COLOR = "#dc2626"
const WHITE_COLOR = "#FFFFFF"

const dialogPaperStyles = {
  width: "22.44vw",
  display: "flex",
  alignItems: "center",
  padding: "24px",
  borderRadius: "12px",
  backgroundColor: WHITE_COLOR,
  border: "0.75px solid #E2E8F0",
  gap: "16px",
} as const

const dialogContentStyles = {
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

const descriptionTextStyles = {
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
  flexDirection: "column" as const,
  gap: "12px",
  padding: 0,
} as const

const baseButtonStyles = {
  width: "90%",
  height: "52px",
  borderRadius: "12px",
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
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
} as const

const confirmButtonStyles = {
  ...baseButtonStyles,
  background: DANGER_COLOR,
  color: WHITE_COLOR,
  "&:hover": {
    backgroundColor: DANGER_HOVER_COLOR,
  },
} as const

const loadingSpinnerStyles = {
  size: 16,
  sx: {
    ml: 1,
    color: WHITE_COLOR,
  },
} as const

const DialogDeleteConfirm: React.FC<DialogDeleteConfirmProps> = memo(
  ({ open, onClose, onConfirm, texto = "item", icon, isLoading = false }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        keepMounted
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{ sx: dialogPaperStyles }}
      >
        {icon && <DialogTitle sx={{ padding: 0 }}>{icon}</DialogTitle>}

        <DialogContent sx={dialogContentStyles}>
          <DialogContentText id="delete-dialog-title" sx={titleTextStyles}>
            Deseja excluir este {texto}?
          </DialogContentText>

          <DialogContentText
            id="delete-dialog-description"
            sx={descriptionTextStyles}
          >
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={dialogActionsStyles}>
          <Button
            onClick={onClose}
            disabled={isLoading}
            sx={cancelButtonStyles}
          >
            Cancelar
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isLoading}
            sx={confirmButtonStyles}
          >
            {isLoading ? (
              <>
                Excluindo...
                <CircularProgress {...loadingSpinnerStyles} />
              </>
            ) : (
              "Confirmar exclusão"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)

DialogDeleteConfirm.displayName = "DialogDeleteConfirm"

export default DialogDeleteConfirm
