import { createContext } from 'react';

export interface DrawerWrapContextProps {
  setVisible?: (flag: boolean) => void;
}

const DrawerWrapContext: React.Context<DrawerWrapContextProps> = createContext({});

export default DrawerWrapContext;
