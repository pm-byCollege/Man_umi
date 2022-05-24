/*
 * @Descripttion:
 * @version: 1.0
 * @Author:
 * @Date: 2021-10-08 16:49:20
 * @LastEditors: xingyingjie
 * @LastEditTime: 2021-10-08 17:12:11
 * @FilePath: \ant-design-pro\src\pages\News\index.tsx
 * Copyright 2021 OBKoro1, All Rights Reserved.
 */

import React, { useRef } from 'react';
// import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Modal } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
// import request from 'umi-request';
import { querystuInfo, deleteStu } from '@/services/user';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'umi';
// import { StringNullableChain } from 'lodash';

const { confirm } = Modal;

type GithubIssueItem = {
  name: string;
  student_id: number;
  phone: string;
  email: string;
};

const StundentList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { currentUser } = useSelector((state: any) => state.user);

  const onDel = async (id: number, phone: string) => {
    confirm({
      title: '确定要删除这个学生吗',
      icon: <CloseCircleOutlined />,
      content: '删除后无法恢复，需要重新注册',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      async onOk() {
        const res = await deleteStu(id, phone, currentUser.type);
        if (res.code === 0) {
          actionRef.current?.reload();
        }
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '姓名',
      dataIndex: 'student_name',
      hideInSearch: true,
    },
    {
      title: '学号',
      dataIndex: 'student_id',
      copyable: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      copyable: true,
      hideInSearch: true,
    },
    {
      title: <span style={{ paddingLeft: '20px' }}>操作</span>,
      hideInSearch: true,
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => {
            onDel(record.student_id, record.phone);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <ProTable<GithubIssueItem>
          columns={columns}
          actionRef={actionRef}
          request={async (params: Record<string, any>) => {
            const { student_id, current, ...res } = params;
            const postParams = { student_id, page: current, pageSize: res.pageSize };
            return querystuInfo(postParams);
          }}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          search={{
            labelWidth: 'auto',
          }}
          form={{ labelCol: { span: 5 } }}
          options={{ fullScreen: true, reload: false, setting: false }}
          dateFormatter="string"
          headerTitle="学生表格"
        />
      </Card>
    </PageContainer>
  );
};
export default StundentList;
