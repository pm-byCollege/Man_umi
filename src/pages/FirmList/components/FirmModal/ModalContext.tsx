import { createContext } from 'react';
import { AllPageId } from './Breakcrumb';

export interface TaskModalContextProps {
  breakList?: AllPageId[];
  /**
   * mode  'all':覆盖 | 'push':在后面新增  default='all'
   */
  updateBreadcrumb?: (pageIds: AllPageId[], mode?: 'all' | 'push') => void;
}

const TaskModalContext: React.Context<TaskModalContextProps> = createContext({});

export default TaskModalContext;
