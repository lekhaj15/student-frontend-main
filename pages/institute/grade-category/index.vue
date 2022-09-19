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
									<th>category_name</th>
									<th>created_at</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="category in categories" :key="category.id">
									<td>{{ category.id }}</td>
									<td>{{ category.category_name }}</td>

									<td>{{ $formatDate(category.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/institute/grade-category/${category.id}/edit`"
											class="btn btn-warning btn-sm"
										>
											edit
										</nuxt-link>
										<button
											type="submit"
											class="btn btn-danger btn-sm"
											@click.prevent="deleteGradeCategory(category.id, index)"
										>
											Delete
										</button>
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

<script lang="ts">
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	head: {
		title: 'Grade Category',
		bodyAttrs: {
			id: 'grade_category',
		},
	},
	components: { ValidationErrors },
	data: () => ({
		categories: [],
		page: 1,
		total: 1,
		per_page: 15,
		validation_errors: [],
	}),
	methods: {
		async getGradeCategoryIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/category/index/?page=${this.page}`
				);
				this.categories = res.data.category.data ?? [];
				this.total = res.data.category.total ?? 1;
				this.per_page = res.data.category.per_page ?? 15;
			} catch (err: any) {
				console.log(err);
			}
		},
		async deleteGradeCategory(category_id: number, index: number) {
			try {
				const { value: confirm_referal_code_delete } = await this.$swal({
					title: 'this can not be undone !',
					icon: 'error',
					input: 'text',
					inputLabel: `enter the admin password`,
					inputValue: '',
					showCancelButton: true,
					inputValidator: (value: any) => {
						if (value != '12345') return 'invalid password try again !';
						return null;
					},
				});

				if (confirm_referal_code_delete) {
					const res = await this.$axios.post(
						`/institute/category/delete/${category_id}`,
						{
							_method: 'DELETE',
						}
					);
					if (res.status === 204) {
						await this.$swal({
							title: 'Category Deleted  !',
							icon: 'success',
							confirmButtonText: 'close',
						});
						this.categories.splice(index, 1);
					}
				}
			} catch (err: any) {
				console.log(err);
				// this.validation_errors = err.response.data.errors;
			}
		},
	},
	watch: {
		page() {
			this.getGradeCategoryIndex();
		},
	},
	created() {
		this.getGradeCategoryIndex();
	},
});
</script>

<style lang="less" scoped></style>
