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
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { getFakeCaptcha, resetPwd, register } from '@/services/login';
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
  // const { status, type: loginType } = userLogin;
  const [type, setType] = useState<string>('account');
  const intl = useIntl();

  const handleSubmit = async (values: LoginParamsType) => {
    const { dispatch } = props;
    console.log(values, '提交');
    if (type === 'account') {
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    } else if (type === 'forget') {
      const res = await resetPwd(values);
      if (res.code === 0) {
        setType('account');
      }
    } else {
      const res = await register(values);
      if (res.code === 0) {
        setType('account');
      }
    }
  };

  return (
    <div className={styles.main}>
      <ProForm
        // initialValues={{
        //   autoLogin: true,
        // }}
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
          <Tabs.TabPane key="foget" tab="忘记密码" />
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
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please enter user name!"
                    />
                  ),
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
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {/* {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="Verification code error" />
        )} */}
        {type === 'foget' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              name="mobile"
              placeholder="请输入手机号"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.phoneNumber.required"
                      defaultMessage="Please enter phone number!"
                    />
                  ),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: (
                    <FormattedMessage
                      id="pages.login.phoneNumber.invalid"
                      defaultMessage="Malformed phone number!"
                    />
                  ),
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
              name="captcha"
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
              onGetCaptcha={async (mobile) => {
                const result = await getFakeCaptcha(mobile);
                if (result === false) {
                  return;
                }
                message.success(
                  'Get the verification code successfully! The verification code is: 1234',
                );
              }}
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
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please enter user name!"
                    />
                  ),
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
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password！"
                    />
                  ),
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
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="输入姓名!"
                    />
                  ),
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
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="输入学号!"
                    />
                  ),
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
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="输入手机!"
                    />
                  ),
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
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="输入邮箱!"
                    />
                  ),
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
              setType('foget');
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
