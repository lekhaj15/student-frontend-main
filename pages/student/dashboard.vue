<template>
	<div>
		<PageTabs />

		<div>Student Dashboard</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PageTabs from '~/pages/PageTabs.vue';

export default Vue.extend({
	middleware: ['auth', 'is-student'],
	head: {
		title: 'student Dashboard',
		bodyAttrs: {
			id: 'dashboard',
		},
	},
	components: { PageTabs },
});
</script>

<style lang="scss" scoped></style>
