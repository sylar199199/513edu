import * as types from './mutation-types'

export default {
  [types.SET_GETLIST](state, { homeNewList }) {
    state.homeNewList = homeNewList
  },

  [types.SET_GETHOT_LIST](state, { hotNewList }) {
    state.hotList = hotNewList
  },

  [types.SET_INFORMATION_LIST](
    state,
    { informationNewList, total, homeNewsList },
  ) {
    state.informationList = informationNewList
    state.homeNewsList = homeNewsList
    state.total = total
  },

  [types.SET_TRADE_LIST](state, { tradeNewList, total }) {
    state.tradeList = tradeNewList
    state.hotTotal = total
  },

  [types.SET_BYNEWSID_LIST](state, { ByNewsIdList }) {
    state.ByNewsIdList = ByNewsIdList
  },

  // 首页4条推荐课
  [types.SET_COURSE_RECOMMENDED](state, { recommendedList }) {
    state.recommendedList = recommendedList
  },
}
