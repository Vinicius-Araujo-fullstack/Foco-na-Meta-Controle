import { IContext } from "../interfaces/index.ts";
import { ContextSideMenuControllerProvider } from "./ContextSideMenuController/index.tsx";
import { ContextLogOutProvider } from "./ContextLogout/index.tsx";
import { ContextDialogstProvider } from "./ContextDialogs/index.tsx";
import { ContextSelectedOptionProvider } from "./ContextSelectedOption/index.tsx";
import { AdminProvider } from "./AdminContext/index.tsx";
import { GetIdProvider } from "./GetIdContext.tsx";

export const ContextProvider: React.FC<IContext> = ({ children }) => {
  return (
    <ContextSideMenuControllerProvider>
      <ContextDialogstProvider>
        <ContextLogOutProvider>
          <ContextSelectedOptionProvider>
            <AdminProvider>
              <GetIdProvider>{children}</GetIdProvider>
            </AdminProvider>
          </ContextSelectedOptionProvider>
        </ContextLogOutProvider>
      </ContextDialogstProvider>
    </ContextSideMenuControllerProvider>
  );
};
