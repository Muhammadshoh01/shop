<template>
	<div class="wrapper">
		<div class="d-flex gap-10">
			<RouterLink to="/">Bosh sahifa</RouterLink>
			<RouterLink to="/sale">Hisobotlar</RouterLink>
			<RouterLink to="/category">Turkumlar</RouterLink>
			<RouterLink to="/param">Xarakteristikalar</RouterLink>
			<RouterLink to="/product">Mahsulotlar</RouterLink>
		</div>
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>
