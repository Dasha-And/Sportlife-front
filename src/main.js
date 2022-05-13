import { createApp } from 'vue'
import "normalize.css"
import App from './App.vue'
import router from './router'
import Select2 from 'vue3-select2-component';


const app = createApp(App,{
    data: () => ({
        user: {},
    }),
    beforeMount() {
        let deleteTokenDate = Date.parse(localStorage.getItem('authTokenDate'));
        deleteTokenDate.setHours(deleteTokenDate.getHours + 24);
        if (deleteTokenDate <= new Date()) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenDate");
        }
    }
})
app.use(router);
app.component('Select2', Select2)
app.mount('#app')
