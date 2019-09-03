<template>
  <div>
    <base-form
      :form-data="formData"
      :form-configs="_formConfigs"
      :rules="rules"
      ref="baseForm"
    />
  </div>
</template>

<script>
import BaseForm from '@components/base/base-form'
import axios from 'axios'
import {
  formData,
  rules,
  formConfigs,
} from '@components/sign-related/configs/auth-student-form'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'auth-student-form',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      formData,
      rules,
      formConfigs,
      allSchool: '',
    }
  },
  computed: {
    ...mapState('login', {
      verifiCode: state => state.verifiCode,
    }),
    _formConfigs() {
      return formConfigs(this)
    },
  },
  methods: {
    ...mapActions('login', ['getVerifiCode', 'getIdentityAuth']),
    handleSubmit() {
      const baseFormComp = this.$refs.baseForm
      baseFormComp.validate(data => {
        let attestationObj = {
          code: this.$refs.baseForm.form.code,
          realName: this.$refs.baseForm.form.realName,
          school: this.$refs.baseForm.form.school,
          studentId: this.$refs.baseForm.form.studentId,
        }
        this.getIdentityAuth(attestationObj)
      })
    },
    getAllSchool() {
      axios.get(process.env.VUE_APP_BASE_URL + '/getAllSchool').then(res => {
        if (res.data.code === 1) {
          this.allSchool = res.data.data
        }
      })
    },
  },
  created() {
    this.getVerifiCode()
    this.getAllSchool()
  },
}
</script>

<style lang="less" scoped></style>
