import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";

type InputPasswordProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPassword = ({ value, onChange }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const theme = useTheme();
  return (
    <FormControl
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
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Senha"
      />
    </FormControl>
  );
};

export default InputPassword;
