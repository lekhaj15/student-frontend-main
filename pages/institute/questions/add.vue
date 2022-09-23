<template>
	<div>
		<div class="container-fluid">
			<section class="row">
				<div class="col-12">
					<ValidationErrors :errors="validation_errors" />
				</div>

				<div class="col-12 mb-4">
					<div class="card text-dark text-dark text-capitalize">
						<div class="card-body form-row">
							<div class="col-12">
								<h5 class="font-weight-bold">QUESTION</h5>
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
								<label for="topic" class="font-weight-bold">
									Topic
									<span class="text-danger">*</span>
								</label>
								<v-select
									id="topic"
									label="topic_name"
									:options="topic"
									@option:selected="onTopicSelect"
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
										{{ option.topic_name }}
									</template>
									<template v-slot:selected-option="option">
										{{ option.topic_name }}
									</template>
								</v-select>
							</div>

							<div class="form-group col-md-6">
								<label for="full_name" class="font-weight-bold">
									Question
									<span class="text-danger">*</span>
								</label>
								<div class="input-group">
									<input
										id="full_name"
										type="text"
										class="form-control"
										required
										maxlength="45"
										v-model="form.question_name"
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
									@click.prevent="postQuestionStore"
								>
									ADD
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
			question_name: '',
			option1: '',
			option2: '',
			option3: '',
			option4: '',

			category_id: '',
			subcategory_id: '',
			topic_id: '',
		},
		topic: [],
		categories: [],
		subcategory: [],
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
		onTopicSelect(topic) {
			this.form.topic_id = topic.id;
		},
		async postQuestionStore() {
			try {
				const res = await this.$axios.post(
					`/institute/question/store`,
					this.form
				);
				if (res.status === 201) {
					await this.$swal({
						title: 'Question Added successfully !',
						icon: 'success',
						confirmButtonText: 'close',
					});
				}
			} catch (err) {
				console.log(err);
				this.validation_errors = err.response.data.errors;
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
		async getTopic() {
			try {
				const res = await this.$axios.get(`/institute/topic`);
				this.topic = res.data.topic ?? [];
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
	},
	created() {
		this.getGradeCategory();
		this.getTopic();
	},
});
</script>

<style lang="scss" scoped></style>
