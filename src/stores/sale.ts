import type { Product } from '@/models/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { url } from './vars'
import cookies from 'vue-cookies'
import { ElMessage } from 'element-plus'
import { type Sale } from '@/models/types'

export const useSaleStore = defineStore('sale', () => {
	const cart = ref<Sale[]>([])
	const sales = ref<Sale[]>([])

	const add_to_cart = (payload: Sale) => {
		cart.value = [payload, ...cart.value]
		ElMessage({
			type: 'success',
			message: "Korzinkaga mahsulot qo'shildi",
		})
		cookies.set('shop-items', cart.value)
		console.log(cart.value)
	}

	return {
		cart,
		sales,
		add_to_cart,
	}
})
