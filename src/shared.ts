import {createContext} from "dom-context";


export const context = createContext<Record<string,any>>("mountConsumer");