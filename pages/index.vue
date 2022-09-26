<template>
	<div>
		<!-- Hero Section-->
		<section
			class="hero bg-top py-5"
			id="hero"
			style="
				background: url('/banner-4.png') no-repeat;
				background-size: 100% 80%;
			"
		>
			<div class="container py-5">
				<div class="row py-5">
					<div class="col-lg-5 py-5">
						<h1>Welcome to Feedback Management System.</h1>
						<p class="my-4 text-muted">
							All your needs for Student Feedback Management
						</p>
						<ul class="list-inline mb-0">
							<li class="list-inline-item mb-2 mb-lg-0">
								<a class="btn btn-primary btn-lg px-4" href="#!">
									<i class="fab fa-google-play me-3"></i>
									Google Play
								</a>
							</li>
							<li class="list-inline-item">
								<a class="btn btn-primary btn-lg px-4" href="#!">
									<i class="fab fa-app-store me-3"></i>
									App Store
								</a>
							</li>
						</ul>
					</div>
					<div class="col-lg-6 ml-auto">
						<div class="device-wrapper mx-auto">
							<div
								class="device shadow"
								data-device="iPhoneX"
								data-orientation="portrait"
								data-color="black"
							>
								<!-- <div class="screen"><img class="img-fluid" src="img/mobile.png" alt=""></div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<div class="py-3">
			<div class="container">
				<section class="row">
					<div class="col-12 col-md-6 col-xl-3 mb-3">
						<nuxt-link :to="`/admin/auth/login`">
							<div class="card text-white bg-info">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<!-- <div class="fas fa-shopping-cart"></div> -->
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Admin</h5>
									</div>
									<!--<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">3,243</h2>
										</div>
										<div class="col-4 text-right">
											<span>
												12.5%
												<i class="fa fa-arrow-up"></i>
											</span>
										</div>
									</div>-->
									<div
										class="progress mt-1"
										data-height="8"
										style="height: 8px"
									>
										<!--</class><NuxtLink to="/admin/auth/login"></NuxtLink>-->
									</div>
								</div>
							</div>
						</nuxt-link>
					</div>

					<div class="col-12 col-md-6 col-xl-3 mb-3">
						<nuxt-link :to="`/institute/auth/login`">
							<div class="card text-white bg-warning">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<!-- <div class="fas fa-shopping-cart"></div> -->
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Institute</h5>
									</div>
									<!--<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">3,243</h2>
										</div>
										<div class="col-4 text-right">
											<span>
												12.5%
												<i class="fa fa-arrow-up"></i>
											</span>
										</div>
									</div>-->
									<div
										class="progress mt-1"
										data-height="8"
										style="height: 8px"
									>
										<!--</class><NuxtLink to="/admin/auth/login"></NuxtLink>-->
									</div>
								</div>
							</div>
						</nuxt-link>
					</div>

					<div class="col-12 col-md-6 col-xl-3 mb-3">
						<nuxt-link :to="`/staff/auth/login`">
							<div class="card text-white bg-primary">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<!-- <div class="fas fa-shopping-cart"></div> -->
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Staff</h5>
									</div>
									<!--<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">3,243</h2>
										</div>
										<div class="col-4 text-right">
											<span>
												12.5%
												<i class="fa fa-arrow-up"></i>
											</span>
										</div>
									</div>-->
									<div
										class="progress mt-1"
										data-height="8"
										style="height: 8px"
									>
										<!--</class><NuxtLink to="/admin/auth/login"></NuxtLink>-->
									</div>
								</div>
							</div>
						</nuxt-link>
					</div>

					<div class="col-12 col-md-6 col-xl-3 mb-3">
						<nuxt-link :to="`/student/auth/login`">
							<div class="card text-white bg-success">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<!-- <div class="fas fa-shopping-cart"></div> -->
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Student</h5>
									</div>
									<!--<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">3,243</h2>
										</div>
										<div class="col-4 text-right">
											<span>
												12.5%
												<i class="fa fa-arrow-up"></i>
											</span>
										</div>
									</div>-->
									<div
										class="progress mt-1"
										data-height="8"
										style="height: 8px"
									>
										<!--</class><NuxtLink to="/admin/auth/login"></NuxtLink>-->
									</div>
								</div>
							</div>
						</nuxt-link>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { AxiosError } from 'axios';
import ValidationErrors from '@/components/ValidationErrors.vue';
export default {
	middleware: 'guest',
	layout: 'empty',
	// setup() {
	// 	return {};
	// },
};
</script>

<style lang="css" scoped>
.card {
	background-color: #fff;
	border-radius: 10px;
	border: none;
	position: relative;
	margin-bottom: 50px;
	box-shadow: 0 0.46875rem 2.1875rem rgba(90, 97, 105, 0.1),
		0 0.9375rem 1.40625rem rgba(90, 97, 105, 0.1),
		0 0.25rem 0.53125rem rgba(90, 97, 105, 0.12),
		0 0.125rem 0.1875rem rgba(90, 97, 105, 0.1);
}
.l-bg-cherry {
	background: linear-gradient(to right, #493240, #f09) !important;
	color: #fff;
}

.l-bg-blue-dark {
	background: linear-gradient(to right, #373b44, #4286f4) !important;
	color: #fff;
}

.l-bg-green-dark {
	background: linear-gradient(to right, #0a504a, #38ef7d) !important;
	color: #fff;
}

.l-bg-orange-dark {
	background: linear-gradient(to right, #a86008, #ffba56) !important;
	color: #fff;
}

.card .card-statistic-3 .card-icon-large .fas,
.card .card-statistic-3 .card-icon-large .far,
.card .card-statistic-3 .card-icon-large .fab,
.card .card-statistic-3 .card-icon-large .fal {
	font-size: 110px;
}

.card .card-statistic-3 .card-icon {
	text-align: center;
	line-height: 50px;
	margin-left: 15px;
	color: #000;
	position: absolute;
	right: -5px;
	top: 20px;
	opacity: 0.1;
}

.l-bg-cyan {
	background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
	color: #fff;
}

.l-bg-green {
	background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
	color: #fff;
}

.l-bg-orange {
	background: linear-gradient(to right, #f9900e, #ffba56) !important;
	color: #fff;
}

.l-bg-cyan {
	background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
	color: #fff;
}
</style>
