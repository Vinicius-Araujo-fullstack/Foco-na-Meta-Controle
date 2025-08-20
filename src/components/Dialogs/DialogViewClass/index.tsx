/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
// import { ContextDialogViewClass } from "../../../context/context.ts";
import { IDialogController } from "../../../interfaces/index.ts";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DivHeader, DivList } from "./style.ts";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogViewClass: React.FC<IDialogController> = ({
  turma,
  schoolName,
  students = [],
}) => {
  const [open, setOpen] = useState(false);

  // const { openViewClass = false, setOpenViewClass } = useContext(
  //   ContextDialogViewClass
  // );

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          " &:focus": {
            outline: "none",
            boxShadow: "none",
          },

          "&:hover": {
            outline: "none",
            boxShadow: "none",
          },
          "&:active": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-within": {
            outline: "none",
            boxShadow: "none",
          },

          "&:disabled:hover": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        <VisibilityIcon sx={{ width: 20, height: 20, color: "#1F1F1F" }} />
      </IconButton>

      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: "31.25vw",
            height: "512px",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            bgcolor: "#FFFFFF",
            gap: "40px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            w: "100%",
            p: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <DivHeader>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                lineHeight: "30px",
                color: "#323232",
              }}
            >
              {turma}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#A7A7A7",
              }}
            >
              {schoolName}
            </Typography>
          </DivHeader>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <CloseIcon
              sx={{
                color: "#323232",
              }}
            />
          </IconButton>
        </DialogTitle>

        <>
          <DivList>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                "&.MuiDialogContent-root": {
                  padding: 0,
                },
              }}
            >
              {students &&
                students.length > 0 &&
                students.map((student, index) => (
                  <Typography
                    key={index}
                    sx={{
                      height: "60px",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "0.87rem",
                      fontWeight: 500,
                      color: "#323232",
                      borderBottom: "0.75px solid #E2E8F0",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    {student?.name}
                  </Typography>
                ))}
            </DialogContent>
          </DivList>
        </>
      </BootstrapDialog>
    </>
  );
};

export default DialogViewClass;
