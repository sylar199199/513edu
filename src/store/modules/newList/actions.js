import * as types from './mutation-types'

export default {
  // pc 首页新闻资讯展示
  async getNewList({ commit }) {
    const res = await this.$ajax.get(this.$apis.getNewsList)
    if (res.ok) {
      commit({
        type: types.SET_GETLIST,
        homeNewList: res.data,
      })
    }
  },

  // 热点资讯展示 半年内最热5条
  async getHotList({ commit }) {
    const res = await this.$ajax.get(this.$apis.getHotList)
    if (res.ok) {
      commit({
        type: types.SET_GETHOT_LIST,
        hotNewList: res.data,
      })
    }
  },

  // 新闻资讯列表---企业动态
  async getInformationList({ commit }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getInformationList, {
      page: 1,
      size: 9,
      ...terms,
      category: 1,
    })
    if (res.ok) {
      commit({
        type: types.SET_INFORMATION_LIST,
        informationNewList: res.data.list,
        homeNewsList: res.data.list[0],
        total: res.data.total,
      })
    }
  },

  // 新闻资讯列表---行业新闻
  async getTradeList({ commit }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getInformationList, {
      page: 1,
      size: 9,
      ...terms,
      category: 2,
    })
    if (res.ok) {
      commit({
        type: types.SET_TRADE_LIST,
        tradeNewList: res.data.list,
        total: res.data.total,
      })
    }
  },

  // 根据id获取新闻详情
  async getByNewsIdList({ commit }, search) {
    const res = await this.$ajax.post(this.$apis.getByNewsId, {
      sign: search,
    })
    if (res.ok) {
      commit({
        type: types.SET_BYNEWSID_LIST,
        ByNewsIdList: res.data,
      })
    }
  },

  // 首页4条推荐课
  async getCourseRecommended({ commit }) {
    const res = await this.$ajax.get(this.$apis.getCourseRecommended)
    if (res.ok) {
      commit({
        type: types.SET_COURSE_RECOMMENDED,
        recommendedList: res.data,
      })
    }
  },
}
