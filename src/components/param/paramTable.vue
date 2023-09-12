<template>
	<div>
		<h3>Xarakteristikalar ro'yxati</h3>
		<el-table :data="params" style="width: 100%">
			<el-table-column type="index" />
			<el-table-column prop="title" label="Sarlavha" />
			<el-table-column label="Turkum">
				<template #default="scope">
					{{ getCategory(scope.row.category) }}
				</template>
			</el-table-column>
			<el-table-column label="Holat" align="right">
				<template #default="scope">
					<div>
						<el-button
							@click="paramStore.edit_status_param(scope.row)"
							class="ml-2"
							:type="scope.row.status ? 'success' : 'warning'"
						>
							<el-icon>
								<check v-if="scope.row.status" />
								<close v-else />
							</el-icon>
						</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template #default="scope">
					<el-dropdown>
						<el-button class="el-dropdown-link">
							<el-icon>
								<more />
							</el-icon>
						</el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="editParam(scope.row.id)">
									<el-icon>
										<edit />
									</el-icon>
									Tahrirlash
								</el-dropdown-item>
								<el-dropdown-item @click="deleteParam(scope.row.id)">
									<el-icon>
										<remove />
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
import { useParamStore } from '@/stores/param'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Category } from '@/models/types'
import { ElMessageBox } from 'element-plus'

const emit = defineEmits(['edit'])

const paramStore = useParamStore()
const { params } = storeToRefs(paramStore)

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

const editParam = (id: number) => {
	emit('edit', id)
}

const deleteParam = (id: number) => {
	ElMessageBox.confirm("Turkumni o'chirmoqchimisiz?", 'Ogohlantirish', {
		confirmButtonText: 'Ha',
		cancelButtonText: "Yo'q",
		type: 'warning',
	})
		.then(() => {
			paramStore.remove_param(id)
		})
		.catch(() => {})
}

const getCategory = (num: number): string => {
	let res = categories.value.find((category: Category) => category.id == num)
	return res?.title || ''
}

onMounted(() => {
	paramStore.get_param()
})
</script>
