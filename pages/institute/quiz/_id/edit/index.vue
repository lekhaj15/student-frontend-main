<template>
	<div class="container-fluid">
		<section class="row">
			<div class="col-12">
				<ValidationErrors :errors="validation_errors" />
			</div>

			<div class="col-12 mb-4">
				<div class="card text-dark text-dark text-capitalize">
					<div class="card-body form-row">
						<div class="col-12">
							<h5 class="font-weight-bold">Quiz</h5>
						</div>

						<div class="form-group col-12">
							<hr class="m-0" />
						</div>
						<div class="form-group col-md-6">
							<label for="grade_category" class="font-weight-bold">
								Class
								<span class="text-danger">*</span>
							</label>
							<v-select
								id="grade_category"
								label="category_name"
								:options="categories"
								@option:selected="onCategorySelect"
							>
								<template v-slot:no-options="{ search, searching }">
									<template v-if="searching">
										No results found for
										<em>{{ search }}</em>
										.
									</template>
									<em class="opacity-50" v-else>Start typing to search.</em>
								</template>
								<template v-slot:option="option">
									{{ option.category_name }}
								</template>
								<template v-slot:selected-option="option">
									{{ option.category_name }}
								</template>
							</v-select>
						</div>

						<div class="form-group col-md-6">
							<label for="grade_category" class="font-weight-bold">
								Section
								<span class="text-danger">*</span>
							</label>
							<v-select
								id="grade_category"
								label="category_name"
								:options="subcategory"
								@option:selected="onSubCategorySelect"
							>
								<template v-slot:no-options="{ search, searching }">
									<template v-if="searching">
										No results found for
										<em>{{ search }}</em>
										.
									</template>
									<em class="opacity-50" v-else>Start typing to search.</em>
								</template>
								<template v-slot:option="option">
									{{ option.subcategory_name }}
								</template>
								<template v-slot:selected-option="option">
									{{ option.subcategory_name }}
								</template>
							</v-select>
						</div>
						<div class="form-group col-md-6">
							<label for="subject" class="font-weight-bold">
								Subject
								<span class="text-danger">*</span>
							</label>
							<v-select
								id="subject"
								label="subject_name"
								:options="topic"
								@option:selected="onSubjectSelect"
							>
								<template v-slot:no-options="{ search, searching }">
									<template v-if="searching">
										No results found for
										<em>{{ search }}</em>
										.
									</template>
									<em class="opacity-50" v-else>Start typing to search.</em>
								</template>
								<template v-slot:option="option">
									{{ option.subject_name }}
								</template>
								<template v-slot:selected-option="option">
									{{ option.subject_name }}
								</template>
							</v-select>
						</div>

						<div class="form-group col-md-6">
							<label for="quiz_name" class="font-weight-bold">
								Quiz
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="quiz_name"
									type="text"
									class="form-control"
									v-model="form.quiz_name"
									required
									maxlength="45"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Option 1
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="email"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.option1"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Option 2
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="phone"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.option2"
								/>
							</div>
						</div>

						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Option 3
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="full_name"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.option3"
								/>
							</div>
						</div>
						<div class="form-group col-md-6">
							<label for="full_name" class="font-weight-bold">
								Option 4
								<span class="text-danger">*</span>
							</label>
							<div class="input-group">
								<input
									id="full_name"
									type="text"
									class="form-control"
									required
									maxlength="45"
									v-model="form.option4"
								/>
							</div>
						</div>

						<div class="form-group col-12">
							<hr class="m-0" />
						</div>

						<div class="col-6">
							<button
								class="btn btn-success btn-block font-weight-bold"
								@click.prevent="patchQuestionUpdate"
							>
								ADD
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
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
			quiz_name: '',
			option1: '',
			option2: '',
			option3: '',
			option4: '',
			subject_name: '',
			category_id: '',
			subcategory_id: '',
			topic_id: '',
			_method: 'PATCH',
		},
		subject: [],
		categories: [],
		subcategory: [],
		quiz_information: [],
		validation_errors: [],
	}),
	methods: {
		onCategorySelect(categories) {
			this.form.category_id = categories.id;
			this.getGradeSubCategory();
		},
		onSubCategorySelect(subcategory) {
			this.form.subcategory_id = subcategory.id;
		},
		onSubjectSelect(topic) {
			this.form.subject_id = subject.id;
		},
		async getQuizEdit() {
			try {
				const res = await this.$axios.get(
					`/institute/Quiz/show/${this.$route.params.id}`
				);
				this.form.quiz_name = res.data.quiz.quiz_name;
				this.form.option1 = res.data.quiz.option1;
				this.form.option2 = res.data.quiz.option2;
				this.form.option3 = res.data.quiz.option3;
				this.form.option4 = res.data.quiz.option4;
				this.subject = res.data.quiz.subject_name;
				// this.question_information =
				// 	res.data.question.question_information ?? '';
				// this.form.question =
				// 	res.data.question.topic_information.topic_name ?? '';
				// this.form.subcategory_name =
				// 	res.data.question.sub_category_information.subcategory_name ?? '';
				// this.form.option1 =
				// 	res.data.question.question_information.option1 ?? '';
				// this.form.option2 =
				// 	res.data.question.question_information.option2 ?? '';
				// this.form.option3 =
				// 	res.data.question.question_information.option3 ?? '';
				// this.form.option4 =
				// 	res.data.question.question_information.option4 ?? '';

				//this.form.category_id = res.data.staff.category_information.id ?? '';
				// this.form.subcategory_id =
				// 	res.data.staff.subcategory_information.id ?? '';
			} catch (err) {
				console.log(err);
			}
		},
		async patchQuizUpdate() {
			try {
				const res = await this.$axios.post(
					`/institute/Quiz/update/${this.$route.params.id}`,
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
		async getGradeCategory() {
			try {
				const res = await this.$axios.get(`/institute/category`);
				this.categories = res.data.categories ?? [];
			} catch (err) {
				this.validation_errors = err.response.data.errors;
			}
		},
		async getGradeSubCategory() {
			try {
				const res = await this.$axios.get(
					`/institute/subcategory/${this.form.category_id}`
				);
				this.subcategory = res.data.subcategory ?? [];
			} catch (err) {
				this.validation_errors = err.response.data.errors;
			}
		},
		async getSubject() {
			try {
				const res = await this.$axios.get(`/institute/subject`);
				this.topic = res.data.topic ?? [];
			} catch (err) {
				this.validation_errors = err.response.data.errors;
			}
		},
	},

	created() {
		this.getQuestionEdit();
		this.getGradeCategory();
		this.getSubject();
	},
});
</script>
<style lang="scss" scoped></style>
