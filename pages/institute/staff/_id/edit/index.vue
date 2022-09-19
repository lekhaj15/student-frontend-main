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
							<h5 class="font-weight-bold">STAFF</h5>
						</div>

						<div class="form-group col-12">
							<hr class="m-0" />
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Staff ID
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="status"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.staff_id"
								/>
							</div>
						</div>

						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Name
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="full_name"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.staff_name"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Email
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="email"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.staff_email"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Phone number
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="phone"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.staff_phone"
								/>
							</div>
						</div>

						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Date of Birth
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="phone"
									type="date"
									class="form-control"
									required
									maxlength="45"
									v-model="form.staff_dob"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="grade_category">Class:</label>
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
							<label for="grade_category">Section:</label>
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
								@click.prevent="patchStaffInformationUpdate"
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
			staff_name: '',
			staff_id: '',
			staff_email: '',
			staff_phone: '',
			staff_dob: '',
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
		async getStaffEdit() {
			try {
				const res = await this.$axios.get(
					`/institute/staff/show/${this.$route.params.id}/edit`
				);
				this.form.staff_id = res.data.staff.staff_id ?? '';
				this.form.staff_name = res.data.staff.staff_name ?? '';
				this.form.staff_email = res.data.staff.staff_email ?? '';
				this.form.staff_phone = res.data.staff.staff_phone ?? '';
				this.form.staff_dob = res.data.staff.staff_status ?? '';
				this.form.category_id = res.data.staff.category_information.id ?? '';
				this.form.subcategory_id =
					res.data.staff.subcategory_information.id ?? '';
			} catch (err) {
				console.log(err);
			}
		},
		async patchStaffInformationUpdate() {
			try {
				const res = await this.$axios.post(
					`/institute/staff/update/${this.$route.params.id}`,
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
		this.getStaffEdit();
		this.getGradeCategory();
	},
});
</script>
<style lang="scss" scoped></style>
