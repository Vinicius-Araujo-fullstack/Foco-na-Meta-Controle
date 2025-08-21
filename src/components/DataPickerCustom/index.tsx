import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { Box, Button, Typography } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/pt-br"
import { ContentSortByDate } from "./style.ts"
import { IDataPicker } from "../../interfaces/index.ts"

dayjs.locale("pt-br")

interface DataPickerCustomProps extends IDataPicker {
  onChange?: (date: Dayjs | null) => void
  onClearFilter?: () => void
  value?: Dayjs | null
}

// Estilos extraídos como constantes
const labelStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "clamp(0.9rem, 0.852rem + 0.19vw, 1rem)",
  fontWeight: 500,
  color: "#1F1F1F",
  whiteSpace: "nowrap",
} as const

const buttonStyles = {
  bgcolor: "#FFFF",
  color: "#8C8C8C",
  height: "52px",
  borderRadius: "12px",
  border: "solid 0.75px #E2E8F0",
  textTransform: "none",
  fontFamily: "Poppins, sans-serif",
  fontSize: "1rem",
  fontWeight: "400",
  display: "flex",
  alignItems: "center",
  "&:focus, &:active, &:hover": {
    outline: "none",
    boxShadow: "none",
  },
} as const

const calendarContainerStyles = {
  position: "absolute" as const,
  top: "90px",
  zIndex: 300000,
}

// Função para formatação de dia da semana
const formatDayOfWeek = (date: Dayjs) => {
  const formatted = date.format("ddd")
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

const DataPickerCustom: React.FC<DataPickerCustomProps> = memo(
  ({
    width,
    placeholder,
    label,
    gapLabel = "none",
    justify = "center",
    position = "absolute",
    onChange,
    value,
    onClearFilter,
  }) => {
    const [open, setOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(
      value ?? undefined
    )
    const calendarRef = useRef<HTMLDivElement>(null)

    // Memoização dos handlers
    const handleOpenCalendar = useCallback(() => {
      setOpen((prev) => !prev)
    }, [])

    const handleDateChange = useCallback(
      (newDate: Dayjs | null) => {
        if (newDate?.isValid()) {
          setSelectedDate(newDate)
          onChange?.(newDate)
        } else {
          setSelectedDate(undefined)
          onChange?.(null)
        }
      },
      [onChange]
    )

    const handleClear = useCallback(() => {
      setSelectedDate(undefined)
      onChange?.(null)
      if (!selectedDate?.date) {
        handleOpenCalendar()
      }
      onClearFilter?.()
      setOpen(false)
    }, [onChange, onClearFilter, selectedDate, handleOpenCalendar])

    const handleAccept = useCallback(
      (newDate: Dayjs | null) => {
        handleDateChange(newDate)
        handleOpenCalendar()
      },
      [handleDateChange, handleOpenCalendar]
    )

    // Otimização do click outside
    useEffect(() => {
      if (!open) return

      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      }

      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }, [open])

    // Sincronização com prop value
    useEffect(() => {
      if (value && (!selectedDate || !value.isSame(selectedDate))) {
        setSelectedDate(value)
      }
    }, [value, selectedDate])

    // Estilos do calendário movidos para useMemo ou constante
    const calendarStyles = {
      position,
      zIndex: 300000,
      borderRadius: "8px",
      rowGap: "16px",
      marginTop: "10px",
      "& .MuiDayCalendar-monthContainer": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        overflow: "hidden",
      },
      "& .MuiPickersSlideTransition-root": {
        overflow: "hidden",
      },
      "& .MuiPickersToolbar-root": {
        display: "none",
      },
      "& .MuiPickersCalendarHeader-label": {
        fontFamily: "Poppins,sans-serif",
        color: "#1F1F1F",
        fontSize: "1rem",
        fontWeight: 600,
        textTransform: "capitalize",
        lineHeight: "18px",
      },
      "& .MuiPickersCalendarHeader-switchViewButton": {
        display: "none",
      },
      "& .MuiIconButton-root, & .MuiButtonBase-root": {
        fontSize: "24px",
        color: "#000000",
        "&:focus, &:active": {
          outline: "none",
          boxShadow: "none",
        },
        "&:hover": {
          outline: "none",
          boxShadow: "none",
          bgcolor: "transparent",
        },
      },
      "& .MuiDayCalendar-weekDayLabel": {
        fontFamily: "Inter,Sans-serif",
        fontWeight: 500,
        fontSize: "13px",
        color: "#1F1F1F",
        "&:nth-child(1), &:nth-child(7)": {
          color: "#F36365",
        },
      },
      "& .MuiPickersMonth-monthButton, & .MuiPickersYear-yearButton": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:focus, &:active, &:hover": {
          outline: "none",
          boxShadow: "none",
        },
        "&.Mui-selected": {
          margin: 0,
          padding: 0,
          bgcolor: "#1F1F1F",
        },
      },
      "& .MuiYearCalendar-root": {
        "&::-webkit-scrollbar": {
          width: "1px",
        },
      },
      "& .MuiPickersDay-root": {
        border: "none",
        "&:focus, &:active, &:hover": {
          outline: "none",
          boxShadow: "none",
        },
        "&.Mui-selected": {
          background: "#1F1F1F",
          border: "none",
        },
      },
      "& .css-15fu35s-MuiDialogActions-root>:not(style)~:not(style)": {
        background: selectedDate ? "#0783FF" : "transparent",
        color: selectedDate ? "#FFFFFF" : "#0783FF",
        border: "solid 0.75px #0783FF",
        width: "120px",
        height: "40px",
        borderRadius: "8px",
        fontFamily: "Poppins, sans-serif",
        textTransform: "none",
        fontSize: "0.87rem",
        fontWeight: 500,
        "&:focus, &:active, &:hover": {
          outline: "none",
          boxShadow: "none",
        },
      },
      "& .css-1uent87-MuiButtonBase-root-MuiButton-root": {
        color: "#1f1f1f",
        width: "120px",
        height: "40px",
        borderRadius: "8px",
        textTransform: "none",
        fontFamily: "Poppins, sans-serif",
        fontSize: "0.87rem",
        fontWeight: 500,
      },
    }

    const daySlotProps = useCallback(
      (ownerState: any) => ({
        sx: {
          fontFamily: "Inter,sans-serif",
          fontWeight: 500,
          fontSize: "0.85rem",
          color:
            ownerState.day.day() === 0 || ownerState.day.day() === 6
              ? "#F36365"
              : "#1F1F1F",
        },
      }),
      []
    )

    return (
      <Box
        ref={calendarRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: gapLabel,
          width,
          position: "relative",
        }}
      >
        {label && <Typography sx={labelStyles}>{label}</Typography>}

        <Button
          sx={{
            ...buttonStyles,
            width,
            justifyContent: justify,
          }}
          onClick={handleOpenCalendar}
        >
          <ContentSortByDate>
            <CalendarMonthIcon sx={{ width: 24, height: 24 }} />
            {selectedDate?.isValid()
              ? selectedDate.format("DD/MM/YYYY")
              : placeholder}
          </ContentSortByDate>
        </Button>

        {open && (
          <Box sx={calendarContainerStyles}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <StaticDatePicker
                value={selectedDate}
                sx={calendarStyles}
                views={["year", "month", "day"]}
                yearsOrder="asc"
                dayOfWeekFormatter={formatDayOfWeek}
                slotProps={{
                  day: daySlotProps,
                  actionBar: {
                    actions: ["clear", "accept"],
                    onClear: handleClear,
                  },
                }}
                localeText={{
                  clearButtonLabel: "Limpar",
                  okButtonLabel: "Definir",
                }}
                onAccept={handleAccept}
              />
            </LocalizationProvider>
          </Box>
        )}
      </Box>
    )
  }
)

DataPickerCustom.displayName = "DataPickerCustom"

export default DataPickerCustom
