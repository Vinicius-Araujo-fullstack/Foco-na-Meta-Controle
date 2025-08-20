import { Box, useTheme } from "@mui/material";
import React from "react";
import { Flex, Title } from "./style";
import CardArticle from "./CardArticle";

interface IList {
  title: string;
  type?: "Publicado" | "Aguardando";
  funcEditar: () => void;
  dataList?: {
  id: string;
  created_at: string;
  title: string;
  subtitle: string;
  article_url: string;
  image_url: string;
  published: boolean;
  published_at: string | null;
  schedule: boolean;
  schedule_to: string | null;
  author_id: string;
  }[];
}

const ListArticle = ({ title, type, dataList, funcEditar }: IList) => {
  const theme = useTheme();

  return (
    <Box width={"100%"} fontFamily={theme.fonts.primary}>
      <Title>{title}</Title>
      <Flex>
        {dataList && dataList.map((article) => (
          <CardArticle funcEditar={funcEditar} type={type} dataList={article} />
        ))}
      </Flex>
    </Box>
  );
};

export default ListArticle;
