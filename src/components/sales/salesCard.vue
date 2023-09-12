<template>
	<div class="card">
		<img :src="item.img" class="img" />
		<div class="title">{{ item.title }}</div>
		<div class="category">{{ getCategory(item.category) }}</div>
		<div class="price">{{ item.price }} so'm</div>
		<div class="btns">
			<el-button @click="changeCount(-1)">
				<el-icon>
					<minus />
				</el-icon>
			</el-button>
			{{ count }}
			<el-button @click="changeCount(1)" :disabled="count == item.quantity">
				<el-icon>
					<plus />
				</el-icon>
			</el-button>
		</div>
		<el-button
			type="success"
			@click="add(item.id, count)"
			:disabled="count == 0"
		>
			<el-icon>
				<shopping-cart />
			</el-icon>
			Korzinkaga
		</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import { useSaleStore } from '@/stores/sale'
const count = ref<number>(0)
const props = defineProps(['item'])

const saleStore = useSaleStore()
const { add_to_cart } = saleStore

const add = (id: number, quantity: number) => {
	add_to_cart({
		product: id,
		date: new Date(),
		quantity,
	})
	count.value = 0
}

const catStore = useCategoryStore()
const { get_category } = catStore
const { categories } = storeToRefs(catStore)

const changeCount = (val: number): void => {
	if (count.value == 0 && val == -1) return
	count.value += val
}
const getCategory = (id: number): string => {
	let res = categories.value.find((category: Category) => category.id === id)
	return res?.title || 'topilmadi'
}

onMounted(() => {
	get_category()
})
</script>

<style lang="scss">
@import '@/styles/card.scss';
</style>
