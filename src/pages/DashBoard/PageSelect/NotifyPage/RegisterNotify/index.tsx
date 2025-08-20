import React, { useContext } from "react";
import { Button, ButtonAgenda, ButtonEnvio, DivCustom, DivDrop, Header, Main, SectionCustom, Title } from "./style";
import { IChangePage } from "../../../../../interfaces";
import { ContextSelectedOptions } from "../../../../../context/context";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";

import IconReturnPage from "../../../../../assets/IconReturnPage/arrow-u-left-top.svg";
import SelectCustom from "../../../../../components/SelectCustom";
import { NotifyFormData, notifySchema } from "../SchemaNotify";
import TextFroala from "../../../../../components/TextFroala";
import useStatesUf from "../../../../../hooks/useStatesUf";
import { zodResolver } from "@hookform/resolvers/zod";
import useCity from "../../../../../hooks/useCity";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import useSchoolsByCity from "../../../../../hooks/useSchoolsByCity";
import { FormLabel } from "@mui/material";
import { showError } from "../../../../../utils/toast";
import MultiSelectCustom from "../../../../../components/MultiSelectCustom";

const RegisterNotify = ({ InternalPageControl, setInternalPageControl }: IChangePage) => {
  // ----------- Hook Form ---------

  const {
    // register,
    handleSubmit,
    control,
    // setValue,
    // getValues,
    watch,
    formState: { errors },
  } = useForm<NotifyFormData>({
    resolver: zodResolver(notifySchema),
    defaultValues: {
      estadoId: "",
      cidadeId: "",
      escolaId: [],
      destinatarioId: "",
      mensagem: "",
    },
  });
  const idState = watch("estadoId");
  const idCity = watch("cidadeId");

  const onSubmit = (data: NotifyFormData) => {
    console.log("form enviado", data);
  };

  // ----------- Context -----------
  const { selectedOptions } = useContext(ContextSelectedOptions);
  // const [text, setText] = useState("");

  const { states } = useStatesUf();
  console.log(states);
  const statesWithStringID = states.map((state: { ID: number; Sigla: string; Estado: string; Ativo: boolean }) => ({
    ...state,
    ID: String(state.ID),
  }));

  console.log(statesWithStringID);
  const { city } = useCity({ uf: idState });
  const cityWithStringID = city?.map((city: { ID: number; IDEstado: number; Cidade: string; Ativo: boolean }) => ({
    ...city,
    ID: String(city.ID),
  }));
  const { schools } = useSchoolsByCity({ cityId: idCity });
  console.log(schools);
  const schoolsWithStringID = schools?.map((school: { ID: number }) => ({
    ...school,
    ID: String(school.ID),
  }));
  const toggleInternalPageControl = () => {
    setInternalPageControl?.("lista");
  };
  const escolasId = watch("escolaId");
  console.log(escolasId);
  return (
    <Main>
      <Header>
        <Title>{InternalPageControl === "cadastrar" ? "Cadastrar Notificação" : "Editar Notificação"}</Title>
        <Title>{selectedOptions}</Title>
        <Button onClick={toggleInternalPageControl}>
          <img src={IconReturnPage} alt="Voltar" />
          Voltar
        </Button>
      </Header>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          showError("Preencha todos os campos");
          console.log({ errors });
        })}
      >
        <SectionCustom gap="24px">
          <DivCustom>
            {/* <DivDrop> */}
            <Controller
              control={control}
              name="estadoId"
              render={({ field }) => (
                <SelectCustom
                  hasErrors={!!errors.estadoId}
                  width="200px"
                  label="Estado"
                  selectType={1}
                  options={statesWithStringID}
                  defaultValue={field.value}
                  onSelectChange={field.onChange}
                />
              )}
            />

            {/* </DivDrop> */}
            <DivDrop>
              <Controller
                control={control}
                name="cidadeId"
                render={({ field }) => (
                  <SelectCustom
                    hasErrors={!!errors.cidadeId}
                    width="400px"
                    label="Cidade"
                    selectType={0}
                    options={
                      city && city.length > 0
                        ? [...cityWithStringID]
                        : [{ ID: "", Cidade: "Selecione um estado", disabled: true }]
                    }
                    defaultValue={field.value || ""}
                    InternalPageControl={InternalPageControl}
                    onSelectChange={field.onChange}
                  />
                )}
              />
            </DivDrop>
          </DivCustom>
          <DivCustom>
            <DivDrop>
              <Controller
                control={control}
                name="escolaId"
                render={({ field }) => (
                  <MultiSelectCustom
                    label="Escola"
                    placeholder="Selecione uma escola"
                    width="100%"
                    hasErrors={!!errors.escolaId}
                    onlyId
                    selectType={4}
                    options={
                      schools && schools.length > 0
                        ? [...schoolsWithStringID]
                        : [{ ID: "", Nome: "Selecione uma escola", disabled: true }]
                    }
                    defaultValue={field.value}
                    onSelectionChange={field.onChange}
                    gapLabel="16px"
                  />
                )}
              />
            </DivDrop>
            <DivDrop>
              <Controller
                control={control}
                name="destinatarioId"
                render={({ field }) => (
                  <MultiSelectCustom
                    label="Para"
                    hasErrors={!!errors.destinatarioId}
                    width="100%"
                    selectType={4}
                    // options={seriesOptions} // Passe aqui seu array real de opções
                    defaultValue={field.value}
                    onSelectionChange={field.onChange}
                  />
                )}
              />
            </DivDrop>
          </DivCustom>
          <DivCustom>
            <DivDrop>
              <FormLabel style={{ color: "black", fontWeight: "500", fontSize: "1.2rem" }}>Mensagem:</FormLabel>
              {/* {errors.mensagem && <p >{errors.mensagem.message}</p>} */}
              <Controller
                name="mensagem"
                control={control}
                render={({ field }) => (
                  <TextFroala
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    hasErrors={!!errors.mensagem}
                  />
                )}
              />
            </DivDrop>
          </DivCustom>
          <DivCustom>
            <ButtonEnvio type="submit">Enviar Mensagem</ButtonEnvio>
            <ButtonAgenda>
              <DateRangeTwoToneIcon />
              Agendar Envio
            </ButtonAgenda>
          </DivCustom>
        </SectionCustom>
      </form>
    </Main>
  );
};

export default RegisterNotify;
