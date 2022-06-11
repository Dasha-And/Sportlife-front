import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/components/NonAuthorizedHomePage'
import Registration from "@/components/Registration";
import Authorization from "@/components/Authorization";
import Profile from "@/components/Profile";
import CreateEvent from "@/components/CreateEvent";
import AuthorizedHomePage from "@/components/AuthorizedHomePage";
import EventPage from "@/components/EventPage";
import EditProfile from "@/components/EditProfile";

export default createRouter ({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/registration', component: Registration},
        {path: '/authorization', component: Authorization},
        {path: '/profile/:id', component: Profile},
        {path: '/event/:id', component: EventPage},
        {path: '/create_event/:sport/:type/:activityType/:id', name: 'create_event', component: CreateEvent},
        {path: '/user', component: AuthorizedHomePage},
        {path: '/edit_profile/:id', component: EditProfile}
    ]
})