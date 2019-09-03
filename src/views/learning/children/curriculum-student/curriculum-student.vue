<template>
  <div>
    <div class="curriculim-student-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="学习中" name="first">
          <Studying />
        </el-tab-pane>
        <el-tab-pane label="已完成" name="second">
          <Offthestocks />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Studying from './children/studying'
import Offthestocks from './children/offthestocks'
export default {
  data() {
    return {
      activeName: 'first',
    }
  },
  components: {
    Studying,
    Offthestocks,
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
  },
}
</script>

<style lang="less" scoped>
.curriculim-student-tabs {
  margin-top: 30px;
}
</style>
