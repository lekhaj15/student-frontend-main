<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-12 mb-4 mb-sm-5">
				<div class="card card-style1 border-0">
					<div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
						<div class="row">
							<div class="col-lg-3 mb-4 mb-lg-0">
								<img
									src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
									alt="..."
									class="img-fluid"
								/>
							</div>
							<div class="col-lg-6 px-xl-10">
								<div>
									<h3 class="h2 text-blue mb-3">
										{{ profile.student_name }}
									</h3>
								</div>
								<ul class="list-unstyled mb-1-9">
									<li class="mb-2 mb-xl-3 display-28">
										<span
											class="display-26 text-secondary me-2 font-weight-600"
										>
											Roll Number:
										</span>
										{{ profile.student_id }}
									</li>
									<li class="mb-2 mb-xl-3 display-28">
										<span
											class="display-26 text-secondary me-2 font-weight-600"
										>
											Institution Name:
										</span>
										{{ profile.full_name }}
									</li>
									<li class="mb-2 mb-xl-3 display-28">
										<span
											class="display-26 text-secondary me-2 font-weight-600"
										>
											Email:
										</span>
										{{ profile.student_email }}
									</li>
									<li class="mb-2 mb-xl-3 display-28">
										<span
											class="display-26 text-secondary me-2 font-weight-600"
										>
											Class:
										</span>
										{{ profile.category_name }}
									</li>
									<li class="mb-2 mb-xl-3 display-28">
										<span
											class="display-26 text-secondary me-2 font-weight-600"
										>
											Section:
										</span>
										{{ profile.subcategory_name }}
									</li>
									<li class="display-28">
										<span
											class="display-26 text-secondary me-2 font-weight-600"
										>
											Phone:
										</span>
										{{ profile.student_phone }}
									</li>
									<li class="display-28">
										<span
											class="display-26 text-secondary me-2 font-weight-600"
										>
											Status:
										</span>
										<span v-if="profile.student_status == 0">Inactive</span>
										<span v-if="profile.student_status == 1">Active</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
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
		profile: [],
		validation_errors: [],
	}),
	methods: {
		async getStudentIndex() {
			try {
				const res = await this.$axios.get(`/student/profile`);
				this.profile = res.data.profile ?? [];
			} catch (err) {
				console.log(err);
			}
		},
	},

	created() {
		this.getStudentIndex();
	},
});
</script>

<style lang="css" scoped>
body {
	margin-top: 20px;
}
.card-style1 {
	box-shadow: 0px 0px 10px 0px rgb(89 75 128 / 9%);
}
.border-0 {
	border: 0 !important;
}
.card {
	position: relative;
	display: flex;
	flex-direction: column;
	min-width: 0;
	word-wrap: break-word;
	background-color: #fff;
	background-clip: border-box;
	border: 1px solid rgba(0, 0, 0, 0.125);
	border-radius: 0.25rem;
}

section {
	padding: 120px 0;
	overflow: hidden;
	background: #fff;
}
.mb-2-3,
.my-2-3 {
	margin-bottom: 2.3rem;
}

.section-title {
	font-weight: 600;
	letter-spacing: 2px;
	text-transform: uppercase;
	margin-bottom: 10px;
	position: relative;
	display: inline-block;
}
.text-primary {
	color: #ceaa4d !important;
}
.text-secondary {
	color: #15395a !important;
}
.font-weight-600 {
	font-weight: 600;
}
.display-26 {
	font-size: 1.3rem;
}

@media screen and (min-width: 992px) {
	.p-lg-7 {
		padding: 4rem;
	}
}
@media screen and (min-width: 768px) {
	.p-md-6 {
		padding: 3.5rem;
	}
}
@media screen and (min-width: 576px) {
	.p-sm-2-3 {
		padding: 2.3rem;
	}
}
.p-1-9 {
	padding: 1.9rem;
}

.bg-secondary {
	background: #15395a !important;
}
@media screen and (min-width: 576px) {
	.pe-sm-6,
	.px-sm-6 {
		padding-right: 3.5rem;
	}
}
@media screen and (min-width: 576px) {
	.ps-sm-6,
	.px-sm-6 {
		padding-left: 3.5rem;
	}
}
.pe-1-9,
.px-1-9 {
	padding-right: 1.9rem;
}
.ps-1-9,
.px-1-9 {
	padding-left: 1.9rem;
}
.pb-1-9,
.py-1-9 {
	padding-bottom: 1.9rem;
}
.pt-1-9,
.py-1-9 {
	padding-top: 1.9rem;
}
.mb-1-9,
.my-1-9 {
	margin-bottom: 1.9rem;
}
@media (min-width: 992px) {
	.d-lg-inline-block {
		display: inline-block !important;
	}
}
.rounded {
	border-radius: 0.25rem !important;
}
</style>
