import React from 'react';
import type { ReactNode, ReactText } from 'react';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/lib/input';
import styles from './index.less';

interface FooterProps {
  title: ReactText | ReactNode;
  onSearch: SearchProps['onSearch'];
  label?: string;
  labelPlaceholder?: string;
}

const Header: React.FC<FooterProps> = (props) => {
  const {
    title,
    onSearch: handleSearch,
    label = '搜索岗位',
    labelPlaceholder = '请输入岗位名称',
  } = props;
  return (
    <div className={styles['source-filter-input']}>
      <div>{title}</div>
      <Space>
        <span style={{ paddingRight: '15px ' }}>{label}:</span>
        <Input.Search
          placeholder={labelPlaceholder}
          style={{ width: 200 }}
          onSearch={handleSearch}
        />
      </Space>
    </div>
  );
};

export default Header;
