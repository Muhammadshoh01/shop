<template>
	<div>
		<h3>Turkumlar ro'yxati</h3>
		<el-table :data="categories" style="width: 100%">
			<el-table-column type="index" />
			<el-table-column prop="title" label="Sarlavha" />
			<el-table-column label="Holat">
				<template #default="scope">
					<div>
						<el-button
							@click="categoryStore.edit_status_category(scope.row)"
							class="ml-2"
							:type="scope.row.status ? 'success' : 'warning'"
						>
							{{ scope.row.status ? 'Faol' : 'Nofaol' }}
						</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template #default="scope">
					<el-popconfirm
						width="220"
						confirm-button-text="Ha"
						cancel-button-text="yo'q"
						title="Qaroringiz qat'iymi?"
						@confirm="deleteCategory(scope.row.id)"
					>
						<template #reference>
							<el-button>O'chirish</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

const deleteCategory = (id: number) => {
	categoryStore.remove_category(id)
}

onMounted(() => {
	categoryStore.get_category()
})
</script>

<style></style>
