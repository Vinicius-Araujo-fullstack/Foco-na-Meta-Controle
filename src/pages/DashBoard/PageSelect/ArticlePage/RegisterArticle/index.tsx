import React, { useContext, useRef, useState } from "react";
import {
  Button,
  ButtonArticle,
  ButtonEnvio,
  Container,
  DivCustom,
  DivDropInput,
  Header,
  Input,
  InputArticle,
  Main,
  PasteButton,
  SectionCustom,
  StyledIcon,
  Text,
  Title,
} from "./style";
import { IChangePage } from "../../../../../interfaces";
import { ContextDialogController, ContextSelectedOptions } from "../../../../../context/context";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
import IconRegisterSucessfully from "../../../../../assets/IconEvaluationRegisterSucessfully/Group 43 (1).svg";
// /assets/IconEvaluationRegisterSucessfully/Group 43 (1).svg";

import IconReturnPage from "../../../../../assets/IconReturnPage/arrow-u-left-top.svg";
import { FormLabel } from "@mui/material";
import { AdminContext } from "../../../../../context/AdminContext/context";
import { Controller, useForm } from "react-hook-form";
import { ArticleFormData, articleSchema } from "../SchemaArticle";
import { zodResolver } from "@hookform/resolvers/zod";
import { showError } from "../../../../../utils/toast";
import { FlexRow } from "../style";
import { postArticle } from "../../../../../services/articleService";
import DialogSucess from "../../../../../components/Dialogs/DIalogSucess";

const RegisterArticle = ({ InternalPageControl, setInternalPageControl }: IChangePage) => {
  const inputRefLink = useRef<HTMLInputElement | null>(null);
  const inputRefImage = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  // ----------- Context -----------
  const { selectedOptions } = useContext(ContextSelectedOptions);
  const { admin } = useContext(AdminContext);
  const { open, setOpen } = useContext(ContextDialogController);
  console.log(admin);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      article_url: "",
      file: null,
      author_id: admin?.id,
      subtitle: "",
      title: "",
      published: true,
    },
  });

const onSubmit = async (data: ArticleFormData) => {
  setLoading(true);  // começa o loading
  try {
    console.log("form enviado", data);
    const res = await postArticle(data);
    console.log(res);
    if (res.message === "Artigo criado com sucesso") {
      setOpen?.(true);
    }
  } catch (error) {
    // Trate erro aqui, se quiser
    console.error("Erro no envio:", error);
  } finally {
    setLoading(false); // para loading ao finalizar (sucesso ou erro)
  }
};

  // const [text, setText] = useState("");

  const toggleInternalPageControl = () => {
    setInternalPageControl?.("lista");
  };

  const handlePasteLink = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (inputRefLink.current) {
        inputRefLink.current.value = text;
        // opcional: você pode emitir esse valor para o state, formik, etc
        inputRefLink.current.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Erro ao colar do clipboard: " + err.message);
      } else {
        alert("Erro ao colar do clipboard");
      }
    }
  };
  // const handlePasteImage = async () => {
  //   try {
  //     const text = await navigator.clipboard.readText();
  //     if (inputRefImage.current) {
  //       inputRefImage.current.value = text;
  //       // opcional: você pode emitir esse valor para o state, formik, etc
  //       inputRefImage.current.dispatchEvent(new Event("input", { bubbles: true }));
  //     }
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       alert("Erro ao colar do clipboard: " + err.message);
  //     } else {
  //     }
  //       alert("Erro ao colar do clipboard");
  //   }
  // };

  const handleImage = () => {
    inputRefImage.current?.click();
  };

  const fileList = watch("file");

  console.log(fileList);
  const fileName = fileList && fileList.length > 0 ? fileList[0].name : "";

  return (
    <Main>
      <Header>
        <Title>{InternalPageControl === "cadastrar" ? "Artigos:" : "Artigos:"}</Title>
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
            <DivDropInput>
              <FormLabel style={{ color: "black", fontWeight: "500", fontSize: "1.2rem" }}>Título:</FormLabel>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <InputArticle
                    placeholder="Digite o título"
                    value={field.value}
                    onChange={field.onChange}
                    hasErrors={!!errors.title}
                  />
                )}
              />
            </DivDropInput>
            <DivDropInput>
              <FormLabel style={{ color: "black", fontWeight: "500", fontSize: "1.2rem" }}>Subtítulo:</FormLabel>
              <Controller
                control={control}
                name="subtitle"
                render={({ field }) => (
                  <InputArticle
                    placeholder="Digite o título"
                    value={field.value}
                    onChange={field.onChange}
                    hasErrors={!!errors.subtitle}
                  />
                )}
              />
            </DivDropInput>
          </DivCustom>
          <DivCustom>
            <DivDropInput>
              <FormLabel style={{ color: "black", fontWeight: "500", fontSize: "1.2rem" }}>Link:</FormLabel>
              <Controller
                control={control}
                name="article_url"
                render={({ field }) => (
                  <Container hasErrors={!!errors.article_url}>
                    <StyledIcon />
                    <Input ref={inputRefLink} type="text" value={field.value} onChange={field.onChange} />
                    <PasteButton type="button" onClick={handlePasteLink}>Colar</PasteButton>
                  </Container>
                )}
              />
            </DivDropInput>
          </DivCustom>
          <DivCustom>
            <DivDropInput>
              <FormLabel style={{ color: "black", fontWeight: "500", fontSize: "1.2rem" }}>Link da imagem:</FormLabel>
              <Controller
                control={control}
                name="file"
                render={({ field }) => (
                  <Container hasErrors={!!errors.file}>
                    <StyledIcon />
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={inputRefImage}
                    />
                    <FlexRow>
                      {fileName ? <Text>{fileName}</Text> : <Text></Text>}

                      <PasteButton type="button" onClick={handleImage}>
                        {!fileName ? "Anexar" : "Alterar"}
                      </PasteButton>
                    </FlexRow>
                  </Container>
                )}
              />
            </DivDropInput>
          </DivCustom>
          <DivCustom>
            <ButtonEnvio type="submit" disabled={loading}>{loading ? "Publicando..." : "Publicar Artigo"}</ButtonEnvio>

            <ButtonArticle>
              <DateRangeTwoToneIcon />
              Agendar Publicação
            </ButtonArticle>
          </DivCustom>
        </SectionCustom>
      </form>
      <DialogSucess
        open={open}
        title={`Artigo criado com sucesso!`}
        textButton="Voltar para a tela inicial"
        icon={IconRegisterSucessfully}
        returnPage={"true"}
        setInternalPageControl={setInternalPageControl}
      />
    </Main>
  );
};

export default RegisterArticle;
