import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request('/api/sendEmail', {
    method: 'POST',
    data: {
      mobile,
    },
  });
}

export async function resetPwd(params: any) {
  return request('/api/resetPwd', {
    method: 'POST',
    data: params,
  });
}

export async function register(params: any) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}
