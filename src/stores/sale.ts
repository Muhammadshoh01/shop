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
	const totalCount = ref<number>(0)

	const add_to_cart = (payload: Sale) => {
		const index = cart.value.findIndex(
			(item) => item.product == payload.product
		)
		if (index !== -1) {
			cart.value[index].quantity += payload.quantity
		} else {
			cart.value = [payload, ...cart.value]
		}

		ElMessage({
			type: 'success',
			message: "Korzinkaga mahsulot qo'shildi",
		})
		cookies.set('shop-items', cart.value)
		// cart.value = []
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
				console.log(item)
				await axios
					.put(`${url}/product/${item.info.id}`, {
						...item.info,
						quantity: item.info.quantity - item.quantity,
					})
					.then((r) => {
						console.log(r)
					})
			})
		)
		clear_cart()
	}

	const get_sale = async (page: number) => {
		await axios.get(`${url}/${slug.value}?_page=${page}`).then(async (res) => {
			totalCount.value = +res.headers['x-total-count']
			sales.value = await Promise.all([
				...res.data.map(async (sale: Sale) => {
					await axios.get(`${url}/product/${sale.product}`).then((prod) => {
						sale.info = prod.data
					})
					return sale
				}),
			])
		})
		console.log(sales.value)
	}

	const clear_cart = () => {
		cookies.remove('shop-items')
		cart.value = []
	}
	return {
		cart,
		sales,
		totalCount,
		add_to_cart,
		save_sale,
		get_sale,
		clear_cart,
	}
})
