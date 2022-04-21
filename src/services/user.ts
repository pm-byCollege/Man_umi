import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(phone: string): Promise<any> {
  return request('/api/info', {
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: { phone },
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
