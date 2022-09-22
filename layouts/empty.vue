<template>
	<div>
		<nuxt />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'empty',
	mounted() {
		(document.querySelector('body') as HTMLBodyElement).style.display = 'block';
	},
});
</script>
<style>
/* Generic styling */
body {
	display: none;
}
</style>
