import * as React from "react";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { ContentSortByDate } from "./style.ts";
import "dayjs/locale/pt-br";
import { useEffect, useRef, useState } from "react";
import { IDataPicker } from "../../interfaces/index.ts";
dayjs.locale("pt-br");

interface DataPickerCustomProps extends IDataPicker {
  // Callback para retornar a data selecionada
  onChange?: (date: Dayjs | null) => void;
  onClearFilter?: () => void;
  value?: Dayjs | null;
}

const DataPickerCustom: React.FC<DataPickerCustomProps> = ({
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
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(value ?? undefined);

  const handleOpenCalendar = () => {
    setOpen((prevState) => !prevState);
  };

  const cleanCache = () => {
    setSelectedDate(undefined);
    if (onChange) onChange(null);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate && newDate.isValid()) {
      setSelectedDate(newDate);
      if (onChange) onChange(newDate);
    } else {
      setSelectedDate(undefined);
      if (onChange) onChange(null);
    }
  };

  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (value && (!selectedDate || !value.isSame(selectedDate))) {
      setSelectedDate(value);
    }
  }, [value]);

  return (
    <Box
      ref={calendarRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: gapLabel,
        width: width,
        position: "relative",
      }}
    >
      {label && (
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(0.9rem, 0.852rem + 0.19vw, 1rem)",
            fontWeight: 500,
            color: "#1F1F1F",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      )}

      <Button
        sx={{
          width: width,
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
          justifyContent: justify,
          alignItems: "center",
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
        onClick={handleOpenCalendar}
      >
        <ContentSortByDate>
          <CalendarMonthIcon sx={{ width: 24, height: 24 }} />
          {selectedDate && selectedDate.isValid() ? selectedDate.format("DD/MM/YYYY") : <>{placeholder}</>}
        </ContentSortByDate>
      </Button>

      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "90px",
            zIndex: 300000,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <StaticDatePicker
              value={selectedDate}
              sx={{
                position: position,
                zIndex: "300000",
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
                "& .MuiPickersToolbar-root": { display: "none" },
                "& .MuiPickersCalendarHeader-label": {
                  fontFamily: "Poppins,sans-serif",
                  colors: "#1F1F1F",
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  lineHeight: "18px",
                },
                "& .MuiPickersCalendarHeader-switchViewButton": {
                  display: "none",
                },
                "& .MuiIconButton-root": {
                  fontSize: "24px",
                  color: "#000000",
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
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  fontFamily: "Inter,Sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#1F1F1F",
                },
                "& .MuiDayCalendar-weekDayLabel:nth-child(1), & .MuiDayCalendar-weekDayLabel:nth-child(7)": {
                  color: "#F36365",
                },
                "& .MuiPickersMonth-monthButton.Mui-selected": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 0,
                  padding: 0,
                  bgcolor: "#1F1F1F",
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
                },
                "& .MuiPickersMonth-monthButton": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                },
                "& .MuiPickersYear-yearButton.Mui-selected": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 0,
                  padding: 0,
                  bgcolor: "#1F1F1F",
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
                },
                "& .MuiPickersYear-yearButton": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                },
                "& .MuiYearCalendar-root": {
                  " &::-webkit-scrollbar": { width: "1px" },
                },
                "& .MuiButtonBase-root": {
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
                },
                "& .MuiPickersDay-root.Mui-selected ": {
                  background: "#1F1F1F",
                  border: "none",
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
                },
                "& .MuiPickersDay-root ": {
                  border: "none",
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
                },
                "& .css-15fu35s-MuiDialogActions-root>:not(style)~:not(style)": {
                  background: selectedDate != undefined ? "#0783FF" : "tranparente",
                  color: selectedDate != undefined ? "#FFFFFF" : "#0783FF",
                  border: "solid 0.75px #0783FF",
                  width: "120px",
                  height: "40px",
                  borderRadius: "8px",
                  fontFamily: "Poppins, sans-serif",
                  textTransform: "none",
                  fontSize: "0.87rem",
                  fontWeight: 500,
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
              }}
              views={["year", "month", "day"]}
              yearsOrder="asc"
              dayOfWeekFormatter={(date) => date.format("ddd").charAt(0).toUpperCase() + date.format("ddd").slice(1)}
              slotProps={{
                day: (ownerState) => ({
                  sx: {
                    fontFamily: "Inter,sans-serif",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    color: ownerState.day.day() === 0 || ownerState.day.day() === 6 ? "#F36365" : "#1F1F1F",
                  },
                }),
                actionBar: {
                  actions: ["clear", "accept"],
                  onClear: () => {
                    cleanCache();
                    if (!selectedDate?.date) {
                      handleOpenCalendar();
                    }
                    onClearFilter?.();
                    setOpen(false);
                  },
                },
              }}
              localeText={{
                clearButtonLabel: "Limpar",
                okButtonLabel: "Definir",
              }}
              onAccept={(newDate) => {
                handleDateChange(newDate);
                handleOpenCalendar();
              }}
            />
          </LocalizationProvider>
        </Box>
      )}
    </Box>
  );
};

export default DataPickerCustom;
