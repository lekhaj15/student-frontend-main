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

									<th>Topic Name</th>
									<th>Question_name</th>
									<th>Option1</th>
									<th>Option2</th>
									<th>Option3</th>
									<th>Option4</th>
									<th>Staff selected answer</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="staff_answers in staff_answers"
									:key="staff_answers.id"
								>
									<td>{{ staff_answers.id }}</td>

									<td>{{ staff_answers.topic_name }}</td>
									<td>{{ staff_answers.question_name }}</td>
									<td>
										{{ staff_answers.option1 }}
									</td>
									<td>
										{{ staff_answers.option2 }}
									</td>
									<td>
										{{ staff_answers.option3 }}
									</td>
									<td>
										{{ staff_answers.option4 }}
									</td>
									<td>
										{{ staff_answers.answer_name }}
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
		staff_answers: [],
		validation_errors: [],
	}),
	methods: {
		async getStaffAnswerInformationIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/staff-answers/index/${this.$route.params.id}`
				);
				this.staff_answers = res.data.staff_answers ?? [];
				console.log(this.staff_answers);
				this.total = res.data.staff_answers.total ?? 1;
				this.per_page = res.data.staff_answers.per_page ?? 20;
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
					const res = await this.$axios.post(`/institute/staff/delete/${id}`, {
						_method: 'DELETE',
					});
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
			this.getStaffAnswerInformationIndex();
		},
	},
	created() {
		this.getStaffAnswerInformationIndex();
	},
});
</script>

<style lang="scss" scoped></style>
