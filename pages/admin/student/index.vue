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
									<th>Institution name</th>
									<th>Name</th>
									<th>Email</th>
									<th>created_at</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="student in students" :key="student.id">
									<td>{{ student.id }}</td>
									<td>{{ student.institute_information.full_name }}</td>
									<td>{{ student.student_name }}</td>
									<td>{{ student.student_email }}</td>

									<td>{{ $formatDate(student.created_at) }}</td>
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

<script lang="ts">
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-admin'],
	head: {
		title: 'Institute',
		bodyAttrs: {
			id: 'institute',
		},
	},
	components: { ValidationErrors },
	data: () => ({
		categories: [],
		page: 1,
		total: 1,
		per_page: 15,
		validation_errors: [],
		students: [],
	}),
	methods: {
		async getAdminstudentIndex() {
			try {
				const res = await this.$axios.get(
					`/admin/admin-student/?page=${this.page}`
				);
				this.students = res.data.student.data ?? [];
				this.total = res.data.student.total ?? 1;
				this.per_page = res.data.student.per_page ?? 15;
			} catch (err: any) {
				console.log(err);
			}
		},
	},
	watch: {
		page() {
			this.getAdminstudentIndex();
		},
	},
	created() {
		this.getAdminstudentIndex();
	},
});
</script>
<style lang="scss" scoped></style>
