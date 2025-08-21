import React, { memo, useCallback, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Close, Visibility } from "@mui/icons-material"
import { IDialogController } from "../../../interfaces/index.ts"
import { DivHeader, DivList } from "./style.ts"

// Constantes de estilo
const FONT_FAMILY = "Poppins, sans-serif"
const PRIMARY_COLOR = "#323232"
const SECONDARY_COLOR = "#A7A7A7"
const WHITE_COLOR = "#FFFFFF"

// Styled component otimizado
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

const iconButtonStyles = {
  "&:focus, &:active, &:hover, &:focus-visible, &:focus-within, &:disabled:hover":
    {
      outline: "none",
      boxShadow: "none",
    },
} as const

const dialogPaperStyles = {
  width: "31.25vw",
  height: "512px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column" as const,
  padding: "24px",
  bgcolor: WHITE_COLOR,
  gap: "40px",
  overflow: "hidden",
} as const

const dialogTitleStyles = {
  m: 0,
  w: "100%",
  p: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
} as const

const classNameStyles = {
  fontFamily: FONT_FAMILY,
  fontSize: "1.25rem",
  fontWeight: 600,
  lineHeight: "30px",
  color: PRIMARY_COLOR,
} as const

const schoolNameStyles = {
  fontFamily: FONT_FAMILY,
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: "24px",
  color: SECONDARY_COLOR,
} as const

const dialogContentStyles = {
  display: "flex",
  flexDirection: "column" as const,
  "&.MuiDialogContent-root": {
    padding: 0,
  },
} as const

const studentItemStyles = {
  height: "60px",
  fontFamily: FONT_FAMILY,
  fontSize: "0.87rem",
  fontWeight: 500,
  color: PRIMARY_COLOR,
  borderBottom: "0.75px solid #E2E8F0",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
} as const

interface Student {
  name: string
  [key: string]: any
}

const DialogViewClass: React.FC<IDialogController> = memo(
  ({ turma, schoolName, students = [] }) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = useCallback(() => {
      setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
      setOpen(false)
    }, [])

    const typedStudents = students as Student[]
    const hasStudents = typedStudents && typedStudents.length > 0

    return (
      <>
        <IconButton onClick={handleClickOpen} sx={iconButtonStyles}>
          <Visibility sx={{ width: 20, height: 20, color: PRIMARY_COLOR }} />
        </IconButton>

        <StyledDialog
          aria-labelledby="view-class-dialog-title"
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: dialogPaperStyles }}
        >
          <DialogTitle id="view-class-dialog-title" sx={dialogTitleStyles}>
            <DivHeader>
              <Typography sx={classNameStyles}>{turma}</Typography>
              <Typography sx={schoolNameStyles}>{schoolName}</Typography>
            </DivHeader>

            <IconButton
              aria-label="Fechar diálogo"
              onClick={handleClose}
              sx={iconButtonStyles}
            >
              <Close sx={{ color: PRIMARY_COLOR }} />
            </IconButton>
          </DialogTitle>

          <DivList>
            <DialogContent sx={dialogContentStyles}>
              {hasStudents ? (
                typedStudents.map((student, index) => (
                  <Typography
                    key={`student-${index}-${student.name}`}
                    sx={studentItemStyles}
                  >
                    {student.name}
                  </Typography>
                ))
              ) : (
                <Typography
                  sx={{
                    ...studentItemStyles,
                    justifyContent: "center",
                    color: SECONDARY_COLOR,
                    borderBottom: "none",
                  }}
                >
                  Nenhum aluno encontrado
                </Typography>
              )}
            </DialogContent>
          </DivList>
        </StyledDialog>
      </>
    )
  }
)

DialogViewClass.displayName = "DialogViewClass"

export default DialogViewClass
