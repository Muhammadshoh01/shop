<template>
	<el-form
		ref="ruleFormRef"
		:model="categoryForm"
		label-position="top"
		:rules="rules"
	>
		<h3>Yangi turkum</h3>
		<el-form-item prop="title" label="Turkum nomi">
			<el-input v-model="categoryForm.title" />
		</el-form-item>
		<el-form-item label="Holati">
			<el-switch
				v-model="categoryForm.status"
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
import { ref } from 'vue'
import type { Category } from '@/models/types'
import type { FormInstance, FormRules } from 'element-plus'

import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
const { add_category } = categoryStore

const ruleFormRef = ref<FormInstance>()

const categoryForm = ref<Category>({
	title: '',
	status: false,
})

const rules = ref<FormRules<typeof categoryForm>>({
	title: [
		{ message: 'Turkum nomini kiriting', trigger: 'blur', required: true },
	],
})

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			add_category(categoryForm.value)
			categoryForm.value = {
				title: '',
				status: false,
			}
		} else {
			console.log('error submit!', fields)
		}
	})
}
</script>

<style></style>
