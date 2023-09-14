<template>
	<el-dialog
		:model-value="toggle"
		title="Korzinka"
		width="40%"
		:before-close="handleClose"
	>
		<div v-if="list.length > 0">
			<el-table :data="list">
				<el-table-column label="Mahsulot nomi" prop="info.title" />
				<el-table-column
					label="Miqdori"
					prop="quantity"
					width="80"
					align="center"
				/>
				<el-table-column label="Narxi">
					<template #default="scope">
						<div>
							{{ parseInt(scope.row.info?.price).toLocaleString() }} so'm
						</div>
					</template>
				</el-table-column>
				<el-table-column label="Umumiy narxi">
					<template #default="scope">
						<div>
							{{
								(scope.row.info?.price * scope.row.quantity).toLocaleString()
							}}
							so'm
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-divider />
			<b>Umumiy narx: {{ summa.toLocaleString() }} so'm</b>
			<el-divider />
			<span class="dialog-footer">
				<el-button @click="handleClose">Bekor qilish</el-button>
				<el-button type="primary" @click="addSale"> Tasdiqlash </el-button>
			</span>
		</div>
		<div v-else class="text-center">Korzinka bo'sh</div>
	</el-dialog>
</template>

<script setup lang="ts">
import cookies from 'vue-cookies'
import { ref, watch } from 'vue'
import { type Sale } from '@/models/types'
import { useProductStore } from '@/stores/product'
import { useSaleStore } from '@/stores/sale'

const saleStore = useSaleStore()
const { save_sale, clear_cart } = saleStore

const productStore = useProductStore()
const { get_one_product } = productStore

const emit = defineEmits(['close'])
const props = defineProps(['toggle'])

const handleClose = () => {
	emit('close')
	clear_cart()
}

const addSale = () => {
	save_sale(list.value)
	emit('close')
}

const list = ref<Sale[]>([])
const summa = ref<number>(0)

watch(
	() => props.toggle,
	async (val) => {
		if (val) {
			list.value = cookies.get('shop-items') || []
			if (list.value.length > 0) {
				summa.value = 0
				list.value = await Promise.all(
					list.value.map(async (item: Sale) => {
						let res = await get_one_product(item.product)
						if (res.status == 200) {
							item.info = res.data
							summa.value += item.info.price * item.quantity
						}
						return item
					})
				)
			}
		}
	}
)
</script>

<style lang="scss">
.text-center {
	text-align: center;
}
</style>
