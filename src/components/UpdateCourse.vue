<template>
  <div class="container">
    <div class="left"><AddCourse></AddCourse></div>
    <div class="right"><DeleteCourse></DeleteCourse></div>
  </div>
</template>

<script>
import AddCourse from "@/components/AddCourse";
import DeleteCourse from "@/components/DeleteCourse";
export default {
  name: "UpdateCourse",
  components: {DeleteCourse, AddCourse}
}
</script>

<style scoped>
.container {
  display: flex;
}

.left {
  flex: 1; /* 左侧元素占据剩余空间 */
  background-color: #f1f1f1;
}

.right {
  flex: 1; /* 右侧元素占据剩余空间 */
  background-color: #e1e1e1;
}
</style>