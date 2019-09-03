export default {
  getCurrentMsg({ messageList }) {
    return index => {
      return messageList[index].content
    }
  },
}
