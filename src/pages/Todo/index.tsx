/*
 * @Descripttion:
 * @version: 1.0
 * @Author:
 * @Date: 2021-10-09 10:18:39
 * @LastEditors: YingJie Xing
 * @LastEditTime: 2021-10-09 19:06:33
 * @FilePath: \ant-design-pro\src\pages\Todo\index.tsx
 * Copyright 2021 YingJie Xing, All Rights Reserved.
 */
import React, { useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
// import { PlusOutlined, EllipsisOutlined, DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { fetchDeliveryList } from '@/services/todo';
import { useSelector } from 'umi';
// import { connect } from 'umi'
// import ProForm, { ProFormText } from '@ant-design/pro-form';
// import { add } from '@umijs/deps/compiled/lodash';

const Todo = () => {
  //status:0待办 1完成 2取消
  const { currentUser } = useSelector((state: any) => state.user);

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
    },
    {
      title: '岗位名称',
      dataIndex: 'postName',
    },
  ];

  useEffect(() => {}, []);

  return (
    <PageContainer>
      <Card>
        <ProTable
          columns={columns}
          request={async () => {
            // const { name, classify, region, current, ...res } = params;
            // const postParams = {
            //   page: current,
            //   pageSize: res.pageSize,
            //   name,
            //   classify,
            //   region,
            // };
            return fetchDeliveryList(currentUser.stu_id);
          }}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
          }}
          search={false}
          dateFormatter="string"
          headerTitle="投递情况"
        />
      </Card>
    </PageContainer>
  );
};

export default Todo;
