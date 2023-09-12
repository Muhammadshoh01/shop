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
	const slug = ref<string>('sale')

	const add_to_cart = (payload: Sale) => {
		cart.value = [payload, ...cart.value]
		ElMessage({
			type: 'success',
			message: "Korzinkaga mahsulot qo'shildi",
		})
		cookies.set('shop-items', cart.value)
		console.log(cart.value)
	}

	const save_sale = async (payload: Sale[]) => {
		// console.log(payload)
		await Promise.all(
			payload.map(async (item: Sale) => {
				await axios.post(`${url}/${slug.value}`, {
					product: item.product,
					date: item.date,
					quantity: item.quantity,
				})
				await axios.put(`${url}/product/${item.info.id}`, {
					...item.info,
					quantity: item.info.quantity - item.quantity,
				})
			})
		)
	}

	return {
		cart,
		sales,
		add_to_cart,
		save_sale,
	}
})
