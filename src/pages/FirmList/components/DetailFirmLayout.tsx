// import { ConnectState } from '@/models/connect';
// import { getSopDayList } from '@/services/sop';
// import { RightOutlined } from '@ant-design/icons';
import { Button, Layout, List, Menu, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
// import { IContentList, useDispatch, useSelector } from 'umi';
import { getDeliveryInfo, down } from '@/services/firm';
// import SopSendDrawer from '../SopSendDrawer';
import styles from './NewTemplateLayout.less';
import { useSelector } from 'umi';

const { Header, Sider, Content } = Layout;

type ICurrentDaysOptions = {
  stu_id: number;
  stu_name: string;
  firm: number;
  post: string;
  postId: string;
  filepath: string;
};

export default ({
  postList,
  firmId,
  postIdList,
  firmStatus,
}: {
  postList: string;
  firmId: number;
  postIdList: string;
  firmStatus: number;
}) => {
  // const [form] = useForm();
  // const dispatch = useDispatch();
  // const { sopContentList } = useSelector((state: ConnectState) => state.sop);

  const [postOptions, setPostOptions] = useState<ICurrentDaysOptions[]>([]);
  const [currentPost, setcurrentPost] = useState<ICurrentDaysOptions[]>();
  const [defaultDay, setDefaultDay] = useState<string[]>([]);
  const [defaultDayId, setDefaultDayId] = useState<string>();
  const { currentUser } = useSelector((state: any) => state.user);
  // const [contentVisible, setContentVisible] = useState<boolean>(false);
  // const [contentId, setContentId] = useState<number>(0);
  const [postListArr, setPostListArr] = useState<any[]>([]);
  const [postListIdArr, setPostIdListArr] = useState<any[]>([]);
  const [isUpLoad, setIsUpLoad] = useState<boolean>();
  const [isUpLoadFile, setIsUpLoadFile] = useState<string>();

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

    // 判断初次加载的第一个岗位是否登录的学生以投简历
    const isUp = cur.find((b) => b.stu_id === currentUser.stu_id && b.filepath);
    if (isUp) {
      setIsUpLoad(true);
      setIsUpLoadFile(isUp.filepath);
    } else setIsUpLoad(false);

    setcurrentPost(cur);
  }, [postOptions]);

  // 获取该企业的岗位列表
  useEffect(() => {
    if (postList) {
      const arr = postList.split(',');
      setPostListArr(arr);
      const arr1 = postIdList.split(',');

      setPostIdListArr(arr1);
      setDefaultDay([arr[0]]);
      setDefaultDayId(arr1[0]);

      getPostContent();
    }
  }, [postList, firmId, postIdList]);

  const handleSelect = (item: any) => {
    const { selectedKeys } = item;
    console.log(selectedKeys, 111);

    setDefaultDay(selectedKeys);
    const cur = postOptions.filter((a) => {
      return selectedKeys[0] === a.post;
    });

    postListArr.forEach((b, index) => {
      if (b === selectedKeys[0]) {
        setDefaultDayId(postListIdArr[index]);
      }
    });

    console.log(cur);
    // 判断切换岗位时该岗位登录的学生是否投递简历。
    const isUp = cur.find((b) => b.stu_id === currentUser.stu_id && b.filepath);
    if (isUp) {
      setIsUpLoad(true);
      setIsUpLoadFile(isUp.filepath);
    } else setIsUpLoad(false);

    setcurrentPost(cur);
    // form.setFieldsValue({
    //   dayNum: currentObj?.dayNum,
    //   title: currentObj?.title,
    // });
  };

  const upprps = {
    name: 'file',
    accept: 'pdf',
    action: `/api/upload?stu_id=${currentUser.stu_id}&postId=${defaultDayId}&firmId=${firmId}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: { file: { status: string; name: any }; fileList: any }) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const dowmFile = async (name) => {
    await down(name).then((res) => {
      console.log(res);
      const blob = new Blob([res], {
        type: 'application/pdf;chartset=UTF-8',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      link.click();
    });
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
          {currentUser.type === 3 ? (
            <Content style={{ padding: '10px 15px', backgroundColor: '#fff' }}>
              <div className={styles['new-header-detail']}>
                {firmStatus === 1 ? '截至时间未到，可投递' : '截止时间已过不可投递'}
              </div>
              <div className={styles['new-header-detail']}>{isUpLoad ? '已投递' : '未投递'}</div>
              <div className={styles['new-content-box']}>
                <div className={styles['new-content-box-list']}>
                  <Upload {...upprps}>
                    <Button disabled={firmStatus === 0} icon={<UploadOutlined />}>
                      {isUpLoad ? '重新上传' : '上传简历'}
                    </Button>
                  </Upload>
                  {isUpLoad ? (
                    <Button
                      style={isUpLoad ? {} : {}}
                      onClick={() => {
                        dowmFile(isUpLoadFile);
                      }}
                    >
                      查看简历
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Content>
          ) : (
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
                      <Button
                        onClick={() => {
                          dowmFile(item.filepath);
                        }}
                      >
                        查看该学生简历
                      </Button>
                    </List.Item>
                  )}
                />
              </div>
            </Content>
          )}
        </Layout>
      </Layout>
    </>
  );
};
