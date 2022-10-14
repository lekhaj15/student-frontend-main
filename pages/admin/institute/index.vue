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
									<th>full_name</th>
									<th>Email</th>
									<th>created_at</th>
									<th>show</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="institute in institutes" :key="institute.id">
									<td>{{ institute.id }}</td>
									<td>{{ institute.full_name }}</td>
									<td>{{ institute.email }}</td>

									<td>{{ $formatDate(institute.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/admin/institute/${institute.id}`"
											class="btn btn-warning btn-sm"
										>
											view
										</nuxt-link>
									</td>
									<td>
										<nuxt-link
											:to="`/admin/institute/${institute.id}/edit`"
											class="btn btn-warning btn-sm"
										>
											edit
										</nuxt-link>
										<button
											type="submit"
											class="btn btn-danger btn-sm"
											@click.prevent="deleteDestroy(institute.id, index)"
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
		institutes: [],
	}),
	methods: {
		async getIndex() {
			try {
				const res = await this.$axios.get(
					`/admin/institute/index/?page=${this.page}`
				);
				this.institutes = res.data.institute.data ?? [];
				this.total = res.data.institute.total ?? 1;
				this.per_page = res.data.institute.per_page ?? 15;
			} catch (err: any) {
				console.log(err);
			}
		},
		async deleteDestroy(institute_id: number, index: number) {
			try {
				const { value: confirm_referal_code_delete } = await this.$swal({
					title: 'this can not be undone !',
					icon: 'error',
					input: 'text',
					inputLabel: `enter the admin password`,
					inputValue: '',
					showCancelButton: true,
					inputValidator: (value: any) => {
						if (value != '12345') return 'invalid password try again !';
						return null;
					},
				});

				if (confirm_referal_code_delete) {
					const res = await this.$axios.post(
						`/admin/institute/delete/${institute_id}`,
						{
							_method: 'DELETE',
						}
					);
					if (res.status === 204) {
						await this.$swal({
							title: 'Institute Deleted  !',
							icon: 'success',
							confirmButtonText: 'close',
						});
						this.institutes.splice(index, 1);
					}
				}
			} catch (err: any) {
				console.log(err);
				// this.validation_errors = err.response.data.errors;
			}
		},
	},
	watch: {
		page() {
			this.getIndex();
		},
	},
	created() {
		this.getIndex();
	},
});
</script>
<style lang="scss" scoped></style>
