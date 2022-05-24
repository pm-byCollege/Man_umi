import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

interface IProps {
  name: string;
  /**
   * 1 微信; 2 外部联系人
   */
  type: number;
  corpName: string;
}

export default (props: IProps) => {
  const { name, type, corpName } = props;

  return (
    <div className={styles['title-wrap']}>
      <div className={styles.title}>
        <Tooltip title={name} placement="topLeft" mouseEnterDelay={0.5}>
          <span>{name}</span>
        </Tooltip>
      </div>
      <div className={styles.extra}>
        <span
          className={classNames(styles['relation-text'], styles[type === 1 ? 'primary' : 'other'])}
        >
          {type === 1 && '@微信'}
          {type === 2 && `@${corpName}`}
        </span>
      </div>
    </div>
  );
};
