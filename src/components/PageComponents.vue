<template>
  <div id="page-component">
    <header>
      <nav class="navigation">
        
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i> Go Back
        </button>
        <button class="edit-button" @click="editCourse">
          <i class="fas fa-edit"></i> Edit Course
        </button>
        <h1 class="course-name">{{ "Software Engineer" }}</h1>
        <a href="/forum" class="forum-link">Discussion Forum</a>
      </nav>
    </header>
    <div class="announcement">
      <h2>Course Announcements</h2>
      <ul>
        <li v-for="announcement in announcements" :key="announcement.id" class="announcement-item">
          <div class="announcement-content">
            <strong>{{ announcement.subject }}</strong><br>
            {{ announcement.content }}
          </div>
          <span class="announcement-date">{{ formatDate(announcement.createdAt) }}</span>
        </li>
      </ul>
    </div>
    <h2>Course Schedule</h2>
    <table>
      <thead>
        <tr>
          <!-- <th>Week</th> -->
          <th>Date</th>
          <th>Topic</th>
          <th>Instructor</th>
          <th>Course Material</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.eventId">
          <!-- <td>Week {{ event.week }}</td> -->
          <td>{{ formatDate(event.startTime) }}<br>{{ formatTimeRange(event.startTime, event.endTime) }}</td>
          <td>{{ event.eventName }}</td>
          <td>{{ event.instructor }}</td>
          <td v-html="formatCourseMaterial(event.courseMaterial)"></td>
        </tr>
      </tbody>
    </table>
    <h2>Course Homework</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Topic</th>
          <th>Homework Material</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(homework, index) in homeworkExamples" :key="index">
          <td>{{ formatDate(homework.startTime) }} - {{ formatDate(homework.endTime) }}</td>
          <td>{{ homework.eventName }}</td>
          <td v-html="formatHomeworkMaterial(homework.eventResources)"></td>
          <!-- <td>{{ homework.eventResources }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { IP_ADDRESS } from '@/main';

export default {
  data() {
    return {
      events: [],
      announcements: [],
      homeworkExamples: [],
    };
  },


  created() {
    this.fetchEvents();
    this.fetchAnnouncements();
    this.fetchHomeworkExamples();
  },
  methods: {
    goBack() {
      // Implement your logic for going back
    },

    editCourse() {
      this.$router.push('/editCourse');
    },

    async fetchEvents() {
      try {
        console.log(this.$route.params.courseId);

        // Replace with your API endpoint
        const response = await axios.get("http://"+IP_ADDRESS+":8181/courseEvent/listCourseEvent/1");
        // const response = null;
        const data = response.data;
        this.events = data.map((event, index) => {
          return {
            week: index + 1,
            eventId: event.eventId,
            startTime: event.startTime,
            endTime: event.endTime,
            eventName: event.eventName,
            instructor: event.eventInstructor,
            courseMaterial: event.eventResources,
          };
        });
        // console.log(this.events)

        // Update courseName based on the first event in the array
        if (this.events.length > 0) {
          this.courseName = this.events[0].eventName;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async fetchAnnouncements() {
      try {
        // Replace with your API endpoint
        const response = await axios.get("http://"+IP_ADDRESS+":8181/courseAnnouncement/listCourseAnnouncement/1");
        // const response = null;
        this.announcements = response.data.map(announcement => {
          return {
            id: announcement.announcementId,
            subject: announcement.subject,
            content: announcement.content,
            createdAt: announcement.createdAt,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchHomeworkExamples() {
      try {
        const response = await axios.get("http://"+IP_ADDRESS+":8181/courseEvent/listCourseEvent/1/Assignment");
        // const response = null;
        this.homeworkExamples = response.data.map((homework) => {
          return {
            eventId: homework.eventId,
            startTime: homework.startTime,
            endTime: homework.endTime,
            eventName: homework.eventName,
            eventResources: homework.eventResources,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },

    formatTimeRange(startTimeString, endTimeString) {
      const startTime = new Date(startTimeString);
      const endTime = new Date(endTimeString);
      return `${startTime.getHours()}:${String(startTime.getMinutes()).padStart(2, "0")} - ${endTime.getHours()}:${String(endTime.getMinutes()).padStart(2, "0")}`;
    },
    formatCourseMaterial(courseMaterial) {
      const materials = courseMaterial.split(";");
      return materials.map(material => `<a href="${material}">${material}</a>`).join("<br>");
    },
    formatHomeworkMaterial(homeworkMaterial) {
      const materials = homeworkMaterial.split(";");
      return materials.map(material => `<a href="${material}">${material}</a>`).join("<br>");
    },
  },
};
</script>

<style scoped>
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
  /* width: 50%; */
}

/* new */
.edit-button {
  font-size: 1.25rem;
  text-decoration: none;
  color: #2980b9;
  border: 1px solid #2980b9;
  border-radius: 5px;
  padding: 8px 12px;
  transition: background-color 0.3s;
  margin-right: 1rem;
}

.edit-button:hover {
  background-color: #2980b9;
  color: white;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1rem;
  background-color: #ecf0f1; /* 设置导航栏的背景色 */
}

.back-button {
  font-size: 1.25rem;
  text-decoration: none;
  color: #2980b9;
  border: 1px solid #2980b9;
  border-radius: 5px;
  padding: 8px 12px;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.3s;
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

.back-button:hover,
.forum-link:hover {
  color: #2c3e50;
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

.announcement-item {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-bottom: 1rem;
}

.announcement-date {
  display: block;
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.5rem;
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
  white-space: pre-wrap;
}

th {
  background-color: #3498db;
  color: white;
}

tr:nth-child(even) {
  background-color: #f8f8f8;
}
</style>
