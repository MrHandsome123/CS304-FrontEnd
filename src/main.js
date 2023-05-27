import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router";

const IP_ADDRESS='10.21.130.198'
const app = createApp(App);
app.use(router);
app.mount("#app");

export { IP_ADDRESS };
