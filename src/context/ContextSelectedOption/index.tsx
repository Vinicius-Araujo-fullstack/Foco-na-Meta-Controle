import React, { useState } from "react";
import { ContextSelectedOptions } from "./context.ts";
import { IContext } from "../../interfaces/IContext.ts";

export const ContextSelectedOptionProvider: React.FC<IContext> = ({
  children,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <ContextSelectedOptions.Provider
      value={{
        selectedOptions,
        setSelectedOptions,
      }}
    >
      {children}
    </ContextSelectedOptions.Provider>
  );
};
