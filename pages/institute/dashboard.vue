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
});
</script>
