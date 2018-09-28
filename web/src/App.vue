<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
body {
  font-family: Helvetica, sans-serif;
}
#app {
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 320px;
}

.text-center {
  text-align: center !important;
}

.link-to {
  font-size: 12px;
  color: #409eff;
  text-decoration: none;
  display: block;
  margin-bottom: 16px;
}
</style>
