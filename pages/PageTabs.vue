<template>
	<b-tabs class="bg-white" content-class="mt-3">
		<template v-slot:tabs-end>
			<b-nav-item href="#" class="toggle-main-nav">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					width="20"
					height="20"
					class="text-dark"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</b-nav-item>
			<b-nav-item to="/active">
				Active
				<span class="badge badge-info">{{ active }}</span>
			</b-nav-item>
		</template>
	</b-tabs>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import sidebarToggle from '~/mixins/device-helper/sidebar-toggle';

export default (
	Vue as VueConstructor<Vue & InstanceType<typeof sidebarToggle>>
).extend({
	mixins: [sidebarToggle],
	data: () => ({
		active: 0,
	}),
	methods: {
		// async getSomethingCount() {
		// 	try {
		// 		// const active = await this.$axios.get(
		// 		// 	`/v1/meta/products-count-by-status/?status=active`
		// 		// );
		// 		// const draft = await this.$axios.get(
		// 		// 	`/v1/meta/products-count-by-status/?status=draft`
		// 		// );
		// 		// this.active = active.data.product_count ?? 0;
		// 		// this.draft = draft.data.product_count ?? 0;
		// 	} catch (err: any) {
		// 		console.log(err);
		// 	}
		// },
	},
	created() {
		// this.getSomethingCount();
	},
	mounted() {
		this.onClickSidebarToggle();
	},
});
</script>

<style scoped></style>
