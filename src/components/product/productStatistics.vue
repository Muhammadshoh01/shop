<template>
	<el-row :gutter="16">
		<el-col :span="8">
			<div class="statistic-card">
				<el-statistic :value="params.summa">
					<template #title>
						<div style="display: inline-flex; align-items: center">
							Umumiy summa
							<el-tooltip
								effect="dark"
								content="Number of users who logged into the product in one day"
								placement="top"
							>
								<el-icon style="margin-left: 4px" :size="12">
									<Warning />
								</el-icon>
							</el-tooltip>
						</div>
					</template>
				</el-statistic>
			</div>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
const props = defineProps(['params'])
</script>
