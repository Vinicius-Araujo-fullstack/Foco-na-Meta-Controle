import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { IChangePage } from "../../../../../interfaces";
import { IAnswers, IEvaluateData } from "../../../../../interfaces/evaluate";

import {
  ContextSelectedOptions,
  ContextDialogController,
} from "../../../../../context/context";
import { useGetId } from "../../../../../context/GetIdContext";
import useDisciplines from "../../../../../hooks/useDisciplines";
import useAllEvaluate from "../../../../../hooks/useAllEvaluate";
import { useEvaluationSubmit } from "../../../../../hooks/useEvaluationSubmit";
import { useAnswersByEvaluateId } from "../../../../../hooks/useAnswersByEvaluateId";
import { usePutAnswer } from "../../../../../hooks/useAnswerPut";
import { useEvaluateByCode } from "../../../../../hooks/useEvaluateByCode";

import SelectCustom from "../../../../../components/SelectCustom";
import ButtoSaveCustom from "../../../../../components/ButtomSaveCustom/Index";

import IconReturnPage from "../../../../../assets/IconReturnPage/arrow-u-left-top.svg";

import {
  Main,
  Header,
  Title,
  SectionCustom,
  DivDrop,
  DivCustom,
  Button,
  DivBlock,
  ContainerSelectResponse,
  TitleBLock,
} from "./style";

const RegisterReviews = ({
  InternalPageControl,
  setInternalPageControl,
}: IChangePage): JSX.Element | null => {
  
  const theme = useTheme();
  const numberOfBlocks = 11;

  // -------- Context ----------
  const { selectedOptions } = useContext(ContextSelectedOptions);
  const { open, setOpen } = useContext(ContextDialogController);
  const { getIdCode } = useGetId();
  
  // -------- States ----------
  const [blockOne, setBlockOne] = useState<IAnswers>({ block_number: 1 });
  const [blockTwo, setBlockTwo] = useState<IAnswers>({ block_number: 2 });
  const [evaluationData, setEvaluationData] = useState<IEvaluateData>({
    school_year: null,
    simulate_num: null,
    evaluate_version: null,
    discipline_id: null,
  });

  // -------- Hooks ----------
  const { disciplines } = useDisciplines();
  const disciplineOptions = disciplines?.map(({ id, name }) => ({
    name,
    ID: id,
  }));

  const { mutateEvaluate } = useAllEvaluate();
  const { submitEvaluation } = useEvaluationSubmit();
  const { evaluate, loading: loadingEdit } = useEvaluateByCode(getIdCode);
  const { answers, loading: loadingAnswers } = useAnswersByEvaluateId(
    evaluate?.id || ""
  );
  const { putAnswer } = usePutAnswer();
  
  // -------- Options ----------
  const seriesOptions = Array.from({ length: 9 }, (_, i) => ({
    ID: String(i + 1),
    name: `${i + 1}º Ano`,
  }));
  
  const numEvaluate = Array.from({ length: 20 }, (_, i) => ({
    ID: String(i + 1),
    name: `A${i + 1}`,
  }));
  
  const numVersion = Array.from({ length: 20 }, (_, i) => ({
    ID: String(i + 1),
    name: `V${i + 1}`,
  }));
  
  // -------- Effects ----------
  useEffect(() => {
    if (InternalPageControl === "editar" && evaluate) {
      setEvaluationData({
        evaluate_version: evaluate.evaluate_version,
        school_year: evaluate.school_year,
        simulate_num: evaluate.simulate_num,
        discipline_id: evaluate.discipline_id,
        discipline_name: evaluate.discipline.name,
      });
    }
  }, [InternalPageControl, evaluate]);

  useEffect(() => {
    if (InternalPageControl === "editar" && answers.length > 0) {
      const updateBlock = (
        blockNumber: number,
        setBlock: React.Dispatch<React.SetStateAction<IAnswers>>
      ) => {
        const block = answers.find((a) => a.block_number === blockNumber);
        if (!block) return;

        const formatted = Object.fromEntries(
          Object.entries(block)
            .filter(([key]) => key.startsWith("q"))
            .map(([key, value]) => [key, value || ""])
        );

        setBlock((prev) => ({ ...prev, ...formatted }));
      };

      updateBlock(1, setBlockOne);
      updateBlock(2, setBlockTwo);
    }
  }, [answers, InternalPageControl]);
  
  // -------- Handlers ----------
  const handleSelectChange = <K extends keyof IEvaluateData>(
    key: K,
    value: IEvaluateData[K] | string
  ) => {
    const parsed =
      ["school_year", "simulate_num", "evaluate_version"].includes(
        key as string
      ) && typeof value === "string"
      ? Number(value)
        : value;

    setEvaluationData((prev) => ({ ...prev, [key]: parsed }));
  };
  
  const handleSaveEvaluation = async () => {
    if (InternalPageControl === "cadastrar") {
      const result = await submitEvaluation(evaluationData, blockOne, blockTwo);
      if (result.success) {
        setOpen?.(true);
        await mutateEvaluate();
      } else {
        console.error(result.error || "Erro desconhecido");
      }
    }
    
    if (InternalPageControl === "editar" && evaluate?.id) {
      try {
        const [res1, res2] = await Promise.all([
          putAnswer(evaluate.id, blockOne),
          putAnswer(evaluate.id, blockTwo),
        ]);
        
        if (res1 && res2) {
          setOpen?.(true);
        } else {
          console.error("Erro ao atualizar os blocos.");
        }
      } catch (err) {
        console.error("Erro ao tentar salvar as respostas:", err);
      }
    }
  };
  
  const toggleInternalPageControl = () => {
    setInternalPageControl?.("lista");
  };
  
  const allQuestionsFilled = (block: IAnswers) =>
    Array.from({ length: numberOfBlocks }).every((_, i) => block[`q${i + 1}`]);

  const isSaveDisabled =
  !evaluationData.discipline_id ||
  !evaluationData.school_year ||
  !evaluationData.simulate_num ||
  !evaluationData.evaluate_version ||
  !allQuestionsFilled(blockOne) ||
  !allQuestionsFilled(blockTwo);

  if (InternalPageControl === "editar" && (loadingEdit || loadingAnswers)) {
    return <p>Carregando simulado para edição...</p>;
  }
  
  const renderBlock = (
    title: string,
    block: IAnswers,
    setBlock: React.Dispatch<React.SetStateAction<IAnswers>>
  ) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TitleBLock>{title}</TitleBLock>
      <DivBlock>
        {Array.from({ length: numberOfBlocks }).map((_, index) => (
          <ContainerSelectResponse key={index}>
            {index + 1}.
            <FormControl>
              <RadioGroup
                row
                name={`question-${index + 1}`}
                value={block[`q${index + 1}`] || ""}
                onChange={(e) =>
                  setBlock((prev) => ({
                    ...prev,
                    [`q${index + 1}`]: e.target.value,
                  }))
                }
                sx={{ gap: "16px" }}
                >
                {["A", "B", "C", "D"].map((option) => (
                  <FormControlLabel
                  key={option}
                    value={option}
                    control={
                      <Radio
                        sx={{
                          color: theme.colors.gray3,
                          width: "24px",
                          height: "24px",
                          "&.Mui-checked": {
                            color: "#1976D2",
                          },
                        }}
                      />
                    }
                    label={`${option}.`}
                    labelPlacement="start"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      transform: "scale(0.95)",
                      width: "43px",
                      height: "24px",
                      margin: 0,
                      padding: "2px",
                      color: theme.colors.gray3,
                      gap: "4px",
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </ContainerSelectResponse>
        ))}
      </DivBlock>
    </div>
  );

  if (!InternalPageControl) return null;
  return (
    <Main>
      <Header>
        <Title>
          {InternalPageControl === "cadastrar"
            ? "Cadastrar Avaliação"
            : "Editar Avaliação"}
        </Title>
        <Title>{selectedOptions}</Title>
        <Button onClick={toggleInternalPageControl}>
          <img src={IconReturnPage} alt="Voltar" />
          Voltar
        </Button>
      </Header>

      <SectionCustom gap="24px">
        <DivCustom>
          <DivDrop>
            <SelectCustom
              width="100%"
              label="Disciplina"
              selectType={4}
              options={disciplineOptions}
              defaultValue={evaluationData.discipline_id}
              InternalPageControl={InternalPageControl}
              onSelectChange={(value) =>
                handleSelectChange("discipline_id", value)
              }
            />
          </DivDrop>
          <DivDrop>
            <SelectCustom
              width="200px"
              label="Série"
              selectType={4}
              options={seriesOptions}
              defaultValue={evaluationData.school_year}
              InternalPageControl={InternalPageControl}
              onSelectChange={(value) =>
                handleSelectChange("school_year", value)
              }
            />
          </DivDrop>
        </DivCustom>
        <DivCustom width="70%">
          <DivDrop>
            <SelectCustom
              width="100%"
              label="Número da Avaliação"
              selectType={4}
              options={numEvaluate}
              defaultValue={evaluationData.simulate_num}
              InternalPageControl={InternalPageControl}
              onSelectChange={(value) =>
                handleSelectChange("simulate_num", value)
              }
            />
          </DivDrop>
          <DivDrop>
            <SelectCustom
              width="100%"
              label="Número da Versão"
              selectType={4}
              options={numVersion}
              defaultValue={evaluationData.evaluate_version}
              InternalPageControl={InternalPageControl}
              onSelectChange={(value) =>
                handleSelectChange("evaluate_version", value)
              }
            />
          </DivDrop>
        </DivCustom>
      </SectionCustom>

      {renderBlock("Bloco 1", blockOne, setBlockOne)}
      {renderBlock("Bloco 2", blockTwo, setBlockTwo)}

      <ButtoSaveCustom
        handleClick={handleSaveEvaluation}
        open={open}
        text="Salvar avaliação"
        disabled={isSaveDisabled}
      />
    </Main>
  );
};

export default RegisterReviews;
