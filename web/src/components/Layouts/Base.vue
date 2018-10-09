<template>
  <el-container>
    <el-header class="app-header">
      <top-nav />
    </el-header>
    <div class="wrapper">
      <slot />
    </div>
  </el-container>
</template>

<script>
import TopNav from "../TopNav";

export default {
  name: "Base",
  components: {
    TopNav
  }
};
</script>