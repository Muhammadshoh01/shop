<template>
	<el-drawer
		:model-value="showDrawer"
		:before-close="closeDrawer"
		:title="toggle ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'"
	>
		<el-form
			ref="ruleFormRef"
			:model="productForm"
			label-position="top"
			:rules="rules"
		>
			<el-form-item prop="title" label="Mahsulot nomi">
				<el-input v-model="productForm.title" />
			</el-form-item>
			<el-form-item prop="category" label="Mahsulot turkumi">
				<el-select
					v-model="productForm.category"
					@change="getParams(productForm.category)"
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
			<el-form-item label="Narxi" prop="price">
				<el-input type="number" v-model="productForm.price">
					<template #append>so'm</template>
				</el-input>
			</el-form-item>
			<el-form-item label="Soni" prop="quantity">
				<el-input type="number" v-model="productForm.quantity" />
			</el-form-item>
			<el-form-item label="Rasmi url" prop="img">
				<el-input v-model="productForm.img" />
			</el-form-item>
			<div v-if="productForm.params">
				<h4>Mahsulot xarakteristikalari</h4>
				<el-form-item
					v-for="(param, index) of productForm.params"
					:key="index"
					:label="param.title"
				>
					<el-input v-model="param.value" />
				</el-form-item>
			</div>
			<el-form-item label="Holati">
				<el-switch
					v-model="productForm.status"
					size="large"
					active-text="Faol"
					inactive-text="Nofaol"
				/>
			</el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)">
				Saqlash
			</el-button>
		</el-form>
	</el-drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { Product, Category, Param } from '@/models/types'
import type { FormInstance, FormRules } from 'element-plus'

import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { useParamStore } from '@/stores/param'

const props = defineProps(['id', 'showToggle'])

const showDrawer = computed(() => props.showToggle)

const emit = defineEmits(['edit', 'close'])

const productStore = useProductStore()
const { add_product, get_one_product, update_product } = productStore

const categoryStore = useCategoryStore()
const { get_category } = categoryStore
const { categories } = storeToRefs(categoryStore)
const categoryList = computed(() => {
	return categories.value.filter((cat: Category) => cat.status == true)
})

const paramStore = useParamStore()
const { get_params_by_category } = paramStore

const ruleFormRef = ref<FormInstance>()
const toggle = ref<boolean>(false)

const productForm = ref<Product>({
	title: '',
	category: null,
	price: 0,
	status: false,
	quantity: 0,
	params: [],
	createdAt: new Date(),
	img: '',
})

const rules = ref<FormRules<typeof productForm>>({
	title: [
		{ message: 'Mahsulot nomini kiriting', trigger: 'blur', required: true },
	],
	category: [
		{ message: 'Turkum nomini tanlang', trigger: 'change', required: true },
	],
	price: [
		{ message: 'Mahsulot narxini kiriting', trigger: 'blur', required: true },
	],
	quantity: [
		{ message: 'Mahsulot sonini kiriting', trigger: 'change', required: true },
	],
	// img: [
	// 	{ message: 'Mahsulot rasmini kiriting', trigger: 'change', required: true },
	// ],
})

const closeDrawer = () => {
	emit('close')
}

const getParams = async (id: number | null) => {
	let result = await get_params_by_category(id)
	if (result.status === 200) {
		console.log(result.data)
		productForm.value.params = result.data.map((param: Param) => {
			return {
				title: param.title,
				id: param.id,
				value: '',
			}
		})
	}
}

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	// formEl.resetFields()
	await formEl.validate((valid, fields) => {
		if (valid) {
			if (toggle.value) {
				update_product(productForm.value)
				emit('edit', 0)
			} else {
				add_product(productForm.value)
			}
			toggle.value = false
			closeDrawer()
		} else {
			console.log('error submit!', fields)
		}
	})
	productForm.value = {
		title: '',
		status: false,
		category: 0,
		price: 0,
		quantity: 0,
		params: [],
		createdAt: new Date(),
		img: '',
	}
}

onMounted(() => {
	get_category()
})

watch(
	() => props.id,
	async (val) => {
		if (val == 0) return
		let res = await get_one_product(val)
		if (res.status == 200) {
			productForm.value = { ...res.data }
			toggle.value = true
			console.log(res.data)
		}
	}
)
</script>

<style></style>
