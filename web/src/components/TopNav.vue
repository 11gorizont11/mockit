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
import getUserCreds from '../helpers/getUserCreds';

export default {
  name: 'TopApp',
  data() {
    return {
      loginName: ''
    };
  },

  methods: {
    logoutMe() {
      this.$http.logout().then(res => {
        if (res) {
          this.$message({
            message: res.message,
            type: 'success'
          });
          this.$router.push('login');
          this.loginName = '';
        }
      });
    },
    getLoginName() {
      const creads = JSON.parse(getUserCreds());
      this.loginName = creads === null ? '' : creads.login;
    }
  },
  watch: {
    $route() {
      this.getLoginName();
    }
  },
  mounted() {
    this.getLoginName();
  }
};
</script>