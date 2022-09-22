<template>
	<div>
		<PageTabs />

		<div class="vh-100 mt-4">
			<div class="container-xl">
				<section class="row justify-content-center align-items-center mt-md-5">
					<div class="container">
						<div class="row">
							<div class="col-md-4 col-xl-3">
								<div class="card bg-c-blue order-card">
									<nuxt-link :to="`/institute/grade-category`">
										<div class="card-block">
											<h6 class="m-b-20">Total class</h6>
											<h2 class="text-right">
												<i class="fa fa-cart-plus f-left"></i>
												<span>{{ category_count }}</span>
											</h2>
											<!--
										<p class="m-b-0">
											Completed Orders
											<span class="f-right">351</span>
										</p>-->
										</div>
									</nuxt-link>
								</div>
							</div>

							<div class="col-md-4 col-xl-3">
								<div class="card bg-c-green order-card">
									<nuxt-link :to="`/institute/grade-subcategory`">
										<div class="card-block">
											<h6 class="m-b-20">Total Section</h6>
											<h2 class="text-right">
												<i class="fa fa-rocket f-left"></i>
												<span>{{ subcategory_count }}</span>
											</h2>

											<!-- <p class="m-b-0">
											Completed Orders
											<span class="f-right">351</span>
										</p> -->
										</div>
									</nuxt-link>
								</div>
							</div>

							<div class="col-md-4 col-xl-3">
								<div class="card bg-c-yellow order-card">
									<nuxt-link :to="`/institute/student`">
										<div class="card-block">
											<h6 class="m-b-20">Total Student</h6>
											<h2 class="text-right">
												<i class="fa fa-refresh f-left"></i>
												<span>{{ studentcount }}</span>
											</h2>
											<!-- <p class="m-b-0">
											Completed Orders
											<span class="f-right">351</span>
										</p> -->
										</div>
									</nuxt-link>
								</div>
							</div>

							<div class="col-md-4 col-xl-3">
								<div class="card bg-c-pink order-card">
									<nuxt-link :to="`/institute/staff`">
										<div class="card-block">
											<h6 class="m-b-20">Total Staff</h6>
											<h2 class="text-right">
												<i class="fa fa-credit-card f-left"></i>
												<span>{{ staffcount }}</span>
											</h2>
											<!-- <p class="m-b-0">
											Completed Orders
											<span class="f-right">351</span>
										</p> -->
										</div>
									</nuxt-link>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PageTabs from '~/pages/PageTabs.vue';

export default Vue.extend({
	middleware: ['auth', 'is-institute'],
	head: {
		title: 'institute Dashboard',
		bodyAttrs: {
			id: 'dashboard',
		},
	},
	components: { PageTabs },
	data: () => ({
		category_count: '',
		subcategory_count: '',
		studentcount: '',
		staffcount: '',

		validation_errors: [],
	}),
	methods: {
		async getInstituteDashboardIndex() {
			try {
				const res = await this.$axios.get(`/institute/institute-dashboard`);
				this.category_count = res.data.category_count ?? '';
				this.subcategory_count = res.data.subcategory_count ?? '';
				this.studentcount = res.data.studentcount ?? '';
				this.staffcount = res.data.staffcount ?? '';
			} catch (err: any) {
				console.log(err);
			}
		},
	},

	mounted() {
		if (localStorage.getItem('reloaded')) {
			// The page was just reloaded. Clear the value from local storage
			// so that it will reload the next time this page is visited.
			localStorage.removeItem('reloaded');
		} else {
			// Set a flag so that we know not to reload the page twice.
			localStorage.setItem('reloaded', '1');
			location.reload();
		}
	},
	created() {
		this.getInstituteDashboardIndex();
	},
});
</script>
<style lang="css">
body {
	margin-top: 20px;
	background: #fafafa;
}
.order-card {
	color: #fff;
}

.bg-c-blue {
	background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.bg-c-green {
	background: linear-gradient(45deg, #2ed8b6, #59e0c5);
}

.bg-c-yellow {
	background: linear-gradient(45deg, #ffb64d, #ffcb80);
}

.bg-c-pink {
	background: linear-gradient(45deg, #ff5370, #ff869a);
}

.card {
	border-radius: 5px;
	-webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
	box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
	border: none;
	margin-bottom: 30px;
	-webkit-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
}

.card .card-block {
	padding: 25px;
}

.order-card i {
	font-size: 26px;
}

.f-left {
	float: left;
}

.f-right {
	float: right;
}
</style>
