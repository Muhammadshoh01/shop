<template>
	<div>
		<h1>Hisobot</h1>
	</div>
	<sale-chart :labels="productLabels" :data="productCount" />
	<br />
	<br />
	<sales-table :data="sales" />
	<el-pagination
		background
		:current-page="page"
		:page-size="10"
		layout=" prev, pager, next"
		:total="totalCount"
		@current-change="handleCurrentChange"
	/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSaleStore } from '@/stores/sale'
import { useProductStore } from '@/stores/product'

import salesTable from '@/components/sales/salesTable.vue'
import saleChart from '@/components/sales/saleChart.vue'

const saleStore = useSaleStore()
const { totalCount, sales } = storeToRefs(saleStore)
const { get_sale } = saleStore

const productStore = useProductStore()
const { productLabels, productCount } = storeToRefs(productStore)
const { get_product_all } = productStore

const page = ref(0)

const handleCurrentChange = (val: number) => {
	page.value = val
	get_sale(page.value)
}

onMounted(() => {
	get_sale(page.value)
	get_product_all()
})
</script>
