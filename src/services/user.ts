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

export async function querystuInfo(params: any): Promise<any> {
  return request('/api/stuInfo', {
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: params,
  });
}

export async function deleteStu(id: number, phone: string, type: number) {
  return request('/api/deleteStu', {
    method: 'POST',
    data: {
      student_id: id,
      phone,
      type,
    },
  });
}
