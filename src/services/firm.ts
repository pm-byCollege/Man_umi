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

export async function editFirm(postName: any) {
  return request('/api/editFirm', {
    method: 'POST',
    data: postName,
  });
}

export async function deleteFirm(id: number, type: number) {
  return request('/api/deleteFirm', {
    method: 'POST',
    data: {
      id,
      type,
    },
  });
}

export async function getFirmInfo(id: number) {
  return request('/api/getFirmInfo', {
    method: 'POST',
    data: {
      id,
    },
  });
}

export async function getDeliveryInfo(id: number) {
  return request('/api/getDeliveryInfo', {
    method: 'POST',
    data: {
      firmId: id,
    },
  });
}

export async function down(name) {
  return request(`/api/down?name=${name}`, {
    method: 'GET',
      responseType: 'blob',
  });
}

