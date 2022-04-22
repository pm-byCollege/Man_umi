import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { List, Button } from 'antd';

import DrawerWrapContext from './DrawerWrapContext';
import type { DrawerWrapContextProps } from './DrawerWrapContext';
import Header from './Header';
import GroupListItem from './GroupListItem';

interface ApplyListProps {
  request: (
    params: {
      current: number;
      pageSize: number;
    },
    filter: Record<string, string>,
  ) => Promise<{ code: number; data: any[] | null; total: number }>;
  applyKey: string; // 应用标识key
  onApply?: (record: any, context: DrawerWrapContextProps) => void; // 应用按钮点击回调
  chatId?: number;
}

const DEFAULT_CURRENT = 1;
const DEFAULT_PAGE_SIZE = 20;

const ApplyList: React.FC<ApplyListProps> = (props, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(DEFAULT_CURRENT);
  const [size, setSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [filter, setFilter] = useState<Record<string, string>>({});

  const { request, applyKey, onApply, chatId } = props;

  const getRequestData = async (current: number, pageSize: number, filterObj = {}) => {
    setLoading(true);
    const resp = await request({ current, pageSize }, filterObj);
    setPage(current);
    setSize(pageSize);
    setTotal(resp.total || 0);
    setDataSource(resp.data || []);
    setLoading(false);
  };

  // init
  useEffect(() => {
    getRequestData(page, size);
  }, []);

  useImperativeHandle(ref, () => ({
    reload: getRequestData,
  }));

  return (
    <DrawerWrapContext.Consumer>
      {(context) => {
        return (
          <>
            <Header
              title={`共${total}个群`}
              onSearch={(val) => {
                setFilter({ name: val });
                getRequestData(1, size, { name: val });
              }}
            />
            <List
              loading={loading}
              pagination={{
                current: page,
                pageSize: size,
                total,
                onChange: (currentPage, pageSize) => {
                  getRequestData(currentPage, pageSize || DEFAULT_PAGE_SIZE, filter);
                },
              }}
              dataSource={dataSource}
              renderItem={(item: any) => {
                return (
                  <GroupListItem
                    name={item.name}
                    count={item.memberCount}
                    ownerName={item.ownerName}
                    extra={
                      <>
                        {item[`${applyKey}`] && item['chatPartId']?.includes(chatId) ? (
                          <div>该群已应用</div>
                        ) : (
                          <Button
                            type="primary"
                            ghost
                            onClick={() => {
                              if (onApply) {
                                onApply(item, context);
                              }
                            }}
                          >
                            应用到群
                          </Button>
                        )}
                      </>
                    }
                  />
                );
              }}
            />
          </>
        );
      }}
    </DrawerWrapContext.Consumer>
  );
};

export default forwardRef(ApplyList);
