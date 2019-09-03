import marked from 'marked'

export const searchByCondition = (callback = null) => {
  return {
    computed: {
      keyWords() {
        return this.$route.query.search
      },
    },
    watch: {
      // 监听query search变动 查找对应的数据
      keyWords: {
        handler(cur) {
          // undefind，为初始进入状态，无需参数
          if (!cur) {
            this.handleGetDataByCondition()
          } else {
            this.handleGetDataByCondition({
              ...this.$qs.parse(cur),
            })
          }
          if (typeof callback === 'function') callback()
        },
        immediate: true,
      },
    },
  }
}

export const resolverMarked = {
  methods: {
    marked2html(str) {
      return marked(str)
    },
  },
}
