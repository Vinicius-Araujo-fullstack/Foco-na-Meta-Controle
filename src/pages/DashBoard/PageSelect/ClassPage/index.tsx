// ------------- REVISADO -------------

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import DialogSucess from "../../../../components/Dialogs/DIalogSucess/index";
import StudentRegistrationPage from "./StudentRegistrationPage/index.tsx";
import TableCustom from "../../../../components/TableCustom/index.tsx";
import DrawerCustom from "../../../../components/DrawerCustom/index.tsx";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconeMore from "../../../../assets/IconMore/IconMore.svg";
import IconeRegisterStudents from "../../../../assets/IconPersonsMore/iconPersonsMore.svg";
import IconStudentAddSucessfully from "../../../../assets/IconStudentAddSucessfully/Group 43.svg";
import DataPickerCustom from "../../../../components/DataPickerCustom/index.tsx";
import { useTheme } from "@mui/material/styles";
import { Main, Header, Title, Button, SearchBar, MoreButton } from "./style";
import useTurmas from "../../../../hooks/useAllTurmas.ts"; // 👈 importa o hook
import useStatesUf from "../../../../hooks/useStatesUf.ts";
import useCity from "../../../../hooks/useCity.ts";
import useSchoolsByCity from "../../../../hooks/useSchoolsByCity.ts";
import useTurmasBySchool from "../../../../hooks/useTurmasBySchool.ts";

const ClassPage = () => {
  const theme = useTheme();

  const [internalPageControl, setInternalPageControl] = useState<
    "lista" | "cadastrar" | "editar"
  >("lista");
  const [drawerFilter, setDrawerFilter] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<number, string | null>
  >({});

  const { turmas } = useTurmas({
    schoolName: search,
    date: dateFilter,
    escolaId: selectedFilters[2] ?? "",
    turmaId: selectedFilters[3] ?? "",
  });
  const { states } = useStatesUf();
  const { city } = useCity({ uf: Number(selectedFilters[1]) });
  const { schools } = useSchoolsByCity({ cityId: Number(selectedFilters[0]) });
  const { turmasBySchool } = useTurmasBySchool({
    schoolId: Number(selectedFilters[2]),
  });

  const toggleInternalPageControl = () => {
    setInternalPageControl("cadastrar");
  };
  const handleFiltersChange = (filters: Record<number, string | null>) => {
    setSelectedFilters(filters);
  };
  const OpenDrawer = () => () => {
    setDrawerFilter(true);
  };

  return (
    <>
      {internalPageControl === "lista" && (
        <Main>
          <Header>
            <Title>Turmas:</Title>
            <Button onClick={toggleInternalPageControl}>
              <img
                src={IconeRegisterStudents}
                alt="Icone botão cadastrar alunos"
              />
              Cadastrar Alunos
            </Button>
          </Header>

          <SearchBar>
            <FilterListIcon
              sx={{
                width: "24px",
                height: "24px",
                color: theme.colors.black,
              }}
            />
            <Paper
              component="form"
              sx={(theme) => ({
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "19.27vw",
                padding: "0px 16px 0px 16px",
                height: "50px",
                borderRadius: "12px",
                boxShadow: "none",
                border: `0.75px solid ${theme.colors.gray0}`,
              })}
            >
              <InputBase
                sx={{
                  position: "relative",
                  fontFamily: theme.fonts.primary,
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: theme.colors.gray3,
                  "& input::placeholder": {
                    opacity: 1,
                  },
                  "& input:focus::placeholder": {
                    opacity: 1,
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

            <DataPickerCustom
              width="224px"
              placeholder="Data da publicação"
              onChange={(e: any) => {
                setDateFilter(new Date(e).toISOString());
              }}
              onClearFilter={() => setDateFilter("")}
            />

            <MoreButton onClick={OpenDrawer()}>
              <img src={IconeMore} alt="Icone Botão Mais" />
              Mais
            </MoreButton>
          </SearchBar>

          <TableCustom
            headers={["Escola:", "Turma:", "Alunos:", "Criado em:"]}
            turmasInfo={turmas || []}
            buttonPublish={false}
            buttonRemovePost={false}
            InternalPageControl={internalPageControl}
            setInternalPageControl={setInternalPageControl}
          />
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
              {
                label: "Turma",
                options: turmasBySchool,
                placeholder: "Selecione ",
              },
            ]}
            onFiltersChange={handleFiltersChange}
          />
        </Main>
      )}

      {(internalPageControl === "cadastrar" ||
        internalPageControl === "editar") && (
        <>
          <StudentRegistrationPage
            InternalPageControl={internalPageControl}
            setInternalPageControl={setInternalPageControl}
            turmasList={turmas.map((t: { ID: number }) => t.ID)}
          />
          <DialogSucess
            title={
              internalPageControl !== "editar"
                ? "Alunos cadastrados com sucesso!"
                : "Turma editada com sucesso!"
            }
            textButton="Voltar para a tela inicial"
            icon={IconStudentAddSucessfully}
            returnPage="true"
            setInternalPageControl={setInternalPageControl}
          />
        </>
      )}
    </>
  );
};

export default ClassPage;
