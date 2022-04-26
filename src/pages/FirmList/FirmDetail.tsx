// import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'umi';
import ActiveInfo from '@/components/ActiveInfo';
// import type { ConnectState } from '@/models/connect';
// import NewTemplateLayout from './components/NewTemplateLayout';
// import AddOrEditModal from './components/AddOrEditModal';
import DetailTemplateLayout from './components/DetailFirmLayout';
import { getFirmInfo } from '@/services/firm';

type IInfo = {
  id: number;
  name: string;
  region: string;
  classify: string;
  endTime: string;
  post: string;
  postId: string;
};

export default withRouter(({ location }) => {
  // const dispatch = useDispatch();
  // const { sopTemplateInfo } = useSelector((state: ConnectState) => state.sop);

  const { id } = location.query;
  const [sourceData, setSourceData] = useState<IInfo>({});
  // const currentId = +id;

  // const [visible, setVisible] = useState<boolean>(false);

  const getInfo = async (Id: number) => {
    const res = await getFirmInfo(Id);
    if (res.code === 0) {
      setSourceData(res.data[0]);
    }
  };

  useEffect(() => {
    getInfo(id);
  }, [id]);

  return (
    <>
      <Card title="招聘详情" style={{ marginBottom: '20px' }}>
        <ActiveInfo title="企业名称" result={<span>{sourceData.name} </span>} />
        <ActiveInfo title="所在地区" result={sourceData.region || '无'} />
        <ActiveInfo title="行业分类" result={sourceData.classify} />
        <ActiveInfo title="招聘截至时间" result={sourceData.endTime} />
      </Card>
      <DetailTemplateLayout postList={sourceData.post} postIdList={sourceData.postId} firmId={id} />

      {/* {type === 'edit' && <NewTemplateLayout sopTemplateId={currentId} />}
      {type === 'detail' && <DetailTemplateLayout sopTemplateId={currentId} />}

      <AddOrEditModal
        visible={visible}
        handleOk={(values) => {
          dispatch({
            type: 'sop/addOrEditSopTemplate',
            payload: {
              id: currentId,
              ...values,
            },
          }).then((res) => {
            if (res) {
              setVisible(false);
              getInfo();
            }
          });
        }}
        handleCancel={() => setVisible(false)}
        initValue={{
          title: sopTemplateInfo?.title,
          remark: sopTemplateInfo?.remark,
        }}
      /> */}
    </>
  );
});
