<template>
	<div class="container-fluid">
		<section class="row">
			<div class="col-12">
				<ValidationErrors :errors="validation_errors" />
			</div>

			<div class="col-12 mb-4">
				<div class="card text-dark text-dark text-capitalize">
					<div class="card-body form-row">
						<div class="col-12">
							<h5 class="font-weight-bold">STUDENT</h5>
						</div>

						<div class="form-group col-12">
							<hr class="m-0" />
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Student ID
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="status"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.student_id"
								/>
							</div>
						</div>

						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Student Name
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="full_name"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.student_name"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Student Email
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="email"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.student_email"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Student Phone number
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="phone"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.student_phone"
								/>
							</div>
						</div>

						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Student Status
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<select
									id="enquiry_status"
									class="custom-select"
									v-model="form.student_status"
								>
									<option value="1">active</option>
									<option value="0">inactive</option>
								</select>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="grade_category">Category:</label>
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
							<label for="grade_category">subCategory:</label>
							<v-select
								id="grade_category"
								label="category_name"
								:options="subcategory"
								@option:selected="onSubCategorySelect"
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
									{{ option.subcategory_name }}
								</template>
								<template v-slot:selected-option="option">
									{{ option.subcategory_name }}
								</template>
							</v-select>
						</div>

						<div class="form-group col-12">
							<hr class="m-0" />
						</div>

						<div class="col-6">
							<button
								class="btn btn-success btn-block font-weight-bold"
								@click.prevent="patchStudentInformationUpdate"
							>
								ADD
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
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
			student_name: '',
			student_id: '',
			student_email: '',
			student_phone: '',
			student_status: '',
			category_id: '',
			subcategory_id: '',
			_method: 'PATCH',
		},
		categories: [],
		subcategory: [],
		validation_errors: null,
	}),
	methods: {
		onCategorySelect(categories) {
			this.form.category_id = categories.id;
			this.getGradeSubCategory();
		},
		onSubCategorySelect(subcategory) {
			this.form.subcategory_id = subcategory.id;
		},
		async getStudentEdit() {
			try {
				const res = await this.$axios.get(
					`/institute/student/show/${this.$route.params.id}/edit`
				);
				this.form.student_id = res.data.student.student_id ?? '';
				this.form.student_name = res.data.student.student_name ?? '';
				this.form.student_email = res.data.student.student_email ?? '';
				this.form.student_phone = res.data.student.student_phone ?? '';
				this.form.student_status = res.data.student.student_status ?? '';
				this.form.category_id = res.data.student.category_information.id ?? '';
				this.form.subcategory_id =
					res.data.student.subcategory_information.id ?? '';
			} catch (err) {
				console.log(err);
			}
		},
		async patchStudentInformationUpdate() {
			try {
				const res = await this.$axios.post(
					`/institute/student/update/${this.$route.params.id}`,
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
				this.categories = res.data.categories ?? [];
			} catch (err) {
				this.validation_errors = err.response.data.errors;
			}
		},
		async getGradeSubCategory() {
			try {
				const res = await this.$axios.get(
					`/institute/subcategory/${this.form.category_id}`
				);
				this.subcategory = res.data.subcategory ?? [];
			} catch (err) {
				this.validation_errors = err.response.data.errors;
			}
		},
	},

	created() {
		this.getStudentEdit();
		this.getGradeCategory();
	},
});
</script>

<style lang="scss" scoped></style>
