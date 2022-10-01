<template>
	<div class="container mb-5">
		<div class="row">
			<div class="col-12" v-for="(quest, index) in question" :key="index">
				<p class="font-weight-bold">
					{{ index + 1 }}. {{ quest.question_name }}
				</p>
				<div class="custom-control custom-radio">
					<input
						type="radio"
						:name="`box-${index}`"
						:id="`one-${index}`"
						:value="quest.option1"
						@input="onInputAnswer($event, quest.id)"
						class="custom-control-input"
					/>
					<label class="custom-control-label" :for="`one-${index}`">
						{{ quest.option1 }}
					</label>
				</div>
				<div class="custom-control custom-radio">
					<input
						type="radio"
						:name="`box-${index}`"
						:id="`two-${index}`"
						:value="quest.option2"
						@input="onInputAnswer($event, quest.id)"
						class="custom-control-input"
					/>
					<label class="custom-control-label" :for="`two-${index}`">
						{{ quest.option2 }}
					</label>
				</div>
				<div class="custom-control custom-radio">
					<input
						type="radio"
						:name="`box-${index}`"
						:id="`three-${index}`"
						:value="quest.option3"
						@input="onInputAnswer($event, quest.id)"
						class="custom-control-input"
					/>
					<label class="custom-control-label" :for="`three-${index}`">
						{{ quest.option3 }}
					</label>
				</div>
				<div class="custom-control custom-radio">
					<input
						type="radio"
						:name="`box-${index}`"
						:id="`four-${index}`"
						:value="quest.option4"
						@input="onInputAnswer($event, quest.id)"
						class="custom-control-input"
					/>
					<label class="custom-control-label" :for="`four-${index}`">
						{{ quest.option4 }}
					</label>
				</div>
			</div>

			<div class="col-12">
				<div class="d-flex justify-content-center">
					<button
						class="btn btn-primary px-4 py-2 fw-bold"
						@click.prevent="postFeedbackStore"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-student'],
	components: { ValidationErrors },
	data: () => ({
		question: [],
		form: {
			topic_id: '',
			answers: [],
		},
		validation_errors: [],
	}),
	methods: {
		onInputAnswer($event, q_id) {
			this.form.answers =
				this.form.answers?.filter((frm) => frm.question_id !== q_id) ?? [];
			this.form.answers.push({
				answer: $event.target.value,
				question_id: q_id,
			});
		},
		async getQuestionIndex() {
			try {
				const res = await this.$axios.get(
					`/student/feedback/${this.$route.params.id}`
				);
				this.question = res.data.question ?? [];
			} catch (err) {
				console.log(err);
			}
		},

		async postFeedbackStore() {
			try {
				this.form.topic_id = this.$route.params.id;
				const res = await this.$axios.post(
					`/student/feedback/store`,
					this.form
				);
				if (res.status === 201) {
					await this.$swal({
						title: 'Answer stored successfully!',
						icon: 'success',
						confirmButtonText: 'close',
					});
				}
			} catch (err) {
				console.log(err);
				// this.validation_errors = err.response.err;
			}
		},
	},

	created() {
		this.getQuestionIndex();
	},
});
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
* {
	margin: 15;
	padding: 15;
	box-sizing: border-box;
	font-family: 'Times New Roman', Times, serif;
}
p {
	margin: 0%;
}
body {
	height: 100vh;
	background-color: bisque;
	padding: 10px;
}
.container {
	margin: 20px auto;
	background: white;
	padding: 30px 15px;
}
label.box {
	display: flex;
	margin-top: 30px;
	padding: 30px 12px;
	border-radius: 5px;
	cursor: pointer;
	border: 1px solid #ddd;
}
#one:checked ~ label.first,
#two:checked ~ label.second,
#three:checked ~ label.third,
#four:checked ~ label.forth,
#five:checked ~ label.fifth,
#six:checked ~ label.sixth,
#seven:checked ~ label.seveth,
#eight:checked ~ label.eighth {
	border-color: #8e498e;
}
#one:checked ~ label.first .circle,
#two:checked ~ label.second .circle,
#three:checked ~ label.third .circle,
#four:checked ~ label.forth .circle,
#five:checked ~ label.fifth .circle,
#six:checked ~ label.sixth .circle,
#seven:checked ~ label.seveth .circle,
#eight:checked ~ label.eighth .circle {
	border: 6px solid #8e498e;
	background-color: #fff;
}
label.box:hover {
	background: #d5bbf7;
}
label.box .course {
	display: flex;
	align-items: center;
	width: 100%;
}
label.box .circle {
	height: 22px;
	width: 22px;
	border-radius: 50%;
	margin-right: 15px;
	border: 2px solid #ddd;
	display: inline-block;
}
input[type='radio'] {
	display: none;
}
.btn.btn-primary {
	border-radius: 35px;
	margin-top: 100px;
}
@media (max-width: 450px) {
	.subject {
		font-size: 12px;
	}
}
</style>
