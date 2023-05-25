<template>
	<div>
		<PageTabs />
		<BarChart
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

		<div>Staff Dashboard</div>
		<div>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">First</th>
						<th scope="col">Last</th>
						<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Larry</td>
						<td>the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs/legacy';
import Vue from 'vue';
import BarChart from '~/components/BarChart.vue';
import PageTabs from '~/pages/PageTabs.vue';

export default Vue.extend({
	//middleware: ['auth', 'is-staff'],
	//head: {
	//title: 'staff Dashboard',
	//bodyAttrs: {
	//	id: 'dashboard',
	//},
	//},
	components: { PageTabs, BarChart },
});
</script>

<style lang="scss" scoped></style>
