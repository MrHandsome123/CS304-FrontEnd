<template>
  <div>
    <h2> Add Course </h2>
    <form>
      <div class="form-group">
      <label for="courseCode">CourseCode</label>
      <input type="text" id="courseCode" v-model="courseCode" required>
      </div>
      <div class="form-group">
        <label for="courseName">CourseName</label>
        <input type="text" id="courseName" v-model="courseName" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" required>
      </div>
      <div class="form-group">
        <label for="instructor">Instructor</label>
        <input type="text" id="instructor" v-model="instructor" required>
      </div>
      <div class="form-group">
        <label for="semester">Semester</label>
        <input type="text" id="semester" v-model="semester" required>
      </div>
      <div class="form-group">
        <button type="submit" @click.prevent="AddCourse">ADD</button>
      </div>
    </form>
  </div>

</template>

<script>
import axios from "axios";
import {IP_ADDRESS} from "@/main";
import store from "../store/store";

export default {
  name: "AddCourse",
  store,
  data() {
    return {
      courseCode: '',
      courseName: '',
      description: '',
      instructor: '',
      semester: ''
    };
  },
  methods:{
    async AddCourse() { // add a new course to the website
      try {
        const response = await axios.post('http://'+IP_ADDRESS+':8181/course/teacherAddCourse/' + sessionStorage.getItem("userName"), {
          courseCode: this.courseCode,
          courseName: this.courseName,
          description: this.description,
          instructor: this.instructor,
          semester: this.semester
        })

        // 创建成功提醒
        window.alert(this.courseName + " is created successfully!")
        console.log(response.data)
        location.reload()
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

<style>
  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #2c3e50;
  }
</style>