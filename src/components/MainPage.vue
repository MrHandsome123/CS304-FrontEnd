<template>
  <div>
    <div class="upper-bar">
      <span><img class="Logo" alt="Canvas logo" src="../assets/SustechLogo.png"></span>
      <span class="pageTitle"><h1 style="color: white">Main Page</h1></span>
    </div>
    <div class="mainPage">
      <div class="courseList">
        <CourseList :List="ListData"/>
      </div>
      <FullCalendar :events="Events" />
    </div>
  </div>
</template>


<script>
import CourseList from "@/components/CourseList";
import FullCalendar from "@/components/FullCalendar";
import axios from 'axios';
import { IP_ADDRESS } from '@/main';
export default {
  name: 'MainPage',
  data() {
    return{
      ListData: [],
      Events: []
    }
  },
  created() {
    this.fetchCourses();
    this.fetchTasks();
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get("http://"+IP_ADDRESS+":8181/course/listCourse");
        const data = response.data;
        this.ListData = data.map((Course) => {
          return {
            id: Course.courseId,
            name: Course.courseName,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchTasks() {
      try {
        const response = await axios.get("http://"+IP_ADDRESS+":8181/courseEvent/getAllCourseEvents/11451414");
        const data = response.data;
        this.Events = data.map((event) => {
          return {
            title: event.eventName,
            start: event.startTime
          };
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
  components: {
    FullCalendar,
    CourseList
  }
}
</script>

<style scoped>
.Logo {
  width: 60%;
}
.pageTitle {
   display: flex;
   text-align: end;
 }
 .courseList {
  /* 设置宽度和其他样式 */
  width: 250px;
  line-height: 3;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;

  /* 使用 flex 布局居中 My Courses 栏 */
  text-align: center;
}
.mainPage {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.upper-bar {
  display: flex;
  background: black;
  align-content: center;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

