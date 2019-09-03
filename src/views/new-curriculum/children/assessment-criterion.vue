<template>
  <div class="assessment-criterion">
    <div class="assessment-criterion-top">
      请分别设置观看视频、单元测试、期末考试、互动问答、登录签到各项的权重占比，
      不考核项可用0%表示，合计需达100%，考核说明如下：
    </div>
    <div class="assessment-criterion-bottom">
      <table
        border="1"
        cellspping="0"
        cellspacing="0"
        class="assessment-criterion-table"
      >
        <tr>
          <th class="assessment-criterion-table-one">
            考核项
          </th>
          <th class="assessment-criterion-table-two">
            标准说明
          </th>
          <th
            class="assessment-criterion-table-three assessment-criterion-table-weight"
          >
            权重
          </th>
        </tr>
        <tr>
          <td class="assessment-criterion-table-one">
            观看视频
          </td>
          <td class="assessment-criterion-table-two">
            本项得分根据整体观看进度与权重计算得出，课程视频全部看完得满分
          </td>
          <td class="assessment-criterion-table-three">
            <input type="text" v-model="watchVideo" @change="doSums" />
            <span>%</span>
          </td>
        </tr>
        <tr>
          <td class="assessment-criterion-table-one">
            单元测试
          </td>
          <td class="assessment-criterion-table-two">
            本项得分=各单元测试实际得分/试卷总分 x 所有单元测试均配比 x 本项权重
          </td>
          <td class="assessment-criterion-table-three">
            <input type="text" v-model="unitTesting" @change="doSums" />
            <span>%</span>
          </td>
        </tr>
        <tr>
          <td class="assessment-criterion-table-one">
            期末考试
          </td>
          <td class="assessment-criterion-table-two">
            本项得分=期末考试实际得分/卷面总分 x 本项权重
          </td>
          <td class="assessment-criterion-table-three">
            <input type="text" v-model="final" @change="doSums" />
            <span>%</span>
          </td>
        </tr>
        <tr>
          <td class="assessment-criterion-table-one">
            互动问答
          </td>
          <td class="assessment-criterion-table-two">
            发布<span>2</span>分/条，回复<span>2</span>分/条，最高<span>100</span>分，再按权重计算出本项得分
          </td>
          <td class="assessment-criterion-table-three">
            <input type="text" v-model="interactive" @change="doSums" />
            <span>%</span>
          </td>
        </tr>
        <tr>
          <td class="assessment-criterion-table-one">
            登录签到
          </td>
          <td class="assessment-criterion-table-two">
            累计签到<span>20</span>次得满分，每日只能签到一次，次数不达标则按实际次数折算
          </td>
          <td class="assessment-criterion-table-three">
            <input type="text" v-model="LogInSign" @change="doSums" />
            <span>%</span>
          </td>
        </tr>
        <tr>
          <td class="assessment-criterion-table-one">
            总计
          </td>
          <td class="assessment-criterion-table-two">
            不考核项可用0%表示，各项合计需达100%
          </td>
          <td
            class="assessment-criterion-table-three assessment-criterion-table-hundred"
          >
            {{ altogether || 0 }}%
          </td>
        </tr>
      </table>
    </div>
    <div class="assessment-criterion-button">
      <el-button @click="handlePrevious">
        上一步
      </el-button>
      <el-button type="primary" @click="handleSave">
        提交审核
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      watchVideo: '',
      unitTesting: '',
      final: '',
      interactive: '',
      LogInSign: '',
      altogether: null,
    }
  },
  computed: {
    ...mapState('course-detail', {
      inspectionStandardList: state => state.inspectionStandardList,
    }),
  },
  methods: {
    ...mapActions('uploading', ['getAddInspectionStandard']),
    ...mapActions('course-detail', [
      'getByInspectionStandardId',
      'getUpdateInspectionStandard',
    ]),
    ...mapMutations('uploading', ['handleStep', 'handlePre']),
    doSums() {
      let watchVideo = parseInt(this.watchVideo) || 0
      let unitTesting = parseInt(this.unitTesting) || 0
      let final = parseInt(this.final) || 0
      let interactive = parseInt(this.interactive) || 0
      let LogInSign = parseInt(this.LogInSign) || 0
      this.altogether =
        watchVideo + unitTesting + final + interactive + LogInSign
    },
    // 点击上一步
    handlePrevious() {
      this.handlePre(3)
      if (this.$route.query.id) {
        this.$router.push({
          path: '/new-curriculum/content-design',
          query: {
            courseIdSign: this.$route.query.courseIdSign,
            id: this.$route.query.id,
          },
        })
      } else {
        this.$router.push({
          path: '/new-curriculum/content-design',
          query: { courseIdSign: this.$route.query.courseIdSign },
        })
      }
    },
    // 点击提交审核
    handleSave() {
      let reg = /^[0-9]*$/
      let watchVideo = Number(this.watchVideo)
      let unitTesting = Number(this.unitTesting)
      let theFinalExam = Number(this.final)
      let altogether = Number(this.altogether)
      let interactiveQuestion = Number(this.interactive)
      let logSig = Number(this.LogInSign)
      if (
        reg.test(watchVideo) &&
        reg.test(unitTesting) &&
        reg.test(theFinalExam) &&
        reg.test(interactiveQuestion) &&
        reg.test(logSig)
      ) {
        if (
          watchVideo +
            unitTesting +
            theFinalExam +
            interactiveQuestion +
            logSig ===
          100
        ) {
          let addInspectionStandardReq = {
            watchVideo,
            unitTesting,
            theFinalExam,
            interactiveQuestion,
            logSig,
            courseId: this.$route.query.courseIdSign,
          }
          if (this.$route.query.id) {
            let updateInspectionStandardReqObj = {
              id: this.inspectionStandardList.id,
              addInspectionStandardReq,
            }
            this.getUpdateInspectionStandard(updateInspectionStandardReqObj)
            this.$router.replace('/home/learning/curriculum')
            localStorage.removeItem('active')
            localStorage.removeItem('speaker')
          } else {
            if (this.getAddInspectionStandard(addInspectionStandardReq)) {
              this.$router.replace('/home/learning/curriculum')
              localStorage.removeItem('active')
              localStorage.removeItem('speaker')
            }
          }
        } else {
          this.$message.error('请保证总计为100')
        }
      } else {
        this.$message.error('每项只能填写数字')
      }
    },
  },
  async mounted() {
    if (this.$route.query.id) {
      await this.getByInspectionStandardId(this.$route.query.courseIdSign)
      this.watchVideo = this.inspectionStandardList.watchVideo || 0
      this.unitTesting = this.inspectionStandardList.unitTesting || 0
      this.final = this.inspectionStandardList.theFinalExam || 0
      this.interactive = this.inspectionStandardList.interactiveQuestion || 0
      this.LogInSign = this.inspectionStandardList.logSig || 0
    }
    let watchVideo = parseInt(this.watchVideo)
    let unitTesting = parseInt(this.unitTesting)
    let final = parseInt(this.final)
    let interactive = parseInt(this.interactive)
    let LogInSign = parseInt(this.LogInSign)
    this.altogether = watchVideo + unitTesting + final + interactive + LogInSign
  },
}
</script>

<style lang="less" scoped>
.assessment-criterion {
  .assessment-criterion-top {
    width: 890px;
    height: 44px;
    line-height: 44px;
    padding-left: 14px;
    margin: 60px auto;
    background: rgba(245, 245, 245, 1);
  }
  .assessment-criterion-bottom {
    width: 890px;
    margin: 0 auto;
    .assessment-criterion-table {
      width: 100%;
      tr {
        .assessment-criterion-table-one {
          width: 130px;
          height: 60px;
          text-align: center;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        .assessment-criterion-table-three {
          width: 130px;
          height: 60px;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: #58c6bd;
          input {
            width: 50%;
            height: 100%;
            border: 0;
            text-align: right;
            box-sizing: border-box;
            color: #58c6bd;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
          }
          span {
            color: rgba(102, 102, 102, 1);
          }
        }
        .assessment-criterion-table-two {
          height: 60px;
          text-align: center;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          span {
            color: #58c6bd;
          }
        }
        .assessment-criterion-table-weight {
          color: rgba(51, 51, 51, 1);
        }
        .assessment-criterion-table-hundred {
          text-align: center;
        }
        th {
          text-align: center;
          height: 44px;
          background: rgba(229, 229, 229, 1);
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .assessment-criterion-button {
    margin: 50px 0 50px 450px;
  }
}
</style>
