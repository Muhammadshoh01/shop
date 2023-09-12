<template>
	<div>
		<h1>Mahsulot turkumlari</h1>
		<el-row :gutter="30">
			<el-col :span="8">
				<category-form />
			</el-col>
			<el-col :span="16">
				<category-table />
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import categoryForm from '@/components/category/categoryForm.vue'
import categoryTable from '@/components/category/categoryTable.vue'
</script>

<style></style>
