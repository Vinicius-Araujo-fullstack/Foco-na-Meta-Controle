import { useState } from "react";

import DialogCustomSucess from "../../../../components/Dialogs/DIalogSucess/index.tsx";
import SelectCustom from "../../../../components/SelectCustom/index.tsx";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconRegisterReviews from "../../../../assets/IconFileDocumentEdit/file-document-edit.svg";
import IconRegisterSucessfully from "../../../../assets/IconEvaluationRegisterSucessfully/Group 43 (1).svg";
import { Main, Header, Title, Button, SearchBar } from "./style";
import RegisterReviews from "./RegisterReviews/index.tsx";
import { useTheme } from "@mui/material/styles";
import useAllEvaluate from "../../../../hooks/useAllEvaluate.ts";
import TableEvaluate from "../../../../components/TableEvaluate/index.tsx";
import { IEvaluateData } from "../../../../interfaces/evaluate.ts";
import useDisciplines from "../../../../hooks/useDisciplines.ts";
import { IEvaluate, ISegment } from "../../../../interfaces/IDropDownCustom.ts";

const ReviewsPage = () => {
  const [internalPageControl, setInternalPageControl] = useState<
    "lista" | "cadastrar" | "editar"
  >("lista");
  const [search, setSearch] = useState("");
  const [evaluationData, setEvaluationData] = useState<IEvaluateData>({
    school_year: null,
    simulate_num: null,
    evaluate_version: null,
    discipline_name: null,
    segmento_num: null,
  });

  // ---------------- GET DISCIPLINAS ------------
  const { disciplines } = useDisciplines();
  const disciplineOptions = disciplines?.map((discipline) => ({
    ...discipline,
    ID: discipline.id,
  }));

  const headersDropSegment: ISegment[] = [
    {
      ID: "1",
      name: "Fundamental 1",
    },
    {
      ID: "2",
      name: "Fundamental 2",
    },
  ];

  const seriesOptions = Array.from({ length: 9 }, (_, i) => ({
    ID: String(i + 1),
    name: `${i + 1}º Ano`,
  }));

  const theme = useTheme();
  const toggleInternalPageControl = () => {
    setInternalPageControl("cadastrar");
  };

  const { evaluate } = useAllEvaluate();
  console.log(evaluate)

  const removeAccents = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredData = evaluate?.filter((item: IEvaluate) => {
    const disciplineName = removeAccents(item?.discipline?.name || "");
    const searchLower = removeAccents(search);
    const selectedDiscipline = removeAccents(
      evaluationData.discipline_name || ""
    );
    const schoolYear = item?.school_year;
    const segmento = evaluationData.segmento_num;
    const selectedSchoolYear = evaluationData.school_year;

    const isSearchMatch = search ? disciplineName.includes(searchLower) : true;

    const isDisciplineMatch = evaluationData.discipline_name
      ? disciplineName.includes(selectedDiscipline)
      : true;

    const isSegmentMatch =
      segmento === 1
        ? schoolYear >= 1 && schoolYear <= 5
        : segmento === 2
          ? schoolYear >= 6 && schoolYear <= 9
          : true;

    const isSchoolYearMatch =
      selectedSchoolYear !== null ? schoolYear === selectedSchoolYear : true;

    return (
      isSearchMatch && isDisciplineMatch && isSegmentMatch && isSchoolYearMatch
    );
  });

  // ---------------------- FUNCTION ---------------
  const handleSelectChange = <K extends keyof IEvaluateData>(
    key: K,
    value: IEvaluateData[K] | string
  ) => {
    let parsedValue = value;

    if (
      [
        "school_year",
        "simulate_num",
        "evaluate_version",
        "segmento_num",
      ].includes(key) &&
      typeof value === "string"
    ) {
      parsedValue = Number(value);
    }

    setEvaluationData((prev) => ({
      ...prev,
      [key]: parsedValue,
    }));
  };

  return (
    <>
      {internalPageControl == "lista" && (
        <Main>
          <Header>
            <Title>Avaliações</Title>
            <Button onClick={toggleInternalPageControl}>
              <img src={IconRegisterReviews} alt="Icone cadastrar avaliações" />
              Cadastrar Avaliação
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
              placeholder="Disciplina"
              width="12.5vw"
              selectType={5}
              options={disciplineOptions}
              onSelectChange={(value) =>
                handleSelectChange("discipline_name", value)
              }
            />

            <SelectCustom
              placeholder="Segmento"
              width="12.5vw"
              selectType={4}
              options={headersDropSegment}
              onSelectChange={(value) => {
                handleSelectChange("segmento_num", value);
              }}
            />

            <SelectCustom
              placeholder="Série"
              width="7.81vw"
              selectType={4}
              reset={true}
              options={seriesOptions}
              onSelectChange={(value) =>
                handleSelectChange("school_year", value)
              }
            />
          </SearchBar>
          <TableEvaluate
            headers={[
              "Disciplina:",
              "Segmento:",
              "Série:",
              "Código da Avaliação:",
              "",
            ]}
            evaluateInfo={filteredData || {}}
            buttonPublish={false}
            buttonRemovePost={false}
            InternalPageControl={internalPageControl}
            setInternalPageControl={setInternalPageControl}
            filters={filteredData}
          />
        </Main>
      )}
      {(internalPageControl === "cadastrar" ||
        internalPageControl === "editar") && (
        <>
          <RegisterReviews
            InternalPageControl={internalPageControl}
            setInternalPageControl={setInternalPageControl}
          />
          <DialogCustomSucess
            title={`Avaliação ${internalPageControl === "cadastrar" ? "cadastrada" : "editada"} com sucesso!`}
            textButton="Fechar"
            icon={IconRegisterSucessfully}
            returnPage="true"
            setInternalPageControl={setInternalPageControl}
          />
        </>
      )}
    </>
  );
};

export default ReviewsPage;
