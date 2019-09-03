<template>
  <div class="single-questions">
    <div class="single-questions-title">
      题库选题
    </div>
    <div class="single-questions-table">
      <el-table
        :data="newFindExamSubjectChoicesList"
        min-height="289"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :reserve-selection="true"
        >
        </el-table-column>
        <el-table-column label="题目名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.subjectName }}
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分值" width="80" align="center">
        </el-table-column>
        <el-table-column
          prop="level"
          label="难度"
          width="150"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <el-rate :value="scope.row.level" disabled></el-rate>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="single-questions-pagination">
      <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="findExamSubjectChoicesTotal"
        :page-size="5"
        :page-sizes="[5, 10, 20]"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div class="single-questions-saveOrBack">
      <el-button @click="goTotextMange">
        返 回
      </el-button>
      <el-button type="primary" @click="saveTextMange">
        保 存
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      multipleSelection: [],
      size: 5,
      pageNum: 1,
      getRowKeys(row) {
        return row.idSign
      },
    }
  },
  computed: {
    ...mapState('course-management', {
      findExamSubjectChoicesList: state => state.findExamSubjectChoicesList,
      findExamSubjectChoicesPageNum: state =>
        parseInt(state.findExamSubjectChoicesPageNum),
      findExamSubjectChoicesTotal: state =>
        parseInt(state.findExamSubjectChoicesTotal),
    }),
    newFindExamSubjectChoicesList() {
      let list = this.findExamSubjectChoicesList.map(item => {
        if (item.level) {
          item.level = parseInt(item.level)
        }
        return item
      })
      return list
    },
  },
  methods: {
    ...mapActions('course-management', ['getFindExamSubjectChoicesList']),
    ...mapActions('management', [
      'getAddExaminationSubject',
      'getAllExaminationSubject',
    ]),
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.size = val
      let numSizeObj = {
        pageNum: this.pageNum,
        size: this.size,
      }
      this.getFindExamSubjectChoicesList(numSizeObj)
    },

    handleCurrentChange(val) {
      this.pageNum = val
      let numSizeObj = {
        pageNum: this.pageNum,
        size: this.size,
      }
      this.getFindExamSubjectChoicesList(numSizeObj)
    },
    // 点击返回题目管理
    goTotextMange() {
      this.$router.push({
        path: '/test-manangement',
        query: {
          sign: this.$route.query.sign,
          idSign: this.$route.query.idSign,
        },
      })
    },
    // 保存所选的题目到试卷
    async saveTextMange() {
      let sign = this.multipleSelection.map(item => {
        return item.idSign
      })
      let addExaminationSubjectReqObj = {
        examinationId: this.$route.query.idSign,
        subjectIdList: sign,
      }
      if (addExaminationSubjectReqObj.subjectIdList.length > 0) {
        if (await this.getAddExaminationSubject(addExaminationSubjectReqObj)) {
          this.$router.push({
            path: '/test-manangement',
            query: {
              sign: this.$route.query.sign,
              idSign: this.$route.query.idSign,
            },
          })
          this.getAllExaminationSubject(this.$route.query.idSign)
        }
      } else {
        this.$message.error('请选择题目')
      }
    },
  },
  created() {
    this.getFindExamSubjectChoicesList()
  },
}
</script>

<style lang="less" scoped>
.single-questions {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .single-questions-title {
    line-height: 60px;
    height: 60px;
    padding-left: 30px;
    border-bottom: 1px #eee solid;
    font-size: 18px;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .single-questions-table {
    margin-top: 50px;
    padding: 0 10px;
  }
  .single-questions-pagination {
    margin-top: 50px;
    margin-left: 130px;
  }
  .single-questions-saveOrBack {
    padding-left: 400px;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 20px;
  }
}
</style>
