<template>
  <div>
    <el-alert
      :title="item"
      type="success"
      effect="dark"
      v-for="(item, index) in computedData"
      :key="index"
    >
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "SuccessContent",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    computedData() {
      return this.data;
    },
  },
};
</script>

<style>
</style>