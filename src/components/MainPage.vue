<template>
  <div>
    <UpperBar/>
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
import UpperBar from "@/components/UpperBar";
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
        const response = await axios.get("http://"+IP_ADDRESS+":8181/user/listUserCourse/" + sessionStorage.getItem("userName"));
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
        const response = await axios.get("http://"+IP_ADDRESS+":8181/courseEvent/getAllCourseEvents/" + sessionStorage.getItem("userName"));
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
    CourseList,
    UpperBar
  }
}
</script>

<style scoped>
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
  background-color: #333;
  color: #fff;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 999;
  align-items: center;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

