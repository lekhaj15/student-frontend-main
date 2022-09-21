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

									<th>Student ID</th>
									<th>Name</th>
									<th>Class</th>
									<th>Section</th>
									<th>Email</th>
									<th>Phone Number</th>
									<th>Status</th>
									<th>created_at</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="student_information in student_information"
									:key="student_information.id"
								>
									<td>{{ student_information.id }}</td>

									<td>{{ student_information.student_id }}</td>
									<td>{{ student_information.student_name }}</td>
									<td>
										{{ student_information.category_information.category_name }}
									</td>
									<td>
										{{
											student_information.subcategory_information
												.subcategory_name
										}}
									</td>
									<td>{{ student_information.student_email }}</td>
									<td>{{ student_information.student_phone }}</td>
									<td>
										<span
											class="badge badge-primary"
											v-if="student_information.student_status == '1'"
										>
											open
										</span>
										<span
											class="badge badge-danger"
											v-if="student_information.student_status == '0'"
										>
											close
										</span>
									</td>

									<td>{{ $formatDate(student_information.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/institute/student/${student_information.id}/edit`"
											class="btn btn-warning btn-sm"
										>
											edit
										</nuxt-link>
										<button
											type="submit"
											class="btn btn-danger btn-sm"
											@click.prevent="
												deleteStudentInformation(student_information.id, index)
											"
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

<script>
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	components: { ValidationErrors },
	data: () => ({
		page: 1,
		total: 1,
		per_page: 20,
		student_information: [],
		validation_errors: [],
	}),
	methods: {
		async getStudentInformationIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/student/index/?page=${this.page}`
				);
				this.student_information = res.data.student_information.data ?? [];
				this.total = res.data.student_information.total ?? 1;
				this.per_page = res.data.student_information.per_page ?? 20;
			} catch (err) {
				console.log(err);
			}
		},

		async deleteStudentInformation(id) {
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
						`/institute/student/delete/${id}`,
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
						this.student_information.splice(index, 1);
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
			this.getStudentInformationIndex();
		},
	},
	created() {
		this.getStudentInformationIndex();
	},
});
</script>

<style lang="scss" scoped></style>
