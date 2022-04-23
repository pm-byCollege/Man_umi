// import { ConnectState } from '@/models/connect';
// import { getSopDayList } from '@/services/sop';
// import { RightOutlined } from '@ant-design/icons';
import { Layout, List, Menu } from 'antd';
// import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
// import { IContentList, useDispatch, useSelector } from 'umi';
import { getDeliveryInfo } from '@/services/firm';
// import SopSendDrawer from '../SopSendDrawer';
import styles from './NewTemplateLayout.less';

const { Header, Sider, Content } = Layout;

type ICurrentDaysOptions = {
  stu_id: string;
  stu_name: string;
  firm: string;
  post: string;
};

export default ({ postList, firmId }: { postList: string; firmId: number }) => {
  // const [form] = useForm();
  // const dispatch = useDispatch();
  // const { sopContentList } = useSelector((state: ConnectState) => state.sop);
  const [postOptions, setPostOptions] = useState<ICurrentDaysOptions[]>([]);
  const [currentPost, setCurrenPost] = useState<ICurrentDaysOptions[]>();
  const [defaultDay, setDefaultDay] = useState<string[]>();
  // const [contentVisible, setContentVisible] = useState<boolean>(false);
  // const [contentId, setContentId] = useState<number>(0);
  const [postListArr, setPostListArr] = useState<any[]>([]);

  // 获取该企业的投递情况
  const getPostContent = async () => {
    const res = await getDeliveryInfo(Number(firmId));
    if (res.code === 0) {
      // 将该企业的投递情况数组传入状态
      setPostOptions(res.data);
    }
  };

  useEffect(() => {
    const cur = postOptions.filter((a) => {
      return postListArr[0] === a.post;
    });
    console.log(cur);

    setCurrenPost(cur);
  }, [postOptions]);

  // 获取该企业的岗位列表
  useEffect(() => {
    if (postList) {
      const arr = postList.split(',');
      setPostListArr(arr);
      setDefaultDay([arr[0]]);
      getPostContent();
    }
  }, [postList, firmId]);

  // const getDays = async () => {
  //   const res = await getSopDayList(sopTemplateId);
  //   if (res.code === 200 && res.data) {
  //     setCurrentDaysOptions(res.data);
  //   }
  // };
  // 首次加载
  // const initDays = async () => {
  //   const res = await getSopDayList(sopTemplateId);
  //   if (res.code === 200 && res.data) {
  //     setCurrentDaysOptions(res.data);
  //     setDefaultDay([res.data[0].dayNum.toString()]);
  //     form.setFieldsValue({
  //       dayNum: res.data[0].dayNum,
  //       title: res.data[0].title,
  //     });
  //     setCurrentDaysObj(res.data[0]);
  //   }
  // };

  // useEffect(() => {
  //   initDays();
  // }, [sopTemplateId]);

  // useEffect(() => {
  //   if (currentDaysObj?.id) {
  //     dispatch({
  //       type: 'sop/getSopContentList',
  //       payload: currentDaysObj?.id,
  //     });
  //   }
  // }, [currentPost]);

  // 删除天数
  // const deleteDays = async (id: number) => {
  //   const res = await deleteSopDay(id);
  //   if (res.code === 200) {
  //     getDays();
  //   }
  // };

  // 当前选中天数

  const handleSelect = (item: any) => {
    const { selectedKeys } = item;
    setDefaultDay(selectedKeys);
    const cur = postOptions.filter((a) => {
      return selectedKeys[0] === a.post;
    });

    console.log(cur);

    setCurrenPost(cur);
    // form.setFieldsValue({
    //   dayNum: currentObj?.dayNum,
    //   title: currentObj?.title,
    // });
  };

  // // 查看详细内容
  // const handleDetailContent = (id: number) => {
  //   setContentId(id);
  //   setContentVisible(true);
  // };

  return (
    <>
      {/* <SopSendDrawer
        id={contentId}
        type="detail"
        sopTemplateId={sopTemplateId}
        dayId={currentDaysObj?.id || 0}
        title="添加内容"
        visible={contentVisible}
        onCancel={() => setContentVisible(false)}
      /> */}
      <Layout
        style={{
          height: 'calc(100vh - 96px)',
          backgroundColor: '#fff',
        }}
      >
        <Sider
          theme="light"
          width={200}
          style={{ textAlign: 'center', borderRight: '1px solid #f0f0f0', display: 'block' }}
        >
          <div className={styles['add-layout-title']}>
            <div className={styles['add-layout-title-text']}>可投递岗位</div>
          </div>
          <Menu
            className={styles['list-menu-box']}
            selectedKeys={defaultDay}
            onSelect={handleSelect}
          >
            {postListArr.map((item: string) => (
              <Menu.Item key={item}>
                <span>{item}</span> &nbsp;
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles['new-header']} style={{ display: 'block' }}>
            <div>投递情况</div>
          </Header>
          <Content style={{ padding: '10px 15px', backgroundColor: '#fff' }}>
            <div className={styles['new-header-detail']}>
              该岗位共收到{currentPost?.length}条投递
            </div>
            <div className={styles['new-content-box']}>
              <List
                className={styles['new-content-box-list']}
                size="small"
                dataSource={currentPost}
                renderItem={(item: IContentList) => (
                  <List.Item
                  // onClick={() => handleDetailContent(item.id)}
                  >
                    <p>学号：{item.stu_id} </p>&emsp;
                    <p>姓名： {item.stu_name}</p>
                  </List.Item>
                )}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
