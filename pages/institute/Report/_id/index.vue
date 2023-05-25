<template>
	<div>
		<PageTabs />
		<PieChart
			chart-options=""
			chart-data=""
			chart-id=""
			dataset-id-key=""
			plugins=""
			css-classes=""
			styles=""
			width="100%"
			height="300px"
		/>

		<!--<div>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Question</th>
						<th scope="col">Excellent</th>
						<th scope="col">Good</th>
						<th scope="col">Average</th>
						<th scope="col">Poor</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="question in question" :key="question.id">
						<td>{{ question.id }}</td>

						<td>{{ question.question_name }}</td>

						<td>{{ question.excellent_count }}</td>
						<td>{{ question.good_count }}</td>
						<td>{{ question.avg_count }}</td>
						<td>{{ question.poor_count }}</td>
					</tr>
				</tbody>
			</table>
		</div>-->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PieChart from '~/components/PieChart.vue';
import PageTabs from '~/pages/PageTabs.vue';
import { Pie } from 'vue-chartjs/legacy';
export default Vue.extend({
	middleware: ['auth', 'is-institute'],

	head: {
		title: 'InstituteDashboard',
		bodyAttrs: {
			id: 'dashboard',
		},
	},
	components: { PageTabs, PieChart },
	data: () => ({
		page: 1,
		total: 1,
		per_page: 20,
		question: [],
		validation_errors: [],
	}),
	methods: {
		async getQuestionIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/question/report/${this.$route.params.id}`
				);
				this.question = res.data.question ?? [];
				// this.total = res.data.question.total ?? 1;
				// this.per_page = res.data.question.per_page ?? 20;
			} catch (err) {
				console.log(err);
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
