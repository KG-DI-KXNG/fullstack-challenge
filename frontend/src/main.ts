import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import './assets/style.scss'
import * as bootstrap from 'bootstrap';
import $ from 'jQuery';

const app = createApp(App);
// app.use(bootstrap)
app.use(createPinia());
app.use(router);

app.mount("#app");
