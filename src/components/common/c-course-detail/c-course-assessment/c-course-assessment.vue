<template>
  <div>
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        考核标准
      </h2>
    </div>
    <!--为echarts准备一个具备大小的容器dom-->
    <div class="course-assessment-pie">
      <div>
        <div
          id="main"
          style="width: 580px;height: 300px;"
          v-show="echartShow === 6"
        ></div>
        <div v-show="echartShow !== 6" class="default-echarts-show">
          <img
            :src="$imgUrl + '/message/defaultpage_content%402x.png'"
            alt=""
          />
        </div>
      </div>
      <div class="course-assessment-right">
        <!--
          v-if="echartPieObj === ''"
          <div class="course-assessment-title">
          总分
          <span class="course-assessment-spanCommon">
            80
          </span>
          分
        </div> -->
        <div class="course-assessment-divCommon">
          <p class="course-assessment-pCommon course-assessment-pCommon-left">
            <span
              class="course-assessment-gardenCommon course-assessment-blue"
            />
            观看视频
          </p>
          <p class="course-assessment-pCommon">
            <span class="course-assessment-spanCommon">
              {{ inspectionStandardList.watchVideo || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-assessment-divCommon">
          <p class="course-assessment-pCommon course-assessment-pCommon-left">
            <span
              class="course-assessment-gardenCommon course-assessment-violet"
            />
            单元测试
          </p>
          <p class="course-assessment-pCommon">
            <span class="course-assessment-spanCommon">
              {{ inspectionStandardList.unitTesting || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-assessment-divCommon">
          <p class="course-assessment-pCommon course-assessment-pCommon-left">
            <span
              class="course-assessment-gardenCommon course-assessment-yellow"
            />
            期末考试
          </p>
          <p class="course-assessment-pCommon">
            <span class="course-assessment-spanCommon">
              {{ inspectionStandardList.theFinalExam || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-assessment-divCommon">
          <p class="course-assessment-pCommon course-assessment-pCommon-left">
            <span
              class="course-assessment-gardenCommon course-assessment-green"
            />
            互动问答
          </p>
          <p class="course-assessment-pCommon">
            <span class="course-assessment-spanCommon">
              {{ inspectionStandardList.interactiveQuestion || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-assessment-divCommon">
          <p class="course-assessment-pCommon course-assessment-pCommon-left">
            <span
              class="course-assessment-gardenCommon course-assessment-purple"
            />
            登录签到
          </p>
          <p class="course-assessment-pCommon">
            <span class="course-assessment-spanCommon">
              {{ inspectionStandardList.logSig || '0' }}%
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        考核说明
      </h2>
    </div>
    <div class="course-assessment-explain">
      <div class="course-assessment-results">
        <div class="course-results-left">
          <p class="course-results-left-pTop course-results-left-margin">
            观看视频
          </p>
          <p class="course-results-left-pTop">
            <span class="course-results-span">
              {{ inspectionStandardList.watchVideo || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-results-right">
          本项得分根据整体观看进度与权重计算得出，课程视频全部看完得满分
        </div>
      </div>
      <div class="course-assessment-results">
        <div class="course-results-left">
          <p class="course-results-left-pTop course-results-left-margin">
            单元测试
          </p>
          <p class="course-results-left-pTop">
            <span class="course-results-span">
              {{ inspectionStandardList.unitTesting || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-results-right">
          本项得分=各单元测试实际得分/试卷总分 x 所有单元测试均配比 x 本项权重
        </div>
      </div>
      <div class="course-assessment-results">
        <div class="course-results-left">
          <p class="course-results-left-pTop course-results-left-margin">
            期末考试
          </p>
          <p class="course-results-left-pTop">
            <span class="course-results-span">
              {{ inspectionStandardList.theFinalExam || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-results-right">
          本项得分=期末考试实际得分/卷面总分 x 本项权重
        </div>
      </div>
      <div class="course-assessment-results">
        <div class="course-results-left">
          <p class="course-results-left-pTop course-results-left-margin">
            互动问答
          </p>
          <p class="course-results-left-pTop">
            <span class="course-results-span">
              {{ inspectionStandardList.interactiveQuestion || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-results-right">
          发布 2 分/条，回复 2 分/条，最高100分，再按权重计算出本项得分
        </div>
      </div>
      <div class="course-assessment-results">
        <div class="course-results-left">
          <p class="course-results-left-pTop course-results-left-margin">
            登录签到
          </p>
          <p class="course-results-left-pTop">
            <span class="course-results-span">
              {{ inspectionStandardList.logSig || '0' }}%
            </span>
          </p>
        </div>
        <div class="course-results-right">
          累计签到 20 次得满分，每日只能签到一次，次数不达标则按实际次数折算
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      charts: '',
      isShow: false,
    }
  },

  methods: {
    ...mapActions('course-detail', ['getByInspectionStandardId']),
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)',
        },
        color: ['#FD8C68', '#F0E053', '#17DBBB', '#5BADFD', '#9a7ef2'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                position: 'inner',
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}  {per|{d}%}  ',
                fontSize: 16,
                rich: {},
              },
            },
            data: this.echartPieObj,
          },
        ],
      })
    },
  },
  computed: {
    ...mapState('course-detail', {
      inspectionStandardList: state => state.inspectionStandardList,
      echartPieObj: state => state.echartPieObj,
      echartShow: state => state.echartShow,
    }),
    /* arr() {
      let obj1 = {
        value: this.echartPieObj.unitTesting,
        name: '单元测试',
      }
      let obj2 = {
        value: this.echartPieObj.theFinalExam,
        name: '期末成绩',
      }
      let obj3 = {
        value: this.echartPieObj.interactiveQuestion,
        name: '互动问答',
      }
      let valFour = this.echartPieObj.watchVideo

      let obj4 = {
        value: this.echartPieObj.watchVideo,
        name: '观看视频',
      }
      let newArr = [obj1, obj2, obj3, obj4]
      console.log(newArr)
      return newArr
    }, */
  },
  //调用
  updated() {
    this.$nextTick(function() {
      this.drawPie('main')
    })
  },
}
</script>

<style lang="less" scoped>
.course-assessment-pie {
  display: flex;
  .default-echarts-show {
    width: 580px;
    height: 300px;
    img {
      width: 200px;
      margin-left: 190px;
    }
  }
  .course-assessment-right {
    margin-left: 200px;
    margin-top: 80px;
    .course-assessment-title {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: #333;
      margin-bottom: 20px;
    }
    .course-assessment-spanCommon {
      font-size: 18px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: @maincolor;
    }
    .course-assessment-divCommon {
      min-width: 200px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .course-assessment-pCommon {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: #666;
        .course-assessment-gardenCommon {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          border: 4px @maincolor solid;
          margin-right: 6px;
          position: relative;
          top: 2px;
        }
        .course-assessment-blue {
          border: 4px #5badfd solid;
        }
        .course-assessment-violet {
          border: 4px #fd8c68 solid;
        }
        .course-assessment-yellow {
          border: 4px #f0e053 solid;
        }
        .course-assessment-green {
          border: 4px #17dbbb solid;
        }
        .course-assessment-purple {
          border: 4px #9a7ef2 solid;
        }
      }
    }
  }
}
.course-assessment-explain {
  width: 1093px;
  min-height: 445px;
  border: 1px solid rgba(204, 204, 204, 1);
  margin: 24px auto 0;
  .course-assessment-results {
    width: 100%;
    height: 110px;
    padding: 13px 0;
    display: flex;
    border-bottom: 1px #eee solid;
    .course-results-right {
      margin-left: 57px;
      margin-top: 37px;
    }
  }
  .course-assessment-results:last-child {
    border-bottom: 0;
  }
  .course-assessment-chapter {
    width: 100%;
    height: 225px;
    border-bottom: 1px #ccc solid;
    border-top: 1px #ccc solid;
    padding: 13px 0;
    display: flex;
    .course-chapter-right {
      margin-left: 57px;
    }
  }
  .course-assessment-final {
    width: 100%;
    height: 110px;
    padding: 13px 0;
    display: flex;
  }
  .course-results-left {
    width: 140px;
    height: 100%;
    border-right: 1px solid #ccc;
    overflow: hidden;
    .course-results-left-pTop {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: #333;
      text-align: center;
      .course-results-span {
        font-size: 24px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: @maincolor;
      }
    }
    .course-results-left-margin {
      margin-top: 22px;
    }
    .course-results-left-bigMargin {
      margin-top: 86px;
    }
  }
}
</style>
