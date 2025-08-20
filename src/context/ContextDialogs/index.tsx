import React, { useState } from "react";
import { ContextDialogViewClass, ContextDialogController } from "./context.ts";
import { IContext } from "../../interfaces/IContext.ts";

export const ContextDialogstProvider: React.FC<IContext> = ({ children }) => {
  const [openViewClass, setOpenViewClass] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ContextDialogController.Provider
      value={{
        open,
        setOpen,
      }}
    >
      <ContextDialogViewClass.Provider
        value={{
          openViewClass,
          setOpenViewClass,
        }}
      >
        {children}
      </ContextDialogViewClass.Provider>
    </ContextDialogController.Provider>
  );
};
