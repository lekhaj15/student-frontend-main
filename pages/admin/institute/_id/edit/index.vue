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
							<h5 class="col-12 text-uppercase">INSTITUTE</h5>
							<div class="form-group col-12">
								<hr class="m-0" />
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
										v-model="form.full_name"
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
										type="email"
										class="form-control"
										required
										maxlength="45"
										v-model="form.email"
									/>
								</div>
							</div>
							<div class="form-group col-md-6">
								<label for="full_name" class="font-weight-bold">
									Role
									<span class="text-danger">*</span>
								</label>
								<div class="input-group">
									<input
										id="full_name"
										type="text"
										class="form-control"
										required
										maxlength="45"
										v-model="form.role"
									/>
								</div>
							</div>

							<div class="form-group col-12">
								<button
									type="submit"
									class="btn btn-success btn-block text-uppercase"
									@click.prevent="patchUpdate"
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
	middleware: ['auth', 'is-admin'],
	components: { ValidationErrors },
	data: () => ({
		form: {
			full_name: '',
			email: '',
			role: '',

			_method: 'PATCH',
		},
		validation_errors: null,
	}),
	methods: {
		async getinstituteEdit() {
			try {
				const res = await this.$axios.get(
					`/admin/institute/show/${this.$route.params.id}/edit`
				);
				this.form.category_name = res.data.category.category_name ?? '';
			} catch (err) {
				console.log(err);
			}
		},
		async patchUpdate() {
			try {
				const res = await this.$axios.post(
					`/admin/institute/update/${this.$route.params.id}`,
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
		this.getinstituteEdit();
	},
});
</script>

<style lang="scss" scoped></style>
