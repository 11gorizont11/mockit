<template>
  <el-select v-model.number="value" placeholder="Select Status Code" size="large">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>


<script>
import statusCodesMap from "../../helpers/statusCodesMap";

export default {
  props: {
    statusCode: [String, Number],
    required: true
  },
  data() {
    return {
      options: Object.keys(statusCodesMap).map(item => ({
        value: item,
        label: statusCodesMap[item]
      })),
      value: this.statusCode
    };
  },
  watch: {
    value(val) {
      this.$emit("update:code", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
  margin-bottom: 16px;
}
</style>
