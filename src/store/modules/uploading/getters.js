export default {
  getActive(state) {
    if (localStorage.getItem('active')) {
      state.activeShow = localStorage.getItem('active')
    }
    return state.activeShow
  },
}
