import { useContext, useEffect, useState } from "react";
import { IChangePage, IEvaluate, ISegment } from "../../../../../interfaces/index.ts";
import ButtoSaveCustom from "../../../../../components/ButtomSaveCustom/Index.tsx";
import SelectCustom from "../../../../../components/SelectCustom/index.tsx";
import IconReturnPage from "../../../../../assets/IconReturnPage/arrow-u-left-top.svg";
import MultiSelectCustom from "../../../../../components/MultiSelectCustom/index.tsx";

import dayjs, { Dayjs } from "dayjs";

import { ContextSelectedOptions, ContextDialogController } from "../../../../../context/context.ts";
import { Main, Header, Title, SectionCustom, DivCustom, Button } from "./style";
import DataPickerCustom from "../../../../../components/DataPickerCustom/index.tsx";
import useStatesUf from "../../../../../hooks/useStatesUf.ts";
import useCity from "../../../../../hooks/useCity.ts";
import useSchoolsByCity from "../../../../../hooks/useSchoolsByCity.ts";
import useTurmasBySchool from "../../../../../hooks/useTurmasBySchool.ts";
import useAllEvaluate from "../../../../../hooks/useAllEvaluate.ts";
import useProfSchool from "../../../../../hooks/useProfSchool.ts";
import { useSimulatedSubmit } from "../../../../../hooks/useSimulatedSubmit.ts";
import { ISimulatedData } from "../../../../../interfaces/simulated.ts";
import { useGetId } from "../../../../../context/GetIdContext.tsx";
import { useSimulatedByCode } from "../../../../../hooks/useSimulatedById.ts";
import { useSimulatedUpdate } from "../../../../../hooks/useSimulatedUpdate.ts";
import { showError } from "../../../../../utils/toast.ts";
import useAllSimulated from "../../../../../hooks/useAllSimulated.ts";
import { toast } from "react-toastify";
import { ICity, ISchool, ITurma } from "../../../../../interfaces/ISelects.ts";

type SelectedFilters = { [key: number]: string | string[] | null };

function RegisterSimulations({ InternalPageControl, setInternalPageControl }: IChangePage) {
  const { getIdCode, setGetIdCode } = useGetId();

  const { simulated, setSimulated, loading: loadingEdit } = useSimulatedByCode(getIdCode);
  console.log(simulated);

  // ---------------- USE STATE ----------------
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: number]: string | string[] | null;
  }>({});

  // if (!InternalPageControl) return null;

  const [selectedDateSimulated, setSelectedDateSimulated] = useState<string | null>(null);
  const [selectedDateGabarito, setSelectedDateGabarito] = useState<string | null>(null);
  const [selectedDateAnalise, setSelectedDateAnalise] = useState<string | null>(null);
  const [selectedDateDevolutiva, setSelectedDateDevolutiva] = useState<string | null>(null);

  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  const [simulatedData, setSimulatedData] = useState<ISimulatedData>({
    id: "",
    idState: "",
    name: "",
    school_id: undefined,
    turmas_id: [],
    city_id: undefined,
    school: "",
    turma: "",
    city: "",
    prof_resp: undefined,
    aplication_date: "",
    gabarito_date: "",
    analise_date: "",
    devolutiva_date: "",
    evaluates: [],
  });

  console.log(simulatedData);

  useEffect(() => {
    const {
      id,
      idState,
      name,
      school_id,
      turmas_id,
      city_id,
      school,
      turma,
      city,
      prof_resp,
      aplication_date,
      gabarito_date,
      evaluates,
    } = simulatedData;

    // Lista de campos obrigatórios
    const requiredFields = [
      id,
      idState,
      name,
      school_id,
      Array.isArray(turmas_id) && turmas_id.length > 0 ? "ok" : "",
      city_id,
      school,
      turma,
      city,
      prof_resp,
      aplication_date,
      gabarito_date,
      Array.isArray(evaluates) && evaluates.length > 0 ? "ok" : "",
    ];

    // Se algum estiver vazio/undefined → desabilita
    const hasEmpty = requiredFields.some((field) => field === "" || field === undefined);

    setIsDisabledBtn(hasEmpty);
  }, [simulatedData]);

  useEffect(() => {
    if (InternalPageControl === "editar" && simulated) {
      const {
        id,
        name,
        school_id,
        turmas_id,
        city_id,
        school,
        city,
        prof_resp,
        aplication_date,
        gabarito_date,
        analise_date,
        devolutiva_date,
        state,
        teacher,
        evaluate,
      } = simulated.getSimulated;
      console.log(simulated);

      setSimulatedData({
        id: id,
        idState: state.ID,
        name: name || "",

        school_id,
        turmas_id: Array.isArray(turmas_id) ? turmas_id : [],
        city_id,
        school: school || "",
        // turma: turma || '',
        city: city || "",
        prof_resp,
        aplication_date: aplication_date || "",
        gabarito_date: gabarito_date || "",
        analise_date: analise_date || "",
        devolutiva_date: devolutiva_date || "",
        evaluates:
          simulated.getSimulated?.SimulatedEvaluates?.map((el: { evaluate_id: string }) => el?.evaluate_id) || [],
      });

      setSelectedFilters({
        0: city_id || null,
        1: null,
        2: school_id || null,
        3: turmas_id?.[0] || null,
        4: name || "",
        5: Array.isArray(evaluate) ? evaluate.map((el: { evaluate_id: string }) => el.evaluate_id) : [],
        6: prof_resp || null,
        7: teacher,
      });

      setSelectedDateSimulated(aplication_date || null);
      setSelectedDateGabarito(gabarito_date || null);
      setSelectedDateAnalise(analise_date || null);
      setSelectedDateDevolutiva(devolutiva_date || null);
    }
  }, [InternalPageControl, simulated]);

  useEffect(() => {
    if (selectedFilters[7]) {
      setSimulatedData((prev) => ({
        ...prev,
        name: selectedFilters[4] || "",
        school_id: selectedFilters[2] ? Number(selectedFilters[2]) : undefined,
        turmas_id: selectedFilters[3] ? [Number(selectedFilters[3])] : undefined,

        city_id: selectedFilters[0] ? Number(selectedFilters[0]) : undefined,
        evaluates: simulatedData.evaluates,
        aplication_date: selectedDateSimulated ? selectedDateSimulated : "",
        gabarito_date: selectedDateGabarito ? selectedDateGabarito : "",
        analise_date: selectedDateAnalise ? selectedDateAnalise : "",
        devolutiva_date: selectedDateDevolutiva ? selectedDateDevolutiva : "",
        prof_resp: selectedFilters[7] ? Number(selectedFilters[6]) : 5555,

        teacher: Array.isArray(selectedFilters[7])
          ? { ID: null, Nome: "" }
          : typeof selectedFilters[7] === "string" || selectedFilters[7] === null
            ? { ID: null, Nome: selectedFilters[7] || "" }
            : selectedFilters[7],
      }));
    }
  }, [selectedFilters, selectedDateDevolutiva]);

  const { states } = useStatesUf();

  const simulados = Array.from({ length: 4 }, (_, i) => ({
    ID: "i + 1",
    name: `Simulado ${i + 1}`,
  }));

  const { city } = useCity({
    uf: simulated !== null ? simulated.getSimulated.state.ID : Number(selectedFilters[1]),
  });
  const { schools } = useSchoolsByCity({ cityId: Number(selectedFilters[0]) });
  console.log(schools);
  const { turmasBySchool } = useTurmasBySchool({
    schoolId: Number(selectedFilters[2]),
  });

  const { teachers } = useProfSchool({
    schoolId: selectedFilters[2],
    turmaId: selectedFilters[3],
  });

  const { evaluate } = useAllEvaluate();
  const optionsEvaluate = evaluate?.map((evaluate: IEvaluate) => ({
    ID: evaluate.id,
    Nome: `${evaluate.discipline.name} ${evaluate.code}`,
  }));
  console.log(optionsEvaluate);

  // -------------- GET SEGMENTO ---------------
  const headersDropSegment: ISegment[] = [
    {
      ID: "0",
      name: "Infantil",
    },
    {
      ID: "1",
      name: "Fundamental I",
    },
    {
      ID: "2",
      name: "Fundamental II",
    },
  ];

  const toggleInternalPageControl = () => {
    setGetIdCode(null);
    setSimulated(null);
    if (setInternalPageControl) {
      setInternalPageControl("lista");
    }
  };

  // --------------------- HANDLE ----------------------
  const handleSelectChange = (index: number, value: string | string[] | null) => {
    console.log(value);
    setSelectedFilters((prev) => {
      const updated: SelectedFilters = { ...prev };
      if (index === 0 && value !== null) {
        const selectedCity = city.find((item: ICity) => item.ID === Number(value));
        setSimulatedData((prev) => ({
          ...prev,
          city_id: value !== null ? Number(value) : undefined,
          city: selectedCity.Cidade,
        }));
      } else if (index === 1) {
        setSimulatedData((prev) => ({
          ...prev,
          idState: value !== null ? String(value) : undefined,
        }));
      } else if (index === 2 && value !== null) {
        const selectedSchool = schools.find((item: ISchool) => item.ID === Number(value));
        setSimulatedData((prev) => ({
          ...prev,
          school_id: value !== null ? Number(value) : undefined,
          school: selectedSchool.Nome,
        }));
      } else if (index === 3 && value !== null) {
        const selectedCity = turmasBySchool.find((item: ITurma) => item.ID === Number(value));
        setSimulatedData((prev) => ({
          ...prev,
          turmas_id: value !== null ? [Number(value)] : [],
          turma: `${selectedCity.net_series.Serie} ${selectedCity.net_tiposturma.Tipo} - ${selectedCity.net_turnos.Turno}`,
        }));
      }

      if (index === 4) {
        setSimulatedData((prev: ISimulatedData) => ({
          ...prev,
          name: value !== null ? value : "",
        }));
      }

      if (index === 5 && Array.isArray(value)) {
        const evaluateIds = (value as (string | { ID: string })[]).map((val) =>
          typeof val === "string" ? val : val.ID
        );
        console.log(evaluateIds);
        updated[index] = evaluateIds;

        setSimulatedData((prev: ISimulatedData) => ({
          ...prev,
          evaluates: evaluateIds,
        }));
      } else {
        updated[index] = value;
      }

      if (index === 6) {
        setSimulatedData((prev) => ({
          ...prev,
          prof_resp: value !== null ? Number(value) : undefined,
        }));
      } else if (index === 7) {
        const selectedSegment = headersDropSegment.find(
          (segment) => segment.ID === value || segment.ID === String(value) || segment.name === value
        );
        setSimulatedData((prev) => ({
          ...prev,
          segmento:
            value !== null && selectedSegment
              ? { ID: Number(selectedSegment.ID), name: selectedSegment.name }
              : undefined,
        }));
      }

      return updated;
    });
  };

  const handleDateChange = (date: Dayjs | null, field: string) => {
    const formattedDate = date ? date.toISOString() : null;

    switch (field) {
      case "simulated":
        setSimulatedData((prev) => ({
          ...prev,
          aplication_date: formattedDate || undefined,
        }));
        setSelectedDateSimulated(formattedDate);
        break;
      case "gabarito":
        setSimulatedData((prev) => ({
          ...prev,
          gabarito_date: formattedDate || undefined,
        }));
        setSelectedDateGabarito(formattedDate);
        break;
      case "analise":
        setSimulatedData((prev) => ({
          ...prev,
          analise_date: formattedDate || undefined,
        }));
        setSelectedDateAnalise(formattedDate);
        break;
      case "devolutiva":
        setSimulatedData((prev) => ({
          ...prev,
          devolutiva_date: formattedDate || undefined,
        }));
        setSelectedDateDevolutiva(formattedDate);
        break;
      default:
        break;
    }
  };

  const { selectedOptions } = useContext(ContextSelectedOptions);
  const { open, setOpen } = useContext(ContextDialogController);

  const { submitSimulated } = useSimulatedSubmit();
  const { updateSimulated } = useSimulatedUpdate();
  const { mutateSimulateds } = useAllSimulated();

  const handleSaveSimulated = async () => {
    if (InternalPageControl === "cadastrar") {
      const result = await submitSimulated(simulatedData);
      if (result.success) {
        setOpen?.(true);
        await mutateSimulateds();
      } else {
        showError(result.error);
        console.error(result.error || "Erro desconhecido");
      }
    } else {
      const result = await updateSimulated(simulatedData);
      await mutateSimulateds();
      if (result.success) {
        setOpen?.(true);
      } else if (typeof result.error === "string") {
        toast.error(result.error);
      } else if (typeof result.error === "object" && result.error !== null && "message" in result.error) {
        toast.error((result.error as { message: string }).message);
      } else {
        toast.error("Erro desconhecido ao atualizar o simulado");
      }
    }
  };

  if (InternalPageControl === "editar" && loadingEdit) {
    return <p>Carregando simulado para edição...</p>;
  }

  return (
    <Main>
      <Header>
        <Title> {InternalPageControl === "cadastrar" ? "Cadastrar Simulado" : "Editar Simulado"}</Title>
        <Title>{selectedOptions}</Title>
        <Button onClick={toggleInternalPageControl}>
          <img src={IconReturnPage} alt="Icone do botão para retornar a página" />
          Voltar
        </Button>
      </Header>

      <SectionCustom gap="24px">
        <DivCustom>
          <SelectCustom
            width="15vw"
            label="Estado"
            options={states}
            placeholder="UF"
            defaultValue={simulatedData.idState}
            selectType={1}
            onSelectChange={(value) => handleSelectChange(1, value)}
          />

          <SelectCustom
            width="30vw"
            label="Cidade"
            options={city}
            selectType={0}
            defaultValue={selectedFilters[0]} // cidade ID
            onSelectChange={(value) => handleSelectChange(0, value)}
          />
        </DivCustom>
        <DivCustom>
          <SelectCustom
            width="100%"
            label="Escola"
            options={schools}
            selectType={2}
            defaultValue={simulatedData.school_id}
            onSelectChange={(value) => handleSelectChange(2, value)}
          />

          <SelectCustom
            label="Segmento"
            width="100%"
            selectType={4}
            options={headersDropSegment}
            defaultValue={simulatedData.segmento?.ID}
            onSelectChange={(value) => {
              handleSelectChange(7, value); //
            }}
          />

          <SelectCustom
            width="100%"
            label="Turma"
            options={turmasBySchool}
            selectType={3}
            defaultValue={selectedFilters[3]}
            onSelectChange={(value) => handleSelectChange(3, value)}
          />
        </DivCustom>
        <DivCustom>
          <SelectCustom
            width="100%"
            label="Simulado"
            selectType={5}
            options={simulados}
            defaultValue={Array.isArray(simulatedData.name) ? simulatedData.name[0] : simulatedData.name}
            onSelectChange={(value) => handleSelectChange(4, value)}
          />

          <MultiSelectCustom
            width="33vw"
            label="Avaliações"
            options={optionsEvaluate}
            defaultValue={
              InternalPageControl === "editar"
                ? simulated?.getSimulated?.SimulatedEvaluates?.map(
                    (el: { id: string; created_at: string; evaluate_id: string; simulated_id: string }) =>
                      el.evaluate_id
                  ) || []
                : ""
            }
            onSelectionChange={(selected) => {
              console.log(selected);
              handleSelectChange(5, selected);
            }}
          />
        </DivCustom>
        <DivCustom>
          <DataPickerCustom
            width="100%"
            placeholder="Definir data"
            label="Simulado aplicado em:"
            gapLabel="16px"
            justify="start"
            position="relative"
            value={selectedDateSimulated ? dayjs(selectedDateSimulated) : null}
            onChange={(date) => handleDateChange(date, "simulated")}
          />

          <DataPickerCustom
            width="100%"
            placeholder="Definir data"
            label="Gabarito liberado em:"
            gapLabel="16px"
            justify="start"
            position="relative"
            value={selectedDateGabarito ? dayjs(selectedDateGabarito) : null}
            onChange={(date) => handleDateChange(date, "gabarito")}
          />

          <DataPickerCustom
            width="100%"
            placeholder="Definir data"
            label="Análise liberada em:"
            gapLabel="16px"
            justify="start"
            position="relative"
            value={selectedDateAnalise ? dayjs(selectedDateAnalise) : null}
            onChange={(date) => handleDateChange(date, "analise")}
          />

          <DataPickerCustom
            width="100%"
            placeholder="Definir data"
            label="Devolutiva liberada em:"
            gapLabel="16px"
            justify="start"
            position="relative"
            value={selectedDateDevolutiva ? dayjs(selectedDateDevolutiva) : null}
            onChange={(date) => handleDateChange(date, "devolutiva")}
          />
        </DivCustom>
        <DivCustom>
          <SelectCustom
            width="29vw"
            options={teachers}
            selectType={2}
            // isMulti={false}
            label="Professor(a) responsável"
            defaultValue={selectedFilters[6]}
            onSelectChange={(value) => handleSelectChange(6, value)}
          />
        </DivCustom>
      </SectionCustom>
      <ButtoSaveCustom handleClick={handleSaveSimulated} disabled={isDisabledBtn} text="Salvar" open={open} />
    </Main>
  );
}

export default RegisterSimulations;
