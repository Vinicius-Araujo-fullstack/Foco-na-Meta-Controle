import React, { useState, useCallback, useMemo, useEffect, memo } from "react"
import {
  MenuItem,
  FormControl,
  Box,
  Typography,
  IconButton,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material"
import { SelectChangeEvent, useTheme } from "@mui/material"
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon,
} from "@mui/icons-material"
import { IDropDownCustomProps } from "../../interfaces"

// ==================== INTERFACES & TYPES ====================
interface BaseOption {
  ID: string | number
  disabled?: boolean
  [key: string]: any
}

interface StateOption extends BaseOption {
  Sigla: string
}

interface CityOption extends BaseOption {
  Cidade: string
}

interface NameOption extends BaseOption {
  Nome: string
}

interface ClassOption extends BaseOption {
  net_series: { Serie: string }
  net_tiposturma: { Tipo: string }
  net_turnos: { Turno: string }
}

interface SimpleNameOption extends BaseOption {
  name: string
}

type OptionTypes =
  | StateOption
  | CityOption
  | NameOption
  | ClassOption
  | SimpleNameOption

interface SelectCustomProps extends Omit<IDropDownCustomProps, "options"> {
  options?: OptionTypes[]
  onSelectChange?: (value: string | null, option?: OptionTypes | null) => void
  InternalPageControl?: string
  hasErrors?: boolean
  clearable?: boolean
  loading?: boolean
  disabled?: boolean
  emptyMessage?: string
}

// ==================== CONSTANTS ====================
const SELECT_TYPES = {
  STATE: 1, // Estados (Sigla)
  CITY: 0, // Cidades (Cidade)
  NAME: 2, // Nome genérico (Nome)
  CLASS: 3, // Turmas (Serie + Tipo + Turno)
  SIMPLE_NAME: 4, // Nome simples (name)
  FLEXIBLE_NAME: 5, // Nome flexível (name)
} as const

const DEFAULT_CONFIG = {
  MAX_HEIGHT: 240,
  ITEM_HEIGHT: 40,
  BORDER_RADIUS: 12,
  SCROLLBAR_WIDTH: 4,
} as const

const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: DEFAULT_CONFIG.MAX_HEIGHT,
      borderRadius: DEFAULT_CONFIG.BORDER_RADIUS,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  MenuListProps: {
    style: { padding: 0 },
  },
  sx: {
    "& .MuiList-root": {
      display: "flex",
      flexDirection: "column",
      overflowX: "hidden",
      maxHeight: `${DEFAULT_CONFIG.MAX_HEIGHT}px`,
      "&::-webkit-scrollbar": {
        width: `${DEFAULT_CONFIG.SCROLLBAR_WIDTH}px`,
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#c1c1c1",
        borderRadius: "4px",
        "&:hover": {
          background: "#a1a1a1",
        },
      },
    },
  },
} as const

// ==================== UTILITY FUNCTIONS ====================
const getOptionValue = (option: OptionTypes, selectType?: number): string => {
  if (selectType === SELECT_TYPES.FLEXIBLE_NAME && "name" in option) {
    return option.name
  }
  return String(option.ID)
}

const getOptionLabel = (option: OptionTypes, selectType?: number): string => {
  switch (selectType) {
    case SELECT_TYPES.STATE:
      return "Sigla" in option ? option.Sigla : ""
    case SELECT_TYPES.CITY:
      return "Cidade" in option ? option.Cidade : ""
    case SELECT_TYPES.NAME:
      return "Nome" in option ? option.Nome : ""
    case SELECT_TYPES.CLASS:
      return "net_series" in option
        ? `${option.net_series.Serie} ${option.net_tiposturma.Tipo} - ${option.net_turnos.Turno}`
        : ""
    case SELECT_TYPES.SIMPLE_NAME:
    case SELECT_TYPES.FLEXIBLE_NAME:
      return "name" in option ? option.name : ""
    default:
      return "Nome" in option
        ? option.Nome
        : "name" in option
          ? option.name
          : String(option.ID)
  }
}

const findOptionByValue = (
  options: OptionTypes[],
  value: string,
  selectType?: number
): OptionTypes | null => {
  const found = options.find((option) => {
    const optionValue = getOptionValue(option, selectType)
    const optionId = String(option.ID)
    return (
      optionValue === value ||
      optionId === value ||
      Number(optionId) === Number(value)
    )
  })
  return found || null
}

// ==================== MAIN COMPONENT ====================
const SelectCustom: React.FC<SelectCustomProps> = memo(
  ({
    width = "300px",
    options = [],
    placeholder = "Selecione",
    label,
    gapLabel = "16px",
    onSelectChange,
    selectType,
    defaultValue,
    hasErrors = false,
    InternalPageControl,
    clearable = true,
    loading = false,
    disabled = false,
    emptyMessage = "Nenhuma opção disponível",
  }) => {
    const theme = useTheme()

    // ==================== STATE ====================
    const [selectedValue, setSelectedValue] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false)

    // ==================== MEMOIZED VALUES ====================
    const isDisabled = useMemo(
      () =>
        disabled ||
        loading ||
        options.length === 0 ||
        InternalPageControl === "editar",
      [disabled, loading, options.length, InternalPageControl]
    )

    const selectedOption = useMemo(
      () =>
        selectedValue
          ? findOptionByValue(options, selectedValue, selectType)
          : null,
      [options, selectedValue, selectType]
    )

    const displayValue = useMemo(() => {
      if (!selectedValue || !selectedOption) return ""
      return getOptionLabel(selectedOption, selectType)
    }, [selectedValue, selectedOption, selectType])

    // ==================== EFFECTS ====================
    useEffect(() => {
      const newValue =
        defaultValue !== undefined && defaultValue !== null
          ? String(defaultValue)
          : ""
      setSelectedValue(newValue)
    }, [defaultValue])

    // ==================== HANDLERS ====================
    const handleToggleOpen = useCallback(() => {
      if (!isDisabled) {
        setIsOpen((prev) => !prev)
      }
    }, [isDisabled])

    const handleClose = useCallback(() => {
      setIsOpen(false)
    }, [])

    const handleChange = useCallback(
      (event: SelectChangeEvent<string>) => {
        const { value } = event.target

        // Toggle logic: se já estiver selecionado, limpa
        const newValue = selectedValue === value ? "" : value
        setSelectedValue(newValue)

        const newOption = newValue
          ? findOptionByValue(options, newValue, selectType)
          : null
        onSelectChange?.(newValue || null, newOption)
      },
      [selectedValue, options, selectType, onSelectChange]
    )

    const handleClear = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation()
        setSelectedValue("")
        onSelectChange?.(null, null)
      },
      [onSelectChange]
    )

    // ==================== RENDER FUNCTIONS ====================
    const renderValue = useCallback(
      (selected: string) => {
        if (!selected || loading) {
          return (
            <Typography
              sx={{
                fontFamily: theme.fonts?.primary,
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: "18px",
                color: theme.colors?.gray3 || "#999",
                textAlign: "start",
              }}
            >
              {loading ? "Carregando..." : placeholder}
            </Typography>
          )
        }

        return (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography
              sx={{
                fontFamily: theme.fonts?.primary,
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: "18px",
                color: theme.colors?.black || "#000",
                textAlign: "start",
                flex: 1,
              }}
            >
              {displayValue}
            </Typography>
          </Box>
        )
      },
      [theme, placeholder, loading, displayValue]
    )

    const renderEndAdornment = useCallback(
      () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {clearable && selectedValue && (
            <IconButton
              size="small"
              onClick={handleClear}
              disabled={isDisabled}
              sx={{
                padding: "2px",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ClearIcon
                sx={{ fontSize: "18px", color: theme.colors?.gray3 }}
              />
            </IconButton>
          )}
          <IconButton
            onClick={handleToggleOpen}
            disabled={isDisabled}
            sx={{
              padding: "4px",
              "&:focus": { outline: "none", boxShadow: "none" },
              "&:active": { outline: "none", boxShadow: "none" },
            }}
          >
            {isOpen ? (
              <ExpandLessIcon
                sx={{ color: theme.colors?.gray3, fontSize: "24px" }}
              />
            ) : (
              <ExpandMoreIcon
                sx={{ color: theme.colors?.gray3, fontSize: "24px" }}
              />
            )}
          </IconButton>
        </Box>
      ),
      [
        clearable,
        selectedValue,
        isOpen,
        isDisabled,
        theme,
        handleClear,
        handleToggleOpen,
      ]
    )

    const renderOptions = () => {
      if (options.length === 0) {
        return (
          <MenuItem disabled>
            <Typography
              sx={{
                fontStyle: "italic",
                color: theme.colors?.gray3 || "#999",
                textAlign: "center",
                width: "100%",
              }}
            >
              {emptyMessage}
            </Typography>
          </MenuItem>
        )
      }

      return options.map((option, index) => {
        const value = getOptionValue(option, selectType)
        const label = getOptionLabel(option, selectType)
        const isSelected = selectedValue === value

        return (
          <MenuItem
            key={`${option.ID}-${index}`}
            value={value}
            disabled={option.disabled}
            sx={{
              color: theme.colors?.black || "#000",
              fontWeight: isSelected ? 500 : 400,
              fontSize: "1rem",
              fontFamily: theme.fonts?.primary,
              textAlign: "start",
              lineHeight: "18px",
              padding: "8px 16px",
              height: `${DEFAULT_CONFIG.ITEM_HEIGHT}px`,
              backgroundColor: isSelected
                ? "rgba(25, 118, 210, 0.08)"
                : "transparent",
              "&:hover": {
                backgroundColor: isSelected
                  ? "rgba(25, 118, 210, 0.12)"
                  : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {label && (
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Typography sx={{ flex: 1 }}>{label}</Typography>
                {isSelected && (
                  <Chip
                    size="small"
                    label="Selecionado"
                    sx={{
                      height: "20px",
                      fontSize: "0.75rem",
                      backgroundColor: theme.colors?.primary || "#1976d2",
                      color: "white",
                    }}
                  />
                )}
              </Box>
            )}
          </MenuItem>
        )
      })
    }

    // ==================== MAIN RENDER ====================
    return (
      <Box sx={{ width }}>
        <FormControl sx={{ width }} disabled={isDisabled}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: gapLabel }}>
            {label && (
              <Typography
                component="label"
                sx={{
                  fontFamily: theme.fonts?.primary,
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  textAlign: "start",
                  color: hasErrors ? "#d32f2f" : "inherit",
                }}
              >
                {label}:
              </Typography>
            )}

            <Select
              value={selectedValue}
              onChange={handleChange}
              displayEmpty
              open={isOpen}
              onOpen={() => setIsOpen(true)}
              onClose={handleClose}
              disabled={isDisabled}
              error={hasErrors}
              input={<OutlinedInput />}
              renderValue={renderValue}
              endAdornment={renderEndAdornment()}
              MenuProps={MENU_PROPS}
              sx={{
                bgcolor: isDisabled ? "#f5f5f5" : theme.colors?.white || "#fff",
                borderRadius: `${DEFAULT_CONFIG.BORDER_RADIUS}px`,
                height: "52px",
                display: "flex",
                alignItems: "center",
                opacity: loading ? 0.7 : 1,
                "& .MuiSelect-select": {
                  color: theme.colors?.black || "#000",
                  fontWeight: 400,
                  fontSize: "1rem",
                  fontFamily: theme.fonts?.primary,
                  textAlign: "start",
                  lineHeight: "18px",
                  paddingRight: "8px !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: hasErrors
                    ? "1.5px solid #d32f2f"
                    : `0.75px solid ${theme.colors?.gray0 || "#e0e0e0"}`,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: hasErrors
                    ? "1.5px solid #d32f2f"
                    : `1px solid ${theme.colors?.primary || "#1976d2"}`,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: hasErrors
                    ? "2px solid #d32f2f"
                    : `2px solid ${theme.colors?.primary || "#1976d2"}`,
                },
                "& .MuiSelect-icon": { display: "none" },
              }}
            >
              {renderOptions()}
            </Select>
          </Box>
        </FormControl>
      </Box>
    )
  }
)

SelectCustom.displayName = "SelectCustom"

export default SelectCustom
