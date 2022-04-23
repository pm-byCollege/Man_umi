import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { history } from 'umi';
import { withRouter, useSelector } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TemplateContext from './TemplateContext';
import FirmTable from './FirmTable';
import FirmModal from './components/FirmModal';
import FirmDetail from './FirmDetail';

const TOOLTIP =
  '可实习的各单位信息。学生可投递简历、查看信息。教师与管理员可操作单位信息，查看投递情况';

const breadcrumbNameMap = {
  // firm: <FirmTable />,
  // firmDetail: <TemplateDetail />,
  firmList: <FirmTable />,
  firmDetail: <FirmDetail />,
};

export default withRouter(({ location }) => {
  // const dispatch = useDispatch();
  const pathname = location.pathname.split('/').filter((i) => i);
  console.log(pathname, 222);

  const { currentUser } = useSelector((state: any) => state.user);
  // const [taskTableReload] = useState<boolean>(false);
  const [taskTableReload, setTaskTableReload] = useState<boolean>(false);
  const [headTitle] = useState<string>('实习单位列表');
  console.log(currentUser);

  const toolTip = (
    <Tooltip title={TOOLTIP}>
      <ExclamationCircleOutlined />
    </Tooltip>
  );

  const getContext = () => {
    return {
      // 修改模板可见属性、修改模板初始值
      // setTemplateVisible,
      // setInitValue,
      // setHeadTitle,
      // setIsCopyTemplate,
      // currentKey,
      taskTableReload,
      // sopTableReload,
    };
  };

  return (
    <TemplateContext.Provider value={getContext()}>
      <PageContainer
        title={headTitle}
        subTitle={toolTip}
        extra={
          pathname[pathname.length - 1] === 'firmList'
            ? [
                <FirmModal
                  onFinish={() => {
                    setTaskTableReload(true);
                  }}
                >
                  <Button type="primary" disabled={currentUser.type === 3}>
                    新建企业
                  </Button>
                </FirmModal>,
              ]
            : // eslint-disable-next-line react/jsx-key
              [
                <Button
                  onClick={() => {
                    history.push({
                      pathname: `/firmList`,
                    });
                  }}
                >
                  返回
                </Button>,
              ]
        }
      >
        {breadcrumbNameMap[pathname[pathname.length - 1]]}
      </PageContainer>
    </TemplateContext.Provider>
  );
});
