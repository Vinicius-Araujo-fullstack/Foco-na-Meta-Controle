import { useMemo, useState } from "react";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Button, Header, Main, MoreButton, SearchBar, Title } from "./style";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconeMore from "../../../../assets/IconMore/IconMore.svg";
import RegisterNotify from "./RegisterNotify";
import DrawerCustom from "../../../../components/DrawerCustom";
import useCity from "../../../../hooks/useCity";
import useStatesUf from "../../../../hooks/useStatesUf";
import useSchoolsByCity from "../../../../hooks/useSchoolsByCity";
import useNotify from "../../../../hooks/useNotify";
import DataPickerCustom from "../../../../components/DataPickerCustom";
import TableNotify from "../../../../components/TableNotify";
import dayjs, { Dayjs } from "dayjs";

function NotifyPage() {
  const theme = useTheme();
  const [selectedFilters, setSelectedFilters] = useState<Record<number, string | null>>({});
  console.log(selectedFilters)
  const [activeFilters, setActiveFilters] = useState<Record<number, string | null>>({});
  console.log(activeFilters)

  const [internalPageControl, setInternalPageControl] = useState<"lista" | "cadastrar" | "editar">("lista");

  const [drawerFilter, setDrawerFilter] = useState<boolean>(false);

  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState<Dayjs | null>(null);

  const OpenDrawer = () => () => {
    setDrawerFilter(true);
  };

  const { city } = useCity({ uf: Number(selectedFilters[1]) });
  const { states } = useStatesUf();
  const { schools } = useSchoolsByCity({ cityId: Number(selectedFilters[0]) });

  const handleFiltersChange = (filters: Record<number, string | null>) => {
    setSelectedFilters(filters);
  };

  const handleSearch = (filtros: { [key: string]: number }) => {
    console.log();
    console.log(filtros);
    // Convert keys to numbers and values to strings (or null if needed)
    const converted: Record<number, string | null> = {};
    Object.entries(filtros).forEach(([key, value]) => {
      converted[Number(key)] = value !== undefined && value !== null ? String(value) : null;
    });
    setActiveFilters(converted);
  }

  const headersTable = ["Mensagem:", "Para:", "Escola:", "Enviado em:"];

  const toggleInternalPageControl = () => {
    setInternalPageControl("cadastrar");
  };

  const { notifications } = useNotify({});

  const filteredNotifications = useMemo(() => {
  const city_id    = Number(activeFilters[0]);
  // const state_id = Number(activeFilters[1]); // descomente se for usar
  const school_id  = Number(activeFilters[2]);

  return (notifications ?? []).filter((notif) => {
    // 1. Filtro por texto em todos os campos
    const matchesText = !search || Object.values(notif)
      .some((valor) =>
        String(valor).toLowerCase().includes(search.toLowerCase())
      );

    // 2. Filtro por data (ignora se não tiver filtro de data)
    const matchesDate = !searchDate ||
      (notif.createdAt && dayjs(notif.createdAt).isSame(searchDate, "day"));

    // 3. Filtro por cidade (ignora se não tiver filtro de cidade)
    const matchesCity = !city_id || Number(notif.city_id) === city_id;

    // 4. Filtro por escola (aqui notif.school_id é array!)
    const matchesSchool = !school_id ||
      (Array.isArray(notif.school_id) && notif.school_id.includes(school_id));

    // 5. (Opcional) state_id, etc...
    // const matchesState = !state_id || Number(notif.state_id) === state_id;

    // Só retorna as notificações que passarem em todos os filtros
    return matchesText && matchesDate && matchesCity && matchesSchool/* && matchesState */;
  });
}, [notifications, search, searchDate, activeFilters]);



  return (
    <>
      {internalPageControl === "lista" && (
        <Main>
          <Header>
            <Title>Notificações</Title>
            <Button onClick={toggleInternalPageControl}>
              <NotificationAddIcon />
              Criar Notificação
            </Button>
          </Header>

          <SearchBar>
            <FilterListIcon
              sx={{
                width: "24px",
                height: "24px",
                color: theme.colors.black,
                cursor: "pointer",
              }}
            />
            <Paper
              component="form"
              sx={{
                display: "flex",
                width: "19.270vw",
                minWidth: "120px",
                padding: "0px 16px 0px 16px",
                height: "50px",
                borderRadius: "12px",
                boxShadow: "none",
                border: `0.75px solid ${theme.colors.gray0}`,
              }}
            >
              <InputBase
                sx={{
                  flex: 1,
                  position: "relative",
                  fontFamily: theme.fonts.primary,
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: theme.colors.gray3,

                  "& input::placeholder": {
                    opacity: 1,
                  },
                  "& input:focus::placeholder": {
                    opacity: 0.5,
                  },
                }}
                placeholder="Pesquisar"
                inputProps={{ "aria-label": "Pesquisar" }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <IconButton
                type="button"
                sx={{
                  padding: 0,

                  "&:focus": {
                    outline: "none",
                  },
                  "&:focus-visible": {
                    outline: "none",
                  },
                  "&:hover": {
                    backgroundColor: "unset",
                  },
                }}
                aria-label="Pesquisar"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <DataPickerCustom width="190px" placeholder="Data de envio" value={searchDate} onChange={setSearchDate} />

            <MoreButton onClick={OpenDrawer()}>
              <img src={IconeMore} alt="Icone Botão Mais" />
              Mais
            </MoreButton>
          </SearchBar>
          <TableNotify
            headers={headersTable}
            buttonPublish={false}
            buttonRemovePost={false}
            notifyInfo={filteredNotifications ?? []}
            InternalPageControl={internalPageControl}
            setInternalPageControl={setInternalPageControl}
          />
        </Main>
      )}
      {(internalPageControl === "cadastrar" || internalPageControl === "editar") && (
        <RegisterNotify InternalPageControl={internalPageControl} setInternalPageControl={setInternalPageControl} />
      )}

      <DrawerCustom
        open={drawerFilter}
        setOpen={setDrawerFilter}
        selectOptions={[
          {
            label: "Cidade",
            options: city,
            placeholder: "Selecione",
          },
          {
            label: "Estado",
            options: states,
            placeholder: "UF",
          },
          {
            label: "Escola",
            options: schools,
            placeholder: "Selecione",
          },
        ]}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
      />
    </>
  );
}
export default NotifyPage;
