<template>
  <el-row :gutter="12">
    <el-col :span="8" :offset="8">
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
          console.log("submit!!!", {
            login: this.signUpForm.login,
            email: this.signUpForm.email,
            password: this.signUpForm.password
          });
        } else {
          console.error("erroor!!!");
        }
      });
    }
  }
};
</script>

