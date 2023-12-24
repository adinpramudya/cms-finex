/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Vuelidate from "@vuelidate/core";
// import "@vuelidate/core/dist/all.css";
// import VueEditor from "vue2-editor";
import CKEditor from "@ckeditor/ckeditor5-vue";
import VueCookie from "vue-cookie";
// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);
app.use(Toast);
// app.use(VueEditor);
app.use(Vuelidate);
// app.use(VueCookie);
app.use(CKEditor);
app.mount("#app");
