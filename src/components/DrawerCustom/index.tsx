import * as React from "react";

import { IDrawerController } from "../../interfaces";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Main, DivHeader, Title, BoxDrops } from "./style.ts";
import IconeFIlter from "../../assets/IconFIlter/Vector.svg";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SelectCustom from "../SelectCustom/index.tsx";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

// Adiciona uma propriedade opcional para expor os filtros selecionados para o componente pai
interface DrawerCustomProps extends IDrawerController {
  onFiltersChange?: (filters: Record<number, string | null>) => void;
  onSearch?: (filters: {[key: string]: number}) => void; // NOVA PROP
}

const DrawerCustom: React.FC<DrawerCustomProps> = ({
  open,
  setOpen,
  selectOptions = [],
  onFiltersChange,
  onSearch,
}) => {
  // Estado para armazenar os valores selecionados de cada SelectCustom
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFilters, setSelectedFilters] = useState<Record<number, string | null>>({});

  const handleSelectChange = (index: number, value: string | null) => {
    setSelectedFilters((prev) => {
      // Se o valor para esse índice não mudou, retorna o estado anterior
      if (prev[index] === value) {
        return prev;
      }
      const updated = { ...prev, [index]: value };
      onFiltersChange?.(updated);
      return updated;
    });
  };

  const closeDrawer = () => () => {
    setOpen(false);
  };

  const [resetFilters, setResetFilters] = useState(false);

  const handleClearFilters = () => {
    setResetFilters((prev) => !prev); // Alterna o estado para forçar o reset
    setSelectedFilters({}); // Limpa os filtros selecionados
    onFiltersChange?.({}); // Expondo os filtros limpos para o pai, se necessário
    setTimeout(() => setResetFilters(false), 500);
  };

  const theme = useTheme();

  return (
    <Drawer
      open={open}
      onClose={closeDrawer()}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          width: "25vw",
          boxShadow: "none",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "32px",
        },
      }}
    >
      <Main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          <DivHeader>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <img src={IconeFIlter} alt="Icone tune filtro" />
              <Title>Filtro</Title>
            </Box>

            <IconButton
              onClick={closeDrawer()}
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&:active": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&:hover": {
                  outline: "none",
                  boxShadow: "none",
                  bgcolor: "transparent",
                },
              }}
            >
              <CloseIcon sx={{ color: theme.colors.black }} />
            </IconButton>
          </DivHeader>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <BoxDrops>
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                  width: "100%",
                }}
              >
                <SelectCustom
                  width="122px"
                  label={selectOptions[1]?.label}
                  options={selectOptions[1]?.options}
                  placeholder={selectOptions[1]?.placeholder}
                  reset={resetFilters}
                  onSelectChange={(value) => handleSelectChange(1, value)}
                  selectType={1}
                  defaultValue={selectedFilters[1]}
                />

                <SelectCustom
                  width="100%"
                  label={selectOptions[0]?.label}
                  options={selectOptions[0]?.options || []}
                  placeholder={selectOptions[0]?.placeholder}
                  reset={resetFilters}
                  onSelectChange={(value) => handleSelectChange(0, value)}
                  selectType={0}
                  defaultValue={selectedFilters[0]}
                />
              </Box>
            </BoxDrops>

            {selectOptions.slice(2).map((option, index) => (
              <SelectCustom
                width="100%"
                label={option.label}
                options={option.options || []}
                placeholder={option.placeholder}
                reset={resetFilters}
                onSelectChange={(value) => handleSelectChange(index + 2, value)}
                selectType={index + 2}
                defaultValue={selectedFilters[index + 2]}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ marginBottom: "56px" }}>
          <Button
            sx={{
              color: theme.colors.gray4,
              width: "9.37vw",
              height: "48px",
              fontFamily: theme.fonts.primary,
              fontSize: "1rem",
              fontWeight: "500",
              lineHeight: "28px",
              textTransform: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
              "&:hover": {
                outline: "none",
                boxShadow: "none",
              },
            }}
            onClick={handleClearFilters}
          >
            Limpar filtros
          </Button>

          <Button
            sx={{
              bgcolor: "#0783FF",
              color: theme.colors.white,
              width: "9.37vw",
              borderRadius: "12px",
              height: "48px",
              fontFamily: theme.fonts.primary,
              fontSize: "1rem",
              fontWeight: "500",
              lineHeight: "28px",
              textTransform: "none",
              paddingLeft: "24px",
              paddingRight: "24px",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
              "&:hover": {
                outline: "none",
                boxShadow: "none",
              },
              gap: "8px",
              "& .MuiButton-icon": {
                margin: 0,
                padding: 0,
              },
            }}
            startIcon={
              <SearchIcon
                sx={{
                  width: "24px",
                  height: "24px",
                  margin: "0px",
                }}
              />
            }
            onClick={() => {
              const filters: { [key: string]: number } = {};
              Object.entries(selectedFilters).forEach(([key, value]) => {
                if (value !== null && !isNaN(Number(value))) {
                  filters[key] = Number(value);
                }
              });
              onSearch?.(filters);
              closeDrawer()();
            }}
          >
            Pesquisar
          </Button>
        </Box>
      </Main>
    </Drawer>
  );
};

export default DrawerCustom;
