import { createContext } from 'react';
import {IContextSelectedOptions} from '../../interfaces/index.ts';

const defaultContextSelectedOption: IContextSelectedOptions = {

    selectedOptions: [],
    setSelectedOptions: () => {},
};  


export const ContextSelectedOptions = createContext<IContextSelectedOptions>(defaultContextSelectedOption);
