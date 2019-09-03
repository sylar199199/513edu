<template>
  <div class="team-teachers">
    <el-table
      :data="allCourseTeacherList"
      style="width: 100%"
      min-height="400"
      :header-cell-style="{ background: '#F0F0F0', color: '#333333' }"
    >
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="teacherImage" label="教师头像" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.teacherImage" alt="" class="el-table-img" />
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="教师姓名" width="120">
      </el-table-column>
      <el-table-column prop="teacherTitle" label="教师职称" width="120">
      </el-table-column>
      <el-table-column prop="introduction" label="教师简介" width="300">
        <template slot-scope="scope">
          <div class="el-table-introduction">
            {{ scope.row.introduction }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="主讲教师" width="120">
        <template slot-scope="scope">
          <el-radio
            v-model="checkedValue"
            :label="scope.row.idSign"
            :border="true"
            size="mini"
            @change="handleSpeaker"
          >
            设为主讲
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="deleteRow(scope.row.idSign)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="team-teachers-newAdd">
      <el-button type="primary" class="tea-teachers-btn" @click="handleAdd">
        新增
      </el-button>
    </div>
    <div class="team-teachers-button">
      <el-button @click="handlePrevious">
        上一步
      </el-button>
      <el-button type="primary" @click="handleSave">
        保 存
      </el-button>
      <el-button @click="handleNext">
        下一步
      </el-button>
    </div>
    <!-- 新增老师 -->
    <el-dialog
      title="新增老师"
      :visible.sync="dialogVisible"
      width="25%"
      :center="true"
      :close-on-click-modal="false"
    >
      <el-select v-model="seletValue" filterable placeholder="请选择">
        <el-option
          v-for="item in allTeacher"
          :key="item.sign"
          :label="item.teacherName"
          :value="item.sign"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="teamNotarize">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      value: true,
      dialogVisible: false,
      seletValue: '',
      checkedValue: localStorage.getItem('speaker') || '',
    }
  },
  computed: {
    ...mapState('uploading', {
      allTeacher: state => state.allTeacher,
      allCourseTeacherList: state => state.allCourseTeacherList,
    }),
  },
  methods: {
    ...mapActions('uploading', [
      'getByAllTeacher',
      'getAddCourseTeacher',
      'getAllCourseTeacherList',
      'getUpdateCourseTeacherDeleteFlag',
      'getUpdateMasterFlag',
    ]),
    ...mapMutations('uploading', ['handleStep', 'handlePre']),
    // 点击删除老师
    async deleteRow(idSign) {
      await this.getUpdateCourseTeacherDeleteFlag(idSign)
      await this.getAllCourseTeacherList(this.$route.query.courseIdSign)
    },
    // 点击确认新增老师
    async teamNotarize() {
      this.dialogVisible = false
      let addCourseTeacherObj = {
        courseIdSign: this.$route.query.courseIdSign,
        teacherIdSign: this.seletValue,
      }
      await this.getAddCourseTeacher(addCourseTeacherObj)
      await this.getAllCourseTeacherList(this.$route.query.courseIdSign)
    },
    // 点击新增增加老师
    handleAdd() {
      this.dialogVisible = true
      this.getByAllTeacher()
    },
    // 点击设为主讲老师
    handleSpeaker(value) {},
    // 点击上一步
    handlePrevious() {
      this.handlePre(1)
      if (this.$route.query.id) {
        this.$router.push({
          path: '/new-curriculum/summary-Info',
          query: {
            courseIdSign: this.$route.query.courseIdSign,
            id: this.$route.query.id,
          },
        })
      } else {
        this.$router.push({
          path: '/new-curriculum/summary-Info',
          query: {
            courseIdSign: this.$route.query.courseIdSign,
          },
        })
      }
    },
    // 点击保存
    async handleSave() {
      let updateMasterFlagReqObj = {
        courseIdSign: this.$route.query.courseIdSign,
        bindMasterSign: this.checkedValue,
        unbindMasterSign: localStorage.getItem('speaker') || '',
      }
      if (this.checkedValue) {
        await this.getUpdateMasterFlag(updateMasterFlagReqObj)
        await this.getAllCourseTeacherList(this.$route.query.courseIdSign)
      }
    },
    // 点击下一步
    handleNext() {
      if (localStorage.getItem('speaker')) {
        if (this.$route.query.id) {
          let flag = this.allCourseTeacherList.some(item => {
            if (item.masterFlag == '主讲教师') {
              return true
            } else {
              return false
            }
          })
          if (flag) {
            this.handleStep(3)
            this.$router.push({
              path: '/new-curriculum/content-design',
              query: {
                courseIdSign: this.$route.query.courseIdSign,
                id: this.$route.query.id,
              },
            })
          } else {
            this.$message.error('请确保您选择了老师管理者并保存')
          }
        } else {
          let flag = this.allCourseTeacherList.some(item => {
            if (item.masterFlag == '主讲教师') {
              return true
            } else {
              return false
            }
          })
          if (flag) {
            this.handleStep(3)
            this.$router.push({
              path: '/new-curriculum/content-design',
              query: { courseIdSign: this.$route.query.courseIdSign },
            })
          } else {
            this.$message.error('请确保您选择了老师管理者并保存')
          }
        }
      } else {
        this.$message.error('请确保您选择了老师管理者并保存')
      }
    },
  },
  async created() {
    await this.getAllCourseTeacherList(this.$route.query.courseIdSign)
    if (this.$route.query.id) {
      this.checkedValue = localStorage.getItem('speaker')
    }
  },
}
</script>

<style lang="less" scoped>
.team-teachers {
  width: 980px;
  margin: 100px auto 0;
  .el-table-img {
    width: 35px;
    height: 35px;
  }
  .el-table-introduction {
    width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .team-teachers-newAdd {
    margin-top: 50px;
    .tea-teachers-btn {
      margin-left: 415px;
    }
  }
  .team-teachers-button {
    margin: 100px 0 50px 350px;
  }
  .el-select {
    margin-left: 105px;
  }
  label {
    line-height: 20px;
    display: inline-block;
    margin-left: 5px;
    margin-right: 15px;
    color: #777;
  }
  .radio_type {
    width: 25px;
    height: 25px;
    appearance: none;
    position: relative;
    margin-left: 20px;
  }
  .radio_type:before {
    content: '';
    width: 20px;
    height: 20px;
    border: 1px solid #7d7d7d;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  .radio_type:checked:before {
    content: '';
    width: 20px;
    height: 20px;
    border: 1px solid #58c6bd;
    background: #58c6bd;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  .radio_type:checked:after {
    content: '';
    width: 10px;
    height: 5px;
    border: 2px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: block;
    position: absolute;
    top: 6px;
    left: 5px;
    vertical-align: middle;
    transform: rotate(-45deg);
  }
  .radio_type:checked + label {
    color: #58c6bd;
  }
}
</style>
