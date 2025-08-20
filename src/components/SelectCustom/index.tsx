/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IDropDownCustomProps } from "../../interfaces";
import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";

interface SelectCustomProps extends IDropDownCustomProps {
  onSelectChange?: (value: string | null) => void;
  InternalPageControl?: string;
  hasErrors?: boolean;
}

const SelectCustom: React.FC<SelectCustomProps> = ({
  width,
  options = [],
  placeholder = "Selecione",
  label,
  gapLabel = "16px",
  onSelectChange,
  selectType,
  defaultValue,
  hasErrors,
  InternalPageControl,
}) => {
  //sytle list drop
  const ITEM_HEIGHT = 480;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        borderRadius: 12,
      },
      sx: {
        "& .MuiList-root": {
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          maxHeight: "180px",
          "  &::-webkit-scrollbar": {
            width: "4px",
          },
        },
      },
    },
  } as const;

  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : null
  );

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setSelectedValue(String(defaultValue));
    } else {
      setSelectedValue(null);
    }
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const {
      target: { value },
    } = event;

    // Alterna: se o valor atual já estiver selecionado, limpa; caso contrário, define o novo valor
    const newValue = selectedValue === value ? null : value;
    setSelectedValue(newValue);

    // Chama o callback para expor o valor selecionado, se definido
    onSelectChange?.(newValue);
  };

  const [open, setOpen] = useState(false);

  const theme = useTheme();

  return (
    <Box width={{ width }}>
      <FormControl sx={{ width }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: gapLabel }}>
          {label && (
            <Typography
              sx={{
                fontFamily: theme.fonts.primary,
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "27px",
                textAlign: "start",
              }}
            >
              {label}:
            </Typography>
          )}
          <Select
            error={!!hasErrors}
            value={selectedValue || ""}
            onChange={handleChange}
            displayEmpty
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => setOpen(false)}
            disabled={options.length === 0 || InternalPageControl === "editar"}
            endAdornment={
              open ? (
                <IconButton
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "center",
                    zIndex: "3000",
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },

                    "&:active": {
                      outline: " none",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => {
                    options.length > 0 && setOpen(false);
                  }}
                >
                  <ExpandLessIcon
                    sx={{
                      color: theme.colors.gray3,
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "center",
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },

                    "&:active": {
                      outline: " none",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => {
                    options.length > 0 && setOpen(true);
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      color: theme.colors.gray3,
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              )
            }
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography
                    sx={{
                      fontFamily: theme.fonts.primary,
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: "18px",
                      color: theme.colors.gray3,
                      textAlign: "start",
                    }}
                  >
                    {placeholder}
                  </Typography>
                );
              }
              if (selectType === 1) {
                const selectedOption = options.find(
                  (option) => option?.ID === Number(selected) || option?.ID === String(selected)
                );

                if (selectedOption && "Sigla" in selectedOption) {
                  return selectedOption.Sigla;
                }

                return "";
              }

              if (selectType === 0) {
                const selectedOption = options.find((option) => option?.ID === Number(selected) || option?.ID === selected.toString());

                if (selectedOption && "Cidade" in selectedOption) {
                  return selectedOption.Cidade;
                }

                return "";
              }

              if (selectType === 2) {
                const selectedOption = options.find((option) => option?.ID === Number(selected) || option?.ID === selected.toString());

                if (selectedOption && "Nome" in selectedOption) {
                  return selectedOption.Nome;
                }

                return "";
              }

              if (selectType === 3) {
                const selectedOption = options.find((option) => option?.ID === Number(selected));

                if (selectedOption && "net_series" in selectedOption) {
                  return `${selectedOption.net_series.Serie} ${selectedOption.net_tiposturma.Tipo} - ${selectedOption.net_turnos.Turno}`;
                }

                return "";
              }
              if (selectType === 4) {
                const selectedOption = options.find((option) => option?.ID === selected);

                if (selectedOption && "name" in selectedOption) {
                  return selectedOption.name;
                }

                return "";
              }
              if (selectType === 5) {
                const selectedOption = options.find(
                  (option) => option?.ID === selected || ("name" in option && option.name === selected)
                );
                if (selectedOption && "name" in selectedOption) {
                  return selectedOption.name;
                }
              }
            }}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            sx={{
              bgcolor: theme.colors.white,
              borderRadius: "12px",
              height: "52px",
              display: "flex",
              alignItems: "start",
              border: "none",
              paddingRight: "8px",

              "& .MuiSelect-select": {
                color: theme.colors.black,
                fontWeight: "400",
                fontSize: "1rem",
                fontFamily: theme.fonts.primary,
                textAlign: "start",
                lineHeight: "18px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: hasErrors ? "1px solid red" : `0.75px solid ${theme.colors.gray0}`,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: hasErrors ? "1px solid red" : `0.75px solid ${theme.colors.gray0}`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: hasErrors ? "1px solid red" : `0.75px solid ${theme.colors.gray0}`,
              },
              "& .MuiSelect-icon": { display: "none" },
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={index}
                value={selectType === 5 && "name" in option ? option.name : option.ID}
                disabled={option.disabled}
                sx={{
                  color: theme.colors.black,
                  fontWeight: "400",
                  fontSize: "1rem",
                  fontFamily: theme.fonts.primary,
                  textAlign: "start",
                  lineHeight: "18px",
                  padding: "8px 10px",
                  margin: 0,
                  height: "40px",
                }}
              >
                {selectType === 1 && "Sigla" in option ? option.Sigla : ""}
                {selectType === 0 && "Cidade" in option ? option.Cidade : ""}
                {selectType === 2 && "Nome" in option ? option.Nome : ""}
                {selectType === 3 && "net_series" in option
                  ? `${option.net_series.Serie} ${option.net_tiposturma.Tipo} - ${option.net_turnos.Turno}`
                  : ""}
                {selectType === 4 && "name" in option ? option.name : ""}
                {selectType === 5 && "name" in option ? option.name : ""}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
};
export default SelectCustom;
