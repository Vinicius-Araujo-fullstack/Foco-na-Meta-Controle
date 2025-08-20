// ------------- REVISADO -------------

import * as React from "react";
import { IDialogController } from "../../../interfaces/index.ts";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DialogDeleteConfirm from "../DialogsDeletConfirm/index.tsx";

const DialogSetings: React.FC<IDialogController> = ({
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  console.log(openDelet)
  const handleEditClick = () => {
    setInternalPageControl?.("editar");
    setFunction?.(refInfo ?? null);
    setAnchorEl(null);
  };
  const handleDeletClick = () => {
    funcConfirmDelete();
    setTimeout(() => {
      setOpenDelet(false)
      setAnchorEl(null);
    }, 500);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (!isLoading) setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          " &:focus": {
            outline: "none",
            boxShadow: "none",
          },

          "&:active": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
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
          paper: {
            sx: {
              display: "flex",
              flexDirection: "column",
              padding: "4px",
              borderRadius: "8px",
              marginTop: "-33px",
            },
          },
        }}
      >
        {/* botão de remover publicação */}
        {buttonRemovePost == true ? (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FileDownloadOffIcon sx={{ transform: "rotate(180deg)" }} />}
            disableRipple
            disableElevation
            sx={{
              background: "transparent",
              textTransform: "none",
              color: "#1F1F1F",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              padding: "4px 16px",

              height: "36px",
              boxShadow: "none",
              display: "flex",
              justifyContent: "start",
              gap: "4px",

              "&:hover": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Remover publicação
          </Button>
        ) : null}

        {/* botão de Publicar */}
        {buttonPublish == true ? (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FileUploadIcon />}
            disableRipple
            disableElevation
            sx={{
              background: "transparent",
              textTransform: "none",
              color: "#1F1F1F",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              padding: "4px 16px",

              height: "36px",
              boxShadow: "none",
              display: "flex",
              justifyContent: "start",
              gap: "4px",

              "&:hover": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Publicar
          </Button>
        ) : null}

        {/* botão de Editar */}
        {buttonEdit == true ? (
          <Button
            onClick={handleEditClick}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<EditIcon />}
            disableRipple
            disableElevation
            sx={{
              background: "transparent",
              textTransform: "none",
              color: "#1F1F1F",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              padding: "4px 16px",
              width: "156px",
              height: "36px",
              boxShadow: "none",
              display: "flex",
              justifyContent: "start",
              gap: "4px",

              "&:hover": {
                outline: "none",
                boxShadow: "none",
                background: "#F5F5F5",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Editar
          </Button>
        ) : null}

        {/* botão de Deletar */}
        {buttonDelete == true ? (
          <Button
            onClick={() => {
              setOpenDelet(true);
            }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<DeleteIcon />}
            disableRipple
            disableElevation
            sx={{
              background: "transparent",
              textTransform: "none",
              color: "#1F1F1F",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              padding: "4px 16px",
              width: "156px",
              height: "36px",
              boxShadow: "none",
              display: "flex",
              justifyContent: "start",
              gap: "4px",

              "&:hover": {
                outline: "none",
                boxShadow: "none",
                background: "#F5F5F5",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Excluir
          </Button>
        ) : null}
        <DialogDeleteConfirm
          open={openDelet}
          isLoading={isLoading}
          onClose={() => setOpenDelet(false)}
          onConfirm={() => {
            handleDeletClick();
            // setOpenDelet(false);
            // isLoading ?setAnchorEl(null);
          }}
          texto={textModal}
        />
      </Popover>
    </>
  );
};

export default DialogSetings;
