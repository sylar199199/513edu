<template>
  <el-form
    :inline="formConfigs.lineStyle"
    :model="form"
    :label-position="formConfigs.labelPosition || 'left'"
    :label-width="formConfigs.labelWidth"
    :rules="rules"
    :size="formConfigs.size"
    :style="formConfigs.style"
    ref="form"
  >
    <slot name="formItem" />
    <el-form-item
      v-for="(item, key) in formConfigs.formItemList"
      :key="key"
      :label="item.label"
      :prop="item.prop"
      :style="item.itemStyle"
    >
      <el-input
        v-if="item.type == 'input'"
        v-model="form[item.prop]"
        :style="item.style"
        :clearable="item.clearable"
        :disabled="item.disabled"
        :prefix-icon="item.prefixIcon"
        :show-password="item.isPassword || false"
        :placeholder="item.placeholder"
      >
        <i
          v-if="item.prefix"
          slot="prefix"
          :class="item.prefix.class"
          :style="item.prefix.iStyle"
        >
          <img
            v-show="item.prefix.imgSrc"
            :src="item.prefix.imgSrc"
            :style="item.prefix.imgStyle"
          />
        </i>
        <i
          v-if="item.suffix"
          :class="item.suffix.class"
          :style="item.suffix.iStyle"
          slot="suffix"
          @click="item.suffix.handleClcik"
        >
          <img
            v-show="item.suffix.imgSrc"
            :style="item.suffix.imgStyle"
            :src="item.suffix.imgSrc"
            @load="item.suffix.handleLoad"
            @error="item.suffix.handleError"
          />
        </i>
      </el-input>
      <el-select
        :clearable="true"
        v-else-if="item.type == 'select'"
        v-model="form[item.prop]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
        :style="item.style"
      >
        <i
          v-if="item.prefix"
          slot="prefix"
          :class="item.prefix.class"
          :style="item.prefix.iStyle"
        >
          <img
            v-show="item.prefix.imgSrc"
            :src="item.prefix.imgSrc"
            :style="item.prefix.imgStyle"
          />
        </i>
        <el-option
          v-for="(optItem, _key) in item.optList"
          :key="_key"
          :label="optItem.schoolName"
          :value="optItem.schoolSign"
          :style="item.style"
        />
      </el-select>
      <el-date-picker
        :value-format="item.dateFormate"
        v-else
        v-model="form[item.prop]"
        :type="item.type"
        :disabled="item.disabled"
        :clearable="true"
        :placeholder="item.label"
        :style="item.style"
      />
    </el-form-item>
    <div class="searchBtn" v-if="formConfigs.operate">
      <el-button-group :style="formConfigs.operate.groupStyle">
        <el-button
          v-for="(item, key) in formConfigs.operate.buttonList"
          :key="key"
          :size="item.size"
          :type="item.type"
          :icon="item.icon"
          @click="item.handleClick"
          :style="item.style"
        >
          {{ item.name }}
        </el-button>
      </el-button-group>
      <slot name="operate" />
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'base-form',
  props: {
    formConfigs: {
      type: Object,
      required: true,
      default: () => {},
    },
    formData: {
      type: Object,
      required: true,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    _formData() {
      return this.formData
    },
  },
  watch: {
    _formData(value) {
      this.form = {
        ...value,
      }
    },
  },
  methods: {
    // 初始化设置config存在的default值
    setDefaultValue() {
      const formData = { ...this.formData }
      // 设置默认值
      this.formConfigs.formItemList.forEach(item => {
        // formData 没有设置值 以及 config存在默认值
        if (
          item.hasOwnProperty('default') &&
          !this.formData.hasOwnProperty(item.prop)
        ) {
          formData[item.prop] = item.default
        }
      })
      // 初始化form
      this.form = formData
    },
    // validate
    validate(cb) {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (typeof cb === 'function') cb(this.form)
        } else {
          return false
        }
      })
    },
    // reset form value
    reset() {
      this.$refs.form.resetFields()
    },
  },
  mounted() {
    this.setDefaultValue()
  },
}
</script>
