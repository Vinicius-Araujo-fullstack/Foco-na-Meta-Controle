import { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";

import {
  Main,
  Header,
  Title,
  SectionCustom,
  DivDrop,
  DivCustom,
  Button,
} from "./style";

import IconReturnPage from "../../../../../assets/IconReturnPage/arrow-u-left-top.svg";
import api from "../../../../../utils/api.ts";

import { ContextDialogController } from "../../../../../context/context.ts";
import { useGetId } from "../../../../../context/GetIdContext.tsx";

import useStatesUf from "../../../../../hooks/useStatesUf.ts";
import useCity from "../../../../../hooks/useCity.ts";
import useSchoolsByCity from "../../../../../hooks/useSchoolsByCity.ts";
import useTurmasBySchool from "../../../../../hooks/useTurmasBySchool.ts";
import useStudents from "../../../../../hooks/useStudents.ts";
import useAllTurmas from "../../../../../hooks/useAllTurmas.ts";
import { useUpdateEvaluate } from "../../../../../hooks/useUpdateTurmas.ts";

import MultiSelectCustom from "../../../../../components/MultiSelectCustom";
import SelectCustom from "../../../../../components/SelectCustom";
import ButtoSaveCustom from "../../../../../components/ButtomSaveCustom/Index.tsx";

import { IChangePage } from "../../../../../interfaces/index.tsx";
import { ITurmaInfo } from "../../../../../interfaces/IStudent.ts";

type AlunoSelecionado = {
  ID: number;
  IDPerfil: number;
  Nome: string;
  Email: string | null;
  Ativo: boolean;
  DataCadastro: string;
  DataNasc: string;
};

function StudentRegistrationPage({
  InternalPageControl,
  setInternalPageControl,
  turmasList,
}: IChangePage) {
  const [alunosSelecionados, setAlunosSelecionados] = useState<
    AlunoSelecionado[]
  >([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<number, string | null>
  >({});
  const [turmaInfo, setTurmaInfo] = useState<ITurmaInfo | null>(null);
  const [turmaEditInfo, setTurmaEditInfo] = useState<any[]>([]);

  const { open, setOpen } = useContext(ContextDialogController);
  const { getIdCode, setGetIdCode } = useGetId();

  const { students } = useStudents({
    turmaId: getIdCode || Number(selectedFilters[3]),
  });
  const { turmas } = useAllTurmas(undefined, Number(getIdCode) || undefined);
  const { updateEvaluate } = useUpdateEvaluate();

  const { states } = useStatesUf();
  const { city } = useCity({
    uf:
      turmaInfo?.net_escola?.net_cidades?.net_estados?.ID ??
      Number(selectedFilters[1]),
  });
  const { schools } = useSchoolsByCity({
    cityId: turmaInfo?.net_escola?.IDCidade ?? Number(selectedFilters[0]),
  });
  const { turmasBySchool } = useTurmasBySchool({
    schoolId: selectedFilters[2] ?? "",
  });

  const turmasFiltradas = turmasBySchool?.filter((turma: any) =>
    InternalPageControl !== "editar" ? !turmasList?.includes(turma.ID) : true
  );

  useEffect(() => {
    if (
      InternalPageControl === "editar" &&
      students?.turmaInfo &&
      turmas?.length > 0
    ) {
      setTurmaInfo(students.turmaInfo);
      setTurmaEditInfo(turmas);

      setSelectedFilters({
        1: students.turmaInfo.net_escola.IDCidade,
        0: students.turmaInfo.net_escola.net_cidades.net_estados.ID,
        2: turmas[0]?.IDEscola,
        3: turmas[0]?.ID,
      });

      const estudantesConvertidos = turmas[0].students.map((item: any) => ({
        ID: item.ntb_user_id,
        IDPerfil: item.ntb_user_id,
        Nome: item.name,
        Email: null,
        Ativo: true,
        DataCadastro: item.created_at,
        DataNasc: item.birth_date,
      }));

      setAlunosSelecionados(estudantesConvertidos);
    }
  }, [InternalPageControl, students, turmas]);

  const handleSelectChange = (index: number, value: string | null) => {
    if (selectedFilters[index] !== value) {
      setSelectedFilters((prev) => ({ ...prev, [index]: value }));
    }
  };

  const toggleInternalPageControl = () => {
    setInternalPageControl?.("lista");
    setGetIdCode(null);
  };

  const handleOpen = () => {
    setOpen?.(true);
  };

  const handleSubmit = async () => {
    const formatedValues = alunosSelecionados.map((aluno) => ({
      name: aluno.Nome,
      birthDate: aluno.DataNasc,
      ntbUserId: aluno.ID,
    }));

    const dataSubmit =
      InternalPageControl === "editar"
        ? {
            schoolId: turmas[0]?.IDEscola ?? "",
            turmaId: turmas[0]?.ID ?? "",
            cityId: students.turmaInfo?.net_escola?.IDCidade ?? "",
            ensino: turmas[0]?.IDTipoEnsino?.toString() ?? "",
            serie: turmas[0]?.IDSerie?.toString() ?? "",
            turma: turmas[0]?.IDTipoTurma?.toString() ?? "",
            turno: turmas[0]?.IDTurno?.toString() ?? "",
            students: formatedValues,
          }
        : {
            schoolId: selectedFilters[2],
            turmaId: selectedFilters[3],
            cityId: selectedFilters[1],
            students: formatedValues,
          };

    try {
      if (
        selectedFilters[2] &&
        selectedFilters[1] &&
        selectedFilters[3] &&
        InternalPageControl !== "editar"
      ) {
        await api.post("/add-new-many-students", dataSubmit);
        handleOpen();
      } else if (InternalPageControl === "editar") {
        const success = await updateEvaluate(dataSubmit);
        if (success) handleOpen();
      }
    } catch (e) {
      console.error("ERROR::", e);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isFormValid =
    selectedFilters[1] &&
    selectedFilters[0] &&
    selectedFilters[2] &&
    selectedFilters[3] &&
    alunosSelecionados.length > 0;

  return (
    <Main>
      <Header>
        <Title>
          {InternalPageControl === "cadastrar"
            ? "Cadastrar Alunos"
            : "Editar Alunos"}
        </Title>
        <Button onClick={toggleInternalPageControl}>
          <img src={IconReturnPage} alt="Voltar" />
          Voltar
        </Button>
      </Header>

      <SectionCustom gap="24px">
        <DivCustom>
          <SelectCustom
            width="122px"
            label="Estado"
            options={states}
            placeholder="UF"
            selectType={1}
            defaultValue={
              turmaInfo?.net_escola?.net_cidades?.net_estados?.ID?.toString() ??
              ""
            }
            onSelectChange={(value) => handleSelectChange(1, value)}
          />
          <SelectCustom
            width="23.75vw"
            label="Cidade"
            options={city}
            selectType={0}
            defaultValue={turmaInfo?.net_escola?.IDCidade ?? ""}
            onSelectChange={(value) => handleSelectChange(0, value)}
          />
        </DivCustom>

        <DivCustom>
          <SelectCustom
            width="23.75vw"
            label="Escola"
            options={schools}
            defaultValue={turmaEditInfo[0]?.IDEscola ?? ""}
            selectType={2}
            onSelectChange={(value) => handleSelectChange(2, value)}
          />
          <SelectCustom
            width="17.239vw"
            label="Turma"
            options={turmasFiltradas}
            defaultValue={turmaEditInfo[0]?.ID ?? ""}
            selectType={3}
            onSelectChange={(value) => handleSelectChange(3, value)}
          />
          <DivDrop>
            <MultiSelectCustom
              label="Aluno"
              width="17.23vw"
              options={students?.getAllStudents}
              selectType={4}
              defaultValue={alunosSelecionados}
              onSelectionChange={setAlunosSelecionados}
            />
          </DivDrop>
        </DivCustom>

        <Box sx={{ width: "112%", maxHeight: 600, overflow: "auto", mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              pb: 1,
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              NOME
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              DATA DE NASCIMENTO
            </Typography>
          </Box>

          <List>
            {alunosSelecionados.map((aluno, index) => (
              <ListItem
                key={index}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  mb: "12px",
                  p: "12px",
                  bgcolor: "#fff",
                  boxShadow: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#3f51b5" }}>
                    {aluno?.Nome ? aluno.Nome[0] : "?"}
                  </Avatar>
                </ListItemAvatar>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    ml: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {aluno.Nome}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <CakeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {aluno.DataNasc
                        ? formatarData(aluno.DataNasc)
                        : "Data não informada"}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </SectionCustom>

      <ButtoSaveCustom
        handleClick={handleSubmit}
        text="Salvar"
        open={open}
        disabled={!isFormValid}
      />
    </Main>
  );
}

export default StudentRegistrationPage;
