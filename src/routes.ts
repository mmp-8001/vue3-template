import {createRouter, createWebHistory} from 'vue-router';
import Counter from "@r/Counter.vue";
import User from "@r/User.vue";
import Error404 from "@r/Error404.vue";

const routes = [
    {path: '/', component: Counter, name: 'home'},
    {path: '/user/:username', component: User, name: 'user'},
    {path: '/404', alias: '/:pathMatch(.*)*', name: 'error404', component: Error404},
];

export default createRouter({
    history: createWebHistory(),
    routes,

    // Scroll top after route changed
    scrollBehavior (to, from, savedPosition) {
        return { top: 0 };
    }
});