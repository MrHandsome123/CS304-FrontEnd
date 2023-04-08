<template>
  <div class="upper-bar">
    <span><img class="Logo" alt="Canvas logo" src="./assets/SustechLogo.png"></span>
    <span class="pageTitle"><h1 style="color: white">Main Page</h1></span>
  </div>
  <div class="mainPage">
    <div class="courseList">
      <CourseList :List="ListData"/>
    </div>
    <FullCalendar :current-events="Events" />
  </div>
</template>

<script>
import CourseList from "@/components/CourseList";
import FullCalendar from "@/components/FullCalendar";
export default {
  name: 'MainPage',
  data() {
    return{
      ListData: [
        {
          name: "CS304 Software Engineering",
          identity: "ST"
        },
        {
          name: "CS102 Programming with Java",
          identity: "SA"
        }
      ],
      Events: [
        {
          title: 'All-day event',
          start: new Date().toISOString().replace(/T.*$/, '')
        }
      ]
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
  width: 300px;
  line-height: 3;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
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
