import styled, { css, keyframes } from "styled-components"

// ==================== TYPES & INTERFACES ====================
interface FlexProps {
  gap?: "xs" | "sm" | "md" | "lg" | "xl"
  wrap?: boolean
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
  align?: "flex-start" | "center" | "flex-end" | "stretch"
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
}

interface TitleProps {
  variant?: "Publicado" | "Aguardando"
}

interface EmptyStateProps {
  variant?: "info" | "warning" | "error" | "success"
}

// ==================== DESIGN TOKENS ====================
const DESIGN_TOKENS = {
  colors: {
    primary: {
      published: "#00b908",
      waiting: "#FCC211",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
      muted: "#999999",
      white: "#ffffff",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f8f9fa",
      muted: "#f5f5f5",
    },
    status: {
      info: "#e3f2fd",
      warning: "#fff3e0",
      error: "#ffebee",
      success: "#e8f5e8",
    },
    border: {
      light: "#e0e0e0",
      medium: "#cccccc",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  typography: {
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      md: "1rem", // 16px
      lg: "1.25rem", // 20px
      xl: "1.5rem", // 24px
      xxl: "2rem", // 32px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
    },
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
    full: "50px",
  },
  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },
} as const

// ==================== ANIMATIONS ====================
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

// ==================== MIXINS ====================
const baseText = css`
  margin: 0;
  padding: 0;
  font-family: inherit;
  line-height: ${DESIGN_TOKENS.typography.lineHeight.normal};
`

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const smoothTransition = css`
  transition: all 0.2s ease-in-out;
`

// ==================== STYLED COMPONENTS ====================

// Container flexível otimizado
export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  justify-content: ${({ justify = "flex-start" }) => justify};
  align-items: ${({ align = "stretch" }) => align};
  flex-wrap: ${({ wrap = false }) => (wrap ? "wrap" : "nowrap")};
  gap: ${({ gap = "md" }) => DESIGN_TOKENS.spacing[gap]};

  /* Responsividade automática */
  @media (max-width: 768px) {
    gap: ${DESIGN_TOKENS.spacing.sm};
  }

  /* Animação suave para mudanças de layout */
  ${smoothTransition}
`

// Título otimizado com variants
export const Title = styled.h1<TitleProps>`
  ${baseText}
  font-size: ${DESIGN_TOKENS.typography.fontSize.xl};
  font-weight: ${DESIGN_TOKENS.typography.fontWeight.semibold};
  color: ${DESIGN_TOKENS.colors.text.primary};
  margin-bottom: ${DESIGN_TOKENS.spacing.lg};
  display: flex;
  align-items: center;
  animation: ${slideIn} 0.3s ease-out;

  ${({ variant }) =>
    variant &&
    css`
      &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 24px;
        background-color: ${variant === "Publicado"
          ? DESIGN_TOKENS.colors.primary.published
          : DESIGN_TOKENS.colors.primary.waiting};
        margin-right: ${DESIGN_TOKENS.spacing.md};
        border-radius: ${DESIGN_TOKENS.borderRadius.full};
      }
    `}

  /* Responsividade */
  @media (max-width: 768px) {
    font-size: ${DESIGN_TOKENS.typography.fontSize.lg};
    margin-bottom: ${DESIGN_TOKENS.spacing.md};
  }
`

// Estado vazio otimizado
export const EmptyState = styled.div<EmptyStateProps>`
  ${flexCenter}
  flex-direction: column;
  padding: ${DESIGN_TOKENS.spacing.xl};
  border-radius: ${DESIGN_TOKENS.borderRadius.lg};
  text-align: center;
  min-height: 200px;
  animation: ${fadeIn} 0.5s ease-out;

  ${({ variant = "info" }) => {
    const variantStyles = {
      info: css`
        background-color: ${DESIGN_TOKENS.colors.status.info};
        color: #1976d2;
        border: 1px solid #bbdefb;
      `,
      warning: css`
        background-color: ${DESIGN_TOKENS.colors.status.warning};
        color: #f57c00;
        border: 1px solid #ffcc02;
      `,
      error: css`
        background-color: ${DESIGN_TOKENS.colors.status.error};
        color: #d32f2f;
        border: 1px solid #ffcdd2;
      `,
      success: css`
        background-color: ${DESIGN_TOKENS.colors.status.success};
        color: #388e3c;
        border: 1px solid #c8e6c9;
      `,
    }
    return variantStyles[variant]
  }}

  /* Elementos filhos */
  > * {
    margin-bottom: ${DESIGN_TOKENS.spacing.sm};

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Responsividade */
  @media (max-width: 768px) {
    padding: ${DESIGN_TOKENS.spacing.lg};
    min-height: 150px;
  }
`

// Container de loading
export const LoadingContainer = styled.div`
  ${Flex} {
    gap: ${DESIGN_TOKENS.spacing.md};
    justify-content: flex-start;
    align-items: flex-start;
  }

  /* Skeleton items */
  > div {
    animation: ${pulse} 1.5s ease-in-out infinite;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.6),
        transparent
      );
      animation: shimmer 2s infinite;
    }
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`

// Contador de itens
export const ItemCounter = styled.span`
  ${baseText}
  font-size: ${DESIGN_TOKENS.typography.fontSize.sm};
  color: ${DESIGN_TOKENS.colors.text.muted};
  font-weight: ${DESIGN_TOKENS.typography.fontWeight.normal};
  background-color: ${DESIGN_TOKENS.colors.background.muted};
  padding: ${DESIGN_TOKENS.spacing.xs} ${DESIGN_TOKENS.spacing.sm};
  border-radius: ${DESIGN_TOKENS.borderRadius.full};
  margin-left: ${DESIGN_TOKENS.spacing.sm};
  ${smoothTransition}

  &:hover {
    background-color: ${DESIGN_TOKENS.colors.border.medium};
  }
`

// Link "Ver todos"
export const ViewAllLink = styled.button`
  ${baseText}
  background: none;
  border: none;
  font-size: ${DESIGN_TOKENS.typography.fontSize.sm};
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
  padding: ${DESIGN_TOKENS.spacing.xs};
  border-radius: ${DESIGN_TOKENS.borderRadius.sm};
  ${smoothTransition}

  &:hover {
    background-color: ${DESIGN_TOKENS.colors.status.info};
    text-decoration: none;
  }

  &:focus {
    outline: 2px solid #1976d2;
    outline-offset: 2px;
  }
`

// Container principal com melhorias
export const Container = styled.div`
  width: 100%;
  position: relative;

  /* Scroll horizontal suave para mobile */
  @media (max-width: 768px) {
    ${Flex} {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;

      > * {
        flex-shrink: 0;
        scroll-snap-align: start;
      }
    }
  }
`

// Header com título e ações
export const Header = styled.div`
  ${Flex} {
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${DESIGN_TOKENS.spacing.lg};
  }

  /* Responsividade do header */
  @media (max-width: 568px) {
    ${Flex} {
      flex-direction: column;
      align-items: flex-start;
      gap: ${DESIGN_TOKENS.spacing.sm};
    }
  }
`

// Grid responsivo para artigos
export const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${DESIGN_TOKENS.spacing.md};

  /* Responsividade */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${DESIGN_TOKENS.spacing.sm};
  }

  /* Animação de entrada para itens */
  > * {
    animation: ${fadeIn} 0.3s ease-out;
    animation-fill-mode: both;

    &:nth-child(1) {
      animation-delay: 0ms;
    }
    &:nth-child(2) {
      animation-delay: 100ms;
    }
    &:nth-child(3) {
      animation-delay: 200ms;
    }
    &:nth-child(4) {
      animation-delay: 300ms;
    }
    &:nth-child(n + 5) {
      animation-delay: 400ms;
    }
  }
`
