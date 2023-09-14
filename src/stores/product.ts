import type { Product, Sale } from '@/models/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { url } from './vars'
import { ElMessage } from 'element-plus'

export const useProductStore = defineStore('product', () => {
	const products = ref<Product[]>([])
	const productLabels = ref<string[]>([])
	const productCount = ref<number[]>([])
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

	const get_product_all = async (): Promise<void> => {
		let res = await axios.get(`${url}/${slug.value}`)
		if (res.status == 200) {
			productLabels.value = res.data.map((product: Product) => product.title)
			productCount.value = await Promise.all(
				res.data.map(async (prod: Product) => {
					let count = 0
					let result = await axios.get(`${url}/sale?product=${prod.id}`)
					if (result.status == 200) {
						result.data.forEach((el: Sale) => {
							count += el.quantity
						})
					}
					return count
				})
			)
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
		productLabels,
		productCount,

		add_product,
		get_product,
		get_product_all,
		update_product,
		get_one_product,
		remove_product,
		edit_status_product,
	}
})
