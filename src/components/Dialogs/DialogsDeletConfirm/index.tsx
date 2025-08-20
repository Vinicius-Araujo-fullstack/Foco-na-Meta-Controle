import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface DialogDeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  texto?: string; // ex: "simulado", "avaliação"
  icon?: ReactNode; // opcional: ícone customizável
  isLoading?: boolean;
}

const DialogDeleteConfirm = ({ open, onClose, onConfirm, texto, icon, isLoading }: DialogDeleteConfirmProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      PaperProps={{
        sx: {
          width: "22.44vw",
          display: "flex",
          alignItems: "center",
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
          border: "0.75px solid #E2E8F0",
          gap: "16px",
        },
      }}
    >
      {icon && <DialogTitle sx={{ padding: 0 }}>{icon}</DialogTitle>}

      <DialogContent
        sx={{
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <DialogContentText
          id="delete-dialog-title"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.75rem",
            fontWeight: "600",
            textAlign: "center",
            color: "#1F1F1F",
          }}
        >
          Deseja excluir este {texto}?
        </DialogContentText>

        <DialogContentText
          id="delete-dialog-description"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "1rem",
            fontWeight: "400",
            textAlign: "center",
            color: "#1F1F1F",
            marginBottom: "18px",
          }}
        >
          Esta ação não poderá ser desfeita.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: 0,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            width: "90%",
            height: "52px",
            background: "transparent",
            borderRadius: "12px",
            color: "#8C8C8C",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.125rem",
            fontWeight: "500",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={onConfirm}
          
          sx={{
            width: "90%",
            height: "52px",
            background: "#EF4444",
            borderRadius: "12px",
            color: "#FFFFFF",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.125rem",
            fontWeight: "500",
            "&:hover": { backgroundColor: "#dc2626" },
          }}
        >
        {isLoading ? <CircularProgress size={16} sx={{ ml: 1 }} /> : "Confirmar exclusão"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeleteConfirm;
