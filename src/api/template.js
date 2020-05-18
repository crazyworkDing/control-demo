import { axios } from '@/utils/request'

export function queryQuota(data) {
  return axios({
    url: '/quota/ruleQuota/list?templateCode=' + data.templateCode,
    method: 'get'
  })
}

export function deleteQuota(data) {
  return axios({
    url: '/quota/ruleQuota/delete/' + data.id,
    method: 'delete',
    data
  })
}

export function addQuota(data) {
  return axios({
    url: '/quota/ruleQuota/addQuota',
    method: 'post',
    data
  })
}

export function editQuota(data) {
  return axios({
    url: '/quota/ruleQuota/edit',
    method: 'put',
    data
  })
}

/* 主体查询 */
export function querySubjectList() {
  return axios({
    url: '/dataSubject/rrmsDataSubject/list',
    method: 'get'
  })
}

/* 对象查询 */
export function queryObjectList() {
  return axios({
    url: '/dataSubject/rrmsDataObject/list',
    method: 'get'
  })
}
