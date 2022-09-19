<template>
	<div>
		<div class="container-fluid">
			<section class="row">
				<div class="col-12">
					<ValidationErrors :errors="validation_errors" />
				</div>

				<div class="col-12">
					<div class="card">
						<div class="card-body form-row">
							<h5 class="col-12 text-uppercase">grade category:</h5>
							<div class="form-group col-12">
								<hr class="m-0" />
							</div>
							<div class="form-group col-md-6">
								<label for="grade_subcategory">category name:</label>
								<v-select
									id="grade_category"
									label="category_name"
									:options="categories"
									@option:selected="onCategorySelect"
								>
									<template v-slot:no-options="{ search, searching }">
										<template v-if="searching">
											No results found for
											<em>{{ search }}</em>
											.
										</template>
										<em class="opacity-50" v-else>Start typing to search.</em>
									</template>
									<template v-slot:option="option">
										{{ option.category_name }}
									</template>
									<template v-slot:selected-option="option">
										{{ option.category_name }}
									</template>
								</v-select>
							</div>
							<div class="form-group col-md-6">
								<label for="full_name" class="font-weight-bold">
									SubCategory Name
									<span class="text-danger">*</span>
								</label>
								<div class="input-group">
									<input
										id="full_name"
										type="text"
										class="form-control"
										required
										maxlength="45"
										v-model="form.subcategory_name"
									/>
								</div>
							</div>

							<div class="form-group col-12">
								<button
									type="submit"
									class="btn btn-success btn-block text-uppercase"
									@click.prevent="patchGradeSubCategoryUpdate"
								>
									UPDATE
								</button>
							</div>
						</div>
					</div>
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
	components: { ValidationErrors },
	data: () => ({
		form: {
			category_id: '',
			subcategory_name: '',

			_method: 'PATCH',
		},
		categories: [],
		category_name: '',
		validation_errors: null,
	}),
	methods: {
		onCategorySelect(categories) {
			this.form.category_id = categories.id;
		},

		async getGradeSubCategoryShow() {
			try {
				const res = await this.$axios.get(
					`/institute/subcategory/show/${this.$route.params.id}/edit`
				);
				this.form.category_id = res.data.subcategory.category_id ?? '';
				this.form.subcategory_name =
					res.data.subcategory.subcategory_name ?? '';
			} catch (err) {
				console.log(err);
			}
		},
		async patchGradeSubCategoryUpdate() {
			try {
				const res = await this.$axios.post(
					`/institute/subcategory/update/${this.$route.params.id}`,
					this.form
				);
				if (res.status === 202) {
					await this.$swal({
						title: ' updated successfully !',
						icon: 'success',
						confirmButtonText: 'close',
					});
				}
			} catch (err) {
				console.log(err);
				// this.validation_errors = err.response.data.errors;
			}
		},
		async getGradeCategory() {
			try {
				const res = await this.$axios.get(`/institute/category`);
				this.categories = res.data.categories;
			} catch (err) {
				this.validation_errors = err.response.data.errors;
			}
		},
	},

	created() {
		this.getGradeSubCategoryShow();
		this.getGradeCategory();
	},
});
</script>

<style lang="scss" scoped></style>
