import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/components/home-page.vue";
import LoginPage from "@/components/login-page.vue";
import RegisterPage from "@/components/register-page.vue";

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage }
    ]
});

export default router // Export the router instance
