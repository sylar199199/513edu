<template>
  <div class="operational-analysis-main">
    <header-top content="运行分析"> </header-top>
    <div class="operational-analysis-wrapper">
      <div class="operational-analysis-echart">
        <div id="main" style="width:100%;height: 190px"></div>
      </div>
      <div class="operational-analysis-statistics">
        <div>
          <img
            :src="$imgUrl + '/operational-analysis/icon_people%402x.png'"
            alt=""
          />
          <p>
            <span>{{ eChartsCountVoMap ? eChartsCountVoMap.sum : '' }}</span>
            <span>总人数</span>
          </p>
        </div>
        <div>
          <img
            :src="$imgUrl + '/operational-analysis/icon_schedule%402x.png'"
            alt=""
          />
          <p>
            <span>
              {{ eChartsCountVoMap ? eChartsCountVoMap.avgProgress : '' }}
            </span>
            <span>平均进度</span>
          </p>
        </div>
      </div>
      <div class="operational-analysis-people">
        <p>
          {{ eChartsCountVoMap ? eChartsCountVoMap.sum : '' }}
        </p>
        <p>
          总人数
        </p>
      </div>
    </div>
    <div class="operational-analysis-input">
      <div>
        <el-select v-model="optionsVal" placeholder="请选择" filterable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-input
          size="medium"
          placeholder="请输入姓名"
          suffix-icon="el-icon-search"
          v-model="inputName"
          class="operational-analysis-inputName"
        >
        </el-input>
      </div>
      <div>
        <el-input
          size="medium"
          placeholder="请输入学号"
          suffix-icon="el-icon-search"
          v-model="inputNumber"
          class="operational-analysis-inputName"
        >
        </el-input>
        <el-button type="primary" @click.enter.native="handSearch">
          搜索
        </el-button>
      </div>
    </div>
    <div class="operational-analysis-table">
      <el-table
        :data="newAllStudyProgressList"
        border
        style="width: 100%"
        stripe
        :header-cell-style="{ background: '#F0F0F0', color: '#333333' }"
      >
        <el-table-column prop="studentCard" label="学号" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="手机" align="center">
        </el-table-column>
        <el-table-column
          prop="studyProgress"
          label="学习进度"
          align="center"
          width="78"
        >
        </el-table-column>
        <el-table-column
          prop="studyTime"
          label="累计观看时长"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="questionsCount"
          label="提问/回复"
          align="center"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="最后登录时间"
          align="center"
          width="110"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="operational-analysis-pagination">
      <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="allStudyProgressTotalOneYinJin"
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
      optionsVal: '0',
      options: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '未学习',
        },
        {
          value: '2',
          label: '进度低于10%',
        },
        {
          value: '3',
          label: '学习进度10-95%',
        },
        {
          value: '4',
          label: '进度高于95%',
        },
      ],
      page: 1,
      size: 3,
    }
  },
  components: {
    'header-top': headerTop,
  },
  computed: {
    ...mapState('myCourse', {
      allStudyProgressListOneYinJin: state =>
        state.allStudyProgressListOneYinJin,
      allStudyProgressTotalOneYinJin: state =>
        parseInt(state.allStudyProgressTotalOneYinJin),
      eChartsChartVoMap: state => state.eChartsChartVoMap,
      eChartsCountVoMap: state => state.eChartsCountVoMap,
    }),
    newAllStudyProgressList() {
      let newArr = this.allStudyProgressListOneYinJin.map(item => {
        if (item.phone) {
          item.phone = item.phone.substr(0, 3) + '*****' + item.phone.substr(8)
        }
        if (item.questionsCount) {
          item.questionsCount = `${item.questionsCount}/${item.answersCount}`
        }
        if (item.studyProgress) {
          item.studyProgress = `${item.studyProgress}%`
        }
        if (item.testExam) {
          item.testExam = `${item.testExam}/${item.testNum}`
        }
        return item
      })
      return newArr
    },
    echartsArr() {
      let arr = []
      let objOne = {
        name: '未学习(学习进度0%）',
        value: this.eChartsChartVoMap.notLearn,
      }
      arr.push(objOne)
      let objTwo = {
        name: '进度低于10%',
        value: this.eChartsChartVoMap.learnTen,
      }
      arr.push(objTwo)
      let objThere = {
        name: '学习进度10-95%',
        value: this.eChartsChartVoMap.learn,
      }
      arr.push(objThere)
      let objFours = {
        name: '进度高于95%',
        value: this.eChartsChartVoMap.learnThree,
      }
      arr.push(objFours)
      return arr
    },
  },
  methods: {
    ...mapActions('myCourse', [
      'getAllStudyProgressListOneYinJin',
      'getdataStatisticsOneYinJin',
    ]),
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id))
      let _this = this
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)',
          show: true,
        },
        legend: {
          orient: 'vertical',
          align: 'right',
          x: 280,
          y: 'center',
          data: [
            '未学习(学习进度0%）',
            '进度低于10%',
            '学习进度10-95%',
            '进度高于95%',
          ],
          formatter: function(name) {
            var index = 0
            var clientlabels = [
              '未学习(学习进度0%）',
              '进度低于10%',
              '学习进度10-95%',
              '进度高于95%',
            ]
            var clientcounts = [
              _this.eChartsChartVoMap.notLearn,
              _this.eChartsChartVoMap.learnTen,
              _this.eChartsChartVoMap.learn,
              _this.eChartsChartVoMap.learnThree,
            ]
            clientlabels.forEach(function(value, i) {
              if (value == name) {
                index = i
              }
            })
            return name + '        ' + clientcounts[index]
          },
        },
        color: ['#FD8C68', '#9A7EF2', '#17DBBB', '#5BADFD', '#5BADFD'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['25%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.echartsArr,
          },
        ],
      })
    },
    // 点击搜索
    handSearch() {
      let tableListYinJin = {
        courseId: this.$route.query.sign,
        page: this.page,
        size: this.size,
        studentCard: this.inputNumber || '',
        studyProgress: this.optionsVal || 0,
        userName: this.inputName || '',
      }
      this.getAllStudyProgressListOneYinJin(tableListYinJin)
    },
    // 分页器
    handleSizeChange(val) {
      this.size = val
      let tableListYinJin = {
        courseId: this.$route.query.sign,
        page: this.page,
        size: this.size,
        studentCard: this.inputNumber || '',
        studyProgress: this.optionsVal || 0,
        userName: this.inputName || '',
      }
      this.getAllStudyProgressListOneYinJin(tableListYinJin)
    },

    handleCurrentChange(val) {
      this.page = val
      let tableListYinJin = {
        courseId: this.$route.query.sign,
        page: this.page,
        size: this.size,
        studentCard: this.inputNumber || '',
        studyProgress: this.optionsVal || 0,
        userName: this.inputName || '',
      }
      this.getAllStudyProgressListOneYinJin(tableListYinJin)
    },
  },
  async created() {
    // 列表数据
    let tableListYinJin = {
      courseId: this.$route.query.sign,
      page: this.page,
      size: this.size,
      studentCard: this.inputNumber || '',
      studyProgress: this.optionsVal || 0,
      userName: this.inputName || '',
    }
    await this.getAllStudyProgressListOneYinJin(tableListYinJin)

    // 饼图数据
    let eChartsYinJInList = {
      sign: this.$route.query.sign,
    }
    await this.getdataStatisticsOneYinJin(eChartsYinJInList)
    await this.$nextTick(() => {
      this.drawPie('main')
    })
  },
}
</script>

<style lang="less" scoped>
.operational-analysis-main {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .operational-analysis-wrapper {
    padding: 0 30px;
    margin-top: 50px;
    display: flex;
    position: relative;
    .operational-analysis-echart {
      width: 480px;
      height: 190px;
    }
    .operational-analysis-statistics {
      width: 400px;
      height: 190px;
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      div {
        width: 168px;
        height: 84px;
        margin-right: 20px;
        background: rgba(245, 245, 245, 1);
        border-radius: 4px;
        display: flex;
        img {
          width: 38px;
          height: 38px;
          margin: 24px 25px 0 30px;
        }
        p {
          display: flex;
          flex-direction: column;
          margin-top: 22px;
          span:nth-child(1) {
            font-size: 24px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(88, 198, 189, 1);
          }
          span:nth-child(2) {
            font-size: 12px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 20px;
          }
        }
      }
    }
    .operational-analysis-people {
      width: 43px;
      height: 45px;
      text-align: center;
      position: absolute;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      left: 128px;
      top: 70px;
      p:nth-child(1) {
        font-size: 28px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
      }
      p:nth-child(2) {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 15px;
      }
    }
  }
  .operational-analysis-input {
    margin-top: 35px;
    display: flex;
    div {
      display: flex;
      margin-left: 15px;
      .operational-analysis-inputName {
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
  .operational-analysis-table {
    padding: 0 30px;
    margin-top: 45px;
    min-height: 200px;
    .el-table-slot-endCountScore {
      width: 58px;
      height: 34px;
      line-height: 34px;
      border: 1px solid rgba(88, 198, 189, 1);
      border-radius: 2px;
    }
  }
  .operational-analysis-pagination {
    text-align: center;
    margin: 30px 0;
  }
}
</style>
