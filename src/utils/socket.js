import store from '../store/modules/myCourse'

export default {
  websocketonopen() {
    console.log('WebSocket连接成功')
  },
  websocketonerror() {
    console.log('WebSocket连接发生错误')
  },
  websocketonmessage(e) {
    var da = e ? e.isTrusted : ''
    if (da) {
      store.config.state.dialogVisible = false
    }
  },
  websocketclose() {
    console.log('关闭')
  },
  initWebSocket(phone) {
    const wsuri = `ws://192.168.1.9:9003/websocket/${phone}` //ws地址
    this.websock = new WebSocket(wsuri)
    this.websock.onopen = this.websocketonopen
    this.websock.onerror = this.websocketonerror
    this.websock.onmessage = this.websocketonmessage
    this.websock.onclose = this.websocketclose
  },
}
