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

									<th>Question</th>
									<th>Class</th>
									<th>Section</th>
									<th>Topic</th>
									<th>option 1</th>
									<th>option 2</th>
									<th>option 3</th>
									<th>option 4</th>
									<th>created_at</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="staff_questions in staff_questions"
									:key="staff_questions.id"
								>
									<td>{{ staff_questions.id }}</td>

									<td>{{ staff_questions.question_name }}</td>

									<td>
										{{ staff_questions.category_name }}
									</td>
									<td>
										{{ staff_questions.subcategory_name }}
									</td>
									<td>{{ staff_questions.topic_name }}</td>
									<td>{{ staff_questions.option1 }}</td>
									<td>{{ staff_questions.option2 }}</td>
									<td>{{ staff_questions.option3 }}</td>
									<td>{{ staff_questions.option4 }}</td>
									<td>{{ $formatDate(staff_questions.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/institute/staff-questions/${staff_questions.id}/edit`"
											class="btn btn-warning btn-sm"
										>
											edit
										</nuxt-link>
										<button
											type="submit"
											class="btn btn-danger btn-sm"
											@click.prevent="
												deletestaff_questions(staff_questions.id, index)
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
		staff_questions: [],
		validation_errors: [],
	}),
	methods: {
		async getstaff_questionsIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/staff-question/index/?page=${this.page}`
				);
				this.staff_questions = res.data.staff_questions.data ?? [];
				this.total = res.data.staff_questions.total ?? 1;
				this.per_page = res.data.staff_questions.per_page ?? 20;
			} catch (err) {
				console.log(err);
			}
		},

		async deletestaff_questions(id) {
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
						`/institute/staff_questions/delete/${id}`,
						{
							_method: 'DELETE',
						}
					);
					if (res.status === 204) {
						await this.$swal({
							title: 'Question Deleted  !',
							icon: 'success',
							confirmButtonText: 'close',
						});
						this.question.splice(index, 1);
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
			this.getstaff_questionsIndex();
		},
	},
	created() {
		this.getstaff_questionsIndex();
	},
});
</script>

<style lang="scss" scoped></style>
