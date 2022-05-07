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

export async function queryTeaInfo(params: any): Promise<any> {
  return request('/api/teaInfo', {
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: params,
  });
}

export async function deleteTea(tea_id: number, phone: string, type: number) {
  return request('/api/deleteTea', {
    method: 'POST',
    data: {
      tea_id,
      phone,
      type,
    },
  });
}

export async function addTea(params: any) {
  return request('/api/addTea', {
    method: 'POST',
    data: {
      tea_id: params.tea_id,
      username: params.username,
      password: params.password,
      name: params.name,
      email: params.email,
      phone: params.phone,
      type: params.type,
    },
  });
}
