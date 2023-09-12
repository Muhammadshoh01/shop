<template>
	<div>
		<div class="d-flex align-items-center justify-content-between">
			<h1>Mahsulotlar</h1>
			<div class="d-flex align-items-center gap-10">
				<el-button type="primary" @click="showToggle = true"
					>Qo'shish</el-button
				>
				<download-excel :data="products" :fields="json_fields">
					<el-button type="success"> Excel </el-button>
				</download-excel>
			</div>
		</div>
		<product-statistics :params="{ summa }" />
		<br />
		<br />
		<el-row :gutter="30">
			<!-- <el-col :span="8">
			</el-col> -->
			<el-col>
				<product-table @edit="handleEdit" />
			</el-col>
			<product-form
				:id="editId"
				@edit="handleEdit"
				:showToggle="showToggle"
				@close="closeDrawer"
			/>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Category, type ProductParam } from '@/models/types'
import productForm from '@/components/product/productForm.vue'
import productTable from '@/components/product/productTable.vue'
import productStatistics from '@/components/product/productStatistics.vue'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const catStore = useCategoryStore()
const { categories } = storeToRefs(catStore)

const getCategory = (id: number): string => {
	let res = categories.value.find((category: Category) => category.id === id)
	return res?.title || 'topilmadi'
}

const editId = ref<number>(0)
const showToggle = ref<boolean>(false)
const summa = computed((): number => {
	let s = 0
	products.value.forEach((product) => {
		s += product.quantity * product.price
	})
	return s
})

const json_fields = ref({
	'Mahsulot nomi': 'title',
	Turkumi: {
		field: 'category',
		callback: (val: number) => {
			return getCategory(val)
		},
	},
	Narxi: {
		field: 'price',
		callback: (val: number) => {
			return `${val} so'm`
		},
	},
	Miqdori: {
		field: 'quantity',
		callback: (val: number) => {
			return `${val} ta`
		},
	},
	Xarakteristika: {
		field: 'params',
		callback: (val: []) => {
			let str = ''
			val.forEach((param: ProductParam) => {
				str += `${param.title} - ${param.value}\n`
			})
			return str
		},
	},
	Holati: {
		field: 'status',
		callback: (val: boolean) => {
			return val ? 'Faol' : 'Nofaol'
		},
	},
})

const handleEdit = (id: number) => {
	editId.value = id
	showToggle.value = true
	console.log('edit', editId)
}

const closeDrawer = () => {
	showToggle.value = false
}
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>
