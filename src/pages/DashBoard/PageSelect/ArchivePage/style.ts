import styled from "styled-components";
import { MdDelete } from "react-icons/md";

export const Main = styled.main`
  flex: 1;
  background-color: ${(props) => props.theme.colors.gray1};
  padding: 24px 200px 24px 80px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow-y: auto;
  /* gap: 50px; */
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.gray4};
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 600;
`;

export const SectionCustom = styled.section<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: ${(props) => props.gap};
  align-items: start;
  margin-bottom: 50px;
`;
export const DivCustom = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
export const DivDrop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
`;

export const LabelCustom = styled.p`
  margin: 0;
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 500;
`;

export const ButtonUpload = styled.button`
  padding: 0px 32px;
  height: 52px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.gray4};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: 500;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
`;

export const CardUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DivTextInCard = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const TitleFIle = styled.h3`
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 500;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.black};
  text-align: start;
  margin: 0;
`;
export const InfoUpload = styled.p`
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 400;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.gray3};
  text-align: start;
  margin: 0;
`;
export const BgIconPdf = styled.div`
  align-content: center;
  width: 48px;
  height: 48px;
  border-radius: 30px;
  object-fit: cover;
  background: ${(props) => props.theme.bgColorIcon.BackGroundIconColor};
  border: none;
`;

export const FileListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;

  flex: 1;
  /* height: 100%; */
  /* overflow-y: auto; */
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const FileInfo = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 20px;
`;

export const FileName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

export const FileDate = styled.p`
  font-size: 12px;
  color: #777;
  margin: 0;
`;

export const FileActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const DownloadButton = styled.a`
  padding: 6px 12px;
  background-color: #28a745;
  color: white;
  font-size: 14px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
    color: white;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

export const FileContainer = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border-left: 4px solid ${(props) => props.theme.colors.primary};

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;


export const CloseIcon = styled(MdDelete)`
  cursor: pointer;
  font-size: 1.25rem;
  color: red;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;