<template>
	<Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps(['labels', 'data'])

const randomColor = () => {
	return Math.ceil(Math.random() * 255)
}

const chartData = computed(() => {
	return {
		labels: props.labels,
		datasets: [
			{
				label: 'Mahsulot sotuvi grafigi',
				data: props.data,
				backgroundColor: props.data.map(
					(el: number) =>
						`rgba(${randomColor()},${randomColor()},${randomColor()},0.5)`
				),
			},
		],
	}
})
const chartOptions = ref({
	responsive: true,
})
</script>
