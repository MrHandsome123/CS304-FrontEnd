<template>
  <div class="form-group">
    <label for="courseName">CourseName</label>
    <select id="courseName" v-model="courseName">
      <option v-for="(item,index) in courses" :key="index">{{ item.name }}</option>
    </select>
  </div>
  <div class="form-group">
    <button type="submit" @click.prevent="deleteCourse">Login</button>
  </div>
</template>

<script>
import store from "../../vuex/store";
import axios from "axios";
import {IP_ADDRESS} from "@/main";

export default {
  name: "DeleteCourse",
  store,
  data() {
    return {
      courses: [],
      courseName: ''
    }
  },
  methods: {
    async fetchCourses() { // search courses that are related to current teacher
      try {
        const response = await axios.get("http://"+IP_ADDRESS+":8181/user/listUserCourse/11451414");
        const data = response.data;
        this.courses = data.map((Course) => {
          return {
            id: Course.courseId,
            name: Course.courseName,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },

    async DeleteCourse() { // delete an existing course from the website
      try {
        const response = await axios.post('http://'+IP_ADDRESS+':8181', {
          courseName: this.courseName,
          userName: store.getters.userName
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