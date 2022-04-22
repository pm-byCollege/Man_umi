import React from 'react';
import { List, Avatar, Divider, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import classNames from 'classnames';
import styles from './index.less';
import CustomerName from './CustomerName';

export interface ClientData {
  id: string; //	外部联系人的userid
  createdTime: number;
  updatedTime: number;
  createdTimeStr: string;
  name: string; //	外部联系人的名称
  position: string; //	外部联系人的职位
  avatar: string; //	外部联系人头像
  corp_name: string; //	外部联系人所在企业的简称
  corp_full_name: string; //	外部联系人所在企业的主体名称
  type: number; //	外部联系人的类型 1 微信用户 2 外部联系人
  gender: number; //	性别。0表示未定义，1表示男性，2表示女性
  unionid: string; //	微信unionid
  userId: string; //	成员userId
  agreeFile: number; // 是否同意存档，0 不同意，1 同意
}

export interface CustomerProps {
  data: ClientData[];
  loading: boolean;
  rowKey: string;
  selectedKey: string;
  onItemClick?: (item: any) => void;
  extraData?: any;
}

export default (props: CustomerProps) => {
  const {
    data = [],
    loading = false,
    rowKey,
    selectedKey,
    onItemClick: handleClick,
    extraData = {},
  } = props;

  const agreeBar = (
    <div className={styles.list}>
      <div className={styles['list-item']} style={{ paddingTop: 5, paddingBottom: 5 }}>
        <div className={styles['title-wrap']}>
          <div className={styles.title}>同意存档占比{extraData.percent || 0}%</div>
        </div>
        <div>
          同意存档{extraData.agree || 0}人，拒绝存档{extraData.disagree || 0}人
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {extraData.agree !== undefined && agreeBar}

      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <List
          className={styles.list}
          itemLayout="horizontal"
          loading={loading}
          dataSource={data}
          footer={
            data.length > 0 ? (
              <Divider className={styles['footer-divider']}>没有更多了</Divider>
            ) : null
          }
          renderItem={(item) => (
            <List.Item
              className={classNames(styles['list-item'], {
                [styles.selected]: selectedKey === item[rowKey],
              })}
              onClick={() => handleClick && handleClick(item)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar size="large" shape="square" src={item.avatar} icon={<UserOutlined />} />
                }
                title={<CustomerName name={item.name} corpName={item.corp_name} type={item.type} />}
                description={item.createdTimeStr || ''}
              />
              {typeof item.agreeFile === 'boolean' && !item.agreeFile && (
                <Tag className={styles.tag}>拒绝存档</Tag>
              )}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
