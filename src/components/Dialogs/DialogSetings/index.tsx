import React, { memo, useCallback, useState } from "react"
import { Button, IconButton, Popover } from "@mui/material"
import {
  Delete,
  Edit,
  FileDownloadOff,
  FileUpload,
  MoreVert,
} from "@mui/icons-material"
import { IDialogController } from "../../../interfaces/index.ts"
import DialogDeleteConfirm from "../DialogsDeletConfirm/index.tsx"

// Constantes de estilo
const FONT_FAMILY = "Poppins, sans-serif"
const PRIMARY_COLOR = "#1F1F1F"
const HOVER_COLOR = "#F5F5F5"

const iconButtonStyles = {
  "&:focus, &:active": {
    outline: "none",
    boxShadow: "none",
  },
} as const

const popoverPaperStyles = {
  display: "flex",
  flexDirection: "column" as const,
  padding: "4px",
  borderRadius: "8px",
  marginTop: "-33px",
} as const

const baseButtonStyles = {
  background: "transparent",
  textTransform: "none" as const,
  color: PRIMARY_COLOR,
  fontSize: "1rem",
  fontFamily: FONT_FAMILY,
  padding: "4px 16px",
  height: "36px",
  boxShadow: "none",
  display: "flex",
  justifyContent: "flex-start",
  gap: "4px",
  "&:hover": {
    outline: "none",
    boxShadow: "none",
    background: HOVER_COLOR,
  },
  "&:active": {
    outline: "none",
    boxShadow: "none",
  },
} as const

const wideButtonStyles = {
  ...baseButtonStyles,
  width: "156px",
} as const

interface PopoverAction {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  show: boolean
  width?: string
}

const DialogSettings: React.FC<IDialogController> = memo(
  ({
    buttonPublish = true,
    buttonRemovePost = true,
    buttonDelete = true,
    buttonEdit = true,
    refInfo,
    setInternalPageControl,
    setFunction,
    textModal,
    funcConfirmDelete,
    openDelet,
    setOpenDelet,
    isLoading,
  }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }, [])

    const handleClose = useCallback(() => {
      if (!isLoading) {
        setAnchorEl(null)
      }
    }, [isLoading])

    const handleEditClick = useCallback(() => {
      setInternalPageControl?.("editar")
      setFunction?.(refInfo ?? null)
      setAnchorEl(null)
    }, [setInternalPageControl, setFunction, refInfo])

    const handleDeleteClick = useCallback(() => {
      funcConfirmDelete?.()
      setTimeout(() => {
        setOpenDelet?.(false)
        setAnchorEl(null)
      }, 500)
    }, [funcConfirmDelete, setOpenDelet])

    const handleOpenDeleteDialog = useCallback(() => {
      setOpenDelet?.(true)
    }, [setOpenDelet])

    const handleCloseDeleteDialog = useCallback(() => {
      setOpenDelet?.(false)
    }, [setOpenDelet])

    // Configuração das ações do popover
    const actions: PopoverAction[] = [
      {
        id: "remove-post",
        label: "Remover publicação",
        icon: <FileDownloadOff sx={{ transform: "rotate(180deg)" }} />,
        show: buttonRemovePost,
      },
      {
        id: "publish",
        label: "Publicar",
        icon: <FileUpload />,
        show: buttonPublish,
      },
      {
        id: "edit",
        label: "Editar",
        icon: <Edit />,
        onClick: handleEditClick,
        show: buttonEdit,
        width: "156px",
      },
      {
        id: "delete",
        label: "Excluir",
        icon: <Delete />,
        onClick: handleOpenDeleteDialog,
        show: buttonDelete,
        width: "156px",
      },
    ]

    const visibleActions = actions.filter((action) => action.show)

    return (
      <>
        <IconButton onClick={handleClick} sx={iconButtonStyles}>
          <MoreVert />
        </IconButton>

        <Popover
          id={open ? "settings-popover" : undefined}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: { sx: popoverPaperStyles },
          }}
        >
          {visibleActions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={action.icon}
              disableRipple
              disableElevation
              sx={action.width ? wideButtonStyles : baseButtonStyles}
            >
              {action.label}
            </Button>
          ))}
        </Popover>

        <DialogDeleteConfirm
          open={openDelet || false}
          isLoading={isLoading || false}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteClick}
          texto={textModal}
        />
      </>
    )
  }
)

DialogSettings.displayName = "DialogSettings"

export default DialogSettings
