import React, { useState } from 'react';
import { Tooltip } from 'antd';

import { withRouter, useSelector } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TemplateContext from './TemplateContext';
import FirmTable from './FirmTable';

const TOOLTIP =
  '可实习的各单位信息。学生可投递简历、查看信息。教师与管理员可操作单位信息，查看投递情况';

const breadcrumbNameMap = {
  // firm: <FirmTable />,
  // firmDetail: <TemplateDetail />,
  firmList: <FirmTable />,
  firmDetail: <div>2</div>,
};

export default withRouter(({ location }) => {
  // const dispatch = useDispatch();
  const pathname = location.pathname.split('/').filter((i) => i);
  console.log(pathname);

  const { currentUser } = useSelector((state: any) => state.user);
  const [taskTableReload] = useState<boolean>(false);
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
        // extra={
        //   pathname[pathname.length - 1] === 'firmList'
        //     ? [
        //         <TaskModal onFinish={() => setTaskTableReload(true)}>
        //           <Button type="primary" className="btnHide">
        //             新建任务
        //           </Button>
        //         </TaskModal>,
        //         <Button type="primary" ghost onClick={addTemplate} className="btnHide">
        //           新建模版
        //         </Button>,
        //       ]
        //     : [
        //         <Button
        //           onClick={() => {
        //             setCurrentKey('sop');
        //           }}
        //         >
        //           返回
        //         </Button>,
        //         location.query?.type === 'detail' && (
        //           <Button
        //             className="btnHide"
        //             type="primary"
        //             onClick={() => {
        //               setHeadTitle('群SOP / 修改模板');
        //               // history.push({
        //               //   pathname: '/group/sop/templateDetail',
        //               //   query: {
        //               //     id: location.query?.id,
        //               //     type: 'edit',
        //               //     operator: location.query?.operator,
        //               //   },
        //             }}
        //           >
        //             编辑内容
        //           </Button>
        //         ),
        //       ]
        // }
      >
        {breadcrumbNameMap[pathname[pathname.length - 1]]}
      </PageContainer>
    </TemplateContext.Provider>
  );
});
