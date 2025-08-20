import React, { useState } from "react";
import { ContextLogOutController } from "./context.ts";
import { IContext } from "../../interfaces/IContext.ts";

export const ContextLogOutProvider: React.FC<IContext> = ({ children }) => {
  const [openLogOut, setOpenLogOut] = useState<boolean>(false);
  return (
    <ContextLogOutController.Provider
      value={{
        openLogOut,
        setOpenLogOut,
      }}
    >
      {children}
    </ContextLogOutController.Provider>
  );
};
