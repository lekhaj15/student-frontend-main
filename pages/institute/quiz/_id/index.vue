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

									<th>Quiz</th>
									<th>Class</th>
									<th>Section</th>
									<th>Subject</th>
									<th>option 1</th>
									<th>option 2</th>
									<th>option 3</th>
									<th>option 4</th>
									<th>created_at</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="quiz in quiz" :key="quiz.id">
									<td>{{ quiz.id }}</td>

									<td>{{ quiz.quiz_name }}</td>

									<td>
										{{ quiz.category_name }}
									</td>
									<td>
										{{ quiz.subcategory_name }}
									</td>
									<td>{{ quiz.topic_name }}</td>
									<td>{{ quiz.option1 }}</td>
									<td>{{ quiz.option2 }}</td>
									<td>{{ quiz.option3 }}</td>
									<td>{{ quiz.option4 }}</td>
									<td>{{ $formatDate(quiz.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/institute/quiz/${quiz.id}/edit`"
											class="btn btn-warning btn-sm"
										>
											edit
										</nuxt-link>
										<button
											type="submit"
											class="btn btn-danger btn-sm"
											@click.prevent="deletequiz(quiz.id, index)"
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
		quiz: [],
		validation_errors: [],
	}),
	methods: {
		// async getQuestionIndex() {
		// 	try {
		// 		const res = await this.$axios.get(
		// 			`/institute/question/index/?page=${this.page}`
		// 		);
		// 		this.question = res.data.question.data ?? [];
		// 		this.total = res.data.question.total ?? 1;
		// 		this.per_page = res.data.question.per_page ?? 20;
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// },
		async getQuizIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/quiz/index/${this.$route.params.id}`
				);
				this.quiz = res.data.quiz.data ?? [];
				this.total = res.data.quiz.total ?? 1;
				this.per_page = res.data.quiz.per_page ?? 20;
			} catch (err) {
				console.log(err);
			}
		},

		async deletequiz(id) {
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
					const res = await this.$axios.post(`/institute/Quiz/delete/${id}`, {
						_method: 'DELETE',
					});
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
			this.getQuizIndex();
		},
	},
	created() {
		this.getQuizIndex();
	},
});
</script>

<style lang="scss" scoped></style>
