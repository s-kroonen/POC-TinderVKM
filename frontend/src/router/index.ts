import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import LoginRegister from "@/views/LoginRegister.vue";
import ClassDetailView from "@/views/ClassDetailView.vue";
import ClassEditView from "@/views/ClassEditView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home

    },
    {path: "/auth", name: "Auth", component: LoginRegister},
    {path: "/classes/:id", name: "class-detail", component: ClassDetailView, props: true},
    {path: "/classes/:id/edit", name: "class-edit", component: ClassEditView, props: true},
    {path: "/classes/create", name: "class-create", component: ClassEditView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
