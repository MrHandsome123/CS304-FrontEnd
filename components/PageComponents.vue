<template>
  <div id="page-component">
    <table>
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Course ID</th>
          <th>Semester</th>
          <th>Instructor</th>
          <th>Event Name</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.eventId">
          <td>{{ event.eventId }}</td>
          <td>{{ event.courseId }}</td>
          <td>{{ event.semester }}</td>
          <td>{{ event.instructor }}</td>
          <td>{{ event.eventName }}</td>
          <td>{{ event.startTime }}</td>
          <td>{{ event.endTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      const response = await fetch("http://10.27.119.221:8181/courseEvent/listCourseEvent/{course_id}?courseID=1");
      const data = await response.json();
      this.events = data;
    },
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
