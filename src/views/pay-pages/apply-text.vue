<template>
  <div v-html="apply">
    {{ apply }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      apply: '',
    }
  },
  mounted() {
    let from = this.$route.query.htmls
    this.apply = from
    this.$nextTick(() => {
      document.forms[0].submit()
    })
  },
}
</script>
