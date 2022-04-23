import React, { useContext, useEffect, useRef } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'umi';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';

import { CloseCircleOutlined } from '@ant-design/icons';
import TemplateContext from './TemplateContext';
import { fetchFirmList, deleteFirm } from '@/services/firm';
import styles from './FirmTable.less';
import FirmModal from './components/FirmModal';

const { confirm } = Modal;

type TableListItem = {
  id: number;
};

const CLASSIFY = {
  软件开发: { text: '软件开发' },
  硬件开发: { text: '硬件开发' },
  金融: { text: '金融' },
  机械: { text: '机械' },
};

const ExpiredContact: React.FC = () => {
  const ref = useRef<ActionType>();
  const { taskTableReload } = useContext(TemplateContext);
  const { currentUser } = useSelector((state: any) => state.user);
  console.log(currentUser);

  useEffect(() => {
    ref.current?.reload();
  }, [taskTableReload]);

  // const { setHeadTitle } = useContext(TemplateContext);
  const onDel = async (id: number) => {
    confirm({
      title: '确定要删除这个任企业吗',
      icon: <CloseCircleOutlined />,
      content: '删除后不再显示该企业的实习投递情况',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      async onOk() {
        const res = await deleteFirm(id, currentUser.type);
        if (res.code === 0) {
          ref.current?.reload();
        }
      },
      onCancel() {},
    });
  };

  const colums: ProColumns<TableListItem>[] = [
    {
      title: '单位ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
      width: '10%',
    },
    {
      title: '单位名称',
      dataIndex: 'name',
      hideInSearch: true,
      hideInForm: true,
      width: '25%',
    },
    {
      title: '行业分类',
      dataIndex: 'classify',
      hideInSearch: true,
      hideInForm: true,
      width: '15%',
    },
    {
      title: '所在地区',
      dataIndex: 'region',
      hideInSearch: true,
      hideInForm: true,
      width: '10%',
    },
    {
      title: '招聘截至时间',
      dataIndex: 'endTime',
      hideInSearch: true,
      hideInForm: true,
      width: '15%',
    },
    {
      title: <span style={{ paddingLeft: '17px' }}>操作</span>,
      width: '20%',
      hideInSearch: true,
      render: (_: any, record: any) => (
        <>
          <Button
            type="link"
            onClick={() => {
              history.push({
                pathname: '/firmList/firmDetail',
                query: {
                  id: record.id,
                },
              });
            }}
          >
            详情
          </Button>
          <Button
            type="link"
            disabled={currentUser.type === 3}
            onClick={() => {
              onDel(record.id);
            }}
          >
            删除
          </Button>
          <FirmModal record={record} onFinish={() => ref.current?.reload()}>
            <Button disabled={record.status === 3} type="link">
              修改
            </Button>
          </FirmModal>
        </>
      ),
    },
  ];

  const searchFormColumns: ProColumns<TableListItem>[] = [
    {
      title: '公司名称',
      dataIndex: 'name',
      hideInTable: true,
    },
    {
      title: '所在行业',
      dataIndex: 'classify',
      hideInTable: true,
      valueEnum: CLASSIFY,
    },
    {
      title: '所在地区',
      dataIndex: 'region',
      hideInTable: true,
    },
  ];

  useEffect(() => {
    ref.current?.reload();
  }, [taskTableReload]);

  return (
    <TemplateContext.Consumer>
      {() => (
        <ProTable<TableListItem>
          className={styles['firm-protable']}
          rowKey="id"
          actionRef={ref}
          columnEmptyText={false}
          form={{ labelCol: { span: 5 } }}
          search={{ collapseRender: () => null, collapsed: false }}
          columns={[...colums, ...searchFormColumns]}
          request={async (params: Record<string, any>) => {
            const { name, classify, region, current, ...res } = params;
            const postParams = {
              page: current,
              pageSize: res.pageSize,
              name,
              classify,
              region,
            };
            return fetchFirmList(postParams);
          }}
          defaultData={[]}
          options={false}
        />
      )}
    </TemplateContext.Consumer>
  );
};

export default ExpiredContact;
