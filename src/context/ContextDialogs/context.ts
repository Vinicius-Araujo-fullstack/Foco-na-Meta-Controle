import { createContext } from 'react';
import {IDialogController, IDialogViewClass} from '../../interfaces/index.ts';


const defaulContextDialogController : IDialogController = {
    open: false,
    setOpen: () => {},
    
};
const defaulContextDialogViewClass :IDialogViewClass = {
    openViewClass: false,
    setOpenViewClass: () => {},
}

export const ContextDialogController = createContext<IDialogController>(defaulContextDialogController);
export const ContextDialogViewClass = createContext<IDialogViewClass>(defaulContextDialogViewClass);
