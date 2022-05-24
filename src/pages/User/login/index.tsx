import {
  // AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  // TaobaoCircleOutlined,
  UserOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';
import { message, Tabs, Button } from 'antd';
import React, { useRef, useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { sendEmail, resetPwd, getNewUser } from '@/services/login';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

const Login: React.FC<LoginProps> = (props) => {
  const { submitting } = props;
  const { dispatch } = props;
  // const { status, type: loginType } = userLogin;
  const [type, setType] = useState<string>('account');
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const handleSubmit = async (values: any) => {
    console.log(values, '提交');
    if (type === 'account') {
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    } else if (type === 'forget') {
      const res = await resetPwd(values);
      if (res.code === 0) {
        message.success(res.msg);
        setType('account');
        formRef?.current?.resetFields();
      } else {
        message.success(res.msg);
        // setType('account');
      }
    } else {
      const res = await getNewUser(values);
      if (res.code === 0) {
        message.success(res.msg);
        formRef?.current?.resetFields();
        setType('account');
      } else {
        message.error(res.msg);
      }
    }
  };

  return (
    <div className={styles.main}>
      <ProForm
        // initialValues={{
        //   autoLogin: true,
        // }}
        formRef={formRef}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: 'Account password login',
            })}
          />
          <Tabs.TabPane key="register" tab="注册" />
          <Tabs.TabPane key="forget" tab="忘记密码" />
        </Tabs>

        {/* {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: 'Incorrect account or password（admin/ant.design)',
            })}
          />
        )} */}
        {type === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入用户名，管理员pm'}
              rules={[
                {
                  required: true,
                  message: '输入用户名',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'管理员密码111'}
              rules={[
                {
                  required: true,
                  message: '密码不为空',
                },
              ]}
            />
          </>
        )}

        {/* {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="Verification code error" />
        )} */}
        {type === 'forget' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              name="email"
              placeholder="请输入邮箱"
              rules={[
                {
                  required: true,
                  message: '邮箱不能为空',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.captcha.placeholder',
                defaultMessage: 'Please enter verification code',
              })}
              // countDown={}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${intl.formatMessage({
                    id: 'pages.getCaptchaSecondText',
                    defaultMessage: 'Get verification code',
                  })}`;
                }
                return intl.formatMessage({
                  id: 'pages.login.phoneLogin.getVerificationCode',
                  defaultMessage: 'Get verification code',
                });
              }}
              phoneName="email"
              name="code"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.captcha.required"
                      defaultMessage="Please enter verification code！"
                    />
                  ),
                },
              ]}
              onGetCaptcha={async (values) => {
                console.log(values, 1111);
                await sendEmail(values);
              }}
            />
            <ProFormText
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '姓名不为空',
                },
              ]}
            />
          </>
        )}

        {type === 'register' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '用户名不为空',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码不为空',
                },
              ]}
            />
            <ProFormText
              name="name"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入姓名'}
              rules={[
                {
                  required: true,
                  message: '姓名不为空',
                },
              ]}
            />
            <ProFormText
              name="stu_id"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入学号'}
              rules={[
                {
                  required: true,
                  message: '学号不为空',
                },
              ]}
            />
            <ProFormText
              name="phone"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入手机'}
              rules={[
                {
                  required: true,
                  message: '手机不为空',
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入邮箱'}
              rules={[
                {
                  required: true,
                  message: '邮箱不为空',
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          {/* <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="Auto login" />
          </ProFormCheckbox> */}
          <Button
            style={
              type === 'foget' || 'register'
                ? {
                    float: 'right',
                    display: 'none',
                  }
                : {
                    float: 'right',
                  }
            }
            type="link"
            onClick={() => {
              setType('forget');
            }}
          >
            忘记密码
          </Button>
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
