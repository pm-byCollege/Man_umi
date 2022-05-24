import { Checkbox, List } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ReactText } from 'react';
import GroupListItem from '../DrawerWrap/GroupListItem';
import Header from '../DrawerWrap/Header';

interface CheckBoxPageListProps {
  beSel: any[];
  request: (
    // params: {
    //   current: number;
    //   pageSize: number;
    // },
    filter: any,
  ) => Promise<{ code: number; data: any[] | null; total: number }>;
  applyGroups?: [
    {
      groupId: string;
    },
  ]; // 选中的
  onChange?: (record: any) => void; // 应用按钮点击回调
}

const CheckBoxPageList: React.FC<CheckBoxPageListProps> = (props) => {
  const { beSel, request } = props;

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [currentValue, setCurrentValue] = useState<any[]>([]);

  const [total, setTotal] = useState<number>(0);

  const [initLoading, setInitLoading] = useState<boolean>(true);

  const getRequestData = async () => {
    const resp = await request({});
    if (resp.code === 200 && resp.data) {
      const data = resp.data || [];
      setInitLoading(false);
      setTotal(resp.total || 0);
      setDataSource(data);
      return;
    }
  };

  const searchRequestData = async (filterObj = { postName: '' }) => {
    const resp = await request(filterObj.postName);
    if (resp.code === 200 && resp.data) {
      const data = resp.data || [];
      setInitLoading(false);
      setTotal(resp.total || 0);
      setDataSource(data);
      return;
    }
  };

  useEffect(() => {
    getRequestData();
  }, []);

  useEffect(() => {
    if (beSel) {
      const checkedValues: any[] = [];
      beSel.forEach((item) => {
        dataSource.forEach((data) => {
          if (item.id === data.id) checkedValues.push(data);
        });
      });

      if (props.onChange) {
        props.onChange(checkedValues);
      }
      setCurrentValue(checkedValues);
    }
  }, [dataSource]);

  const handleChange = (checkedValues: ReactText[]) => {
    setCurrentValue(checkedValues);
    if (props.onChange) {
      props.onChange(checkedValues);
    }
  };

  return (
    <>
      <Header
        title={`供实习生岗位共${total}个`}
        onSearch={(val) => {
          searchRequestData({ postName: val });
        }}
      />
      <Checkbox.Group style={{ width: '100%' }} value={currentValue} onChange={handleChange}>
        <List
          loading={initLoading}
          dataSource={dataSource}
          renderItem={(item: any) => {
            return (
              <GroupListItem
                name={item.postName}
                // count={item.memberCount}
                // ownerName={item.ownerName}
                extra={<Checkbox value={item} />}
              />
            );
          }}
        />
      </Checkbox.Group>
    </>
  );
};
export default CheckBoxPageList;
