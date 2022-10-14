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
							<h5 class="col-12 text-uppercase">CLASS:</h5>
							<div class="form-group col-12">
								<hr class="m-0" />
							</div>
							<div class="form-group col-md-6">
								<label for="full_name" class="font-weight-bold">
									Class
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
								<button
									type="submit"
									class="btn btn-success btn-block text-uppercase"
									@click.prevent="patchGradeCategoryUpdate"
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
			category_name: '',

			_method: 'PATCH',
		},
		validation_errors: null,
	}),
	methods: {
		async getCategoryEdit() {
			try {
				const res = await this.$axios.get(
					`/institute/category/show/${this.$route.params.id}/edit`
				);
				this.form.category_name = res.data.category.category_name ?? '';
			} catch (err) {
				console.log(err);
			}
		},
		async patchGradeCategoryUpdate() {
			try {
				const res = await this.$axios.post(
					`/institute/category/update/${this.$route.params.id}`,
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
	},

	created() {
		this.getCategoryEdit();
	},
});
</script>

<style lang="scss" scoped></style>
