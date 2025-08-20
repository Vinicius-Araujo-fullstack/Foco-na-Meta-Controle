import styled from 'styled-components';


export const Main = styled.main`
  flex: 1;
  background-color: #E2E8F0;
  padding: 24px 200px 24px 80px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 50px;
  
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
  color: #323232;
  font-family: Poppins, sans-serif ;
  font-weight: 600;
`;


export const Button = styled.button`
 height: 52px;
  background-color: #00DB49;
  border: none;
  border-radius: 12px;
  color: white; 
  font-size: 1rem;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  padding: 0 24px 0 24px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap:12px;
 
`;


export const SearchBar = styled.div`
  display: flex;
  align-items: center;
 width: 100%;
 height: auto;
  gap: 10px;
  justify-content: end;
  flex-wrap: wrap;
`;



export const SearchInput = styled.input`
  padding: 10px;
  border: 0.75px solid #E2E8F0;
  border-radius: 12px;
  width: 19.270vw;

`;

export const SortByDate = styled.div`
  font-size: 0.9rem;
  color: #555;
  background: #FFFFFF;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-family: Poppins, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #8C8C8C;
  cursor: pointer;
  padding: 0px 16px 0px 16px;
  
  
`;
export const ContentSortByDate = styled.div`
 display:flex;
  gap: 8px;
`;

export const MoreButton = styled.button`
  background-color: #1F1F1F;
  color: #FFFF;
  font-size: 1rem;
  font-family: Poppins, sans-serif;
  font-weight: 400;
  border: none;
  height: 46px;
  padding: 0px 16px 0px 16px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; 
  background: transparent;
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 200px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(186, 186, 186, 0.16); 
    border-radius: 20px;
  }
  
  &::-webkit-scrollbar-thumb {
    background:rgb(56, 56, 56); 
    border-radius: 10px;
   
  }
  
  &::-webkit-scrollbar-thumb:hover {
    
  }
  
  
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  border-spacing: 0;
  table-layout: fixed;
  thead {
    display: block;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
    margin-right: 10px;

  }

  tbody {
    display: block;
    width: 100%;
    max-height: 400px; /* Ajuste conforme necessário */
   
  }


  thead th{
    background-color: #ffff;
    font-size: 1rem;
    color: #1F1F1F;
    font-family: Poppins, sans-serif;
    font-weight: 600;
  }
  thead tr, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed; 
  }
    tbody tr:first-child{
      height: 112px;
      border-top: solid 0.75px rgba(0, 0, 0, 0.1); 
      border-bottom: solid 0.75px rgba(0, 0, 0, 0.1); 
    }
    tbody tr:last-child{
      height: 112px;
      border-top: solid 0.75px rgba(0, 0, 0, 0.1); 
      border-bottom: solid 0.75px rgba(0, 0, 0, 0.1); 
    }
    tbody tr{
      height: 112px;
      border-top: solid 0.75px rgba(0, 0, 0, 0.1); 
      font-family: Poppins, sans-serif;
      font-size:0.875rem;
      font-weight: 400;
    }
    th:first-child {
      border-top-left-radius: 12px; 
      border-bottom-left-radius: 12px;
      
    }
    
    th:last-child {
      border-top-right-radius: 12px; 
      border-bottom-right-radius: 12px; 
    }
    
    th, td {
      padding: 10px;
      text-align: left;
      white-space: nowrap; 
  }
  /* Linha fictícia para espaçamento */
  thead::after {
    content: "";
    display: table-row;
    height: 40px; 
    background: transparent; 
  }

 tbody tr:hover {
    background-color: #f9f9f9;
  }

  tbody tr td:nth-child(3) {
 display: grid;
 grid-template-columns: auto 1fr;
 align-items: center; 
  gap: 8px; 
  margin-top: 31px;
}

`;

