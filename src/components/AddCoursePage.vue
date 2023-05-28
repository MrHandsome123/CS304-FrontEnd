<template>
  <div>
    <UpperBar/>
    <div class="container">
      <AddCourse/>
    </div>
  </div>
</template>

<script>
import AddCourse from "@/components/AddCourse";
import UpperBar from "@/components/UpperBar";

export default {
  name: "AddCoursePage",
  beforeRouteEnter:(next) => { // 只有教师用户可以加课
    if (sessionStorage.getItem("userRole") === "Student") {
      next('/main');
    }
  },
  components: {
    AddCourse,
    UpperBar
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