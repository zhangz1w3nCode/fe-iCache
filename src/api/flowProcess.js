import requestUtils from './http/request';

export function save(param) {
  return requestUtils.post({
    url: '/flow/chain/saveFlowChain',
    data: param
  })
}
export function getFlowChainList(param) {
  return requestUtils.post({
    url: '/flow/chain/getFlowChainList',
    data: param
  })
}

export function getFlowChainById(param) {
  return requestUtils.get({
    url: `/flow/chain/getFlowChainById/?flowProcessId=${param}`,
  })
}

export function updateFlowChain(param) {
  return requestUtils.post({
    url: '/flow/chain/updateFlowChain',
    data: param
  })
}
export function updateFlowChainStatus(param) {
  return requestUtils.post({
    url: '/flow/chain/updateFlowChainStatus',
    data: param
  })
}

//node相关

export function getProcessNodeList() {
  return requestUtils.get({
    url: '/flow/node/getFlowNodeList'
  })
}

export function getProcessNodeListByBizName(param) {
  return requestUtils.get({
    url: `/flow/node/getProcessNodeListByBizName/?bizName=${param}`,
  })
}

export function getOnlineBizNameList() {
  return requestUtils.get({
    url: '/flow/node/getOnlineBizNameList'
  })
}
