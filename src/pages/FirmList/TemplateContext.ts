import { createContext } from 'react';

export interface TemplateContextProps {
  // 增加修改模板可见属性传递给子组件
  // setTemplateVisible: void;
  // setInitValue: void;
  // setHeadTitle: void;
  // setIsCopyTemplate: void;
  // currentKey?: string;
  taskTableReload?: boolean;
  // sopTableReload?: boolean;
}

const TemplateContext: React.Context<TemplateContextProps> = createContext({});

export default TemplateContext;
