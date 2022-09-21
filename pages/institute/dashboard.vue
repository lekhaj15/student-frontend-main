<template>
	<div>
		<PageTabs />

		<div>institute Dashboard</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PageTabs from '~/pages/PageTabs.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	head: {
		title: 'institute Dashboard',
		bodyAttrs: {
			id: 'dashboard',
		},
	},
	components: { PageTabs },
	mounted() {
		if (localStorage.getItem('reloaded')) {
			// The page was just reloaded. Clear the value from local storage
			// so that it will reload the next time this page is visited.
			localStorage.removeItem('reloaded');
		} else {
			// Set a flag so that we know not to reload the page twice.
			localStorage.setItem('reloaded', '1');
			location.reload();
		}
	},
});
</script>
