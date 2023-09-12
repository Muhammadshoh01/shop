import type { Param } from '@/models/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { url } from './vars'
import { ElMessage } from 'element-plus'

export const useParamStore = defineStore('param', () => {
	const params = ref<Param[]>([])
	const slug = ref<string>('param')

	const add_param = async (payload: Param): Promise<void> => {
		let res = await axios.post(`${url}/${slug.value}`, payload)
		if (res.status == 201) {
			params.value = [payload, ...params.value]
			ElMessage({
				type: 'success',
				message: "Yangi xarakteristika qo'shildi",
			})
		}
	}

	const update_param = async (payload: Param) => {
		await axios.put(`${url}/${slug.value}/${payload.id}`, payload).then(() => {
			params.value = params.value.map((param) => {
				if (param.id == payload.id) return payload
				return param
			})
		})
		ElMessage({
			type: 'success',
			message: 'Xarakteristika yangilandi',
		})
	}

	const get_param = async (): Promise<void> => {
		let res = await axios.get(`${url}/${slug.value}?_sort=id&_order=desc`)
		if (res.status == 200) {
			params.value = [...res.data]
		}
	}

	const remove_param = async (id: number): Promise<void> => {
		let res = await axios.delete(`${url}/${slug.value}/${id}`)
		if (res.status == 200) {
			params.value = params.value.filter((param) => {
				return param.id !== id
			})
		}
		ElMessage({
			type: 'warning',
			message: "Turkum xarakteristikasi o'chirildi",
		})
	}

	const edit_status_param = async (param: Param): Promise<void> => {
		param.status = !param.status
		params.value = params.value.map((cat) => {
			if (cat.id == param.id) return param

			return cat
		})
		ElMessage({
			type: 'success',
			message: "Turkum xarakteristikasi o'zgartirildi",
		})
	}

	const get_one_param = async (id: number) => {
		return await axios.get(`${url}/${slug.value}/${id}`)
	}

	const get_params_by_category = async (id: number | null) => {
		return axios.get(`${url}/${slug.value}?category=${id}`)
	}

	return {
		params,

		add_param,
		get_param,
		update_param,
		get_one_param,
		remove_param,
		edit_status_param,
		get_params_by_category,
	}
})
