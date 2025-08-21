import { Box, useTheme } from "@mui/material"
import React, { memo, useMemo, useCallback } from "react"
import { Flex, Title } from "./style"
import CardArticle from "./CardArticle"

// ==================== INTERFACES ====================
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

interface IList {
  title: string
  type?: "Publicado" | "Aguardando"
  funcEditar: (articleId: string) => void // Corrigido: aceita ID do artigo
  dataList?: Article[]
  isLoading?: boolean
  error?: string | null
  emptyMessage?: string
}

// ==================== CONSTANTS ====================
const DEFAULT_EMPTY_MESSAGES = {
  Publicado: "Nenhum artigo publicado encontrado",
  Aguardando: "Nenhum artigo aguardando publicação",
  default: "Nenhum artigo encontrado",
} as const

const LOADING_SKELETON_COUNT = 3

// ==================== EMPTY STATE COMPONENT ====================
const EmptyState: React.FC<{
  variant?: "info" | "warning" | "error"
  children: React.ReactNode
}> = ({ variant = "info", children }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return {
          backgroundColor: "#fff3cd",
          borderColor: "#ffeaa7",
          color: "#856404",
        }
      case "error":
        return {
          backgroundColor: "#f8d7da",
          borderColor: "#f5c6cb",
          color: "#721c24",
        }
      default:
        return {
          backgroundColor: "#d1ecf1",
          borderColor: "#bee5eb",
          color: "#0c5460",
        }
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
      borderRadius="12px"
      border="1px solid"
      sx={{
        ...getVariantStyles(),
        minHeight: "200px",
        width: "100%",
      }}
    >
      {children}
    </Box>
  )
}

// ==================== UTILITY FUNCTIONS ====================
const getEmptyMessage = (
  type: IList["type"],
  customMessage?: string
): string => {
  if (customMessage) return customMessage
  return type ? DEFAULT_EMPTY_MESSAGES[type] : DEFAULT_EMPTY_MESSAGES.default
}

// ==================== SUB COMPONENTS ====================
const LoadingSkeleton = memo(() => (
  <Flex>
    {Array.from({ length: LOADING_SKELETON_COUNT }, (_, index) => (
      <Box
        key={`skeleton-${index}`}
        width="320px"
        height="200px"
        bgcolor="#f5f5f5"
        borderRadius="20px"
        sx={{
          animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.5 },
            "100%": { opacity: 1 },
          },
        }}
      />
    ))}
  </Flex>
))

LoadingSkeleton.displayName = "LoadingSkeleton"

const EmptyArticleList = memo<{
  message: string
  type?: IList["type"]
}>(({ message, type }) => (
  <EmptyState variant={type === "Aguardando" ? "warning" : "info"}>
    <Box component="span" fontSize="3rem" mb={1}>
      {type === "Publicado" ? "📄" : type === "Aguardando" ? "⏳" : "📝"}
    </Box>
    <Box component="p" margin={0} fontSize="1rem" fontWeight={500}>
      {message}
    </Box>
    <Box
      component="p"
      margin={0}
      sx={{
        fontSize: "0.875rem",
        opacity: 0.7,
      }}
    >
      {type === "Publicado"
        ? "Seus artigos publicados aparecerão aqui"
        : type === "Aguardando"
          ? "Artigos aguardando aprovação aparecerão aqui"
          : "Adicione novos artigos para começar"}
    </Box>
  </EmptyState>
))

EmptyArticleList.displayName = "EmptyArticleList"

const ErrorState = memo<{ error: string }>(({ error }) => (
  <EmptyState variant="error">
    <Box component="span" fontSize="3rem" mb={1}>
      ⚠️
    </Box>
    <Box component="p" margin={0} fontSize="1rem" fontWeight={500}>
      Erro ao carregar artigos
    </Box>
    <Box
      component="p"
      margin={0}
      sx={{
        fontSize: "0.875rem",
        opacity: 0.8,
      }}
    >
      {error}
    </Box>
  </EmptyState>
))

ErrorState.displayName = "ErrorState"

// ==================== MAIN COMPONENT ====================
const ListArticle: React.FC<IList> = memo(
  ({
    title,
    type,
    dataList,
    funcEditar,
    isLoading = false,
    error = null,
    emptyMessage,
  }) => {
    const theme = useTheme()

    // ==================== MEMOIZED VALUES ====================
    const processedArticles = useMemo(() => {
      if (!dataList) return []

      // Ordenar por data de criação (mais recentes primeiro)
      return dataList.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }, [dataList])

    const isEmpty = useMemo(
      () => !isLoading && !error && (!dataList || dataList.length === 0),
      [isLoading, error, dataList]
    )

    const emptyStateMessage = useMemo(
      () => getEmptyMessage(type, emptyMessage),
      [type, emptyMessage]
    )

    // ==================== HANDLERS ====================
    const handleEditArticle = useCallback(
      (articleId: string) => {
        funcEditar(articleId)
      },
      [funcEditar]
    )

    // ==================== RENDER METHODS ====================
    const renderContent = () => {
      if (isLoading) {
        return <LoadingSkeleton />
      }

      if (error) {
        return <ErrorState error={error} />
      }

      if (isEmpty) {
        return <EmptyArticleList message={emptyStateMessage} type={type} />
      }

      return (
        <Flex>
          {processedArticles.map((article) => (
            <CardArticle
              key={article.id} // Corrigido: adicionada key única
              funcEditar={() => handleEditArticle(article.id)} // Corrigido: passa ID do artigo
              type={type}
              dataList={article}
            />
          ))}
        </Flex>
      )
    }

    // ==================== MAIN RENDER ====================
    return (
      <Box
        width="100%"
        fontFamily={
          theme.typography?.fontFamily || theme.fonts?.primary || "inherit"
        }
        sx={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Title>
          {title}
          {!isLoading && processedArticles.length > 0 && (
            <Box
              component="span"
              sx={{
                ml: 1,
                fontSize: "0.875rem",
                opacity: 0.6,
                fontWeight: "normal",
              }}
            >
              ({processedArticles.length})
            </Box>
          )}
        </Title>
        {renderContent()}
      </Box>
    )
  }
)

// ==================== DISPLAY NAME & EXPORT ====================
ListArticle.displayName = "ListArticle"

export default ListArticle
