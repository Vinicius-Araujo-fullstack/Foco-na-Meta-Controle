import styled from "styled-components";
import { ISelectPageActive } from "../../../interfaces/index.ts";

export const StyledNav = styled.div`
  display: flex;
  width: 17rem;
  background-color:rgb(255, 255, 255);
  /* justify-content: space-between; */
  gap: clamp(0.8rem, -0.046rem + 3.385vw, 3rem);
  /* border-radius: 30px; */
  /* height: 100vh; */
  /* max-height: 50rem; */
  padding: 35px 15px;
  flex-direction: column;
  @media (max-width: 821px) {
    gap: 2rem;
    padding-top: 50px;
    position: fixed;
    top: 3px;
    /* left: 5px; */
    z-index: 999;
    height: 100vh;
    width: clamp(15rem, 14.231rem + 3.077vw, 17rem);
  }
`;

export const Sidebar = styled.aside`
  width: 17.91vw;
  height: auto;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 128px;
  height: auto;
  align-self: center;
  /* position: relative; */
  top: 32px;
`;
export const Nav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 821px) {
      justify-content: space-around;
      padding-bottom: 2rem;
      /* gap: 3rem; */
  }
`;

export const NavItem = styled.div<ISelectPageActive>`
  height: 64px;
  /* width: 100%; */
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  padding: 0px 72px 0px 32px;
  gap: 12px;
  font-size: 1rem;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  text-align: start;
  color: #d9d9d9;
  cursor: pointer;
  background-color: ${({ isActive, colorBackground }) =>
    isActive ? colorBackground : "transparent"};

  border-left: ${({ isActive, colorBorder }) =>
    isActive ? ` solid 8px ${colorBorder}` : "transparent"};
  color: ${({ isActive, colorText }) => (isActive ? colorText : "#D9D9D9")};
  svg path {
    fill: ${({ isActive, colorFillSvg }) =>
      isActive ? colorFillSvg : "#D9D9D9"};
  }
`;

export const Flex = styled.div`
display: flex;
/* gap: clamp(0.2rem, -0.108rem + 1.231vw, 1rem); */
flex-direction: column;
`
export const UserProfile = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: end; */
  gap: 12px;
  /* margin-bottom: 24px; */
`;

export const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.div`
  font-size: 0.75rem;
  color: #1f1f1f;
  font-weight: 500;
  font-family: Poppins, sans-serif;
`;

export const LogoutButton = styled.button`
  width: 4.625rem;
  background: none;
  border: none;
  padding: 4px 12px 4px 12px;
  background: #f5f5f5;
  color: #8c8c8c;
  font-size: 0.875rem;
  font-family: Poppins, sans-serif;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 0.75px solid #e2e8f0;
  cursor: pointer;
  svg {
    width: 1rem;
    height: 1rem;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    outline: none;
    box-shadow: none;
  }
`;

export const StyledTextIconHamgurguer = styled.div`
  position: fixed;
  top: 5px;
  z-index: 1000;
  background-color:transparent;
  border-radius: 8px;
  @media (min-width: 821px) {
    display: none;
  }
`;

// Container fixo que cobre toda a altura da tela
export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? "260px" : "0")};
  background-color: #1e1e2f;
  color: white;
  overflow-x: hidden;
  transition: width 0.3s ease;
  z-index: 1000;

  @media (max-width: 820px) {
    width: ${({ isOpen }) => (isOpen ? "260px" : "0")};
  }
`;

// Conteúdo interno do menu
export const SidebarContent = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ isOpen }) => (isOpen ? "all" : "none")};
  /* height: 100vh; */
`;

