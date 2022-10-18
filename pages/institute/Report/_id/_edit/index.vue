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
								<tr v-for="question in question" :key="question.id">
									<td>{{ question.id }}</td>

									<td>{{ question.question_name }}</td>

									<td>
										{{ question.category_name }}
									</td>
									<td>
										{{ question.subcategory_name }}
									</td>
									<td>{{ question.topic_name }}</td>
									<td>{{ question.option1 }}</td>
									<td>{{ question.option2 }}</td>
									<td>{{ question.option3 }}</td>
									<td>{{ question.option4 }}</td>
									<td>{{ $formatDate(question.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/institute/Report/${question.id}`"
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
		question: [],
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
		async getQuestionIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/question/index/${this.$route.params.id}`
				);
				this.question = res.data.question.data ?? [];
				this.total = res.data.question.total ?? 1;
				this.per_page = res.data.question.per_page ?? 20;
			} catch (err) {
				console.log(err);
			}
		},

		async deletequestion(id) {
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
						`/institute/question/delete/${id}`,
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
			this.getQuestionIndex();
		},
	},
	created() {
		this.getQuestionIndex();
	},
});
</script>

<style lang="scss" scoped></style>
