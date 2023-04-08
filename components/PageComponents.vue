<template>
  <div id="page-component">
    <header>
      <h1 class="course-name">{{ courseName }}</h1>
      <a href="/forum" class="forum-link">Discussion Forum</a>
    </header>
    <div class="announcement">
      <h2>Course Announcements</h2>
      <ul>
        <li v-for="(announcement, index) in announcements" :key="index">{{ announcement }}</li>
      </ul>
    </div>
    <h2>Course Schedule</h2>
    <table>
      <thead>
        <tr>
          <th>Week</th>
          <th>Date</th>
          <th>Topic</th>
          <th>Instructor</th>
          <th>Course Material</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.eventId">
          <td>Week {{ event.week }}</td>
          <td>{{ formatDate(event.startTime) }}<br>{{ formatTimeRange(event.startTime, event.endTime) }}</td>
          <td>{{ event.eventName }}</td>
          <td>{{ event.instructor }}</td>
          <td>{{ event.courseMaterial }}</td>
        </tr>
      </tbody>
    </table>
    <h2>Course Homework</h2>
    <table>
      <thead>
        <tr>
          <th>Week</th>
          <th>Topic</th>
          <th>Homework Material</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(homework, index) in homeworkExamples" :key="index">
          <td>Week {{ homework.week }}</td>
          <td>{{ homework.topic }}</td>
          <td>{{ homework.homeworkMaterial }}</td>
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
      announcements: [
        'Announcement 1',
        'Announcement 2',
        'Announcement 3',
      ],
      courseName: 'Course Name',
      homeworkExamples: [
        {
          week: 1,
          topic: 'Introduction',
          homeworkMaterial: 'Assignment 1',
        },
        {
          week: 2,
          topic: 'Basic Concepts',
          homeworkMaterial: 'Assignment 2',
        },
        {
          week: 3,
          topic: 'Advanced Techniques',
          homeworkMaterial: 'Assignment 3',
        },
        {
          week: 4,
          topic: 'Final Project',
          homeworkMaterial: 'Assignment 4',
        },
      ],
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      // Replace with your API endpoint
      const response = await fetch("https://api.example.com/events");
      const data = await response.json();
      this.events = data.map((event, index) => {
        event.week = index + 1;
        return event;
      });

      // Update courseName based on the first event in the array
      if (this.events.length > 0) {
        this.courseName = this.events[0].courseName;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    formatTimeRange(startTimeString, endTimeString) {
      const startTime = new Date(startTimeString);
      const endTime = new Date(endTimeString);
      return `${startTime.getHours()}:${String(startTime.getMinutes()).padStart(2, "0")} - ${endTime.getHours()}:${String(endTime.getMinutes()).padStart(2, "0")}`;
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

#page-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1rem;
}

.course-name {
  font-size: 2.5rem;
  color: #2c3e50;
}

.forum-link {
  font-size: 1.25rem;
  text-decoration: none;
  color: #2980b9;
  border: 1px solid #2980b9;
  border-radius: 5px;
  padding: 8px 12px;
  transition: background-color 0.3s;
}

.forum-link:hover {
  background-color: #2980b9;
  color: white;
}

.announcement {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
}

.announcement h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #34495e;
}

.announcement ul {
  padding-left: 1.5rem;
}

h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #2c3e50;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #3498db;
  color: white;
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}
</style>
