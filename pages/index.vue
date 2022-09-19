<template>
	<div>
		<PageTabs />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import PageTabs from '~/pages/PageTabs.vue';

export default Vue.extend({
	// middleware: ['auth', 'is-admin'],
	head: {
		title: 'Dashboard',
		bodyAttrs: {
			id: 'dashboard',
		},
	},
	components: { PageTabs },
});
</script>

