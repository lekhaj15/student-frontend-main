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
									<th>name</th>
									<th>email</th>
									<th>created_at</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="staff in staffs" :key="staff.id">
									<td>{{ staff.id }}</td>
									<td>{{ staff.staff_name }}</td>
									<td>{{ staff.staff_email }}</td>

									<td>{{ $formatDate(staff.created_at) }}</td>
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
		staffs: [],
	}),
	methods: {
		async getAdminStaffIndex() {
			try {
				const res = await this.$axios.get(
					`/admin/admin-staff/?page=${this.page}`
				);
				this.staffs = res.data.staff.data ?? [];
				this.total = res.data.staff.total ?? 1;
				this.per_page = res.data.staff.per_page ?? 15;
			} catch (err: any) {
				console.log(err);
			}
		},
	},
	watch: {
		page() {
			this.getAdminStaffIndex();
		},
	},
	created() {
		this.getAdminStaffIndex();
	},
});
</script>
<style lang="scss" scoped></style>
