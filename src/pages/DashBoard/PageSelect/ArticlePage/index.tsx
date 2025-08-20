import { useState } from "react";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import RegisterArticle from "./RegisterArticle";
import DrawerCustom from "../../../../components/DrawerCustom";
import useCity from "../../../../hooks/useCity";
import useStatesUf from "../../../../hooks/useStatesUf";
import useSchoolsByCity from "../../../../hooks/useSchoolsByCity";
import { Button, Flex, Header, Main, Title } from "./style";
import ListArticle from "../../../../components/ListPublicArticle";
import useArticles from "../../../../hooks/useArticle";

function ArticlePage() {
  const [selectedFilters, setSelectedFilters] = useState<Record<number, string | null>>({});

  const [internalPageControl, setInternalPageControl] = useState<"lista" | "cadastrar" | "editar">("lista");
  console.log(internalPageControl);

  const [drawerFilter, setDrawerFilter] = useState<boolean>(false);


  const { city } = useCity({ uf: Number(selectedFilters[1]) });
  const { states } = useStatesUf();
  const { schools } = useSchoolsByCity({ cityId: Number(selectedFilters[0]) });

  const {articles} = useArticles();
  const allAticles = articles?.data.response.published.concat(articles?.data.response.scheduled) || [];
  console.log(articles)

  const handleFiltersChange = (filters: Record<number, string | null>) => {
    setSelectedFilters(filters);
  };


  const toggleInternalPageControl = (text: "lista" | "cadastrar" | "editar") => {
    setInternalPageControl(text);
  };

  return (
    <>
      {internalPageControl === "lista" && (
        <Main>
          <Header>
            <Title>Avaliações</Title>
            <Button onClick={() => toggleInternalPageControl("cadastrar")}>
              <PostAddRoundedIcon />
              Criar Artigo
            </Button>
          </Header>
          <Flex>

          <ListArticle funcEditar={() => toggleInternalPageControl("editar")} title="Publicados:" type="Publicado" dataList={articles?.data.response.published} />
          <ListArticle funcEditar={() => toggleInternalPageControl("editar")} title="Agendadas:" type="Aguardando" dataList={articles?.data.response.scheduled}  />
          <ListArticle funcEditar={() => toggleInternalPageControl("editar")} title="Histórico:" dataList={allAticles}  />

          </Flex>
        </Main>
      )}
      {(internalPageControl === "cadastrar" || internalPageControl === "editar") && (
        <RegisterArticle InternalPageControl={internalPageControl} setInternalPageControl={setInternalPageControl} />
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
      />
    </>
  );
}
export default ArticlePage;
