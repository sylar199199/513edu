<template>
  <div class="course-material-main">
    <div class="material-top-title">
      <div class="material-top-title-main">
        <span>
          课程资料
        </span>
      </div>
    </div>
    <div class="material-el-table">
      <el-table
        :data="allCourseDataList"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#EBEBEB', color: '#333333' }"
      >
        <el-table-column prop="dataName" label="名称" align="center">
          <template slot-scope="scope">
            <div class="el-table-slot-name">
              {{ scope.row.dataName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dataSize"
          label="大小"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          align="center"
          width="180"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="chapterLevel"
          label="操作"
          align="center"
          width="140"
        >
          <template slot-scope="scope">
            <div class="el-table-slot-delete">
              <a :href="scope.row.dataPath">
                下 载
              </a>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
    }
  },
  computed: {
    ...mapState('class', {
      allCourseDataList: state => state.allCourseDataList,
    }),
  },
  methods: {
    ...mapActions('class', ['getAllCourseDataList']),
    dataType(value) {
      console.log(value)
    },
  },
  created() {
    this.getAllCourseDataList(this.$route.query.sign)
  },
}
</script>

<style lang="less" scoped>
.course-material-main {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .material-top-title {
    width: 994px;
    height: 66px;
    padding: 0 30px;
    .material-top-title-main {
      width: 100%;
      height: 100%;
      border-bottom: 1px #cccccc solid;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 18px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 66px;
      }
      div {
        margin-top: 13px;
      }
    }
  }
  .material-el-table {
    width: 994px;
    padding: 0 30px;
    margin-top: 40px;
    .el-table-slot-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-table-slot-delete {
      a {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(85, 198, 194, 1);
        margin: 0 8px;
        cursor: pointer;
      }
    }
  }
}
</style>
