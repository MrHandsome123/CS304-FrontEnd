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
      <!-- <div class="form-group">
        <input type="checkbox" id="remember-me" v-model="rememberMe">
        <label for="remember-me">Remember me</label>
      </div> -->
      <div class="form-group">
        <button type="submit" @click.prevent="login">Login</button>
      </div>
      <!-- <div class="form-group">
        <a href="#" @click.prevent="forgotPassword">Forgot password?</a>
      </div> -->
      <div class="form-group">
        <p>Don't have an account? <a href="#" @click.prevent="register">Register</a></p>
      </div>
    </form>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { IP_ADDRESS } from '@/main';

export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      errorMessage: "",
    };
  },

  beforeRouteEnter:(to, from, next) => { // 当用户回到登陆界面一定是登出状态，清除保存的用户数据并将登陆状态设置为false
    next(vm => {
      vm.$store.dispatch("setUser", null);
    });
  },

  methods: {
    async login() {
      try {
        const response = await axios.post('http://'+IP_ADDRESS+':8181/user/login', {
          password: this.password,
          uid: this.username,
          // rememberMe: this.rememberMe
        })

        // Todo: 将用户的uid等信息存至前端
        sessionStorage.setItem("userName", this.username);
        //sessionStorage.setItem("userToken", response.data.res.token);
        this.$store.dispatch("setUser", this.username)
        //this.$store.dispatch("setToken", response.data.res.token)

        const role = await axios.get('http://'+IP_ADDRESS+':8181/user/getUserRole/' + sessionStorage.getItem("userName"));
        sessionStorage.setItem("userRole", role.data)

        // 登录成功，跳转到用户主页
        if (response.data.msg==='密码错误'){
          this.errorMessage = response.data.msg
        }else{
          this.$router.push('/main')
        }
        console.log(response.data)
      } catch (error) {
        // this.errorMessage = error.response.data.message
        console.log(error)
        console.log(this.password)
        console.log(this.username)
      }
    },

    forgotPassword() {
      // 跳转到重置密码页面
      // this.$router.push('/resetPassword')
    },
    register() {
      // 执行注册逻辑

      // 使用Vue Router进行页面跳转
      this.$router.push('/register'); // 在这里指定要跳转的目标路径，比如'/register'
    }
  },
};
</script>

<style>
.login-container {
  max-width: 400px;
  min-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffff;
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
  width: 90%;
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
