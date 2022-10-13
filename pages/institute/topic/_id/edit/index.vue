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
							<h5 class="col-12 text-uppercase">Topic:</h5>
							<div class="form-group col-12">
								<hr class="m-0" />
							</div>
							<div class="form-group col-md-6">
								<label for="full_name" class="font-weight-bold">
									Role
									<span class="text-danger">*</span>
								</label>
								<div class="input-group">
									<select
										id="enquiry_status"
										class="custom-select"
										v-model="form.topic_role"
									>
										<option value="student">Student</option>
										<option value="staff">Staff</option>
										<option value="student-staff">Student-Staff</option>
									</select>
								</div>
							</div>
							<div class="form-group col-md-7">
								<label for="full_name" class="font-weight-bold">
									topic Name
									<span class="text-danger">*</span>
								</label>
								<div class="input-group">
									<input
										id="full_name"
										type="text"
										class="form-control"
										required
										maxlength="50"
										v-model="form.topic_name"
									/>
								</div>
							</div>

							<div class="form-group col-7">
								<button
									type="submit"
									class="btn btn-success btn-block text-uppercase"
									@click.prevent="patchtopicUpdate"
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
			topic_role: '',
			topic_name: '',

			_method: 'PATCH',
		},
		validation_errors: null,
	}),
	methods: {
		async gettopicEdit() {
			try {
				const res = await this.$axios.get(
					`/institute/topic/show/${this.$route.params.id}`
				);
				this.form.topic_name = res.data.topic.topic_name ?? '';
				this.form.topic_role = res.data.topic.topic_role ?? '';
			} catch (err) {
				console.log(err);
			}
		},
		async patchtopicUpdate() {
			try {
				const res = await this.$axios.post(
					`/institute/topic/update/${this.$route.params.id}`,
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
		this.gettopicEdit();
	},
});
</script>

<style lang="scss" scoped></style>
