import request from '@/utils/request';

export async function fetchFirmList(params: any) {
  return request('/api/queryFirmList', {
    method: 'POST',
    data: params,
  });
}
