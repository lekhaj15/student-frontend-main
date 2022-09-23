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
									<th>topic_name</th>
									<th>created_at</th>

									<th>action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="topic in topic" :key="topic.id">
									<td>{{ topic.id }}</td>
									<td>{{ topic.topic_name }}</td>

									<td>{{ $formatDate(topic.created_at) }}</td>
									<td>
										<nuxt-link
											:to="`/institute/topic/${topic.id}/edit`"
											class="btn btn-warning btn-sm"
										>
											edit
										</nuxt-link>
										<button
											type="submit"
											class="btn btn-danger btn-sm"
											@click.prevent="deletetopic(topic.id, index)"
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

<script>
import Vue from 'vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	head: {
		title: 'topic',
		bodyAttrs: {
			id: 'topic',
		},
	},
	components: { ValidationErrors },
	data: () => ({
		topic: [],
		page: 1,
		total: 1,
		per_page: 20,
		validation_errors: [],
	}),
	methods: {
		async gettopicIndex() {
			try {
				const res = await this.$axios.get(
					`/institute/topic/index/?page=${this.page}`
				);
				this.topic = res.data.topic.data ?? [];
				this.total = res.data.topic.total ?? 1;
				this.per_page = res.data.topic.per_page ?? 20;
			} catch (err) {
				console.log(err);
			}
		},
		async deletetopic(topic_id) {
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
						`/institute/topic/delete/${topic_id}`,
						{
							_method: 'DELETE',
						}
					);
					if (res.status === 204) {
						await this.$swal({
							title: 'topic Deleted  !',
							icon: 'success',
							confirmButtonText: 'close',
						});
						this.topic.splice(index, 1);
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
			this.gettopicIndex();
		},
	},
	mounted() {
		this.gettopicIndex();
	},
});
</script>

<style lang="scss" scoped></style>
