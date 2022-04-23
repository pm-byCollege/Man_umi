import React from 'react';
import type { ReactNode } from 'react';

import styles from './index.less';

export default ({
  title,
  result,
  styleContent,
  styleLabel,
  style,
  classNameLabel,
  classNameContent,
}: {
  title: string;
  result: string | ReactNode;
  styleContent?: React.CSSProperties;
  styleLabel?: React.CSSProperties;
  style?: React.CSSProperties;
  classNameLabel?: string;
  classNameContent?: string;
}) => {
  return (
    <div className={styles['detail-item-box']} style={style}>
      <div style={styleLabel} className={`${styles['detail-item-box-label']} ${classNameLabel}`}>
        {title ? `${title}：` : ''}
      </div>
      <div
        style={styleContent}
        className={`${styles['detail-item-box-content']} ${classNameContent}`}
      >
        {result}
      </div>
    </div>
  );
};
