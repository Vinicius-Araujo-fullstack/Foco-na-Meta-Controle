import styled, { css } from "styled-components"

// ==================== TYPES & INTERFACES ====================
interface TextLegendProps {
  type: "Publicado" | "Aguardando"
}

interface BannerImageProps {
  loading?: "lazy" | "eager"
}

// ==================== CONSTANTS & THEME ====================
const COLORS = {
  background: {
    published: "#00b908",
    waiting: "#FCC211",
    imagePlaceholder: "#f5f5f5",
  },
  text: {
    primary: "#333333",
    secondary: "#666666",
    muted: "#bfbfbf",
    white: "#ffffff",
  },
  border: {
    radius: {
      small: "8px",
      medium: "12px",
      large: "50px",
    },
  },
} as const

const SPACING = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
} as const

const TYPOGRAPHY = {
  fontSize: {
    xs: "0.7rem", // 11.2px
    sm: "0.8rem", // 12.8px
    md: "1rem", // 16px
    lg: "1.2rem", // 19.2px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const

// ==================== MIXINS & UTILITIES ====================
const textBase = css`
  margin: 0;
  padding: 0;
  line-height: ${TYPOGRAPHY.lineHeight.normal};
  color: ${COLORS.text.primary};
`

const flexBase = css`
  display: flex;
  align-items: center;
`

// Mixin para transições suaves
const smoothTransition = css`
  transition: all 0.2s ease-in-out;
`

// Mixin para estados hover/focus
const interactiveStates = css`
  ${smoothTransition}

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

// ==================== STYLED COMPONENTS ====================

// Container flexível reutilizável
export const Flex = styled.div<{
  justify?: "flex-start" | "center" | "space-between" | "space-around"
  align?: "flex-start" | "center" | "flex-end" | "stretch"
  gap?: keyof typeof SPACING
  wrap?: boolean
}>`
  ${flexBase}
  width: 100%;
  justify-content: ${({ justify = "space-between" }) => justify};
  align-items: ${({ align = "center" }) => align};
  gap: ${({ gap }) => (gap ? SPACING[gap] : 0)};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
`

// Badge de status otimizado
export const TextLegend = styled.span<TextLegendProps>`
  ${textBase}
  font-size: ${TYPOGRAPHY.fontSize.xs};
  font-weight: ${TYPOGRAPHY.fontWeight.medium};
  color: ${COLORS.text.white};
  padding: ${SPACING.xs} ${SPACING.md};
  border-radius: ${COLORS.border.radius.large};
  background-color: ${({ type }) =>
    type === "Publicado"
      ? COLORS.background.published
      : COLORS.background.waiting};
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  ${smoothTransition}

  /* Melhor contraste e legibilidade */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  /* Estados interativos */
  &:hover {
    opacity: 0.9;
  }
`

// Título principal com melhor hierarquia visual
export const TitleArticle = styled.h2`
  ${textBase}
  font-size: ${TYPOGRAPHY.fontSize.md};
  font-weight: ${TYPOGRAPHY.fontWeight.medium};
  line-height: ${TYPOGRAPHY.lineHeight.tight};
  text-align: left;
  flex: 1;
  margin-right: ${SPACING.sm};

  /* Truncate text com ellipsis para títulos muito longos */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  /* Melhor espaçamento visual */
  margin-bottom: ${SPACING.sm};
`

// Texto do card com melhor legibilidade
export const TextCard = styled.p`
  ${textBase}
  font-size: ${TYPOGRAPHY.fontSize.sm};
  color: ${COLORS.text.secondary};
  text-align: left;
  line-height: ${TYPOGRAPHY.lineHeight.relaxed};
  margin-bottom: ${SPACING.lg};

  /* Truncate para manter layout consistente */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

// Imagem otimizada com melhor UX
export const BannerImage = styled.img<BannerImageProps>`
  width: 100%;
  height: 120px;
  border-radius: ${COLORS.border.radius.medium};
  display: block;
  object-fit: cover;
  object-position: center;
  background-color: ${COLORS.background.imagePlaceholder};
  margin-bottom: ${SPACING.lg};
  ${interactiveStates}

  /* Estados de carregamento e erro */
  &[src=""], &:not([src]) {
    background-image: linear-gradient(
      45deg,
      ${COLORS.background.imagePlaceholder} 25%,
      transparent 25%,
      transparent 75%,
      ${COLORS.background.imagePlaceholder} 75%
    );
    background-size: 20px 20px;
    position: relative;

    &::after {
      content: "📷";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      opacity: 0.5;
    }
  }

  /* Loading state */
  &[loading="lazy"] {
    opacity: 0;
    animation: fadeIn 0.3s ease-in-out forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  /* Hover effect para melhor interação */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

// Data/autor com melhor hierarquia visual
export const TextDate = styled.p`
  ${textBase}
  font-size: ${TYPOGRAPHY.fontSize.xs};
  color: ${COLORS.text.muted};
  text-align: left;
  margin-top: auto;

  /* Melhor separação visual */
  border-top: 1px solid #f0f0f0;
  padding-top: ${SPACING.sm};
  margin-top: ${SPACING.md};
`

// ==================== UTILITY COMPONENTS ====================

// Container para estados de loading/error
export const StateContainer = styled.div<{
  state: "loading" | "error" | "empty"
}>`
  ${flexBase}
  flex-direction: column;
  justify-content: center;
  min-height: 200px;
  padding: ${SPACING.xl};
  text-align: center;

  ${({ state }) => {
    switch (state) {
      case "loading":
        return css`
          opacity: 0.7;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        `
      case "error":
        return css`
          color: #ff4444;
          border: 2px dashed #ff4444;
          border-radius: ${COLORS.border.radius.medium};
        `
      case "empty":
        return css`
          color: ${COLORS.text.muted};
          background-color: #fafafa;
          border-radius: ${COLORS.border.radius.medium};
        `
    }
  }}

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

// Badge genérico reutilizável
export const Badge = styled.span<{
  variant?: "success" | "warning" | "error" | "info"
  size?: "sm" | "md"
}>`
  ${textBase}
  font-size: ${({ size = "sm" }) =>
    size === "sm" ? TYPOGRAPHY.fontSize.xs : TYPOGRAPHY.fontSize.sm};
  font-weight: ${TYPOGRAPHY.fontWeight.medium};
  padding: ${({ size = "sm" }) =>
    size === "sm"
      ? `${SPACING.xs} ${SPACING.md}`
      : `${SPACING.sm} ${SPACING.lg}`};
  border-radius: ${COLORS.border.radius.large};
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.xs};
  white-space: nowrap;
  ${smoothTransition}

  ${({ variant = "info" }) => {
    const variants = {
      success: css`
        background-color: ${COLORS.background.published};
        color: ${COLORS.text.white};
      `,
      warning: css`
        background-color: ${COLORS.background.waiting};
        color: ${COLORS.text.primary};
      `,
      error: css`
        background-color: #ff4444;
        color: ${COLORS.text.white};
      `,
      info: css`
        background-color: #e3f2fd;
        color: #1976d2;
      `,
    }
    return variants[variant]
  }}
`
