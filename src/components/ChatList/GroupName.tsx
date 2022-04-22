import React, { ReactText } from 'react';
import { Tag, Tooltip } from 'antd';

import styles from './index.less';

export default (props: { name: ReactText; num?: number }) => {
  const { name = '未命名的群聊', num = 0 } = props;

  return (
    <div className={styles['title-wrap']}>
      <div className={styles.title}>
        <Tooltip title={`${name}（${num}）`} placement="topLeft" mouseEnterDelay={0.5}>
          <span>
            {name}（{num || 0}）
          </span>
        </Tooltip>
      </div>
      <div className={styles.extra}>
        <Tag className={styles.tag}>外部群</Tag>
      </div>
    </div>
  );
};
