<template>
	<div>
		<h1>Mahsulot xarakteristikalari</h1>
		<el-row :gutter="30">
			<el-col :span="8">
				<param-form :id="editId" @edit="handleEdit" />
			</el-col>
			<el-col :span="16">
				<param-table @edit="handleEdit" />
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import paramForm from '@/components/param/paramForm.vue'
import paramTable from '@/components/param/paramTable.vue'

const editId = ref<number>(0)

const handleEdit = (id: number) => {
	editId.value = id
	console.log('edit', editId)
}
</script>

<style></style>
