import styled from 'styled-components';


export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; 
  background: transparent;
  padding-right: 10px;
  z-index: 0;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 200px;
  }
  
 
  
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  border-spacing: 0;
  table-layout: fixed;
  thead {
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  tbody {
    display: block;
    width: 100%;
    max-height: 400px; 
  }



  thead th{
    background-color: ${(props)=> props.theme.colors.white};
    font-size: 1rem;
    color:${(props)=> props.theme.colors.black};
    font-family: ${(props)=> props.theme.fonts.primary};
    font-weight: 600;
  }

  thead th:nth-child(2){
  text-align: center;
 }
 thead th:nth-child(3){
  text-align: center;
}
  thead tr, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed; 
  }
  tbody td:nth-child(2){
    text-align: center;
  }
  tbody td:nth-child(3){
    text-align: center;
  }
 
  
  tbody tr:first-child{
    border-top: solid 0.75px rgba(0, 0, 0, 0.1); 
    border-bottom: solid 0.75px rgba(0, 0, 0, 0.1); 
  }
  tbody tr:last-child{
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
  
 tbody tr:hover {
    background-color:${(props)=> props.theme.colors.gray6};
  }

`;
export const TdCustom = styled.div<{justify?:string}>`
  display: flex;
  align-items:center;
  gap: 8px;
  justify-content: ${(props)=> props.justify || "center"};
  `;

export const TextNotify = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  font-family: ${(props)=> props.theme.fonts.primary};
  margin-top: 6rem;
  `;