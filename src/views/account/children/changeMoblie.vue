<template>
  <div class="container">
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        个人信息
      </h2>
    </div>
    <div class="changeMoblie">
      <el-steps
        :active="active"
        finish-status="success"
        process-status="process"
      >
        <el-step title="验证身份"></el-step>
        <el-step title="修改手机"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
      <router-view></router-view>
      <div class="info" v-if="active == 1">
        <certification ref="certification" />
      </div>
      <div class="info" v-if="active == 2">
        <amend ref="amend" />
      </div>
      <div class="info" v-if="active == 3">
        <prosperity />
      </div>
      <el-button style="margin-top: 12px;" @click="goback" v-if="active !== 3">
        取消
      </el-button>
      <el-button style="margin-top: 12px;" @click="next" v-if="active !== 3">
        确定
      </el-button>
      <el-button style="margin-top: 12px;" @click="pre" v-if="active == 2">
        上一步
      </el-button>
    </div>
  </div>
</template>

<script>
import certification from './certification'
import amend from './amend'
import prosperity from './prosperity'
import { mapState, mapActions } from 'vuex'

const codeReg = /^\d{6}$/
const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

export default {
  components: {
    certification,
    amend,
    prosperity,
  },
  data() {
    return {
      active: 1,
    }
  },
  computed: {
    ...mapState('login', {
      nextActiveone: state => state.nextActiveone,
      nextActivetwo: state => state.nextActivetwo,
    }),
  },
  methods: {
    ...mapActions('login', [
      'getVerifyCodeForOldMobile',
      'getVerifyCodeForNewMobile',
      'getUpdateMobile',
    ]),
    async next() {
      switch (this.active) {
        case 1:
          let oldCode = this.$refs.certification._data.code
          if (oldCode && codeReg.test(oldCode)) {
            ;(await this.getVerifyCodeForOldMobile(oldCode)) && this.active++
          } else {
            this.$message.error('验证码输入错误！')
          }
          break
        case 2:
          const { code, newPhone } = this.$refs.amend._data
          if (codeReg.test(code) && phoneReg.test(newPhone)) {
            ;(await this.getUpdateMobile({
              code,
              phone: newPhone,
            })) && this.active++
          } else {
            this.$message.error('验证码或手机号输入错误！')
          }
          break
        default:
          break
      }
    },
    pre() {
      if (this.active-- < 2) this.active = 1
    },
    goback() {
      this.$router.replace('/home/account')
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px 36px;
  border: 1px #eee solid;
  min-height: calc(100vh - 348px);

  .changeMoblie {
    width: 1060px;
    margin: 64px auto 0;
  }
}
</style>
