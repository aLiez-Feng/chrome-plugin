import axios from 'axios';
const baseURL = {
  '进度管理': 'http://10.8.60.11:8008',
  '成本协同': 'http://10.8.60.23:8080'
}
window.chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  const name = request.name
  const url = baseURL[name] + request.url;
  const method = request.method || 'get';
  const data = request.data || {};
  const formData = new FormData()
  appendFormData(data, formData)
  axios({
    url,
    method,
    data: formData
  })
    .then(res => {
      sendResponse(JSON.stringify(res.data))
    })
    .catch(error => {
      sendResponse(JSON.stringify({ message: '错误', error }))
    })
  // chrome内部不支持promise/异步处理，需要返回一个true保持消息通道
  return true
});

function appendFormData (data, formData) {
  for (let key in data) {
    formData.append(key, data[key])
  }
}