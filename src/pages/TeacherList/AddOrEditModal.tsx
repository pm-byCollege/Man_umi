/*
 新建SOP模版model 
*/

import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';

const layout = {
  labelCol: { span: 4 },
};

export default ({
  handleOk,
  handleCancel,
  visible,
  initValue,
}: {
  handleOk: (values: any) => void;
  handleCancel: () => void;
  visible: boolean;
  initValue?: any;
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initValue) {
      form.setFieldsValue({
        name: initValue.name,
        tea_id: initValue.tea_id,
        phone: initValue.phone,
        username: initValue.username,
        passwork: initValue.passwork,
        email: initValue.email,
        type: initValue.type,
      });
    }
  }, [initValue]);

  return (
    <Modal
      title="添加教师"
      maskClosable={false}
      visible={visible}
      onOk={() => {
        const value = form.getFieldsValue();
        // if (initValue.id) value.id = initValue.id;
        handleOk(value);
        form.resetFields();
      }}
      onCancel={handleCancel}
    >
      <Form form={form} {...layout}>
        <Form.Item label="名字" name="name" required>
          <Input placeholder="输入教师名称" />
        </Form.Item>
        <Form.Item label="工号" name="tea_id" required>
          <Input placeholder="请输入工号" />
        </Form.Item>
        <Form.Item
          label="手机"
          name="phone"
          required
          rules={[
            {
              pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
              message: '请输入正确的手机号',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          required
          rules={[
            {
              pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '邮箱格式不正确',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item label="登录系统用户名" name="username" required>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="登录系统的密码" name="passwork" required>
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
