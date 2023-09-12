<template>
	<main>
		<div class="head">
			<h1>Sotuv bo'limi</h1>
			<el-button type="primary" @click="toggle = true">Korzinka</el-button>
		</div>
		<el-input placeholder="Qidiruv" />
		<card :toggle="toggle" @close="handleClose" />

		<el-row :gutter="30" class="el-row">
			<el-col :span="8" v-for="product in products" :key="product.id">
				<salesCard :item="product" />
			</el-col>
		</el-row>
	</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import salesCard from '@/components/sales/salesCard.vue'
import card from '@/components/sales/card.vue'

const productStore = useProductStore()
const { products } = storeToRefs(productStore)
const { get_product } = productStore

const toggle = ref<boolean>(false)

const handleClose = () => {
	toggle.value = false
}

onMounted(() => {
	get_product()
})
</script>

<style lang="scss">
.head {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.el-row {
	row-gap: 30px;
	&:last-child {
		margin-bottom: 0;
	}
}
</style>
