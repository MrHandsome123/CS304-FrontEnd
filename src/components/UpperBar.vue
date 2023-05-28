<template>
  <div>
    <header class="top-bar">
      <span><img class="Logo" alt="Canvas logo" src="../assets/logo.png"></span>
      <nav>
        <ul>
          <li><a href="javascript:void(0)" @click.prevent="RouteToMainPage()">Main</a></li>
          <li><a v-if="isTeacher()" href="javascript:void(0)" @click.prevent="RouteToAddCoursePage()">Add Course</a></li>
          <li><a v-if="isTeacher()" href="javascript:void(0)" @click.prevent="RouteToDeleteCoursePage()">Delete Course</a></li>
          <li><a v-if="isTeacher()" href="javascript:void(0)" @click.prevent="RouteToMainPage()">Update Events</a></li>
          <li><a v-if="!isLogin()" href="javascript:void(0)" @click.prevent="RouteToLoginPage()">Log in</a></li>
          <li><a v-if="isLogin()" href="javascript:void(0)" @click.prevent="RouteToLoginPage()">Log out</a></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>

export default {
  name: "UpperBar",
  methods: {
    RouteToMainPage() {
      this.$router.push('/main')
    },
    RouteToLoginPage() {

      this.$router.push('/')
    },
    RouteToAddCoursePage() {
      this.$router.push('/addcourse')
    },
    RouteToDeleteCoursePage() {
      this.$router.push('/deletecourse')
    },
    isLogin() {
      if (sessionStorage.getItem("userName") /*&& sessionStorage.getItem("userToken")*/) {
        this.$store.commit("userStatus", sessionStorage.getItem("userName"));
      }else {
        this.$store.commit("userStatus", null);
      }
      return this.$store.getters.isLogin;
    },
    isTeacher() {
      return sessionStorage.getItem("userRole") === "Teacher";
    }
  }
}
</script>

<style scoped>
.Logo {
  width: 100%;
}
.top-bar {
  background-color: #333;
  color: #fff;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 999;
  margin: 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  margin-right: 0;
  padding: 0;
}

li {
  display: inline-block;
  margin-right: 15px;
}

a {
  color: #fff;
  text-decoration: none;
}
</style>