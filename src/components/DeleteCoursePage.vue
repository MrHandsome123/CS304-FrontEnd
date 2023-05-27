<template>
  <div class="container">
    <div><DeleteCourse :courses="courses"/></div>
  </div>
</template>

<script>
import DeleteCourse from "@/components/DeleteCourse";
import axios from "axios";
import {IP_ADDRESS} from "@/main";
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
  methods:{
    async fetchCourses() {
      try {
        const response = await axios.get("http://"+IP_ADDRESS+":8181/course/listCourse");
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
    DeleteCourse
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  min-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffff;
}
</style>