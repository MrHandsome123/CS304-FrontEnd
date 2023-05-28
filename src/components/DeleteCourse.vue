<template>
  <div title="Delete Course">
    <form>
      <h2>Delete Course</h2>
      <div class="form-group">
        <label for="courseName">CourseName</label>
        <select id="courseName" v-model="currentCourse">
          <option v-for="(item,index) in courses" :key="index" :value="item.id">{{ item.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" @click.prevent="DeleteCourse">DELETE</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from "../store/store";
import axios from "axios";
import {IP_ADDRESS} from "@/main";

export default {
  name: "DeleteCourse",
  store,
  props: ["courses"],
  data() {
    return {
      currentCourse: ''
    }
  },
  methods: {

    async DeleteCourse() { // delete an existing course from the website
      try {
        /*const response = await axios.delete('http://'+IP_ADDRESS+':8181/course/deleteCourse', {
          courseId: this.currentCourse,
          //userName: store.getters.userName
        })*/
        const response = await axios.delete('http://'+IP_ADDRESS+':8181/course/deleteCourse/' + this.currentCourse)
        // 创建成功提醒
        window.alert(this.courseName + " is deleted successfully!")
        console.log(response.data)
        location.reload()

      } catch (error) {
        this.errorMessage = error.response.data.message
        console.log(error)
        // 创建失败显示错误信息
        // ToDo: 显示失败原因(没有足够权限/当前课程已存在)
        window.alert("Deletion failure!")
      }
    }
  }
}
</script>

<style scoped>

</style>