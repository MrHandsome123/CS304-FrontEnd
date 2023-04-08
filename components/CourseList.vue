<template>
  <h1>My Courses</h1>
  <div class="box">
    <dl v-for="(item, index) in List" :key="index">
      <dt><a href="#"> {{item.name}} </a></dt>
    </dl>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  props:["List"],
}
</script>

<style scoped>

</style>