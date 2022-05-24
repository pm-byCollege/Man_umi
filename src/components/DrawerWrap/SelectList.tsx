import React, { useState } from 'react';
import type { ReactNode, ReactText } from 'react';
import { Checkbox, List } from 'antd';

import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import GroupListItem from './GroupListItem';
import Header from './Header';

interface SelectListProps {
  onChange: (values: CheckboxValueType[]) => void;
  values: CheckboxValueType[];
  dataSource: any[];
  titleRender?: ReactText | ((values: any[], dataSource: any[]) => ReactText | ReactNode);
}

const SelectList: React.FC<SelectListProps> = (props) => {
  const [filterName, setFilterName] = useState('');
  const { dataSource, values, onChange: handleChange, titleRender } = props;

  const headerTitle = () => {
    if (typeof titleRender === 'function') {
      return titleRender(dataSource, values);
    }

    if (typeof titleRender === 'undefined') {
      return `共${dataSource.length}个已应用该规则的群，已选${values.length}个`;
    }

    return titleRender;
  };

  const filterList = () => {
    if (filterName.length > 0) {
      return dataSource.filter((d) => d.title.includes(filterName));
    }
    return dataSource;
  };

  return (
    <>
      <Header title={headerTitle()} onSearch={setFilterName} />
      <Checkbox.Group value={values} style={{ width: '100%' }} onChange={handleChange}>
        <List
          dataSource={filterList()}
          renderItem={(item: any) => (
            <GroupListItem
              name={item.title}
              count={item.memberCount}
              ownerName={item.ownerName}
              extra={<Checkbox value={item.chatId} />}
            />
          )}
        />
      </Checkbox.Group>
    </>
  );
};

export default SelectList;
