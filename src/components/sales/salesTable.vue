<template>
	<el-table :data="data">
		<el-table-column type="index" />
		<el-table-column prop="info.title" label="Mahsulot nomi" />
		<el-table-column prop="quantity" label="Soni" width="80" align="center" />
		<el-table-column prop="info.price" label="Narxi">
			<template #default="scope">
				{{ parseInt(scope.row.info?.price).toLocaleString() }} so'm
			</template>
		</el-table-column>
		<el-table-column label="Umumiy narxi">
			<template #default="scope">
				{{
					parseInt(scope.row.info?.price * scope.row.quantity).toLocaleString()
				}}
				so'm
			</template>
		</el-table-column>
		<el-table-column prop="date" label="Sana">
			<template #default="scope">
				<div>
					{{ convertDate(scope.row.date) }}
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { convertDate } from '@/utils/func'
defineProps(['data'])
</script>
