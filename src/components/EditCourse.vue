<template>
    <div id="create-page">
      <h1>Create Course Event</h1>
  
      <!-- 选择类型的按钮 -->
      <div class="button-group">
        <button @click="selectedType = 'announcement'" :class="{ active: selectedType === 'announcement' }">Announcement</button>
        <button @click="selectedType = 'schedule'" :class="{ active: selectedType === 'schedule' }">Schedule</button>
        <button @click="selectedType = 'assignment'" :class="{ active: selectedType === 'assignment' }">Assignment</button>
      </div>
  
      <!-- 根据选择的类型显示相应的表单 -->
      <form @submit.prevent="createContent">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="content.title" required>
  
        <label for="content">Content:</label>
        <textarea id="content" v-model="content.eventResources" required></textarea>
  
        <div v-if="selectedType === 'announcement'" class="announcement-form">
        </div>
  
        <div v-if="selectedType === 'schedule'" class="schedule-form">
          <label for="startTime">Start Time:</label>
          <input type="datetime-local" id="startTime" v-model="content.startTime" required>
  
          <label for="endTime">End Time:</label>
          <input type="datetime-local" id="endTime" v-model="content.endTime" required>

          <label for="eventType">Event Type:</label>
          <select id="eventType" v-model="content.eventType" required>
            <option value="Lecture">Lecture</option>
            <option value="Lab">Lab</option>
            <option value="Project">Project</option>
            <option value="Exam">Exam</option>
          </select>

          <label for="eventInstructor">Instructor:</label>
          <input type="text" id="eventInstructor" v-model="content.eventInstructor" required>

        </div>
  
        <div v-if="selectedType === 'assignment'" class="assignment-form">
          <label for="startTime">Start Time:</label>
          <input type="datetime-local" id="startTime" v-model="content.startTime" required>
  
          <label for="endTime">End Time:</label>
          <input type="datetime-local" id="endTime" v-model="content.endTime" required>

          <label for="eventType">Event Type:</label>
          <select id="eventType" v-model="content.eventType" required>
            <option value="Assignment">Assignment</option>
          </select>
        </div>
  
        <button type="submit" class="edit-button">Create</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import { IP_ADDRESS } from '@/main';
  export default {
    data() {
        return {
            content: {
                title: '',
                eventInstructor: '', // New property
                startTime: '',
                endTime: '',
                eventResources: '',
                eventType: '' // New property
            },
            createdContents: [],
            selectedType: 'announcement'
        };
    },
    methods: {
      async createContent() {
        try {
          if (this.selectedType === 'announcement') {
            // Only send title and eventResources for announcement
            const { title, eventResources } = this.content;
            const response = await axios.post(`http://${IP_ADDRESS}:8181/courseAnnouncement/addCourseAnnouncement/1?content=${eventResources}&subject=${title}`);
            console.log(response.data);
          } else {
            const response = await axios.post(`http://${IP_ADDRESS}:8181/courseEvent/addCourseEvent/1`, {
                endTime: this.content.endTime,
                eventInstructor: this.content.eventInstructor,
                eventName: this.content.title,
                eventResources: this.content.eventResources,
                eventType: this.content.eventType,
                startTime: this.content.startTime
            });
            console.log(response.data);
          }
          
        } catch (error) {
            console.log(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  #create-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 2rem;
    background-color: #ecf0f1;
  }
  
  h1 {
    margin-bottom: 2rem;
    color: #2980b9;
    font-size: 2rem;
  }
  
  .button-group {
    margin-bottom: 1.5rem;
  }
  
  .button-group button {
    font-size: 1rem;
    text-decoration: none;
    color: #2980b9;
    border: 1px solid #2980b9;
    border-radius: 5px;
    padding: 8px 12px;
    transition: background-color 0.3s;
    margin-right: 0.5rem;
  }
  
  .button-group button.active {
    background-color: #2980b9;
    color: white;
  }
  
  form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    margin-bottom: 2rem;
  }
  
  label {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #2980b9;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 8px 12px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #2980b9;
    margin-bottom: 1rem;
  }
  
  .edit-button {
    font-size: 1rem;
    text-decoration: none;
    color: #2980b9;
    border: 1px solid #2980b9;
    border-radius: 5px;
    padding: 8px 12px;
    transition: background-color 0.3s;
    align-self: flex-start;
  }
  
  .edit-button:hover {
    background-color: #2980b9;
    color: white;
  }
  
  .created-contents {
    max-width: 600px;
    width: 100%;
  }
  
  .content-list {
    list-style: none;
    padding: 0;
  }
  
  .content-item {
    margin-bottom: 1rem;
  }
  
  .content-title {
    font-size: 1.25rem;
    color: #2980b9;
  }
  
  .content-body {
    margin-top: 0.5rem;
  }
  
  .top-bar {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  
  .back-button {
    font-size: 1rem;
    text-decoration: none;
    color: #2980b9;
    border: 1px solid #2980b9;
    border-radius: 5px;
    padding: 8px 12px;
    transition: background-color 0.3s;
    margin-right: 1rem; /* Added margin to create space between button and page title */
  }
  
  .back-button:hover {
    background-color: #2980b9;
    color: white;
  }
  
  </style>
  