<template>
  <div class="score-management-main">
    <header-top content="成绩管理"></header-top>
    <div class="score-management-wrapper">
      <div class="score-management-echart">
        <div id="main" style="width:100%;height: 100%"></div>
      </div>
      <ul>
        <li>
          总人数：<span>{{ courseScoreSumYinJinObj.sum }}人</span>
        </li>
        <li>
          平均分：<span>{{ courseScoreSumYinJinObj.avgScore }}分</span>
        </li>
        <li>
          最高分：<span>{{ courseScoreSumYinJinObj.maxScore }}分</span>
        </li>
        <li>
          最低分：<span>{{ courseScoreSumYinJinObj.minScore }}分</span>
        </li>
      </ul>
    </div>
    <div class="score-management-input">
      <div>
        <el-input
          size="medium"
          placeholder="请输入姓名"
          suffix-icon="el-icon-search"
          v-model="inputName"
          class="score-management-inputName"
        >
        </el-input>
      </div>
      <div>
        <el-input
          size="medium"
          placeholder="请输入学号"
          suffix-icon="el-icon-search"
          v-model="inputNumber"
          class="score-management-inputName"
        >
        </el-input>
        <el-button type="primary" @click="handSearch">
          搜索
        </el-button>
      </div>
    </div>
    <div class="score-management-table">
      <el-table
        :data="newAllCourseScoreList"
        border
        style="width: 100%"
        stripe
        :header-cell-style="{ background: '#F0F0F0', color: '#333333' }"
      >
        <el-table-column
          prop="studentCard"
          label="学号"
          align="center"
          width="130"
        >
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="手机" align="center" width="130">
        </el-table-column>
        <el-table-column
          prop="watchVideoScore"
          label="观看视频"
          align="center"
          width="78"
        >
        </el-table-column>
        <el-table-column
          prop="unitTestingScore"
          label="单元测试"
          align="center"
          width="78"
        >
        </el-table-column>
        <el-table-column
          prop="endExamScore"
          label="期末考试"
          align="center"
          width="78"
        >
        </el-table-column>
        <el-table-column
          prop="interactiveQuestionScore"
          label="互动问答"
          align="center"
          width="78"
        >
        </el-table-column>
        <el-table-column
          prop="logSigScore"
          label="登录签到"
          align="center"
          width="78"
        >
        </el-table-column>
        <el-table-column
          prop="originalCountScore"
          label="原始成绩"
          align="center"
          width="78"
        >
        </el-table-column>
        <el-table-column
          prop="endCountScore"
          label="最终成绩"
          align="center"
          width="78"
        >
          <template slot-scope="scope">
            <div class="el-table-slot-endCountScore">
              {{ scope.row.endCountScore }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="score-management-pagination">
      <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="allCourseScoreTotal"
        :page-size="3"
        :page-sizes="[3, 10, 20]"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import headerTop from '@components/header-top/index'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      inputName: '',
      inputNumber: '',
      page: 1,
      size: 3,
    }
  },
  components: {
    'header-top': headerTop,
  },
  computed: {
    ...mapState('myCourse', {
      allCourseScoreList: state => state.allCourseScoreList,
      allCourseScoreTotal: state => parseInt(state.allCourseScoreTotal),
      courseScoreSumYinJinObj: state => state.courseScoreSumYinJinObj,
      scoreCountOneYinJinList: state => state.scoreCountOneYinJinList,
    }),
    newAllCourseScoreList() {
      let newArr = this.allCourseScoreList.map(item => {
        if (item.phone) {
          item.phone = item.phone.substr(0, 3) + '*****' + item.phone.substr(8)
        }
        return item
      })
      return newArr
    },
  },
  methods: {
    ...mapActions('myCourse', [
      'getAllCourseScoreListOne',
      'getCourseScoreSumYinJin',
      'getScoreCountOneYinJin',
    ]),
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        xAxis: {
          type: 'category',
          data: [
            '0-9',
            '10-19',
            '20-29',
            '30-39',
            '40-49',
            '50-59',
            '60-69',
            '70-79',
            '80-89',
            '90-100',
          ],
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          show: false,
        },
        series: [
          {
            data: this.scoreCountOneYinJinList,
            type: 'bar',
            barWidth: 30,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: 'black',
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
        color: ['#FCCC6A'],
      })
    },
    // 点击搜索
    handSearch() {
      let courseScoreReq = {
        courseId: this.$route.query.sign,
        page: this.page,
        size: this.size,
        studentCard: this.inputNumber || '',
        userName: this.inputName || '',
      }
      this.getAllCourseScoreListOne(courseScoreReq)
    },
    // 分页器
    handleSizeChange(val) {
      this.size = val
      let courseScoreReq = {
        courseId: this.$route.query.sign,
        page: this.page,
        size: this.size,
        studentCard: this.inputNumber || '',
        userName: this.inputName || '',
      }
      this.getAllCourseScoreListOne(courseScoreReq)
    },

    handleCurrentChange(val) {
      this.page = val
      let courseScoreReq = {
        courseId: this.$route.query.sign,
        page: this.page,
        size: this.size,
        studentCard: this.inputNumber || '',
        userName: this.inputName || '',
      }
      this.getAllCourseScoreListOne(courseScoreReq)
    },
  },
  async created() {
    let eChartList = {
      sign: this.$route.query.sign,
    }
    await this.getScoreCountOneYinJin(eChartList)
    await this.$nextTick(function() {
      this.drawPie('main')
    })
    let searchReqObj = {
      sign: this.$route.query.sign,
    }
    await this.getCourseScoreSumYinJin(searchReqObj)
    let courseScoreReq = {
      courseId: this.$route.query.sign,
      page: this.page,
      size: this.size,
      studentCard: this.inputNumber || '',
      userName: this.inputName || '',
    }
    await this.getAllCourseScoreListOne(courseScoreReq)
  },
}
</script>

<style lang="less" scoped>
.score-management-main {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .score-management-wrapper {
    display: flex;
    .score-management-echart {
      width: 700px;
      height: 300px;
    }
    ul {
      margin-top: 80px;
      margin-left: 20px;
      li {
        cursor: pointer;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
        span {
          color: #58c6bd;
        }
      }
    }
  }
  .score-management-input {
    margin-top: 15px;
    display: flex;
    div {
      display: flex;
      margin-left: 15px;
      .score-management-inputName {
        width: 180px;
        height: 36px;
        input {
          width: 100%;
          height: 100%;
        }
      }
      button {
        width: 66px;
        height: 36px;
        margin-left: 10px;
      }
    }
  }
  .score-management-table {
    padding: 0 30px;
    margin-top: 45px;
    min-height: 238px;
    .el-table-slot-endCountScore {
      width: 58px;
      height: 34px;
      line-height: 34px;
      border: 1px solid rgba(88, 198, 189, 1);
      border-radius: 2px;
    }
  }
  .score-management-pagination {
    text-align: center;
    margin: 30px 0;
  }
}
</style>
