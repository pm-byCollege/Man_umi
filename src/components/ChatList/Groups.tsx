import React from 'react';
import { List, Avatar } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import classNames from 'classnames';
import styles from './index.less';
import GroupName from './GroupName';

type MemberType = {
  join_scene: number; // 入群场景
  join_time: number; // 入群时间
  type: number; // 类型
  userid: string; // 用户id
};

export interface ChatData {
  chat_id: string; //	群id
  name: string; //	群名称
  owner?: string; //	群主
  notice?: string; //	群公告
  member_list?: MemberType[]; // 成员列表
  memberLength?: number; // 成员列表长度, memberLength、member_list同时存在，优先使用memberLength
  create_time?: number; // 创建时间
  createdTimeStr: string;
}

export interface GroupsProps {
  data: ChatData[];
  loading?: boolean;
  rowKey: string;
  selectedKey: string;
  onItemClick?: (item: any) => void;
}

export default (props: GroupsProps) => {
  const { data = [], loading = false, selectedKey, rowKey, onItemClick: handleClick } = props;
  return (
    <List
      className={styles.list}
      itemLayout="horizontal"
      loading={loading}
      dataSource={data}
      renderItem={(item) => {
        const { memberLength } = item;
        let groupNum = memberLength;
        if (memberLength === undefined) {
          groupNum = item.member_list && item.member_list.length;
        }

        return (
          <List.Item
            className={classNames(styles['list-item'], {
              [styles.selected]: selectedKey === item[rowKey],
            })}
            onClick={() => handleClick && handleClick(item)}
          >
            <List.Item.Meta
              avatar={<Avatar size="large" shape="square" icon={<TeamOutlined />} />}
              title={<GroupName name={item.name} num={groupNum} />}
              description={item.createdTimeStr || ''}
            />
          </List.Item>
        );
      }}
    />
  );
};
