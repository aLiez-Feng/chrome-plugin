export const sendMessage = (params) => {
  return new Promise((resolve, reject) => {
    window.chrome.runtime.sendMessage(params, function (content) {
      const result = JSON.parse(content)
      if (result && result.message === '错误') return reject(result.error)
      resolve(result)
    })
  })
}