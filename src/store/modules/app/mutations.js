import * as types from './mutation-types'

export default {
  [types.SET_IS_COLLEGE_MODE](state, { path }) {
    state.is_college_mode = path.indexOf('/college') === 0
  },
}
