<template>
	<div>
		<el-table :data="products" border>
			<el-table-column type="index" />
			<el-table-column width="80" label="Rasmi">
				<template #default="scope">
					<div>
						<img :src="scope.row.img" alt="" class="product_img" />
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="Nomi">
				<template #default="scope">
					<el-popover placement="right" :width="400" trigger="hover">
						<template #reference>
							<span>
								{{ scope.row.title }}
								<br />
								<el-tag>{{ getCategory(scope.row.category) }}</el-tag>
							</span>
						</template>
						<el-table :data="scope.row.params">
							<el-table-column property="title" label="Nomi" />
							<el-table-column property="value" label="Qiymati" />
						</el-table>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="Narh/Son">
				<template #default="scope">
					<div>{{ scope.row.price.toLocaleString() }} so'm</div>
					{{ scope.row.quantity.toLocaleString() }} ta
				</template>
			</el-table-column>
			<el-table-column label="Yaratilgan vaqti">
				<template #default="scope">
					{{ convertDate(scope.row.createdAt) }}
				</template>
			</el-table-column>
			<el-table-column label="Holati" width="90">
				<template #default="list">
					<div>
						<el-button
							@click="edit_status_product(list.row)"
							:type="list.row.status ? 'success' : 'warning'"
						>
							<el-icon>
								<check v-if="list.row.status" />
								<close v-else />
							</el-icon>
						</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column width="100" align="right">
				<template #default="list">
					<el-dropdown>
						<el-button>
							<el-icon>
								<more />
							</el-icon>
						</el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="editProduct(list.row.id)">
									<el-icon>
										<edit />
									</el-icon>
									O'zgartirish
								</el-dropdown-item>
								<el-dropdown-item @click="removeProduct(list.row.id)">
									<el-icon>
										<delete />
									</el-icon>
									O'chirish
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { type Category } from '@/models/types'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import { convertDate } from '@/utils/func'
const store = useProductStore()

const emit = defineEmits(['edit'])
const editProduct = (id: number) => {
	emit('edit', id)
}

const { remove_product, edit_status_product } = store
const { products } = storeToRefs(store)

const catStore = useCategoryStore()

const { categories } = storeToRefs(catStore)

const removeProduct = (id: number) => {
	ElMessageBox.confirm(
		'Turkumni o`chirmoqchimisiz? Qaroringiz qat`iymi?',
		'Ogohlantirish',
		{
			confirmButtonText: 'Ha',
			cancelButtonText: 'Yo`q',
			type: 'warning',
		}
	)
		.then(() => {
			remove_product(id)
		})
		.catch(() => {})
}

const getCategory = (id: number): string => {
	let res = categories.value.find((category: Category) => category.id === id)
	return res?.title || 'topilmadi'
}

onMounted(() => {
	store.get_product()
})
</script>
<style lang="scss">
.product_img {
	width: 50px;
}
</style>
