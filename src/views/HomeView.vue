<template>
	<main>
		<h1>Sotuv bo'limi</h1>
		<el-input placeholder="Qidiruv" />

		<el-row :gutter="30" class="el-row">
			<el-col :span="8" v-for="product in products" :key="product.id">
				<salesCard :item="product" />
			</el-col>
		</el-row>
	</main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import salesCard from '@/components/sales/salesCard.vue'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)
const { get_product } = productStore

onMounted(() => {
	get_product()
})
</script>

<style lang="scss">
.el-row {
	row-gap: 30px;
	&:last-child {
		margin-bottom: 0;
	}
}
</style>
