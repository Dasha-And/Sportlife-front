import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/components/Home'
import Registration from "@/components/Registration";
import Authorization from "@/components/Authorization";

export default createRouter ({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/registration',
            component: Registration
        },
        {
            path: '/authorization',
            component: Authorization
        }
    ]
})