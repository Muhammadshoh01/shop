import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/category',
			name: 'category',
			component: () => import('../views/categoryView.vue'),
		},
		{
			path: '/param',
			name: 'param',
			component: () => import('../views/paramView.vue'),
		},
		{
			path: '/product',
			name: 'product',
			component: () => import('../views/productView.vue'),
		},
		{
			path: '/sale',
			name: 'sale',
			component: () => import('../views/saleView.vue'),
		},
	],
})

export default router
