<template>
  <div class="pagination-box">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'base-pagination',
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      required: true,
      /* validator(value) {
        return value > 0
      }, */
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {
    query() {
      return qs.parse(this.$route.query.search)
    },
  },
  watch: {
    query(cur) {
      this.currentPage = JSON.stringify(cur) === '{}' ? 1 : +cur.page
    },
  },
  created() {
    this.currentPage =
      (this.$route.query.search && +qs.parse(this.$route.query.search).page) ||
      1
  },
  methods: {
    handleCurrentChange(page) {
      const query = {
        search: qs.stringify({
          ...this.query,
          size: this.pageSize,
          page,
        }),
      }
      this.currentPage = page
      this.$router.push({ query })
    },
  },
}
</script>

<style lang="less" scoped>
.pagination-box {
  display: flex;
  justify-content: center;
  margin: 10px 0 0;
}
</style>
