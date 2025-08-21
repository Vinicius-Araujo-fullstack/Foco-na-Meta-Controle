import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import React, { useState, useCallback, memo } from "react"
import {
  BannerImage,
  Flex,
  TextCard,
  TextDate,
  TextLegend,
  TitleArticle,
} from "./style"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { MdBlock, MdEdit, MdDelete } from "react-icons/md"
import { deleteArticle } from "../../../services/articleService"
import useArticles from "../../../hooks/useArticle"

// Constantes
const ITEM_HEIGHT = 48
const MENU_MAX_HEIGHT = ITEM_HEIGHT * 4.5

// Interfaces
interface Article {
  id: string
  created_at: string
  title: string
  subtitle: string
  article_url: string
  image_url: string
  published: boolean
  published_at: string | null
  schedule: boolean
  schedule_to: string | null
  author_id: string
}

interface CardArticleProps {
  type?: "Publicado" | "Aguardando"
  dataList?: Article
  funcEditar: () => void
}

interface MenuOption {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
  loading?: boolean
}

// Estilos do menu otimizados
const menuStyles = {
  iconButton: {
    padding: 0,
    margin: 0,
    color: "black",
    background: "none",
    boxShadow: "none",
    outline: "none",
    "&:focus, &:focus-visible": {
      outline: "none",
      boxShadow: "none",
    },
  },
  menuPaper: {
    maxHeight: MENU_MAX_HEIGHT,
    boxShadow: "none",
    background: "white",
    margin: 0,
    padding: 0,
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    fontSize: 14,
    gap: 1,
    padding: "6px 12px",
  },
}

const CardArticle: React.FC<CardArticleProps> = memo(
  ({ type, dataList, funcEditar }) => {
    const { mutate } = useArticles()
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    // Early return se não houver dados
    if (!dataList) {
      return null
    }

    const isMenuOpen = Boolean(anchorEl)

    // Handlers otimizados com useCallback
    const handleMenuOpen = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
      },
      []
    )

    const handleMenuClose = useCallback(() => {
      setAnchorEl(null)
    }, [])

    const handleDelete = useCallback(async () => {
      if (!dataList?.id || isDeleting) return

      handleMenuClose()
      setIsDeleting(true)

      try {
        const response = await deleteArticle(dataList.id)

        if (response?.message === "Artigo deletado com sucesso") {
          mutate()
        }
      } catch (error) {
        console.error("Erro ao deletar artigo:", error)
        // Aqui você poderia adicionar um toast de erro
      } finally {
        setIsDeleting(false)
      }
    }, [dataList?.id, isDeleting, handleMenuClose, mutate])

    const handleEdit = useCallback(() => {
      handleMenuClose()
      funcEditar()
    }, [funcEditar, handleMenuClose])

    // Opções do menu configuráveis
    const menuOptions: MenuOption[] = [
      {
        id: "remove-publication",
        label: "Remover publicação",
        icon: <MdBlock size={18} />,
        onClick: () => {}, // Implementar se necessário
      },
      {
        id: "edit",
        label: "Editar",
        icon: <MdEdit size={18} />,
        onClick: handleEdit,
      },
      {
        id: "delete",
        label: isDeleting ? "Excluindo..." : "Excluir",
        icon: isDeleting ? (
          <CircularProgress size={16} sx={{ color: "inherit" }} />
        ) : (
          <MdDelete size={18} />
        ),
        onClick: handleDelete,
        loading: isDeleting,
      },
    ]

    // Renderização do botão de menu
    const renderMenuButton = () => (
      <IconButton
        aria-label="opções do artigo"
        aria-controls={isMenuOpen ? "article-menu" : undefined}
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        disableRipple
        sx={menuStyles.iconButton}
        disabled={isDeleting}
      >
        <MoreVertIcon />
      </IconButton>
    )

    // Renderização do menu
    const renderMenu = () => (
      <Menu
        id="article-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            style: menuStyles.menuPaper,
          },
        }}
        MenuListProps={{
          disablePadding: true,
          sx: menuStyles.menuList,
        }}
      >
        {menuOptions.map((option) => (
          <MenuItem
            key={option.id}
            onClick={option.onClick}
            sx={menuStyles.menuItem}
            disabled={option.loading}
          >
            {option.icon}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    )

    return (
      <Box
        bgcolor="white"
        flexShrink={0}
        width="320px"
        borderRadius="20px"
        padding="8px 16px"
        sx={{
          opacity: isDeleting ? 0.7 : 1,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {/* Header com tipo e menu */}
        {type && (
          <Flex>
            <TextLegend type={type}>{type}</TextLegend>
            {renderMenuButton()}
          </Flex>
        )}

        {/* Título com menu (quando não há tipo) */}
        <Flex>
          <TitleArticle>{dataList.title}</TitleArticle>
          {!type && renderMenuButton()}
        </Flex>

        {/* Conteúdo do artigo */}
        <TextCard>{dataList.subtitle}</TextCard>

        <BannerImage
          src={dataList.image_url}
          alt={dataList.subtitle}
          loading="lazy"
        />

        <TextDate>Publicado por: {dataList.author_id}</TextDate>

        {/* Menu dropdown */}
        {renderMenu()}
      </Box>
    )
  }
)

// Definindo displayName para facilitar debugging
CardArticle.displayName = "CardArticle"

export default CardArticle
