<template>
  <div class="curriculum">
    <div class="container">
      <div class="box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- <el-tab-pane label="账户信息" name="first">
            账户信息
          </el-tab-pane> -->
          <el-tab-pane label="我的订单" name="second">
            <my-order />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import myOrder from './account/my-order'
export default {
  data() {
    return {
      activeName: 'second',
    }
  },
  components: {
    'my-order': myOrder,
  },
  methods: {
    handleClick(tab, event) {},
  },
}
</script>

<style lang="less" scoped>
.curriculum {
  width: 994px;
  min-height: 722px;
  background: rgba(255, 255, 255, 1);
  margin-left: 10px;
  margin-top: 10px;
  float: left;
  .box {
    width: 994px;
    margin-top: 30px;
    padding: 0 30px;
  }
}
</style>
