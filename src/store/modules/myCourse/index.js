import state from './state'
import mutations from './mutations'
import actions from './actions'

export default {
  name: 'myCourse',
  config: {
    namespaced: true,
    state,
    mutations,
    actions,
  },
}
