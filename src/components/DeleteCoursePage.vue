<template>
  <div>
    <UpperBar/>
    <div class="container">
      <div><DeleteCourse :courses="courses"/></div>
    </div>
  </div>
</template>

<script>
import DeleteCourse from "@/components/DeleteCourse";
import axios from "axios";
import {IP_ADDRESS} from "@/main";
import UpperBar from "@/components/UpperBar";
export default {
  name: "DeleteCoursePage",
  data() {
    return {
      courses: []
    }
  },
  created() {
    this.fetchCourses();
  },
  beforeRouteEnter:(to, from, next) => {
    next(vm => {
      window.alert("You are not certified to do this operation!")
      vm.$router.push("/main")
    });
  },
  methods:{
    async fetchCourses() {
      try {
        const response = await axios.get("http://"+IP_ADDRESS+":8181/user/listUserCourse/" + sessionStorage.getItem("userName"));
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
    }
  },
  components: {
    UpperBar,
    DeleteCourse
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  min-width: 500px;
  margin: 20px auto auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffff;
}
</style>