<template>
	<div>
		<div class="container-fluid">
			<section class="row">
				<div class="col-12">
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
									<th>Class</th>
									<th>Section</th>

									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="subcategory in subcategory" :key="subcategory.id">
									<td>{{ subcategory.id }}</td>
									<td>
										{{ subcategory.subcategory_information.category_name }}
									</td>

									<td>{{ subcategory.subcategory_name }}</td>

									<td>
										<nuxt-link
											:to="`/institute/Report/${subcategory.id}/_edit`"
											class="btn btn-warning btn-sm"
										>
											View
										</nuxt-link>
									</td>
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

<script>
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	head: {
		title: 'Report',
		bodyAttrs: {
			id: 'report',
		},
	},
	components: { ValidationErrors },
	data: () => ({
		subcategory: [],
		page: 1,
		total: 1,
		per_page: 20,
		validation_errors: [],
	}),
	methods: {
		async getGradeSubCategoryIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/subcategory/index/?page=${this.page}`
				);
				this.subcategory = res.data.subcategory.data ?? [];
				this.total = res.data.subcategory.total ?? 1;
				this.per_page = res.data.subcategory.per_page ?? 20;
			} catch (err) {
				console.log(err);
			}
		},
	},
	watch: {
		page() {
			this.getGradeSubCategoryIndex();
		},
	},
	mounted() {
		this.getGradeSubCategoryIndex();
	},
});
</script>

<style lang="scss" scoped></style>
