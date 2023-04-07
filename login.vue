<template>
  <div class="login-container">
    <h2>Login</h2>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <input type="checkbox" id="remember-me" v-model="rememberMe">
        <label for="remember-me">Remember me</label>
      </div>
      <div class="form-group">
        <button type="submit" @click.prevent="login">Login</button>
      </div>
      <div class="form-group">
        <a href="#" @click.prevent="forgotPassword">Forgot password?</a>
      </div>
    </form>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      errorMessage: "",
    };
  },
  methods: {
    login() {
      axios.post('http://10.17.131.177:8181/user/login', {
          password: this.password,
          uid: this.username,
          // rememberMe: this.rememberMe
      })
      .then(response => {
        // 登录成功，跳转到用户主页
        // this.$router.push('/home')
        this.responseData = response.data
        console.log(this.responseData)
      }).catch(error => {
        // this.errorMessage = error.response.data.message
        console.log(error)
        console.log(this.password)
        console.log(this.username)
      })
      
    },

    forgotPassword() {
      // 跳转到重置密码页面
      this.$router.push('/resetPassword')
    },
  },
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  font-weight: bold;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
a {
  color: #1E88E5;
  text-decoration: none;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
