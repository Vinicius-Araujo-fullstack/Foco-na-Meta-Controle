import { Box, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { BannerImage, Flex, TextCard, TextDate, TextLegend, TitleArticle } from "./style";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MdBlock } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteArticle } from "../../../services/articleService";
import useArticles from "../../../hooks/useArticle";

interface ICard {
  type?: "Publicado" | "Aguardando";
  dataList?: Article;
  funcEditar: () => void;
}

interface Article {
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
}

const ITEM_HEIGHT = 48;

const CardArticle = ({ type, dataList, funcEditar }: ICard) => {
  const { mutate } = useArticles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (!dataList) return null;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (id: string) => {
    setAnchorEl(null);
    try {
      setIsLoading(true);
      const res = await deleteArticle(id);
      if (res.message === "Artigo deletado com sucesso") mutate();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bgcolor={"white"} flexShrink={0} width={"320px"} borderRadius={"20px"} padding={"8px 16px"}>
      <Flex>
        {type && <TextLegend type={type!}>{type}</TextLegend>}
        {type && (
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            disableRipple
            sx={{
              padding: 0,
              margin: 0,
              color: "black",
              background: "none",
              boxShadow: "none",
              outline: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        )}

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                boxShadow: "none",
                background: "white",
                margin: 0,
                padding: 0,
              },
            },
          }}
          MenuListProps={{
            disablePadding: true,
            sx: {
              padding: 0,
            },
          }}
        >
          <MenuItem sx={{ fontSize: 14, gap: 1, padding: "6px 12px" }}>
            <MdBlock size={18} />
            Remover publicação
          </MenuItem>
          <MenuItem onClick={funcEditar} sx={{ fontSize: 14, gap: 1, padding: "6px 12px" }}>
            <MdEdit size={18} />
            Editar
          </MenuItem>
          <MenuItem onClick={() => handleClose(dataList.id)} sx={{ fontSize: 14, gap: 1, padding: "6px 12px" }}>
            <MdDelete size={18} />

            {isLoading ? <CircularProgress size={16} sx={{ ml: 1 }} /> : "Excluir"}
          </MenuItem>
        </Menu>
      </Flex>

      {
        <Flex>
          <TitleArticle>{dataList?.title}</TitleArticle>
          {!type && <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            disableRipple
            sx={{
              padding: 0,
              margin: 0,
              color: "black",
              background: "none",
              boxShadow: "none",
              outline: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>}
        </Flex>
      }
      <TextCard>{dataList?.subtitle}</TextCard>
      <BannerImage src={dataList?.image_url} alt={dataList?.subtitle} />

      <TextDate>Publicado por: {dataList?.author_id}</TextDate>
    </Box>
  );
};

export default CardArticle;
