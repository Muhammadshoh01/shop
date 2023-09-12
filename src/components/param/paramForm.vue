<template>
	<el-form
		ref="ruleFormRef"
		:model="paramForm"
		label-position="top"
		:rules="rules"
	>
		<h3>
			{{ toggle ? 'Xarakteristikani tahrirlash' : 'Yangi xarakteristika' }}
		</h3>
		<el-form-item prop="title" label="Xarakteristika nomi">
			<el-input v-model="paramForm.title" />
		</el-form-item>
		<el-form-item label="Xarakteristika turkumi">
			<el-select
				v-model="paramForm.category"
				placeholder="Ro'yxatdan tanlang"
				clearable
				filterable
			>
				<el-option
					v-for="item in categoryList"
					:key="item.id"
					:label="item.title"
					:value="item.id"
				/>
			</el-select>
		</el-form-item>
		<el-form-item label="Holati">
			<el-switch
				v-model="paramForm.status"
				size="large"
				active-text="Faol"
				inactive-text="Nofaol"
			/>
		</el-form-item>
		<el-button type="primary" @click="submitForm(ruleFormRef)">
			Saqlash
		</el-button>
	</el-form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { Param, Category } from '@/models/types'
import type { FormInstance, FormRules } from 'element-plus'

import { useParamStore } from '@/stores/param'
import { useCategoryStore } from '@/stores/category'

const props = defineProps(['id'])
const emit = defineEmits(['edit'])

const paramStore = useParamStore()
const { add_param, get_one_param, update_param } = paramStore

const categoryStore = useCategoryStore()
const { get_category } = categoryStore
const { categories } = storeToRefs(categoryStore)

const categoryList = computed(() => {
	return categories.value.filter((cat: Category) => cat.status == true)
})

const ruleFormRef = ref<FormInstance>()
const toggle = ref<boolean>(false)

const paramForm = ref<Param>({
	title: '',
	category: '',
	status: false,
})

const rules = ref<FormRules<typeof paramForm>>({
	title: [
		{ message: 'Turkum nomini kiriting', trigger: 'blur', required: true },
	],
})

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			if (toggle.value) {
				update_param(paramForm.value)
				emit('edit', 0)
			} else {
				add_param(paramForm.value)
			}
			paramForm.value = {
				title: '',
				status: false,
				category: '',
			}
			toggle.value = false
		} else {
			console.log('error submit!', fields)
		}
	})
}

onMounted(() => {
	get_category()
})

watch(
	() => props.id,
	async (val) => {
		if (val == 0) return
		let res = await get_one_param(val)
		if (res.status == 200) {
			paramForm.value = { ...res.data }
			toggle.value = true
			console.log(res.data)
		}
	}
)
</script>

<style></style>
