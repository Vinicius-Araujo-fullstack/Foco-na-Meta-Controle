import {createContext} from 'react';
import {ILogOutController} from '../../interfaces/index.ts';


const defaulContextLogoutController : ILogOutController = {
    openLogOut: false,
    setOpenLogOut: () => {},
};


export const ContextLogOutController = createContext<ILogOutController>(defaulContextLogoutController);