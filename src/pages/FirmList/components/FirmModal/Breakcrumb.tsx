import React from 'react';
import { Breadcrumb } from 'antd';
import TaskModalContext from './ModalContext';

export interface PageInfo {
  name: string;
  params?: any;
}

export type AllPageId = 'firm' | 'post';

export const PAGE_ID_INFO: { [key: string]: PageInfo } = {
  firm: { name: '新建企业' },
  post: { name: '岗位选择' },
};

export default () => {
  return (
    <TaskModalContext.Consumer>
      {(context) => {
        const { breakList = [], updateBreadcrumb } = context;
        const pageRoute = (context.breakList || [])
          .map((pageId) => ({ id: pageId, ...(PAGE_ID_INFO[pageId] || {}) }))
          .filter((i) => i.name !== undefined);

        return (
          <Breadcrumb>
            {pageRoute.map((item, index) => (
              <Breadcrumb.Item
                key={item.id}
                onClick={() => {
                  // 点击当前(最后一个)不做处理
                  if (pageRoute.length === index + 1) return;

                  const nextBreakList = breakList.slice(0, index + 1);
                  if (updateBreadcrumb) {
                    updateBreadcrumb(nextBreakList);
                  }
                }}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        );
      }}
    </TaskModalContext.Consumer>
  );
};
