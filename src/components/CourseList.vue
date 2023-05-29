<template>
  <div>
    <h1>My Courses</h1>
    <div class="box">
      <dl v-for="(item, index) in List" :key="index">
        <dt><a href="javascript:void(0)" @click.prevent="RouteToCourse(item.id, item.name)"> {{item.name}} </a></dt>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  props:["List"],
  methods:{
    RouteToCourse(courseId, courseName) {
      this.$router.push({name: 'course', params: {courseId, courseName}});
      //console.log(course)
    }
  }
}
</script>

<style scoped>

</style>
