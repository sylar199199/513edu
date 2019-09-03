<template>
  <div class="criticizes-system">
    <div class="container">
      <div class="criticizes-system-main">
        <div class="criticizes-system-title">
          <p>全部试卷 > {{ testName }}</p>
          <p>
            <el-button @click="goToList">
              返回列表
            </el-button>
          </p>
        </div>
        <div class="criticizes-system-input">
          <el-form ref="form" :model="form" label-width="80px" :inline="true">
            <el-form-item label="提交状态">
              <el-select v-model="form.typeVal" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="form.number"
                placeholder="请输入学号"
              ></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="handleSeach">
                搜索
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="criticizes-system-table">
          <el-table
            :data="newFindRecordList"
            style="width: 100%"
            min-height="300"
            :header-cell-style="{ background: '#F0F0F0', color: '#333333' }"
          >
            <el-table-column
              prop="studentCard"
              label="学号"
              width="120"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="userName"
              label="姓名"
              width="140"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="startTime" label="提交时间" align="center">
            </el-table-column>
            <el-table-column
              prop="score"
              label="考试成绩"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="submitStatus"
              label="状态"
              align="center"
              width="130"
            >
            </el-table-column>
            <el-table-column label="操作" align="center" width="130">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  v-if="scope.row.submitStatus !== '未提交'"
                  @click="handleDetail(scope.row.examinationId, scope.row.id)"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="criticizes-system-pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="findRecordTotal"
            :page-size="5"
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      testName: '',
      form: {
        name: '',
        typeVal: '',
        number: '',
      },
      options1: [
        {
          value: '0',
          label: '全部 ',
        },
        {
          value: '1',
          label: '未提交 ',
        },
        {
          value: '2',
          label: '已提交',
        },
      ],
    }
  },
  computed: {
    ...mapState('management', {
      findRecordList: state => state.findRecordList,
      findRecordTotal: state => parseInt(state.findRecordTotal),
    }),
    newFindRecordList() {
      let newArr = this.findRecordList.map(item => {
        if (item.phone) {
          item.phone = item.phone.substr(0, 3) + '*****' + item.phone.substr(8)
        }
        return item
      })
      return newArr
    },
  },
  methods: {
    ...mapActions('management', ['getFindRecordList']),
    goToList() {
      this.$router.push({
        path: '/course-management/unit-testing',
        query: {
          sign: this.$route.query.sign,
        },
      })
    },
    // 点击详情进入查看考试试卷
    handleDetail(examinationId, id) {
      let routeData = this.$router.resolve({
        path: 'test',
        query: {
          sign: this.$route.query.sign,
          idSign: examinationId,
          recordId: id,
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 点击搜索
    handleSeach() {
      this.testName = decodeURI(this.$route.query.examinationName)
      let recordReqObj = {
        courseId: this.$route.query.sign,
        examinationId: this.$route.query.idSign,
        page: 1,
        size: 5,
        submitStatus: this.form.typeVal || 0,
        userName: this.form.name,
        studentCard: this.form.number,
      }
      this.getFindRecordList(recordReqObj)
    },
    // 分页器
    handleSizeChange(val) {
      this.testName = decodeURI(this.$route.query.examinationName)
      let recordReqObj = {
        courseId: this.$route.query.sign,
        examinationId: this.$route.query.idSign,
        page: 1,
        size: val,
        submitStatus: this.form.typeVal || 0,
        studentCard: this.form.number,
      }
      this.getFindRecordList(recordReqObj)
    },

    handleCurrentChange(val) {
      this.testName = decodeURI(this.$route.query.examinationName)
      let recordReqObj = {
        courseId: this.$route.query.sign,
        examinationId: this.$route.query.idSign,
        page: val,
        size: 5,
        submitStatus: this.form.typeVal || 0,
        studentCard: this.form.number,
      }
      this.getFindRecordList(recordReqObj)
    },
  },
  created() {
    this.testName = decodeURI(this.$route.query.examinationName)
    let recordReqObj = {
      courseId: this.$route.query.sign,
      examinationId: this.$route.query.idSign,
      page: 1,
      size: 5,
      submitStatus: this.form.typeVal || 0,
      studentCard: this.form.number,
    }
    this.getFindRecordList(recordReqObj)
  },
}
</script>

<style lang="less" scoped>
.criticizes-system {
  background: #eee;
  overflow: hidden;
  .criticizes-system-main {
    background: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: calc(100vh - 348px);
    .criticizes-system-title {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px #eee solid;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      p:nth-child(1) {
        cursor: pointer;
        font-size: 18px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .criticizes-system-input {
      margin-top: 50px;
    }
    .criticizes-system-table {
      margin-top: 35px;
      padding: 0 40px;
    }
    .criticizes-system-pagination {
      margin-top: 40px;
      margin-left: 400px;
    }
  }
}
</style>
