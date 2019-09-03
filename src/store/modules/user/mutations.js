import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },
}
