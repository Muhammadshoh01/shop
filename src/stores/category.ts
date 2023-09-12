import type { Category } from '@/models/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { url } from './vars'
import { ElMessage } from 'element-plus'

export const useCategoryStore = defineStore('category', () => {
	const categories = ref<Category[]>([])
	const slug = ref<string>('category')

	const add_category = async (payload: Category): Promise<void> => {
		let res = await axios.post(`${url}/${slug.value}`, payload)
		if (res.status == 201) {
			categories.value = [payload, ...categories.value]
			ElMessage({
				type: 'success',
				message: "Yangi turkum qo'shildi",
			})
		}
	}

	const get_category = async (): Promise<void> => {
		let res = await axios.get(`${url}/${slug.value}?_sort=id&_order=desc`)
		if (res.status == 200) {
			categories.value = [...res.data]
		}
	}

	const remove_category = async (id: number): Promise<void> => {
		let res = await axios.delete(`${url}/${slug.value}/${id}`)
		if (res.status == 200) {
			categories.value = categories.value.filter((category) => {
				return category.id !== id
			})
		}
		ElMessage({
			type: 'warning',
			message: "Turkum holati o'chirildi",
		})
	}

	const edit_status_category = async (category: Category): Promise<void> => {
		category.status = !category.status
		categories.value = categories.value.map((cat) => {
			if (cat.id == category.id) return category

			return cat
		})
		ElMessage({
			type: 'success',
			message: "Turkum holati o'zgartirildi",
		})
	}

	return {
		categories,

		add_category,
		get_category,
		remove_category,
		edit_status_category,
	}
})
