import { createRouter, createWebHistory } from 'vue-router'
import Contact from '/src/components/Contact.vue'
import Search from '/src/components/Search.vue';

const routes = [
    {
        path: '/',
        name: 'Search',
        component: Search,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router