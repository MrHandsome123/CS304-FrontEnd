import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/MainPage.vue";
import UserLogin from "../components/UserLogin.vue";
import Course from "../components/CoursePage.vue";
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
    path: "/course",
    name: "course",
    component: Course,
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
