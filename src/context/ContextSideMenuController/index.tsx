import React, { useState } from "react";
import { ContextSideMenuController } from "./context.ts";
import { IContext } from "../../interfaces/IContext.ts";

export const ContextSideMenuControllerProvider: React.FC<IContext> = ({
  children,
}) => {
  const [activeItemId, setActiveItemId] = useState<string | null>("0");
  return (
    <ContextSideMenuController.Provider
      value={{
        activeItemId,
        setActiveItemId,
      }}
    >
      {children}
    </ContextSideMenuController.Provider>
  );
};
