// ------------- REVISADO -------------

import * as React from "react";
import { useContext } from "react";
import { ContextDialogController } from "../../../context/context.ts";
import { IDialogController } from "../../../interfaces/index.ts";
import { IconCustomDialog } from "./style.ts";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";

const DialogSucess: React.FC<IDialogController> = ({
  title,
  textButton,
  icon,
  returnPage,
  setInternalPageControl,
}) => {
  const { open = false, setOpen } = useContext(ContextDialogController);
  const navigate = useNavigate();

  const handleClose = () => {
    if (returnPage == "true") {
      navigate("/controle");
      setOpen?.(false);
      setInternalPageControl?.("lista");
    } else {
      setOpen?.(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: "22.44vw",
            display: "flex",
            alignItems: "center",
            margin: "0px",
            padding: "24px",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            border: "0.75px solid #E2E8F0",
            gap: "16px",
          },
        }}
      >
        <DialogTitle sx={{ padding: "0px" }}>
          <IconCustomDialog src={icon} />
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "0px",
            padding: "0px",
          }}
        >
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.75rem",
              fontWeight: "600",
              textAlign: "center",
              color: " #1F1F1F",
              marginBottom: "18px",
            }}
          >
            {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            alignItems: "center",
            margin: "0px",
            padding: "0px",
          }}
        >
          <Button
            sx={{
              width: "90%",
              height: "52px",
              background: "#0783FF",
              borderRadius: "12px",
              padding: "0 24px",
              color: "#FFFFFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.125rem",
              fontWeight: "500",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
            }}
            onClick={handleClose}
          >
            {textButton}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogSucess;
