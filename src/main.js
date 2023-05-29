import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router";
import store from "./store/store";

const IP_ADDRESS='10.12.66.26'
const app = createApp(App);
app.use(router);
app.use(store)
app.mount("#app");

export { IP_ADDRESS };
