import React, { useState } from 'react';
import { List, Avatar, Divider, Tag, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import classNames from 'classnames';
import styles from './index.less';

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
  selectedKey: string;
  onItemClick?: (item: any) => void;
  extraData?: any;
}

export default (props: CustomerProps) => {
  const { data = [], loading = false, selectedKey, onItemClick: handleClick } = props;
  const [currentIndex, setCurrentIndex] = useState<number>();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          renderItem={(item, index) => (
            <List.Item
              className={classNames(styles['list-item'], {
                [styles.selected]: selectedKey === item.id,
              })}
              onClick={() => {
                setCurrentIndex(index);
                if (handleClick) {
                  handleClick(item);
                }
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar size="large" shape="square" src={item.avatar} icon={<UserOutlined />} />
                }
                title={item.name}
                description={
                  <div>
                    <p>{item.createdTimeStr || ''}</p>
                    {currentIndex === index && (
                      <div>
                        <Row>
                          <Col flex={1} style={{ paddingBottom: '10px' }}>
                            <p>发送信息</p>
                            <b>ffg</b>
                          </Col>
                          <Col flex={1}>
                            <p>接收信息</p>
                            <b>ffg</b>
                          </Col>
                        </Row>
                        <Row>
                          <Col flex={1}>
                            <p>首次回复时长</p>
                            <b>ffg</b>
                          </Col>
                          <Col flex={1}>
                            <p>平均回复时长</p>
                            <b>ffg</b>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                }
              >
                {!item.agreeFile && <Tag className={styles.tag}>拒绝存档</Tag>}
              </List.Item.Meta>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
