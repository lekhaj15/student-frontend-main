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
									<th>total number of class</th>

									<th>total number of section</th>

									<th>total number of Student</th>
									<th>total number of Staff</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{{ category_count }}</td>

									<td>{{ subcategory_count }}</td>
									<td>{{ studentcount }}</td>
									<td>{{ staffcount }}</td>
								</tr>
								<!-- <tr v-for="institute in institutes" :key="institute.id">
									<td>{{ institute.id }}</td>
									<td>
										{{ institute.grade_category_information.category_name }}
									</td>
									<td>
										{{
											institute.grade_sub_category_information.subcategory_name
										}}
									</td>
									<td>{{ institute.email }}</td>
									<td>
										{{ institute.student_information.student_name }}
									</td>
									<td>
										<div v-for="staff in institute.staff_information">
											staff Name:{{ staff.staff_name }}
										</div>
									</td>

									<td>{{ $formatDate(institute.created_at) }}</td>
								</tr> -->
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

<script lang="ts">
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-admin'],
	head: {
		title: 'Institute',
		bodyAttrs: {
			id: 'institute',
		},
	},
	components: { ValidationErrors },
	data: () => ({
		categories: [],
		page: 1,
		total: 1,
		per_page: 15,
		validation_errors: [],
		institutes: [],
		category_count: '',
		subcategory_count: '',
		studentcount: '',
		staffcount: '',
	}),
	methods: {
		async getInstituteIndex() {
			try {
				const res = await this.$axios.get(
					`/admin/institute-information/index/${this.$route.params.id}`
				);

				this.institutes = res.data.institute ?? [];
				this.category_count = res.data.category_count ?? '';
				this.subcategory_count = res.data.subcategory_count ?? '';
				this.studentcount = res.data.studentcount ?? '';
				this.staffcount = res.data.staffcount ?? '';
			} catch (err: any) {
				console.log(err);
			}
		},
		async deleteDestroy(institute_id: number, index: number) {
			try {
				const { value: confirm_referal_code_delete } = await this.$swal({
					title: 'this can not be undone !',
					icon: 'error',
					input: 'text',
					inputLabel: `enter the admin password`,
					inputValue: '',
					showCancelButton: true,
					inputValidator: (value: any) => {
						if (value != '12345') return 'invalid password try again !';
						return null;
					},
				});

				if (confirm_referal_code_delete) {
					const res = await this.$axios.post(
						`/admin/institute/delete/${institute_id}`,
						{
							_method: 'DELETE',
						}
					);
					if (res.status === 204) {
						await this.$swal({
							title: 'Institute Deleted  !',
							icon: 'success',
							confirmButtonText: 'close',
						});
						this.institutes.splice(index, 1);
					}
				}
			} catch (err: any) {
				console.log(err);
				// this.validation_errors = err.response.data.errors;
			}
		},
	},
	watch: {
		page() {
			this.getInstituteIndex();
		},
	},
	created() {
		this.getInstituteIndex();
	},
});
</script>
<style lang="scss" scoped></style>
