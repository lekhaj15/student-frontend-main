<template>
	<div>
		<div class="vh-100 py-5 mt-4">
			<div class="container">
				<section class="row justify-content-center mt-md-5">
					<div class="col-12 col-lg-8">
						<form @submit.prevent="postContractorRegister()">
							<div class="card card-blur text-capitalize">
								<div class="card-body form-row">
									<div class="col-12 mb-2">
										<h2 class="text-center font-weight-bold">
											Contractor Register
										</h2>
									</div>

									<div class="form-group col-12">
										<hr class="m-0" />
									</div>

									<div class="form-group col-12 col-sm-6">
										<label for="email" class="font-weight-bold">
											E-Mail
											<span class="text-danger">*</span>
										</label>
										<div class="input-group">
											<input
												type="email"
												id="email"
												class="form-control"
												required
												v-model="form.email"
											/>
										</div>
									</div>

									<div class="form-group col-12 col-sm-6">
										<label for="password" class="font-weight-bold">
											Password
											<span class="text-danger">*</span>
										</label>
										<div class="input-group">
											<input
												type="password"
												id="password"
												placeholder="Enter new password"
												class="form-control"
												required
												v-model="form.password"
											/>
										</div>
									</div>

									<div class="form-group col-12 col-sm-6">
										<label for="full-name" class="font-weight-bold">
											Full Name
											<span class="text-danger">*</span>
										</label>
										<div class="input-group">
											<input
												type="text"
												id="full-name"
												v-model="form.full_name"
												class="form-control"
												required
												maxlength="45"
											/>
										</div>
									</div>

									<div class="form-group col-12 col-sm-6">
										<label for="mobile-number" class="font-weight-bold">
											Mobile
											<span class="text-danger">*</span>
										</label>
										<div class="input-group">
											<div class="input-group-prepend">
												<span
													class="input-group-text bg-white font-weight-bold"
													id="mobile-number-addon"
												>
													+91
												</span>
											</div>
											<input
												type="number"
												id="mobile-number"
												class="form-control"
												aria-describedby="mobile-number-addon"
												required
												v-model="form.mobile_number"
												v-number-maxlength="10"
												v-number-minlength="10"
											/>
											<div class="input-group-append">
												<button
													type="button"
													class="btn btn-blue font-weight-bold"
													v-if="resend_otp === 0"
													@click="postContractorSendMobileOtp()"
													:disabled="
														form.mobile_number.length !== 10 ||
														is_mobile_verified === 1
													"
												>
													Verify
												</button>
												<button
													type="button"
													class="btn btn-blue font-weight-bold"
													v-if="resend_otp === 1"
													@click="postContractorResendMobileOtp()"
													:disabled="
														form.mobile_number.length !== 10 ||
														is_mobile_verified === 1
													"
												>
													Resend
												</button>
												<button
													type="button"
													class="btn btn-blue font-weight-bold"
													v-if="resend_otp === 2"
													:disabled="
														form.mobile_number.length !== 10 ||
														is_mobile_verified === 1
													"
												>
													Verified
												</button>
											</div>
										</div>
									</div>

									<div class="form-group col-12">
										<hr class="m-0" />
									</div>

									<div class="col-12">
										<ValidationErrors :errors="validation_errors" />
									</div>

									<div class="col-12">
										<b-alert
											variant="info"
											v-if="email_verification"
											dismissible
										>
											Please verify your email
										</b-alert>

										<button
											type="submit"
											class="btn btn-rose btn-block font-weight-bold text-white"
											disabled
											v-if="is_animation_loading === true"
										>
											<b-spinner
												small
												label="Spinning"
												class="mb-1"
											></b-spinner>
											Please wait...
										</button>
										<button
											type="submit"
											class="btn btn-rose btn-block font-weight-bold text-white"
											:disabled="registration_complete === 1"
											v-else
										>
											Register
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>

					<div class="col-12 text-center mt-4">
						<span class="mr-1">Alredy a member?</span>

						<NuxtLink to="/contractor/auth/login" class="font-weight-bold">
							Login Now
						</NuxtLink>
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
	// middleware: ['guest'],
	components: { ValidationErrors },
	head: {
		title: 'Contractor Register',
		bodyAttrs: {
			id: 'contractor-register',
		},
	},
	data: () => ({
		is_animation_loading: false,
		form: {
			full_name: '',
			email: '',
			password: '',
			mobile_number: '',
			state: '',
			city: '',
			push_token: '',
		},
		validation_errors: [] as any,
		email_verification: 0,
		random_otp_number: Math.floor(1000 + Math.random() * 9000),
		resend_otp: 0,
		is_mobile_verified: 0,
		registration_complete: 0,
	}),
	methods: {
		onCitySelect(state_city: any) {
			this.form.state = state_city.states;
			this.form.city = state_city.cities;
		},
		async postContractorSendMobileOtp() {
			try {
				const res = await this.$axios.post(`/contractor/auth/send-mobile-otp`, {
					mobile_number: this.form.mobile_number,
					otp_number: this.random_otp_number,
				});
				if (res.status === 201) {
					this.resend_otp = 1;
					const { value: otp_number } = await this.$swal({
						html: `<h4 class="mt-2"> 
						 Please enter the OTP we just sent to <b> ${this.form.mobile_number} </b> to proceed
						</h4>`,
						input: 'text',
						inputValue: '',
						showCancelButton: true,
						allowOutsideClick: false,
						confirmButtonText: `<b> Confirm </b>`,
						denyButtonText: `<b> Cancel </b>`,
						inputValidator: (value) => {
							if (!Number.isSafeInteger(parseInt(value)))
								return 'invalid otp number !';
							if (parseInt(value) !== this.random_otp_number)
								return 'invalid otp number !';
							return null;
						},
					});

					if (otp_number?.length === 4) {
						const res = await this.$axios.post(
							`/contractor/auth/verify-mobile-otp`,
							{
								mobile_number: this.form.mobile_number,
								otp_number: otp_number,
							}
						);
						if (res.status === 200) {
							await this.$swal({
								html: '<h4 class="mt-2"> Mobile number verified successfully! </h4>',
								icon: 'success',
								confirmButtonText: '<b> Close </b>',
							});
							this.is_mobile_verified = 1;
							this.resend_otp = 2;
							await this.postContractorRegisterStore();
						}
					}
				}
			} catch (err: AxiosError | any) {
				if (err.response.status === 429) {
					this.validation_errors = 'Please try again later after 5 minutues';
				}
				if (err.response.status === 422) {
					this.validation_errors =
						'Mobile number alredy taken Please try another number';
				}
			}
		},
		async postContractorResendMobileOtp() {
			try {
				const res = await this.$axios.post(
					`/contractor/auth/resend-mobile-otp`,
					{
						mobile_number: this.form.mobile_number,
					}
				);
				if (res.status === 200) {
					const { value: otp_number } = await this.$swal({
						html: `<h4 class="mt-2"> 
						 Please enter the OTP we just sent to <b> ${this.form.mobile_number} </b> to proceed
						</h4>`,
						input: 'text',
						inputValue: '',
						showCancelButton: false,
						allowOutsideClick: false,
						confirmButtonText: `<b> Confirm </b>`,
						denyButtonText: `<b> Cancel </b>`,
						inputValidator: (value) => {
							if (!Number.isSafeInteger(parseInt(value)))
								return 'invalid otp number !';
							if (parseInt(value) !== this.random_otp_number)
								return 'invalid otp number !';
							return null;
						},
					});
					const res = await this.$axios.post(
						`/contractor/auth/verify-mobile-otp`,
						{
							mobile_number: this.form.mobile_number,
							otp_number: otp_number,
						}
					);
					if (res.status === 200) {
						await this.$swal({
							html: '<h4 class="mt-2"> Mobile number verified successfully! </h4>',
							icon: 'success',
							confirmButtonText: '<b> Close </b>',
						});
						this.is_mobile_verified = 1;
						this.resend_otp = 2;
						await this.postContractorRegisterStore();
					}
				}
			} catch (err: AxiosError | any) {
				if (err.response.status === 429) {
					await this.$swal({
						html: '<h4 class="mt-2"> Too many attempts, please try again later after 5 minutues </h4>',
						icon: 'warning',
						confirmButtonText: '<b> Close </b>',
					});
				}
				this.validation_errors = err.response.data.errors;
			}
		},
		async postContractorRegister() {
			try {
				if (
					this.form.mobile_number.length === 10 &&
					this.is_mobile_verified === 0
				) {
					if (this.resend_otp === 0) {
						this.postContractorSendMobileOtp();
					}
					if (this.resend_otp === 1) {
						this.postContractorResendMobileOtp();
					}
				}

				if (this.is_mobile_verified === 1) {
					this.postContractorRegisterStore();
				}
			} catch (err: AxiosError | any) {
				this.validation_errors = err.response.data.errors;
			}
		},
		async postContractorRegisterStore() {
			this.is_animation_loading = true;
			try {
				const res = await this.$axios.post(
					`/contractor/auth/register`,
					this.form
				);
				if (res.status === 201) {
					localStorage.setItem('first_time_contractor_login', '1');
					const res = await this.$auth.loginWith('contractor', {
						data: this.form,
					});
				}
			} catch (err: AxiosError | any) {
				this.validation_errors = err.response.data.errors;
			} finally {
				this.is_animation_loading = false;
			}
		},
	},
	async mounted() {
		// this.$auth.options.redirect.home = '/contractor/profile';
		// this.$auth.options.redirect.logout = '/contractor/auth/login';
	},
	created() {
		// this.$auth.setStrategy('contractor');
	},
});
</script>

<style lang="scss"></style>
