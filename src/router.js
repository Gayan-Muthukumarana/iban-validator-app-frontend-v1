import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/components/home-page.vue";
import LoginPage from "@/components/login-page.vue";
import RegisterPage from "@/components/register-page.vue";
import AdminLoginPage from "@/components/admin/admin-login-page.vue";
import AdminDashboardPage from "@/components/admin/admin-dashboard.vue";

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/admin-login', component: AdminLoginPage },
        { path: '/admin-dashboard', component: AdminDashboardPage }
    ]
});

export default router // Export the router instance
