<template>
  <div class="container">
    <AddCourse/>
  </div>
</template>

<script>
import AddCourse from "@/components/AddCourse";

export default {
  name: "AddCoursePage",
  components: {
    AddCourse
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