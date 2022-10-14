<template>
	<div>
		<div class="container-fluid">
			<section class="row">
				<div class="col-12">
					<ValidationErrors :errors="validation_errors" />
				</div>

				<div class="col-12 mb-4">
					<div class="card text-dark text-dark text-capitalize">
						<div class="card-body form-row">
							<div class="col-12">
								<h5 class="font-weight-bold">SECTION</h5>
							</div>

							<div class="form-group col-12">
								<hr class="m-0" />
							</div>

							<div class="form-group col-md-6">
								<label for="grade_category">Class</label>
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
									Section
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
								<hr class="m-0" />
							</div>

							<div class="col-12">
								<button
									class="btn btn-success btn-block font-weight-bold"
									@click.prevent="postSubCategoryStore"
								>
									ADD
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import vueSelect from 'vue-select';
import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	components: { ValidationErrors },
	data: () => ({
		form: {
			category_id: '',
			subcategory_name: '',
		},
		categories: [],
		validation_errors: [],
	}),
	methods: {
		onCategorySelect(categories: { id: '' }) {
			this.form.category_id = categories.id;
		},
		async postSubCategoryStore() {
			try {
				const form_data = new FormData();
				Object.keys(this.$data.form).forEach((key) =>
					form_data.append(key, this.$data.form[key])
				);
				const res = await this.$axios.post(
					`/institute/subcategory/store`,
					form_data
				);
				if (res.status === 201) {
					await this.$swal({
						title: 'SubCategory Added successfully !',
						icon: 'success',
						confirmButtonText: 'close',
					});
				}
			} catch (err: any) {
				console.log(err);
				this.validation_errors = err.response.data.errors;
			}
		},
		async getGradeCategory() {
			try {
				const res = await this.$axios.get(`/institute/category`);
				this.categories = res.data.categories ?? [];
			} catch (err: any) {
				this.validation_errors = err.response.data.errors;
			}
		},
	},
	created() {
		this.getGradeCategory();
	},
});
</script>

<style lang="scss" scoped></style>
