<template>
	<div>
		<PageTabs />

		<div class="vh-100 mt-4">
			<div class="container-xl">
				<section class="row justify-content-center align-items-center mt-md-5">
					<div class="container">
						<div class="row">
							<div
								class="col-md-4 col-xl-3"
								v-for="(tp, index) in topic"
								:key="index"
							>
								<div class="card bg-c-gray order-card">
									<nuxt-link :to="`/student/feedback/question/${tp.id}`">
										<div class="card-block">
											<h4 class="m-b-20">{{ tp.topic_name }}</h4>
											<h2 class="text-right">
												<!--<i class="fa fa-cart-plus f-left"></i>-->
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
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import PageTabs from '~/pages/PageTabs.vue';

import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: ['auth', 'is-student'],
	components: { ValidationErrors },
	data: () => ({
		topic: [],
		validation_errors: [],
	}),
	methods: {
		async getTopicIndex() {
			try {
				const res = await this.$axios.get(`/student/staff_topic`);
				this.topic = res.data.topic ?? [];
			} catch (err) {
				console.log(err);
			}
		},
	},

	created() {
		this.getTopicIndex();
	},
});
</script>

<style lang="css">
body {
	margin-top: 30px;
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
	border: palevioletred;
	margin-bottom: 30px;
	-webkit-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;
}

.card .card-block {
	padding: 25px;
	size: 30cm;
	font-style: normal;
	font-family: 'Times New Roman', Times, serif;
	height: 3cm;
}

.order-card i {
	font-size: 46px;
}

.f-left {
	float: left;
}

.f-right {
	float: right;
}
</style>
