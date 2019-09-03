<template>
  <div class="trainees-management">
    <header-top content="学员管理">
      <el-button type="primary" @click="handleTrainees">
        导 入
      </el-button>
      <el-button type="primary" @click="handleDrop">
        退 课
      </el-button>
    </header-top>
    <div class="trainees-management-table">
      <el-table
        ref="multipleTable"
        :data="findStudentList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
      >
        <el-table-column
          type="selection"
          width="55"
          fixed
          align="center"
          :reserve-selection="true"
        >
        </el-table-column>
        <el-table-column label="学号" width="120" fixed align="center">
          <template slot-scope="scope">
            {{ scope.row.studentCard }}
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="100"
          align="center"
          fixed
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          show-overflow-tooltip
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          show-overflow-tooltip
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="schoolName"
          label="学校"
          show-overflow-tooltip
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="最后登录"
          show-overflow-tooltip
          align="center"
          width="180"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="my-order-pagination">
      <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="findStudentTotal"
        :page-size="8"
        :page-sizes="[8, 14, 20]"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 导入 -->
    <trainees-management
      :trainees-visible="traineesVisible"
      @closeTraineesVisible="closeTraineesVisible"
      :page-num="pageNum"
    />
  </div>
</template>

<script>
import headerTop from '@components/header-top/index'
import traineesManagement from '@components/Dialog/trainees-management/index'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    'header-top': headerTop,
    'trainees-management': traineesManagement,
  },
  data() {
    return {
      traineesVisible: false,
      multipleSelection: [],
      pageNum: 1,
      size: 8,
      getRowKeys(row) {
        return row.id
      },
    }
  },
  computed: {
    ...mapState('message', {
      findStudentList: state => state.findStudentList,
      findStudentTotal: state => parseInt(state.findStudentTotal),
    }),
  },
  methods: {
    ...mapActions('message', ['getFindStudentList', 'getDeleteTeacher']),
    // 分页器
    handleSizeChange(val) {
      this.size = val
      let searchReqObj = {
        courseId: this.$route.query.sign,
        page: this.pageNum,
        size: this.size,
      }
      this.getFindStudentList(searchReqObj)
    },

    handleCurrentChange(val) {
      this.pageNum = val
      let searchReqObj = {
        courseId: this.$route.query.sign,
        page: this.pageNum,
        size: this.size,
      }
      this.getFindStudentList(searchReqObj)
    },
    // 点击多选框
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 点击打开弹窗
    handleTrainees() {
      this.traineesVisible = true
    },
    // 点击关闭导入弹窗
    closeTraineesVisible() {
      this.traineesVisible = false
    },
    // 点击退课
    async handleDrop() {
      let sign = this.multipleSelection.map(item => {
        return item.id
      })
      if (this.multipleSelection.length !== 0) {
        await this.getDeleteTeacher(sign)
        let searchReqObj = {
          courseId: this.$route.query.sign,
          page: this.pageNum,
          size: this.size,
        }
        await this.getFindStudentList(searchReqObj)
      }
    },
  },
  created() {
    let searchReqObj = {
      courseId: this.$route.query.sign,
      page: this.pageNum,
      size: this.size,
    }
    this.getFindStudentList(searchReqObj)
  },
}
</script>

<style lang="less" scoped>
.trainees-management {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .trainees-management-table {
    margin-top: 30px;
    padding: 0 30px;
    min-height: 430px;
  }
  .my-order-pagination {
    margin: 50px 0 50px 0;
    text-align: center;
  }
}
</style>
