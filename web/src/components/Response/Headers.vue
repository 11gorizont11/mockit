<template>
  <ul class="headers-list">
    <li>
      <span class="headers__input-control el-input__inner">Key</span>
      <span class="headers__input-control el-input__inner">Value</span>
    </li>
    <li v-for="item in headers" :key="item.id">
      <input type="text" class="headers__input-control el-input__inner" v-model.lazy="item.key">
      <input type="text" class="headers__input-control el-input__inner" v-model.lazy="item.value">
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    headers: Array,
    required: true
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.headers-list {
  text-align: left;
  margin: 0 0 16px 0;
  list-style: none;
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ebeef5;
    margin: 8px 0;
  }
}
.headers__input-control {
  width: 50%;
  border: none;
}
</style>
