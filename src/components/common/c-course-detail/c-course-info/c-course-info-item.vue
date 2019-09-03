<template>
  <div>
    <span class="c-course-info-margin c-course-info-item">
      <img :src="imgCredit" class="c-course-info-img" />
      <span class="item-name">
        学分
      </span>
      <span class="item-value">
        {{ courseInfoVo.courseScore }}
      </span>
    </span>
    <span class="c-course-info-item">
      <img :src="imgHour" />
      <span class="item-name">
        课时
      </span>
      <span class="item-value">
        {{ courseInfoVo.courseTime }}
      </span>
    </span>
    <span class="c-course-info-item">
      <img :src="imgSubject" />
      <span class="item-name">
        学科
      </span>
      <span class="item-value">
        {{ courseInfoVo.courseTypeName }}
      </span>
    </span>
    <p class="c-course-info-item c-course-info-top">
      <img :src="imgTeacher" />
      <span class="item-name">
        教师
      </span>
      <span class="item-value">
        {{ courseInfoVo.teacherName }}
      </span>
    </p>
    <p class="c-course-info-item c-course-info-top">
      <img :src="imgSchool" />
      <span class="item-name">
        学校
      </span>
      <span class="item-value" v-if="judge">
        {{ courseInfoVo.schoolName }} 、{{ twoName }}
      </span>
      <span class="item-value" v-else>
        {{ courseInfoVo.schoolName }}
      </span>
    </p>
    <p class="c-course-info-item c-course-info-top" v-if="isShow">
      <el-button type="primary" @click="byCourse">
        立即购买
      </el-button>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import imgCredit from '@assets/icon/credit_icon@2x.png'
import imgHour from '@assets/icon/hour_icon@2x.png'
import imgSubject from '@assets/icon/subject_icon@2x.png'
import imgSchool from '@assets/icon/school_icon@2x.png'
import imgTeacher from '@assets/icon/teacher_icon@2x.png'

export default {
  name: 'c-course-info-item',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          img: '',
          name: '',
          value: '',
        }
      },
    },
  },
  data() {
    return {
      imgCredit,
      imgHour,
      imgSubject,
      imgSchool,
      imgTeacher,
      judge: '',
      twoName: '',
      isShow: false,
    }
  },
  computed: {
    ...mapState('course-detail', {
      courseInfoVo: state => state.courseInfoVo,
    }),
    ...mapState('member', {
      findStudentOrderExist: state => state.findStudentOrderExist,
    }),
  },
  methods: {
    ...mapActions('member', ['getFindStudentOrderExist']),
    ...mapActions('course-detail', ['getByCourseId']),
    // 点击购买
    byCourse() {
      this.$router.push({
        path: '/confirm-order',
        query: {
          sign: this.$route.params.id,
        },
      })
    },
  },
  async created() {
    this.judge = this.$route.params.judge
    this.twoName = this.$route.params.name
    await this.getByCourseId(this.$route.params.id)
    if (this.courseInfoVo.coursePrice === 0) {
      console.log('免费')
    } else {
      console.log('付费')
      await this.getFindStudentOrderExist(this.$route.params.id)
      if (this.findStudentOrderExist > 0) {
        console.log('已购买')
      } else {
        console.log('未购买')
        this.isShow = true
      }
    }
  },
}
</script>

<style lang="less" scoped>
.c-course-info-margin {
  margin-left: 8px;
}
.c-course-info-item {
  color: #666666;
  font-size: 14px;
  margin-left: 38px;
  img {
    vertical-align: middle;
    transform: translateY(-1px);
    margin-right: 6px;
  }
  .item-name {
    margin-right: 18px;
  }
  .item-disc {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: black;
    margin: 0 6px;
  }
}
.c-course-info-top {
  margin-top: 16px;
}
</style>
