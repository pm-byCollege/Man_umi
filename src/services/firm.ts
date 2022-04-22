import request from '@/utils/request';

export async function fetchFirmList(params: any) {
  return request('/api/queryFirmList', {
    method: 'POST',
    data: params,
  });
}

export async function getPostList(postName: any) {
  return request('/api/queryPostList', {
    method: 'POST',
    data: postName,
  });
}

export async function addFirm(postName: any) {
  return request('/api/addFirm', {
    method: 'POST',
    data: postName,
  });
}
