import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, message, Space } from 'antd';
import NewForm from './NewForms';
import TaskModalContext, { TaskModalContextProps } from './ModalContext';
import Breakcrumb, { AllPageId, PAGE_ID_INFO } from './Breakcrumb';
import CheckoutList from '@/components/CheckBoxPageList';
import { getPostList } from '@/services/firm';
import { hasEmptyValue } from '@/utils/utils';
import { addFirm, editFirm } from '@/services/firm';
import moment from 'moment';
import { useSelector } from 'umi';

interface IProps {
  onFinish: () => void;
  record?: any;
}

const FirmModal: React.FC<IProps> = (props) => {
  const { record, children, onFinish } = props;
  const { currentUser } = useSelector((state: any) => state.user);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [sourceData, setSourceData] = useState<any>({});
  const [breakList, setBreakList] = useState<AllPageId[]>(['firm']);
  const currentPageId = breakList[breakList.length - 1];
  // const [sourceData] = useState<any>({});

  useEffect(() => {
    if (record) {
      const { endTime, post, postId } = record;
      const postIdArr = postId.split(',');
      const posts = post.split(',').map((item: any, index: string | number) => {
        return {
          id: Number(postIdArr[index]),
          postName: item,
        };
      });
      form.setFieldsValue({
        endTime: moment(endTime, 'YYYY-MM-DD'),
        name: record.name,
        region: record.region,
        classify: record.classify,
        posts,
      });
      setSourceData({
        ...record,
        posts,
      });
    }
  }, [record]);

  // useEffect(() => {
  //   console.log(sourceData, 1111);
  // }, [sourceData]);

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

    // 编辑或新增 参数
    const postData = sourceData.id
      ? {
          id: sourceData.id,
          name,
          classify,
          region,
          endTime: endTime.format('YYYY-MM-DD'),
          post: sourceData.posts,
          type: currentUser.type,
        }
      : {
          name,
          classify,
          region,
          endTime: endTime.format('YYYY-MM-DD'),
          post: sourceData.posts,
          type: currentUser.type,
        };
    console.log(postData, '新增或修改的参数');
    if (hasEmptyValue(postData)) {
      message.warning('请填写完整！');
      return;
    }

    if (sourceData.id) {
      const res = await editFirm(postData);
      if (res.code === 0) {
        setSourceData({});
        form.resetFields();
        setVisible(false);
        onFinish();
      } else {
        message.error(res.msg);
      }
    } else {
      const res = await addFirm(postData);
      if (res.code === 0) {
        setSourceData({});
        form.resetFields();
        setVisible(false);
        onFinish();
      } else {
        message.error(res.msg);
      }
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
