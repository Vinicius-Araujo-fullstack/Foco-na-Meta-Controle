import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

type InputUserProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputUser = ({ value, onChange }: InputUserProps) => {
  const theme = useTheme();
  return (
    <Box component="div" sx={{ width: "100%", display: "flex" }}>
      <TextField
        sx={{
          width: "100%",
          height: "52px",
          "& .MuiOutlinedInput-root": {
            fontSize: "1rem",
            fontFamily: theme.fonts.primary,

            "& fieldset": {
              border: `solid 0.75px ${theme.colors.gray0}`,
              borderRadius: "12px",
            },
            "&:hover fieldset": {
              borderColor: theme.colors.gray0,
            },
            "&.Mui-focused fieldset": {
              border: "solid 0.75px #0a41f3",
            },
          },

          "& .MuiInputLabel-root": {
            color: theme.colors.gray3,
            fontSize: "1rem",
            fontWeight: 400,
            fontFamily: theme.fonts.primary,
            "&.Mui-focused": {
              color: "#0a41f3",
              fontSize: "1rem",
              fontWeight: 400,
            },
          },
        }}
        id="outlined-basic"
        label="Usuário"
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default InputUser;
