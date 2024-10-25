import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import CompraLista from '../components/CompraLista.vue';
import CompraNueva from '../components/CompraNueva.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/compras',
        name: 'CompraLista',
        component: CompraLista,
    },
    {
        path: '/compraNueva',
        name: 'CompraNueva',
        component: CompraNueva,
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;