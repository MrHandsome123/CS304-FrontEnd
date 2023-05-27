<template>
  <div class="form-group">
    <label for="courseName">CourseName</label>
    <input type="text" id="courseName" v-model="courseName" required>
  </div>
  <div class="form-group">
    <button type="submit" @click.prevent="AddCourse">Login</button>
  </div>
</template>

<script>
import axios from "axios";
import {IP_ADDRESS} from "@/main";
import store from "../../vuex/store";

export default {
  name: "AddCourse",
  store,
  data() {
    return {
      courseName:''
    };
  },
  methods:{
    async AddCourse() { // add a new course to the website
      try {
        const response = await axios.post('http://'+IP_ADDRESS+':8181', {
          courseName: this.courseName,
          userName: store.getters.userName // 用户需要权限创建课程
        })

        // 创建成功提醒
        window.alert(this.courseName + " is created successfully!")

      } catch (error) {
        this.errorMessage = error.response.data.message
        console.log(error)
        // 创建失败显示错误信息
        // ToDo: 显示失败原因(没有足够权限/当前课程已存在)
        window.alert("Creation failure!")
      }
    }
  }
}
</script>

<style scoped>

</style>