<template>
	<div>
		<div class="vh-100 py-5 mt-4">
			<div class="container-xl">
				<section class="row justify-content-center align-items-center mt-md-5">
					<div class="col-12 col-md-6 col-xl-7 px-4">
						<div class="d-none d-md-block">
							<div class="mb-5">
								<!-- <h1 class="display-4 font-italic font-weight-bold text-primary">
									Welcome to ConTrackt
								</h1> -->
								<h1 class="display-5 font-weight-bold text-primary">
									Hello! Student
								</h1>
								<!-- <h4>ConTrackt helps you to find Latest Government Tenders</h4> -->
							</div>
						</div>
						<div class="d-block d-md-none">
							<div class="mt-5">
								<h3 class="font-weight-bold">Hello !</h3>
								<p class="text-dark mb-4">
									Welcome Back you've
									<br />
									been missed!
								</p>
							</div>
						</div>
					</div>

					<div class="col-12 col-md-6 col-xl-5">
						<form @submit.prevent="postStudentLogin()">
							<div class="mx-4">
								<div class="form-row">
									<div class="form-group col-12">
										<div class="input-group">
											<input
												type="email"
												id="email"
												placeholder="Enter Email address"
												class="form-control"
												v-model="form.student_email"
												autocomplete="on"
												required
											/>
										</div>
									</div>

									<div class="form-group col-12">
										<div class="input-group">
											<input
												type="password"
												id="password"
												placeholder="Password"
												class="form-control"
												v-model="form.student_password"
												autocomplete="nope"
												required
											/>
										</div>
									</div>

									<div class="col-12">
										<div
											class="form-group col-12"
											v-if="resend_send_email_verification === 1"
										>
											<ValidationErrors :errors="'Please verify your email'" />

											<NuxtLink
												to="/institute/auth/resend-email-verification-link"
											>
												Resend Email Verification Link ?
											</NuxtLink>
										</div>

										<ValidationErrors :errors="validation_errors" />
									</div>
									<NuxtLink to="/student/auth/login"></NuxtLink>

									<div class="col-12 mb-4">
										<button
											type="submit"
											class="btn btn-rose btn-block font-weight-bold text-white shadow"
											disabled
											v-if="is_animation_loading === true"
										>
											<b-spinner
												small
												label="Spinning"
												class="mb-1"
											></b-spinner>
											Logging In
										</button>
										<button
											type="submit"
											class="btn btn-success btn-block font-weight-bold text-white shadow"
											v-else
										>
											Log In
										</button>
									</div>

									<!-- <div class="form-group col-12">
										<div
											class="d-flex align-items-center justify-content-center font-size-sm text-muted text-center"
										>
											<div class="w-100 border-top"></div>
											<div class="w-100 text-nowrap mx-2">Or continue with</div>
											<div class="w-100 border-top"></div>
										</div>
									</div> -->

									<!-- <div class="form-group col-12 text-center">
										<div class="d-flex justify-content-between">
											<NuxtLink to="/institute/auth/login" class="btn btn-link">
												Login with otp
											</NuxtLink>

											<NuxtLink
												to="/institute/auth/password/email"
												class="btn btn-link"
											>
												Forgot Password?
											</NuxtLink>
										</div>
									</div> -->
								</div>
							</div>
						</form>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AxiosError } from 'axios';
import ValidationErrors from '@/components/ValidationErrors.vue';

export default Vue.extend({
	middleware: 'guest',
	layout: 'empty',

	head: {
		title: 'student Login With Email',
		bodyAttrs: {
			id: 'student-login-with-email',
		},
	},
	components: { ValidationErrors },
	data: () => ({
		is_animation_loading: false,
		form: {
			student_email: '',
			student_password: '',
			// device: '',
		},
		validation_errors: [],
		resend_send_email_verification: 0,
	}),
	methods: {
		async postStudentLogin() {
			this.is_animation_loading = true;
			try {
				const res = await this.$auth.loginWith('student', {
					data: this.form,
				});

				this.$router.push('/student/dashboard');
			} catch (err: AxiosError | any) {
				if (err.response.data.errors)
					this.validation_errors = err.response.data.errors;
				if (err.response.data.email_verification_errors)
					this.resend_send_email_verification = 1;
			} finally {
				this.is_animation_loading = false;
			}
		},
	},
	mounted() {
		// this.form.device = window.navigator.appVersion;
	},
	created() {
		this.$auth.setStrategy('student');
		this.$auth.options.redirect.home = '/student/dashboard';
		this.$auth.options.redirect.logout = '/student/auth/login';
	},
});
</script>

<style lang="scss" scoped></style>
