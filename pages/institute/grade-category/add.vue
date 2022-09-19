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
							<h5 class="font-weight-bold">CATEGORY</h5>
						</div>

						<div class="form-group col-12">
							<hr class="m-0" />
						</div>

						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Category Name
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="full_name"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.category_name"
								/>
							</div>
						</div>

						<div class="form-group col-12">
							<hr class="m-0" />
						</div>

						<div class="col-6">
							<button
								class="btn btn-success btn-block font-weight-bold"
								@click.prevent="postGradeCategoryStore"
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
			category_name: '',
		},

		validation_errors: [],
	}),
	methods: {
		async postGradeCategoryStore() {
			try {
				const res = await this.$axios.post(
					`/institute/category/store`,
					this.form
				);
				if (res.status === 201) {
					await this.$swal({
						title: 'Category Added successfully !',
						icon: 'success',
						confirmButtonText: 'close',
					});
				}
			} catch (err) {
				console.log(err);
				this.validation_errors = err.response.data.errors;
			}
		},
	},
});
</script>

<style lang="scss" scoped></style>
