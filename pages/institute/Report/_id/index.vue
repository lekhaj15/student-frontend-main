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

		<div>Dashboard</div>
		<div>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Topic</th>
						<th scope="col">Question</th>
						<th scope="col">Excellent</th>
						<th scope="col">Good</th>
						<th scope="col">Average</th>
						<th scope="col">Poor</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Managment</td>
						<td>what..?</td>
						<td>5</td>
						<td>10</td>
						<td>15</td>
						<td>15</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Managment</td>
						<td>what..?</td>
						<td>5</td>
						<td>10</td>
						<td>15</td>
						<td>15</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Managment</td>
						<td>what..?</td>
						<td>5</td>
						<td>10</td>
						<td>15</td>
						<td>15</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import { Pie } from 'vue-chartjs/legacy';
import Vue from 'vue';

import PieChart from '~/components/PieChart.vue';
import PageTabs from '~/pages/PageTabs.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	head: {
		title: 'InstituteDashboard',
		bodyAttrs: {
			id: 'dashboard',
		},
	},
	components: { PageTabs, PieChart },
});
</script>

<style lang="scss" scoped></style>
