import { ReactNode } from "react";

export interface IContextActiveId {
  activeItemId?: string | null;
  setActiveItemId?: (id: string | null) => void;

};


export interface IContextSelectedOptions {
  selectedOptions?: string[];
  setSelectedOptions?: (options: string[]) => void;

};

export interface IContext {
  children: ReactNode;
};
