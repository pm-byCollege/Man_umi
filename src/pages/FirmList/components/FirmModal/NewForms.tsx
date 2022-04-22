import { DatePicker, Form, Input, Select, Tag } from 'antd';
import React, { useContext } from 'react';
import styles from '../../index.less';
import TaskModalContext from './ModalContext';
const { Option } = Select;

export default ({ record }) => {
  const { posts = [] } = record;
  const { updateBreadcrumb } = useContext(TaskModalContext);

  const handlePostChange = () => {
    if (updateBreadcrumb) {
      updateBreadcrumb(['post'], 'push');
    }
  };

  const onClassifyChange = (value: string) => {
    if (record.onChange) {
      record.onChange(value);
    }
  };

  const onRegionChange = (value: string) => {
    if (record.onChange) {
      record.onChange(value);
    }
  };

  return (
    <Form.Item className={styles['task-input-box']}>
      <Form.Item name="name" label="企业名称" required>
        <Input />
      </Form.Item>
      <Form.Item name="classify" label="行业分类" required>
        <Select placeholder="请选择实习企业的行业分类" onChange={onClassifyChange} allowClear>
          <Option value="软件开发">软件开发</Option>
          <Option value="硬件开发">硬件开发</Option>
          <Option value="机械">机械</Option>
          <Option value="金融">金融</Option>
          <Option value="视觉/设计">视觉/设计</Option>
        </Select>
      </Form.Item>
      <Form.Item name="region" label="所在地区" required>
        <Select placeholder="选择实习地区" onChange={onRegionChange} allowClear>
          <Option value="广州">广州</Option>
          <Option value="北京">北京</Option>
          <Option value="深圳">深圳</Option>
        </Select>
      </Form.Item>
      <Form.Item name="endTime" label="截止时间" required>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="posts" label="可选岗位" required>
        <Form.Item className={styles['task-input-box-item']}>
          <div style={{ padding: '5px 0' }} onClick={handlePostChange}>
            {posts?.map((p: any) => (
              <Tag
                key={p.id}
                closable
                onClose={() => {
                  posts.splice(posts.indexOf(p), 1);
                }}
              >
                {p.postName}
              </Tag>
            ))}
          </div>
        </Form.Item>
      </Form.Item>
    </Form.Item>
  );
};
