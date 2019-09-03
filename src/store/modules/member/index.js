import state from './state'
import mutations from './mutations'
import actions from './actions'

export default {
  name: 'member',
  config: {
    namespaced: true,
    state,
    mutations,
    actions,
  },
}
