<template>
  <div class="course-examination">
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green" />
      <h2 class="course-bulletin-notice">
        单元测试（4次）
      </h2>
    </div>
    <div class="course-examination-table">
      <el-table
        :header-cell-style="{ background: '#F0F0F0', color: '#333333' }"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="name" label="测试名称" width="580">
        </el-table-column>
        <el-table-column prop="num" label="数量"> </el-table-column>
        <el-table-column prop="grade" label="总分数"> </el-table-column>
        <el-table-column prop="people" label="考试人数"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '第一章    电商实训课程',
          num: 20,
          grade: 100,
          people: 4521,
        },
        {
          name: '第二章    电商实训课程',
          num: 20,
          grade: 100,
          people: 3620,
        },
        {
          name: '第三章    电商实训课程',
          num: 30,
          grade: 100,
          people: 4562,
        },
        {
          name: '期末考    ',
          num: 50,
          grade: 100,
          people: 6320,
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.course-examination-table {
  margin-top: 20px;
}
</style>
