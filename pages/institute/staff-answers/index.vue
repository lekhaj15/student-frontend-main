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

									<th>Staff Id</th>
									<th>Staff Name</th>
									<th>Class</th>
									<th>Section</th>

									<th>created_at</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="staff_information in staff_information"
									:key="staff_information.id"
								>
									<td>{{ staff_information.id }}</td>

									<td>{{ staff_information.staff_id }}</td>
									<td>{{ staff_information.staff_name }}</td>
									<td>
										{{ staff_information.category_information.category_name }}
									</td>
									<td>
										{{
											staff_information.subcategory_information.subcategory_name
										}}
									</td>

									<td>{{ $formatDate(staff_information.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/institute/staff-answers/${staff_information.id}`"
											class="btn btn-warning btn-sm"
										>
											view
										</nuxt-link>
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
		staff_information: [],
		validation_errors: [],
	}),
	methods: {
		async getStaffInformationIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/staff/index/?page=${this.page}`
				);
				this.staff_information = res.data.staff_information.data ?? [];
				console.log(this.staff_information);
				this.total = res.data.staff_information.total ?? 1;
				this.per_page = res.data.staff_information.per_page ?? 20;
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
						this.staff_information.splice(index, 1);
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
			this.getStaffInformationIndex();
		},
	},
	created() {
		this.getStaffInformationIndex();
	},
});
</script>

<style lang="scss" scoped></style>
