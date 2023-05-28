<template>
    <div class="register-container">
      <h2>Register</h2>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required>
        </div>
        <div class="form-group">
          <label for="userId">UserID</label>
          <input type="text" id="userId" v-model="userId" required>
        </div>
        <div class="form-group">
          <button type="submit" @click.prevent="register">Register</button>
        </div>
        <div class="form-group">
          <p>Already have an account? <a href="#" @click.prevent="login">Login</a></p>
        </div>
      </form>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { IP_ADDRESS } from '@/main';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userId: '',
        errorMessage: '',
      };
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Passwords do not match';
          return;
        }
  
        try {
        //   console.log(response.data);
          const response = await axios.post(`http://${IP_ADDRESS}:8181/user/register`, {
            email: this.email,
            name: this.username,
            password: this.password,
            userId: this.userId,
          });
  
          // 注册成功，跳转到其他页面
        //   this.$router.push('/dashboard'); // 替换为你想要跳转的目标路径
          console.log(response.data);
          this.errorMessage = response.data.data
        } catch (error) {
          console.log(error);
          // this.errorMessage = response.data;
        }
      },
      login() {
        // 跳转到登录页面
        this.$router.push('/login'); // 替换为你的登录页面路径
      },
    },
  };
  </script>
  
  <style>
  .register-container {
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
  input[type="password"],
  input[type="email"] {
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
  
