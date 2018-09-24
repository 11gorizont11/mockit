<template>
  <el-row :gutter="12">
    <el-col :span="8" :offset="8">
      <h2 class="text-center" v-html="title"> </h2>
      <el-card shadow="always" class="text-center">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
          <el-form-item label="Login name" prop="login">
            <el-input v-model="loginForm.login"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm('loginForm')">Login me!</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      title: "Login",
      loginForm: {
        login: "",
        password: ""
      },
      rules: {
        login: [
          { required: true, message: "Please enter login name", trigger: blur }
        ],
        password: [
          { required: true, message: "Passsword is required", trigger: blur }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!!!", {
            login: this.loginForm.login,
            password: this.loginForm.password
          });
        } else {
          console.error("erroor!!!");
        }
      });
    }
  }
};
</script>

