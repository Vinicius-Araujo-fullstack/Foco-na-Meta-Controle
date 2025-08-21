import React, { useState, useCallback, useMemo, useEffect, memo } from "react"
import {
  OutlinedInput,
  MenuItem,
  FormControl,
  Box,
  Select,
  Typography,
  IconButton,
  Chip,
  Checkbox,
  ListItemText,
} from "@mui/material"
import { SelectChangeEvent, useTheme } from "@mui/material"
import {
  Check as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon,
} from "@mui/icons-material"
import { IDropDownCustomProps } from "../../interfaces"

// ==================== INTERFACES & TYPES ====================
interface OptionItem {
  ID: string
  Nome: string
  [key: string]: any
}

interface MultiSelectCustomProps extends Omit<IDropDownCustomProps, "options"> {
  options?: OptionItem[]
  onSelectionChange?: (selectedItems: OptionItem[]) => void
  onClear?: () => void
  maxDisplayItems?: number
  showChips?: boolean
  showSelectAll?: boolean
  virtualized?: boolean
  searchable?: boolean
  disabled?: boolean
  loading?: boolean
}

// ==================== CONSTANTS ====================
const DEFAULT_CONFIG = {
  MAX_HEIGHT: 240,
  ITEM_HEIGHT: 40,
  ITEM_PADDING: 8,
  MAX_DISPLAY_ITEMS: 2,
  BORDER_RADIUS: 12,
  SCROLLBAR_WIDTH: 4,
} as const

const MENU_STYLES = {
  PaperProps: {
    style: {
      maxHeight: DEFAULT_CONFIG.MAX_HEIGHT,
      borderRadius: DEFAULT_CONFIG.BORDER_RADIUS,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  },
  MenuListProps: {
    style: {
      padding: 0,
    },
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
const normalizeValue = (
  value: any,
  selectType?: number,
  onlyId?: boolean
): string => {
  if (typeof value === "string") return value
  if (typeof value === "object" && value !== null) {
    if (onlyId && "ID" in value) return String(value.ID)
    if (selectType === 4) return String(value.ID)
    return String(value.evaluate_id ?? value.id ?? value.ID)
  }
  return String(value)
}

const getSelectedItemsFromValues = (
  selectedValues: string[],
  options: OptionItem[]
): OptionItem[] => {
  return options.filter((option) => selectedValues.includes(option.ID))
}

// ==================== MAIN COMPONENT ====================
const MultiSelectCustom: React.FC<MultiSelectCustomProps> = memo(
  ({
    label,
    placeholder = "Selecione",
    width = "300px",
    options = [],
    gapLabel = "16px",
    onSelectionChange,
    onClear,
    defaultValue = "",
    selectType,
    hasErrors = false,
    onlyId = false,
    maxDisplayItems = DEFAULT_CONFIG.MAX_DISPLAY_ITEMS,
    showChips = false,
    showSelectAll = true,
    disabled = false,
    loading = false,
  }) => {
    const theme = useTheme()

    // ==================== STATE ====================
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false)

    // ==================== MEMOIZED VALUES ====================
    const allOptionIds = useMemo(() => options.map((opt) => opt.ID), [options])

    const isAllSelected = useMemo(
      () =>
        selectedValues.length > 0 &&
        selectedValues.length === allOptionIds.length,
      [selectedValues.length, allOptionIds.length]
    )

    const selectedItems = useMemo(
      () => getSelectedItemsFromValues(selectedValues, options),
      [selectedValues, options]
    )

    // ==================== EFFECTS ====================
    useEffect(() => {
      if (Array.isArray(defaultValue) && defaultValue.length > 0) {
        const normalizedValues = defaultValue.map((item) =>
          normalizeValue(item, selectType, onlyId)
        )
        setSelectedValues(normalizedValues)
      } else {
        setSelectedValues([])
      }
    }, [defaultValue, selectType, onlyId])

    // ==================== HANDLERS ====================
    const handleToggleOpen = useCallback(() => {
      if (!disabled && !loading) {
        setIsOpen((prev) => !prev)
      }
    }, [disabled, loading])

    const handleClose = useCallback(() => {
      setIsOpen(false)
    }, [])

    const handleToggleAll = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation()

        const newValues = isAllSelected ? [] : [...allOptionIds]
        const newItems = isAllSelected ? [] : [...options]

        setSelectedValues(newValues)
        onSelectionChange?.(newItems)
      },
      [isAllSelected, allOptionIds, options, onSelectionChange]
    )

    const handleChange = useCallback(
      (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target

        // Ignore "select all" value
        if (typeof value !== "string" && value.includes("select-all")) {
          return
        }

        const newValues = typeof value === "string" ? value.split(",") : value
        const newItems = getSelectedItemsFromValues(newValues, options)

        setSelectedValues(newValues)
        onSelectionChange?.(newItems)
      },
      [options, onSelectionChange]
    )

    const handleClearSelection = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation()
        setSelectedValues([])
        onSelectionChange?.([])
        onClear?.()
      },
      [onSelectionChange, onClear]
    )

    const handleRemoveItem = useCallback(
      (itemId: string, event: React.MouseEvent) => {
        event.stopPropagation()
        const newValues = selectedValues.filter((id) => id !== itemId)
        const newItems = getSelectedItemsFromValues(newValues, options)

        setSelectedValues(newValues)
        onSelectionChange?.(newItems)
      },
      [selectedValues, options, onSelectionChange]
    )

    // ==================== RENDER FUNCTIONS ====================
    const renderValue = useCallback(
      (selected: string[]) => {
        if (selected.length === 0) {
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

        if (showChips) {
          return (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                maxHeight: "100px",
                overflow: "auto",
              }}
            >
              {selectedItems.slice(0, 3).map((item) => (
                <Chip
                  key={item.ID}
                  label={item.Nome}
                  size="small"
                  onDelete={(e) => handleRemoveItem(item.ID, e)}
                  sx={{
                    fontSize: "0.875rem",
                    height: "24px",
                  }}
                />
              ))}
              {selectedItems.length > 3 && (
                <Chip
                  label={`+${selectedItems.length - 3}`}
                  size="small"
                  sx={{
                    fontSize: "0.875rem",
                    height: "24px",
                    backgroundColor: theme.colors?.primary || "#1976d2",
                    color: "white",
                  }}
                />
              )}
            </Box>
          )
        }

        const selectedNames = selectedItems.map(
          (item) => item.Nome || `ID ${item.ID}`
        )
        const displayText =
          selectedNames.length > maxDisplayItems
            ? `${selectedNames.slice(0, maxDisplayItems).join(", ")} +${selectedNames.length - maxDisplayItems}`
            : selectedNames.join(", ")

        return displayText
      },
      [
        selectedItems,
        showChips,
        maxDisplayItems,
        theme,
        placeholder,
        loading,
        handleRemoveItem,
      ]
    )

    const renderEndAdornment = useCallback(
      () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {selectedValues.length > 0 && (
            <IconButton
              size="small"
              onClick={handleClearSelection}
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
            disabled={disabled || loading}
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
        selectedValues.length,
        isOpen,
        disabled,
        loading,
        theme,
        handleClearSelection,
        handleToggleOpen,
      ]
    )

    const renderSelectAllOption = () => {
      if (!showSelectAll || options.length === 0) return null

      return (
        <MenuItem
          value="select-all"
          onClick={handleToggleAll}
          sx={{
            fontWeight: 600,
            fontStyle: "italic",
            color: theme.colors?.primary || "#1976d2",
            fontSize: "0.95rem",
            fontFamily: theme.fonts?.primary,
            padding: `${DEFAULT_CONFIG.ITEM_PADDING}px 16px`,
            height: `${DEFAULT_CONFIG.ITEM_HEIGHT}px`,
            borderBottom: "1px solid #f0f0f0",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
            },
          }}
        >
          <Checkbox
            checked={isAllSelected}
            indeterminate={selectedValues.length > 0 && !isAllSelected}
            size="small"
            sx={{ marginRight: 1 }}
          />
          <ListItemText
            primary={isAllSelected ? "Desmarcar todos" : "Selecionar todos"}
          />
        </MenuItem>
      )
    }

    const renderOptions = () => {
      return options.map((option) => {
        const isSelected = selectedValues.includes(option.ID)

        return (
          <MenuItem
            key={option.ID}
            value={option.ID}
            sx={{
              color: theme.colors?.black || "#000",
              fontWeight: 400,
              fontSize: "1rem",
              fontFamily: theme.fonts?.primary,
              textAlign: "start",
              lineHeight: "18px",
              padding: `${DEFAULT_CONFIG.ITEM_PADDING}px 16px`,
              height: `${DEFAULT_CONFIG.ITEM_HEIGHT}px`,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Checkbox
              checked={isSelected}
              size="small"
              sx={{ marginRight: 1 }}
            />
            <ListItemText primary={option.Nome} sx={{ flex: 1 }} />
            {isSelected && (
              <CheckIcon
                sx={{
                  fontSize: 20,
                  color: theme.colors?.primary || "#1976d2",
                  marginLeft: 1,
                }}
              />
            )}
          </MenuItem>
        )
      })
    }

    // ==================== MAIN RENDER ====================
    return (
      <Box sx={{ width }}>
        <FormControl sx={{ width }} disabled={disabled}>
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
              multiple
              displayEmpty
              value={selectedValues}
              onChange={handleChange}
              open={isOpen}
              onOpen={() => setIsOpen(true)}
              onClose={handleClose}
              input={<OutlinedInput />}
              renderValue={renderValue}
              endAdornment={renderEndAdornment()}
              MenuProps={MENU_STYLES}
              disabled={disabled || loading}
              sx={{
                bgcolor: disabled ? "#f5f5f5" : theme.colors?.white || "#fff",
                borderRadius: `${DEFAULT_CONFIG.BORDER_RADIUS}px`,
                height:
                  showChips && selectedValues.length > 0 ? "auto" : "52px",
                minHeight: "52px",
                display: "flex",
                alignItems: "start",
                opacity: loading ? 0.7 : 1,
                "& .MuiSelect-select": {
                  color: theme.colors?.black || "#000",
                  fontWeight: 400,
                  fontSize: "1rem",
                  fontFamily: theme.fonts?.primary,
                  textAlign: "start",
                  lineHeight: "18px",
                  padding:
                    showChips && selectedValues.length > 0
                      ? "8px 14px"
                      : undefined,
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
              {renderSelectAllOption()}
              {renderOptions()}
            </Select>
          </Box>
        </FormControl>
      </Box>
    )
  }
)

MultiSelectCustom.displayName = "MultiSelectCustom"

export default MultiSelectCustom
