import { useState } from "react";

import DialogSucess from "../../../../components/Dialogs/DIalogSucess";
import RegisterSimulations from "./RegisterSimulations/index.tsx";
import SelectCustom from "../../../../components/SelectCustom/index.tsx";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconeMore from "../../../../assets/IconMore/IconMore.svg";
import IconRegisterSucessfully from "../../../../assets/IconEvaluationRegisterSucessfully/Group 43 (1).svg";
import IconeRegisterSimulated from "../../../../assets/IconRegisterSimulated/Material Design Icons.svg";
import { useTheme } from "@mui/material/styles";
import { Main, Header, Title, Button, SearchBar, MoreButton } from "./style";
import DrawerCustom from "../../../../components/DrawerCustom/index.tsx";
import useAllSimulated from "../../../../hooks/useAllSimulated.ts";
import { ISimulated } from "../../../../interfaces/simulated.ts";
import TableSimulated from "../../../../components/TableSimulated/index.tsx";
import useCity from "../../../../hooks/useCity.ts";
import useStatesUf from "../../../../hooks/useStatesUf.ts";
import useSchoolsByCity from "../../../../hooks/useSchoolsByCity.ts";
import useTurmasBySchool from "../../../../hooks/useTurmasBySchool.ts";
import useProfSchool from "../../../../hooks/useProfSchool.ts";

function SimulatedPage() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<number, string | null>
  >({});

  const { city } = useCity({ uf: Number(selectedFilters[1]) });
  const { states } = useStatesUf();
  const { schools } = useSchoolsByCity({ cityId: Number(selectedFilters[0]) });
  const { turmasBySchool } = useTurmasBySchool({
    schoolId: Number(selectedFilters[2]),
  });
  const { teachers } = useProfSchool({
    schoolId: selectedFilters[2],
    turmaId: selectedFilters[3],
  });

  const handleFiltersChange = (filters: Record<number, string | null>) => {
    setSelectedFilters(filters);
  };

  const [evaluationData, setEvaluationData] = useState<ISimulated>({
    name: "",
  });

  const [search, setSearch] = useState("");
  const { simulateds } = useAllSimulated({});
  console.log(simulateds)
  const filteredData = simulateds?.filter((item: ISimulated) => {
    const matchByEvaluation = evaluationData?.name
      ? item.name === evaluationData.name
      : true;
    return matchByEvaluation;
  });

  const simulados = Array.from({ length: 4 }, (_, i) => ({
    ID: "i + 1",
    name: `Simulado ${i + 1}`,
  }));

  const headersTable = ["Escola:", "Turma:", "Simulado:", "Prof. Resp.:", ""];

  const [internalPageControl, setInternalPageControl] = useState<
    "lista" | "cadastrar" | "editar"
  >("lista");

  const toggleInternalPageControl = () => {
    setInternalPageControl("cadastrar");
  };
  const [drawerFilter, setDrawerFilter] = useState<boolean>(false);

  const OpenDrawer = () => () => {
    setDrawerFilter(true);
  };
  const theme = useTheme();

  const handleSelectChange = <K extends keyof ISimulated>(
    key: K,
    value: ISimulated[K] | null
  ) => {
    let parsedValue = value;

    if (["name"].includes(key) && typeof value === "string") {
      parsedValue = value;
    }

    setEvaluationData((prev: ISimulated) => ({
      ...prev,
      [key]: parsedValue,
    }));
  };

  return (
    <>
      {internalPageControl === "lista" && (
        <Main>
          <Header>
            <Title>Simulados:</Title>
            <Button onClick={toggleInternalPageControl}>
              <img
                src={IconeRegisterSimulated}
                alt="Icone botão cadastrar alunos"
              />
              Cadastrar Simulados
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
            <SelectCustom
              width="10.81vw"
              placeholder="Simulado"
              selectType={5}
              options={simulados}
              onSelectChange={(value) => {
                handleSelectChange("name", value);
              }}
            />

            <MoreButton onClick={OpenDrawer()}>
              <img src={IconeMore} alt="Icone Botão Mais" />
              Mais
            </MoreButton>
          </SearchBar>
          <TableSimulated
            headers={headersTable}
            buttonPublish={false}
            buttonRemovePost={false}
            simulatedInfo={filteredData}
            InternalPageControl={internalPageControl}
            setInternalPageControl={setInternalPageControl}
          />
        </Main>
      )}

      {(internalPageControl === "cadastrar" ||
        internalPageControl === "editar") && (
        <>
          <RegisterSimulations
            InternalPageControl={internalPageControl}
            setInternalPageControl={setInternalPageControl}
          />
          <DialogSucess
            title={`Simulado ${internalPageControl === "cadastrar" ? "cadastrado" : "editado"} com sucesso!`}
            textButton="Voltar para a tela inicial"
            icon={IconRegisterSucessfully}
            returnPage={"true"}
            setInternalPageControl={setInternalPageControl}
          />
        </>
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
          {
            label: "Turma",
            options: turmasBySchool,
            placeholder: "Selecione ",
          },
          {
            label: "Professor(a) responsável",
            options: teachers,
            placeholder: "Selecione ",
          },
        ]}
        onFiltersChange={handleFiltersChange}
      />
    </>
  );
}

export default SimulatedPage;
