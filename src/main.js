import { createApp } from 'vue'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
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

const VueTelInputOptions = {
    mode: "international",
    defaultCountry: 'UA',
    dropdownOptions: {showDialCodeInSelection: 'true'},
    inputOptions: {placeholder: 'Телефон'}
}
app.use(router);
app.use(VueTelInput, VueTelInputOptions);
app.component('Select2', Select2)
app.mount('#app')
