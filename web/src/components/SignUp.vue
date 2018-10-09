<template>
  <el-row :gutter="12">
    <el-col :xs="{span: 22, offset: 1 }" :sm="{span: 14, offset: 5}" :md="{span: 8, offset: 8}" :lg="{span: 6, offset:9}">
      <h2 class="text-center" v-html="title"> </h2>
      <el-card shadow="always" class="text-center">
        <el-form :model="signUpForm" status-icon :rules="rules" ref="signUpForm">
          <el-form-item label="Login name" prop="login">
            <el-input v-model="signUpForm.login"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="signUpForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="signUpForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <router-link class="link-to" to="/login">Nooo, I have account, login me!</router-link>
        <el-button type="primary" @click="submitForm('signUpForm')">Sign up me now!</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>


<script>
export default {
  name: "SignUp",
  data() {
    return {
      title: "Sign Up",
      signUpForm: {
        login: "",
        password: "",
        email: ""
      },
      rules: {
        login: [
          { required: true, message: "Please enter login name", trigger: blur }
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
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
          const { login, email, password } = this.signUpForm;
          this.$http
            .signUp({
              login,
              email,
              password
            })
            .then(() => {
              this.$router.push("stubit");
            })
            .catch(err => {
              if (err.response.data) {
                this.$message({
                  message: err.response.data.message,
                  type: "error"
                });
                console.error("erroor!!!", err);
              }
            });
        } else {
          console.error("erroor!!!");
        }
      });
    }
  }
};
</script>

