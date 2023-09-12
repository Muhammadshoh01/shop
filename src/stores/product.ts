import type { Product } from '@/models/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { url } from './vars'
import { ElMessage } from 'element-plus'

export const useProductStore = defineStore('product', () => {
	const products = ref<Product[]>([])
	const slug = ref<string>('product')

	const add_product = async (payload: Product): Promise<void> => {
		let res = await axios.post(`${url}/${slug.value}`, payload)
		if (res.status == 201) {
			products.value = [payload, ...products.value]
			ElMessage({
				type: 'success',
				message: "Yangi mahsulot qo'shildi",
			})
		}
	}

	const update_product = async (payload: Product) => {
		console.log(payload)
		await axios.put(`${url}/${slug.value}/${payload.id}`, payload).then(() => {
			products.value = products.value.map((product) => {
				if (product.id == payload.id) return payload
				return product
			})
			console.log(products.value)
		})
		ElMessage({
			type: 'success',
			message: 'Mahsulot yangilandi',
		})
	}

	const edit_status_product = async (product: Product): Promise<void> => {
		product.status = !product.status
		products.value = products.value.map((cat) => {
			if (cat.id == product.id) return product

			return cat
		})
		ElMessage({
			type: 'success',
			message: "Turkum xarakteristikasi o'zgartirildi",
		})
	}

	const get_product = async (): Promise<void> => {
		let res = await axios.get(
			`${url}/${slug.value}?_sort=id&_order=desc_limit=10`
		)
		if (res.status == 200) {
			products.value = [...res.data]
		}
	}

	const remove_product = async (id: number): Promise<void> => {
		let res = await axios.delete(`${url}/${slug.value}/${id}`)
		if (res.status == 200) {
			products.value = products.value.filter((product) => {
				return product.id !== id
			})
		}
		ElMessage({
			type: 'warning',
			message: "Mahsulot o'chirildi",
		})
	}

	const get_one_product = async (id: number) => {
		return await axios.get(`${url}/${slug.value}/${id}`)
	}

	return {
		products,

		add_product,
		get_product,
		update_product,
		get_one_product,
		remove_product,
		edit_status_product,
	}
})
