<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const defautlLayout = "base";

export default {
  name: "App",
  computed: {
    layout() {
      return `${this.$route.meta.layout || defautlLayout}-layout`;
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 320px;
}
.wrapper {
  padding: 0 6px;
}
.app-header {
  min-height: 45px;
  background-color: rgba(226, 226, 226, 0.36);
  border-bottom: 1px solid #cdcdcd;
}
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.logo__img {
  max-width: 35px;
}
.trigger {
  cursor: pointer;
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
