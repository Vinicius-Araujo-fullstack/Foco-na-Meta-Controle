import { createContext } from 'react';
import {IContextActiveId} from '../../interfaces/index.ts';

const defaultContextValue: IContextActiveId = {
    activeItemId: null,  
    setActiveItemId: () => {},   
};


export const ContextSideMenuController = createContext<IContextActiveId>(defaultContextValue);
