import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, message, Space } from 'antd';
import NewForm from './NewForms';
import TaskModalContext, { TaskModalContextProps } from './ModalContext';
import Breakcrumb, { AllPageId, PAGE_ID_INFO } from './Breakcrumb';
import CheckoutList from '@/components/CheckBoxPageList';
import { getPostList } from '@/services/firm';
import { hasEmptyValue } from '@/utils/utils';
import { addFirm } from '@/services/firm';

interface IProps {
  onFinish: () => void;
  record?: any;
}

const FirmModal: React.FC<IProps> = (props) => {
  const { record, children, onFinish } = props;
  console.log(1111);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [sourceData, setSourceData] = useState<any>({});
  const [breakList, setBreakList] = useState<AllPageId[]>(['firm']);
  const currentPageId = breakList[breakList.length - 1];
  // const [sourceData] = useState<any>({});

  const onClose = () => {
    // if (record) setSourceData(record);
    // else setSourceData({});

    if (breakList.length > 1) {
      setBreakList(['firm']);
      return;
    }
    if (record) setSourceData(record);
    else setSourceData({});
    setVisible(false);
  };

  const getContext: () => TaskModalContextProps = () => {
    return {
      breakList,
      updateBreadcrumb: (pageIds, mode = 'all') => {
        const rightIds = pageIds.filter((id) => PAGE_ID_INFO[id] !== undefined);
        if (mode === 'all') {
          setBreakList(rightIds);
        }
        if (mode === 'push') {
          setBreakList((prev) => [...prev, ...rightIds]);
        }
      },
    };
  };

  const onCloseBreakList = () => {
    if (breakList.length > 1) {
      setBreakList(['firm']);
    }
    if (record) setSourceData(record);
    else setSourceData({});
    setVisible(false);
  };

  const onFooterFinish = async () => {
    if (breakList.length > 1) {
      const { post } = form.getFieldsValue();
      if (post) {
        setSourceData({
          ...sourceData,
          posts: post.map((p: any) => {
            return {
              id: p.id,
              postName: p.postName,
            };
          }),
        });
        form.setFieldsValue({
          posts: post.map((p: any) => p.id),
        });
      }
      setBreakList(['firm']);
      return;
    }
    const { name, classify, region, endTime } = form.getFieldsValue();

    const postData = {
      name,
      classify,
      region,
      endTime: endTime.format('YYYY-MM-DD'),
      post: sourceData.posts,
    };
    console.log(postData);
    if (hasEmptyValue(postData)) {
      message.warning('请填写完整！');
      return;
    }

    const res = await addFirm(postData);
    if (res.code === 0) {
      setSourceData({});
      form.resetFields();
      setVisible(false);
      onFinish();
    } else {
      message.error(res.msg);
    }
  };

  // useEffect(() => {
  //   console.log(record, 2222);
  // }, [record]);

  // useEffect(() => {
  //   console.log(sourceData);
  // }, [sourceData]);

  const renderPageDetail = {
    firm: <NewForm record={sourceData} />,
    post: (
      <Form.Item name="post">
        <CheckoutList
          beSel={sourceData.posts}
          request={async (filter) => {
            return getPostList({ ...filter });
          }}
        />
      </Form.Item>
    ),
  };

  useEffect(() => {
    console.log(record);

    if (record) {
      setSourceData(record);
    }
  }, [record]);

  return (
    <TaskModalContext.Provider value={getContext()}>
      <span
        onClick={() => {
          setVisible(true);
        }}
      >
        {children}
      </span>
      <Drawer
        title={<Breakcrumb />}
        width={500}
        visible={visible}
        onClose={onCloseBreakList}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={onClose}>取消</Button>
              <Button type="primary" onClick={onFooterFinish}>
                确定
              </Button>
            </Space>
          </div>
        }
      >
        <Form form={form}>{renderPageDetail[currentPageId]}</Form>
      </Drawer>
    </TaskModalContext.Provider>
  );
};

export default FirmModal;
