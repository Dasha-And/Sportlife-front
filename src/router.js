import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/components/NonAuthorizedHomePage'
import Registration from "@/components/Registration";
import Authorization from "@/components/Authorization";
import Profile from "@/components/Profile";
import SingleEvent from "@/components/SingleEvent";
import CreateEvent from "@/components/CreateEvent";

export default createRouter ({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/registration', component: Registration},
        {path: '/authorization', component: Authorization},
        {path: '/profile', component: Profile},
        {path: '/event', component: SingleEvent},
        {path: '/create_event', component: CreateEvent}
    ]
})