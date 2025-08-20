import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IloginAction } from "../../interfaces/index.ts";
import { Tooltip } from "@mui/material";

const ButtoSaveCustom: React.FC<IloginAction> = ({
  open = false,
  text,
  disabled = false,
  handleClick,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(open);
  }, [open]);

  return (
    <Tooltip
      title={disabled ? "Preencha os campos obrigatórios" : ""}
      arrow
      placement="top"
    >
      <Button
        onClick={handleClick}
        loading={loading}
        disableElevation
        variant="contained"
        // disabled={disabled}
        sx={{
          backgroundColor: disabled ? "#A5F0C1" : "#00D247",
          color: "#FFFF",
          width: "286px",
          height: "52px !important",
          fontFamily: "Poppins,sans-serif !important",
          fontSize: "1.125rem !important",
          fontWeight: 500,
          letterSpacing: "normal ",
          lineHeight: "28px",
          border: "none !important",
          padding: "24px !important",
          borderRadius: "12px",
          textTransform: "none !important",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },

          "&:active": {
            outline: "none",
            boxShadow: "none",
          },
        }}
        loadingIndicator={
          <CircularProgress
            sx={{
              width: "30px !important",
              height: "30px !important",
              color: "#FFFF",
              margin: "0px 8px",
            }}
          />
        }
      >
        {text}
      </Button>
    </Tooltip>
  );
};

export default ButtoSaveCustom;
