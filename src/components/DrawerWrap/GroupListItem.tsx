import React from 'react';
import type { ReactNode, ReactText } from 'react';
import { List } from 'antd';
// import { TeamOutlined } from '@ant-design/icons';
// import GroupName from '../ChatList/GroupName';

interface GroupListItemProps {
  name: ReactText;
  // count: number;
  // ownerName: ReactNode;
  extra?: ReactNode;
}

export default (props: GroupListItemProps) => {
  const { name, extra } = props;
  return (
    <List.Item>
      <List.Item.Meta
        // avatar={<Avatar shape="square" size="large" icon={<TeamOutlined />} />}
        title={name}
        // description={<span style={{ fontSize: '12px' }}>群主:{ownerName}</span>}
      />
      {extra}
    </List.Item>
  );
};
