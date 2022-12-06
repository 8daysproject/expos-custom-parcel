import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.min.css";
import "animate.css";
import "./index.css";

createApp(App).use(store).use(router).mount("#app");
