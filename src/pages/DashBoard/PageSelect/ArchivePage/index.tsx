import SelectCustom from "../../../../components/SelectCustom/index.tsx";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconPdfUpload from "../../../../assets/IconPdfUpload/bxs_file-pdf.svg";
import {
  Main,
  Header,
  Title,
  SectionCustom,
  DivCustom,
  ButtonUpload,
  CardUpload,
  DivTextInCard,
  TitleFIle,
  BgIconPdf,
  InfoUpload,
  FileListContainer,
  FileItem,
  FileInfo,
  FileName,
  FileActions,
  DownloadButton,
  DeleteButton,
  FileDate,
  CloseIcon,
  FileContainer,
} from "./style";
import useCity from "../../../../hooks/useCity.ts";
import { useContext, useRef, useState } from "react";
import useSchoolsByCity from "../../../../hooks/useSchoolsByCity.ts";
import useTurmasBySchool from "../../../../hooks/useTurmasBySchool.ts";
import useStatesUf from "../../../../hooks/useStatesUf.ts";
import ButtoSaveCustom from "../../../../components/ButtomSaveCustom/Index.tsx";
import { ContextDialogController } from "../../../../context/context.ts";
import api from "../../../../utils/api.ts";
import useFile from "../../../../hooks/useFile.ts";
import DialogCustomSucess from "../../../../components/Dialogs/DIalogSucess/index.tsx";
import DialogDeleteConfirm from "../../../../components/Dialogs/DialogsDeletConfirm/index.tsx";
import IconRegisterSucessfully from "../../../../assets/IconEvaluationRegisterSucessfully/Group 43 (1).svg";
import { ICity, IEstado, ISchool, ITurma } from "../../../../interfaces/ISelects.ts";

type SelectedFilters = { [key: number]: string | string[] | null };

function ArchivePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { open, setOpen } = useContext(ContextDialogController);
  const [openDelet, setOpenDelet] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);

  const handleOpen = () => {
    setOpen?.(true);
  };

  const [selectedFilters, setSelectedFilters] = useState<{
    [key: number]: string | string[] | null;
  }>({});
  const [simulatedData, setSimulatedData] = useState({
    state_id: undefined,
    school_id: undefined,
    turmas_id: undefined,
    city_id: undefined,
    school: "",
    turma: "",
    city: "",
    file: null as File | null,
  });


  const { states } = useStatesUf();

  const { files, mutateFile } = useFile();
  console.log(files)

  const { city } = useCity({ uf: Number(selectedFilters[1]) });
  const { schools } = useSchoolsByCity({ cityId: Number(selectedFilters[0]) });
  const { turmasBySchool } = useTurmasBySchool({
    schoolId: Number(selectedFilters[2]),
  });

  const handleSelectChange = (index: number, value: string | string[] | null) => {
    setSelectedFilters((prev) => {
      const updated: SelectedFilters = { ...prev };

      if (index === 0 && value !== null) {
        const selectedCity = city.find((item: ICity) => item.ID === Number(value));
        updated[0] = selectedCity.ID;
        setSimulatedData((prev) => ({
          ...prev,
          city: selectedCity.Cidade,
          city_id: selectedCity.ID,
        }));
      } else if (index === 1 && value !== null) {
        const selectedState = states.find((item: IEstado) => item.ID === Number(value));
        updated[1] = selectedState.ID;
        setSimulatedData((prev) => ({
          ...prev,
          state_id: selectedState.ID,
        }));
      } else if (index === 2 && value !== null) {
        const selectedCity = schools.find((item: ISchool) => item.ID === Number(value));
        updated[2] = selectedCity.ID;
        setSimulatedData((prev) => ({
          ...prev,
          school: selectedCity.Nome,
          school_id: selectedCity.ID,
        }));
      } else if (index === 3 && value !== null) {
        const selectedCity = turmasBySchool.find((item: ITurma) => item.ID === Number(value));
        setSimulatedData((prev) => ({
          ...prev,
          turma: `${selectedCity.net_series.Serie} ${selectedCity.net_tiposturma.Tipo} - ${selectedCity.net_turnos.Turno}`,
          turmas_id: selectedCity.ID,
        }));
      } else {
        updated[index] = value;
      }

      return updated;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Apenas arquivos PDF são permitidos.");
      return;
    }

    setSimulatedData((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveFile = async () => {
    if (!simulatedData.file) {
      alert("Nenhum arquivo foi selecionado.");
      return;
    }

    const formData = new FormData();
    formData.append("file", simulatedData.file);
    formData.append("school_id", simulatedData.school_id ?? "");
    formData.append("turma_id", simulatedData.turmas_id ?? "");

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      console.log(formData)
      const response = await api.post("/upload-return-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Arquivo de retorno salvo com sucesso!") {
        setSelectedFilters({});
        setSimulatedData({
          state_id: undefined,
          school_id: undefined,
          turmas_id: undefined,
          city_id: undefined,
          school: "",
          turma: "",
          city: "",
          file: null as File | null,
        });
      }

      handleOpen();
      await mutateFile();
    } catch (error) {
      console.error("Erro no envio do arquivo:", error);
      alert("Erro ao salvar o arquivo.");
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    try {
      await api.delete(`/return-files/${fileId}`);
      mutateFile();
    } catch {
      alert("Erro ao excluir o arquivo.");
    }
  };

  const handleDelete = () => {
    setSimulatedData((prev) => ({
      ...prev,
      file: null,
    }));
  };

  return (
    <Main>
      <Header>
        <Title>Arquivos</Title>
      </Header>

      <SectionCustom gap="24px">
        <DivCustom>
          <SelectCustom
            width="8.541vw"
            label="Estado"
            options={states}
            placeholder="UF"
            defaultValue={simulatedData.state_id ?? ""}
            selectType={1}
            onSelectChange={(value) => handleSelectChange(1, value)}
          />

          <SelectCustom
            width="40.312vw"
            label="Cidade"
            options={city}
            selectType={0}
            defaultValue={simulatedData.city_id ?? ""}
            onSelectChange={(value) => handleSelectChange(0, value)}
          />
        </DivCustom>
        <DivCustom>
          <SelectCustom
            width="24.21vw"
            label="Escola"
            options={schools}
            selectType={2}
            defaultValue={simulatedData.school_id ?? ""}
            onSelectChange={(value) => handleSelectChange(2, value)}
          />
          <SelectCustom
            width="24.21vw"
            label="Turma"
            options={turmasBySchool}
            defaultValue={simulatedData.turmas_id ?? ""}
            selectType={3}
            onSelectChange={(value) => handleSelectChange(3, value)}
          />
        </DivCustom>
      </SectionCustom>

      <SectionCustom gap="32px">
        <CardUpload>
          {!simulatedData.file && (
            <BgIconPdf>
              <img src={IconPdfUpload} alt="Icone de Pdf" />
            </BgIconPdf>
          )}
          <DivTextInCard>
            {!simulatedData.file ? (
              <>
                <TitleFIle>Upload arquivo</TitleFIle>
                <InfoUpload>Apenas arquivos em PDF são aceitos.</InfoUpload>
              </>
            ) : (
              <FileContainer>
                <TitleFIle style={{ display: "flex", gap: "1rem", fontSize: ".8rem" }}>
                  {simulatedData.file.name}

                  <CloseIcon onClick={handleDelete} />
                </TitleFIle>
              </FileContainer>
            )}
          </DivTextInCard>
        </CardUpload>
        {!simulatedData.file && (
          <ButtonUpload onClick={handleClick}>
            <UploadFileIcon sx={{ color: "${(props) => props.theme.colors.gray3}" }} />
            Upload arquivo
          </ButtonUpload>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <ButtoSaveCustom handleClick={handleSaveFile} text="Salvar" open={open} />
      </SectionCustom>

      <FileListContainer>
        {files.map((file: { id: number; url_file: string; created_at: string }) => (
          <FileItem key={file.id}>
            <FileInfo>
              <FileName>{file.url_file.split("/").pop()}</FileName>
              <FileDate>{new Date(file.created_at).toLocaleString()}</FileDate>
            </FileInfo>
            <FileActions>
              <DownloadButton href={file.url_file} target="_blank" rel="noopener noreferrer">
                Visualizar
              </DownloadButton>
              <DeleteButton
                onClick={() => {
                  setSelectedFileId(file.id);
                  setOpenDelet(true);
                }}
              >
                Excluir
              </DeleteButton>
            </FileActions>
          </FileItem>
        ))}
      </FileListContainer>
      <DialogCustomSucess
        title={`Arquivo cadastrado com sucesso!`}
        textButton="Fechar"
        icon={IconRegisterSucessfully}
        returnPage="false"
      />
      <DialogDeleteConfirm
        open={openDelet}
        onClose={() => setOpenDelet(false)}
        onConfirm={() => {
          if (selectedFileId !== null) {
            handleDeleteFile(selectedFileId);
            setOpenDelet(false);
          }
        }}
        texto={"arquivo"}
      />
    </Main>
  );
}

export default ArchivePage;
