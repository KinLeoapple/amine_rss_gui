import {createApp} from 'vue'
import App from './App.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

const app = createApp(App)
app.use(PerfectScrollbar, {
    watchOptions: true,
    options: {
        suppressScrollX: true
    }
})
app.mount('#app')
