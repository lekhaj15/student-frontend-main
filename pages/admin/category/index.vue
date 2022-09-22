<template>
	<div>
		<div class="container-fluid">
			<section class="row">
				<div class="col-10">
					<ValidationErrors :errors="validation_errors" />
				</div>

				<div class="col-12">
					<div class="table-responsive">
						<table
							id="datatable"
							class="table table-striped table-bordered w-100"
						>
							<thead>
								<tr>
									<th>#</th>
									<th>name</th>

									<th>created_at</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="grade in grades" :key="grade.id">
									<td>{{ grade.id }}</td>
									<td>{{ grade.category_name }}</td>

									<td>{{ $formatDate(grade.created_at) }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-12">
					<b-pagination
						:total-rows="total"
						:per-page="per_page"
						v-model="page"
					></b-pagination>
				</div>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-admin'],
	head: {
		title: 'Institute',
		bodyAttrs: {
			id: 'institute',
		},
	},
	components: { ValidationErrors },
	data: () => ({
		categories: [],
		page: 1,
		total: 1,
		per_page: 15,
		validation_errors: [],
		grades: [],
	}),
	methods: {
		async getAdmingradeIndex() {
			try {
				const res = await this.$axios.get(
					`/admin/admin-grade/?page=${this.page}`
				);
				this.grades = res.data.grade.data ?? [];
				this.total = res.data.grade.total ?? 1;
				this.per_page = res.data.grade.per_page ?? 15;
			} catch (err: any) {
				console.log(err);
			}
		},
	},
	watch: {
		page() {
			this.getAdmingradeIndex();
		},
	},
	created() {
		this.getAdmingradeIndex();
	},
});
</script>
<style lang="scss" scoped></style>
