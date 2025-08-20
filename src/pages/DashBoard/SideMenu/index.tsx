import { useContext, useEffect, useState } from "react";
import ImagemLogo from "../../../assets/Logo/Foco-na-Meta-Logo.svg";
import { ContextSideMenuController } from "../../../context/context.ts";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ContextLogOutController } from "../../../context/context.ts";
import CircularProgress from "@mui/material/CircularProgress";
import ArticleIcon from "@mui/icons-material/Article";
import { useTheme } from "@mui/material/styles";
import { Spin as Hamburger } from "hamburger-react";

import {
  Logo,
  Nav,
  NavItem,
  LogoutButton,
  // ProfileImage,
  UserName,
  UserProfile,
  StyledTextIconHamgurguer,
  StyledNav,
  Flex,
} from "./style.ts";
import { useMediaQuery } from "@mui/material";

const SideMenu = ({
  userInfo,
}: {
  userInfo: {
    created_at: string;
    name: string;
    email: string;
    username: string;
    id: string;
  };
}) => {
  const [isOpen, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const isSmallerThan730 = useMediaQuery("(max-width:821px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { activeItemId, setActiveItemId } = useContext(
    ContextSideMenuController
  );
  const { openLogOut, setOpenLogOut } = useContext(ContextLogOutController);

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth > 820) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const handleNavItemClick = (id: string) => {
    if (setActiveItemId) {
      setActiveItemId(id);
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setOpenLogOut?.(true);
  };
  const theme = useTheme();

  return (
    <>
      {isClient && (
        <>
          <StyledTextIconHamgurguer>
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              color={"green"}
              size={22}
            />
          </StyledTextIconHamgurguer>
          <StyledNav className={isOpen ? "animeSuperLeft" : "animeSome"}>
            {/* <Sidebar > */}
            <Logo src={ImagemLogo} alt="Logo foco na meta" />
            <Nav>
              <Flex>
                <NavItem
                  colorBorder="#00DB49"
                  colorFillSvg="#00DB49"
                  colorBackground="#00DB491A"
                  colorText="#00DB49"
                  id="0"
                  isActive={activeItemId === "0"}
                  onClick={() => {
                    handleNavItemClick("0");
                    if (isSmallerThan730) {
                      setOpen(false);
                    }
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 22 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.3333 14.4167V16.5833H0.166626V14.4167C0.166626 14.4167 0.166626 10.0833 7.74996 10.0833C15.3333 10.0833 15.3333 14.4167 15.3333 14.4167ZM11.5416 4.12501C11.5416 3.37509 11.3192 2.64201 10.9026 2.01847C10.486 1.39493 9.8938 0.908945 9.20097 0.621963C8.50813 0.334981 7.74575 0.259893 7.01024 0.406195C6.27473 0.552498 5.59912 0.913619 5.06885 1.44389C4.53857 1.97417 4.17745 2.64978 4.03115 3.38529C3.88485 4.1208 3.95993 4.88318 4.24692 5.57601C4.5339 6.26885 5.01989 6.86103 5.64342 7.27766C6.26696 7.69429 7.00004 7.91667 7.74996 7.91667C8.75557 7.91667 9.72 7.51719 10.4311 6.80612C11.1421 6.09504 11.5416 5.13062 11.5416 4.12501ZM15.2683 10.0833C15.9343 10.5987 16.4792 11.2538 16.8648 12.0025C17.2503 12.7511 17.4671 13.5752 17.5 14.4167V16.5833H21.8333V14.4167C21.8333 14.4167 21.8333 10.4842 15.2683 10.0833ZM14.25 0.333339C13.5043 0.329187 12.775 0.552125 12.1591 0.972506C12.8172 1.89197 13.171 2.99432 13.171 4.12501C13.171 5.2557 12.8172 6.35804 12.1591 7.27751C12.775 7.69789 13.5043 7.92082 14.25 7.91667C15.2556 7.91667 16.22 7.51719 16.9311 6.80612C17.6421 6.09504 18.0416 5.13062 18.0416 4.12501C18.0416 3.11939 17.6421 2.15497 16.9311 1.44389C16.22 0.732818 15.2556 0.333339 14.25 0.333339Z" />
                  </svg>
                  Turmas
                </NavItem>
                <NavItem
                  colorBorder="#C1B100"
                  colorFillSvg="#C1B100"
                  colorBackground="#C1B1000D"
                  colorText="#C1B100"
                  id="1"
                  isActive={activeItemId === "1"}
                  onClick={() => {
                    handleNavItemClick("1");
                    if (isSmallerThan730) {
                      setOpen(false);
                    }
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 2C4.89 2 4 2.89 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H10V20.09L12.09 18H6V16H14.09L16.09 14H6V12H18.09L20 10.09V8L14 2H6ZM13 3.5L18.5 9H13V3.5ZM20.15 13C20 13 19.86 13.05 19.75 13.16L18.73 14.18L20.82 16.26L21.84 15.25C22.05 15.03 22.05 14.67 21.84 14.46L20.54 13.16C20.43 13.05 20.29 13 20.15 13ZM18.14 14.77L12 20.92V23H14.08L20.23 16.85L18.14 14.77Z"
                      fill="white"
                    />
                  </svg>
                  Avaliações
                </NavItem>
                <NavItem
                  colorBorder="#F3A200"
                  colorFillSvg="#F3A200"
                  colorBackground="#F3A2001A"
                  colorText="#F3A200"
                  id="2"
                  isActive={activeItemId === "2"}
                  onClick={() => {
                    handleNavItemClick("2");
                    if (isSmallerThan730) {
                      setOpen(false);
                    }
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6L10 0H2ZM2 2H9V7H14V18H2V2ZM4 10V12H12V10H4ZM4 14V16H9V14H4Z"
                      fill="#D9D9D9"
                    />
                  </svg>
                  Simulados
                </NavItem>
                <NavItem
                  colorBorder="#FF5959"
                  colorFillSvg="#FF5959"
                  colorBackground="#FF59591A"
                  colorText="#FF5959"
                  id="3"
                  isActive={activeItemId === "3"}
                  onClick={() => {
                    handleNavItemClick("3");
                    if (isSmallerThan730) {
                      setOpen(false);
                    }
                  }}
                >
                  <UploadFileIcon />
                  Arquivos
                </NavItem>
                <NavItem
                  colorBorder="#A30AD6"
                  colorFillSvg="#A30AD6"
                  colorBackground="#A30AD61A"
                  colorText="#A30AD6"
                  id="4"
                  isActive={activeItemId === "4"}
                  onClick={() => handleNavItemClick("4")}
                >
                  <NotificationsIcon />
                  Notificações
                </NavItem>
                <NavItem
                  colorBorder="#0066FF"
                  colorFillSvg="#0066FF"
                  colorBackground="#0066FF1A"
                  colorText="#0066FF"
                  id="4"
                  isActive={activeItemId === "5"}
                  onClick={() => handleNavItemClick("5")}
                >
                  <ArticleIcon />
                  Artigos
                </NavItem>
              </Flex>
              <UserProfile>
                {/* <ProfileImage
          src="https://agilize.com.br/blog/wp-content/uploads/2023/09/media.webp
"
          alt="User"
        /> */}
                <UserName>
                  {userInfo?.name ? userInfo.name : (userInfo?.email ?? "")}
                </UserName>

                <LogoutButton onClick={handleLogoutClick}>
                  {openLogOut == true ? (
                    <CircularProgress
                      sx={{
                        width: "17px !Important",
                        height: "17px !Important",
                        color: theme.colors.black,
                      }}
                    />
                  ) : (
                    <>
                      Sair
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8334 4.66667L10.8934 5.60667L12.6134 7.33333H5.83337V8.66667H12.6134L10.8934 10.3867L11.8334 11.3333L15.1667 8M3.16671 3.33333H8.50004V2H3.16671C2.43337 2 1.83337 2.6 1.83337 3.33333V12.6667C1.83337 13.4 2.43337 14 3.16671 14H8.50004V12.6667H3.16671V3.33333Z"
                          fill="#8C8C8C"
                        />
                      </svg>
                    </>
                  )}
                </LogoutButton>
              </UserProfile>
            </Nav>

            {/* </Sidebar> */}
          </StyledNav>
        </>
      )}
    </>
  );
};

export default SideMenu;
