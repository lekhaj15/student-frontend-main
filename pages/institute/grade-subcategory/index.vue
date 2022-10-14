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

									<th>created_at</th>
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

									<td>{{ $formatDate(subcategory.created_at) }}</td>
									<td>
										<b-dropdown
											id="dropdown-dropright"
											dropright
											text="Option"
											variant="primary"
											class="m-2"
										>
											<b-dropdown-item
												:to="`/institute/grade-subcategory/${subcategory.id}/edit`"
											>
												edit
											</b-dropdown-item>
											<b-dropdown-item
												@click.prevent="
													deleteGradeSubCategory(subcategory.id, index)
												"
											>
												Delete
											</b-dropdown-item>
										</b-dropdown>
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
		title: 'Grade SubCategory',
		bodyAttrs: {
			id: 'grade_subcategory',
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
		async deleteGradeSubCategory(subcategory_id) {
			try {
				const { value: confirm_referal_code_delete } = await this.$swal({
					title: 'this can not be undone !',
					icon: 'error',
					input: 'text',
					inputLabel: `enter the admin password`,
					inputValue: '',
					showCancelButton: true,
					inputValidator: (value) => {
						if (value != '12345') return 'invalid password try again !';
						return null;
					},
				});

				if (confirm_referal_code_delete) {
					const res = await this.$axios.post(
						`/institute/subcategory/delete/${subcategory_id}`,
						{
							_method: 'DELETE',
						}
					);
					if (res.status === 204) {
						await this.$swal({
							title: 'subcategory Deleted  !',
							icon: 'success',
							confirmButtonText: 'close',
						});
						this.subcategories.splice(index, 1);
					}
				}
			} catch (err) {
				console.log(err);
				// this.validation_errors = err.response.data.errors;
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

<style lang="less" scoped></style>
