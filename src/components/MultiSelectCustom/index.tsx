/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IDropDownCustomProps } from "../../interfaces";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

interface SelectCustomProps extends IDropDownCustomProps {
  onSelectionChange?: (selectedItems: any[]) => void;
}

const MultiSelectCustom: React.FC<SelectCustomProps> = ({
  label,
  placeholder = "Selecione",
  width = "300px",
  options = [],
  gapLabel = "16px",
  onSelectionChange,
  defaultValue = "",
  selectType,
  hasErrors,
  onlyId,
}) => {
  const allOptionIds = options.map((opt: any) => opt.ID);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const allSelected = selectedValues.length === allOptionIds.length;

  React.useEffect(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      const defaultValueIds = onlyId
        ? defaultValue.map((item: any) =>
            typeof item === "object" && item !== null && "ID" in item ? String(item.ID) : String(item)
          )
        : defaultValue.map((item: any) => (selectType === 4 ? item.ID : (item.evaluate_id ?? item.id)));
      setSelectedValues(defaultValueIds);
    } else {
      setSelectedValues([]);
    }
  }, [defaultValue, selectType, onlyId]);

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedValues([]);
      onSelectionChange?.([]);
    } else {
      setSelectedValues(allOptionIds);
      onSelectionChange?.([...options]);
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;

    if (typeof value !== "string" && value.includes("Todos")) return;

    const selected = typeof value === "string" ? value.split(",") : value;

    setSelectedValues(selected);

    onSelectionChange?.(selected);
  };

  //sytle list drop
  const ITEM_HEIGHT = 480;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        borderRadius: 12,
      },
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
  };
  const theme = useTheme();

  return (
    <Box sx={{ width }}>
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
            multiple
            displayEmpty
            value={selectedValues}
            onChange={handleChange}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
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
                  onClick={() => setOpen(false)}
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
                  onClick={() => setOpen(true)}
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
              if (selected.length === 0) {
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

              const selectedNames = options
                .filter((option: any) => selected.includes(option.ID))
                .map((option: any) => option.Nome || `ID ${option.ID}`);

              const MAX_DISPLAY = 2;
              const displayText =
                selectedNames.length > MAX_DISPLAY
                  ? `${selectedNames.slice(0, MAX_DISPLAY).join(", ")} +${selectedNames.length - MAX_DISPLAY}`
                  : selectedNames.join(", ");

              return displayText;
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
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
                border: hasErrors ? `1.5px solid red` : `0.75px solid ${theme.colors.gray0}`,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: hasErrors ? `1.5px solid red` : `0.75px solid ${theme.colors.gray0}`,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: hasErrors ? `1.5px solid red` : `0.75px solid ${theme.colors.gray0}`,
              },
              "& .MuiSelect-icon": { display: "none" },
            }}
          >
            {options.length > 0 && (
              <MenuItem
                value="Todos"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAll();
                }}
                sx={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: theme.colors.black,
                  fontSize: "1rem",
                  fontFamily: theme.fonts.primary,
                  padding: "8px 10px",
                  height: "40px",
                }}
              >
                {allSelected ? "Desmarcar todos" : "Selecionar todos"}
              </MenuItem>
            )}

            {options.map((option: any) => (
              <MenuItem
                key={option.ID}
                value={option.ID}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span>{option.Nome}</span>
                  {selectedValues.includes(option.ID) && (
                    <CheckIcon sx={{ fontSize: 20, color: theme.colors.primary }} />
                  )}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
};

export default MultiSelectCustom;
