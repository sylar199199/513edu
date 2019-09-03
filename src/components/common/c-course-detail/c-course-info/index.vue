<template>
  <div class="c-course-info">
    <el-row :gutter="30">
      <el-col :span="12">
        <img :src="courseInfoVo.coursePicture" alt="" />
      </el-col>
      <el-col :span="12">
        <p class="course-name">
          {{ courseInfoVo.courseName }}
        </p>
        <p class="course-description">
          {{ controlInputText }}
          <el-button
            type="text"
            class="see-more"
            @click="centerDialogVisible = true"
          >
            查看更多>>
          </el-button>
          <el-dialog
            title="课程简介"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
          >
            <span>
              {{ courseInfoVo.content }}
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </p>
        <div class="course-info-box">
          <div class="course-info">
            <c-course-info-item />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CCourseInfoItem from './c-course-info-item.vue'
import { mapState } from 'vuex'

export default {
  name: 'c-course-info',
  components: {
    'c-course-info-item': CCourseInfoItem,
  },
  data() {
    return {
      centerDialogVisible: false,
    }
  },
  computed: {
    ...mapState('course-detail', {
      courseInfoVo: state => state.courseInfoVo,
    }),
    controlInputText() {
      return this.courseInfoVo.content !== undefined &&
        this.courseInfoVo.content.length > 150
        ? this.courseInfoVo.content.substr(0, 150)
        : this.courseInfoVo.content
    },
  },
}
</script>

<style lang="less" scoped>
.c-course-info {
  font-family: SourceHanSansCN-Medium;
  img {
    width: 560px;
    height: 334px;
  }
  .course-name {
    line-height: 54px;
    font-size: 18px;
    height: 54px;
    color: #333333;
  }
  .course-description {
    color: #666666;
    font-size: 14px;
    line-height: 24px;
    .see-more {
      margin-top: -8px;
    }
  }
  .course-info-box {
    padding-right: 25px;
    margin-top: 28px;
    .course-info {
      display: flex;
      justify-content: space-between;
      &:nth-child(2) {
        margin: 30px 0;
      }
    }
  }
}
</style>
