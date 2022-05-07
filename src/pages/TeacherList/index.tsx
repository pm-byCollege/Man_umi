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

import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, message, Modal } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
// import request from 'umi-request';
import { queryTeaInfo, deleteTea, addTea } from '@/services/user';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'umi';
// import { StringNullableChain } from 'lodash';
import AddOrEditModal from './AddOrEditModal';
import { hasEmptyValue } from '@/utils/utils';

const { confirm } = Modal;

type GithubIssueItem = {
  name: string;
  student_id: number;
  phone: string;
  email: string;
};

type TeacherInfo = {
  name: string;
  tea_id: number;
  phone: string;
};

const TeacherList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { currentUser } = useSelector((state: any) => state.user);
  const [templateVisible, setTemplateVisible] = useState<boolean>(false);

  const [initValue] = useState<TeacherInfo>();

  const onDel = async (id: number, phone: string) => {
    confirm({
      title: '确定要删除这个教师吗',
      icon: <CloseCircleOutlined />,
      content: '删除后无法恢复，需要重新注册',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      async onOk() {
        const res = await deleteTea(id, phone, currentUser.type);
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
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '工号',
      dataIndex: 'tea_id',
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
            onDel(record.tea_id, record.phone);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageContainer>
        <Card>
          <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            request={async (params: Record<string, any>) => {
              const { tea_id, current, ...res } = params;
              const postParams = { tea_id, page: current, pageSize: res.pageSize };
              return queryTeaInfo(postParams);
            }}
            rowKey="id"
            pagination={{ pageSize: 6 }}
            search={{
              labelWidth: 'auto',
            }}
            form={{ labelCol: { span: 5 } }}
            options={{ fullScreen: true, reload: false, setting: false }}
            dateFormatter="string"
            headerTitle="教师表格"
            toolBarRender={() => [
              <Button
                key="button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => {
                  setTemplateVisible(true);
                }}
              >
                新建
              </Button>,
            ]}
          />
        </Card>
      </PageContainer>

      <AddOrEditModal
        initValue={initValue}
        visible={templateVisible}
        handleCancel={() => setTemplateVisible(false)}
        handleOk={async (values) => {
          if (hasEmptyValue(values)) {
            message.warning('请填写完整！');
            return;
          }
          console.log(values, 1111);

          const postParams = {
            name: values.name,
            tea_id: values.tea_id,
            phone: values.phone,
            username: values.username,
            password: values.passwork,
            email: values.email,
            type: currentUser.type,
          };
          console.log(postParams, 1111);
          const res = await addTea(postParams);
          if (res.code === 0) {
            actionRef.current?.reload();
          }
          setTemplateVisible(false);
        }}
      />
    </>
  );
};
export default TeacherList;
