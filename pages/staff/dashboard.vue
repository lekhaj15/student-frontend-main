<template>
	<div>
		<PageTabs />

		<div>Staff Dashboard</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PageTabs from '~/pages/PageTabs.vue';

export default Vue.extend({
	middleware: ['auth', 'is-staff'],
	head: {
		title: 'staff Dashboard',
		bodyAttrs: {
			id: 'dashboard',
		},
	},
	components: { PageTabs },
});
</script>

<style lang="scss" scoped></style>
