import { createContext, useContext, useState } from 'react';

interface IGetIdContextProps {
  getIdCode: string | null;
  setGetIdCode: (code: string | null) => void;
}

const getIdContext = createContext({} as IGetIdContextProps);

export const GetIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [getIdCode, setGetIdCode] = useState<string | null>(null);

  return (
    <getIdContext.Provider value={{ getIdCode, setGetIdCode }}>
      {children}
    </getIdContext.Provider>
  );
};

export const useGetId = () => useContext(getIdContext);
