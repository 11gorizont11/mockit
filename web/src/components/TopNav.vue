<template>
  <div class="top-nav">
    <router-link to="/"><img class="logo__img" src="../../static/logo_stub.png" alt="logo"></router-link>
    <el-dropdown v-show="loginName">
      <div class="trigger">
        <i class="el-icon-setting" style="margin-right: 8px"></i>
        <span>{{loginName}}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logoutMe">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import getUserCreds from "../helpers/getUserCreds";
// TODO: refactor this shit
export default {
  name: "TopApp",
  data() {
    return {
      loginName: ""
    };
  },

  methods: {
    logoutMe() {
      this.$http.logout().then(() => this.$router.push("login"));
      this.loginName = "";
    }
  },
  watch: {
    $route() {
      this.loginName = JSON.parse(getUserCreds()).login;
    }
  },
  mounted() {
    this.loginName = JSON.parse(getUserCreds()).login;
  }
};
</script>