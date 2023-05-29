import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/MainPage.vue";
import UserLogin from "../components/UserLogin.vue";
import Course from "../components/CoursePage.vue";
import UserRegister from "../components/UserRegister.vue";
import EditCourse from "../components/EditCourse.vue"
import AddCoursePage from "@/components/AddCoursePage";
import DeleteCoursePage from "../components/DeleteCoursePage.vue"

const routes = [
  {
    path: "/",
    name: "userlogin",
    component: UserLogin,
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/course/:courseId/:courseName",
    name: "course",
    component: Course,
  },
  {
    path: "/register",
    name: "register",
    component: UserRegister
  },
  {
    path: "/editCourse",
    name: "editCourse",
    component: EditCourse
  },
  {
    path: "/addcourse",
    name: "addcourse",
    component: AddCoursePage
  },
  {
    path: "/deletecourse",
    name: "deletecourse",
    component: DeleteCoursePage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
