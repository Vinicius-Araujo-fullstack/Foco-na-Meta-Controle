import { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconDialog from "../../../assets/IconLogOutDialog/Frame 5569.svg";
import { IconCustomDialog } from "./style.ts";
import { ContextLogOutController } from "../../../context/context.ts";
import { useNavigate } from "react-router-dom";

const DIalogLogOut = () => {
  const { openLogOut = false, setOpenLogOut } = useContext(
    ContextLogOutController
  );
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
    setOpenLogOut?.(false);
  };
  const handleClose = () => {
    setOpenLogOut?.(false);
    navigate("/controle");
  };
  return (
    <>
      <Dialog
        open={openLogOut}
        keepMounted
        disableEscapeKeyDown
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
          <IconCustomDialog src={IconDialog} />
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "0px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "8px",
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
            }}
          >
            Tem certeza que deseja sair?
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1rem",
              fontWeight: "400",
              textAlign: "center",
              color: " #1F1F1F",
              marginBottom: "18px",
            }}
          >
            Para retornar, faça o login novamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "0px",
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
              background: "transparent",
              borderRadius: "12px",
              padding: "0 24px",
              color: " #8C8C8C",
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.125rem",
              fontWeight: "500",
              "&:focus": {
                outline: "none",
                boxShadow: "none", // Corrigido aqui
              },
              "&:active": {
                outline: "none",
                boxShadow: "none", // Corrigido aqui
              },
            }}
            onClick={handleClose}
          >
            Fechar
          </Button>
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
              margin: "0px",
              "&:focus": {
                outline: "none",
                boxShadow: "none", // Corrigido aqui
              },
              "&:active": {
                outline: "none",
                boxShadow: "none", // Corrigido aqui
              },
            }}
            onClick={handleLogOut}
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DIalogLogOut;
