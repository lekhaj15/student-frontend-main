<template>
<<<<<<< HEAD
	<div>
		<div class="container">
			<div class="bs-calltoaction bs-calltoaction-info">
				<div class="row">
					<div class="col-md-9 cta-contents">
						<h1 class="cta-title">Admin</h1>
						<div class="cta-desc">
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
						</div>
					</div>
					<div class="col-md-3 cta-button">
						<NuxtLink
							to="/admin/auth/login"
							class="btn btn-lg btn-block btn-info"
						>
							Go for It!
						</NuxtLink>
					</div>
				</div>
			</div>

			<div class="bs-calltoaction bs-calltoaction-success">
				<div class="row">
					<div class="col-md-9 cta-contents">
						<h1 class="cta-title">Institute</h1>
						<div class="cta-desc">
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
						</div>
					</div>
					<div class="col-md-3 cta-button">
						<a href="#" class="btn btn-lg btn-block btn-success">Go for It!</a>
					</div>
				</div>
			</div>

			<div class="bs-calltoaction bs-calltoaction-warning">
				<div class="row">
					<div class="col-md-9 cta-contents">
						<h1 class="cta-title">Staff</h1>
						<div class="cta-desc">
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
						</div>
					</div>
					<div class="col-md-3 cta-button">
						<a href="#" class="btn btn-lg btn-block btn-warning">Go for It!</a>
					</div>
				</div>
			</div>

			<div class="bs-calltoaction bs-calltoaction-danger">
				<div class="row">
					<div class="col-md-9 cta-contents">
						<h1 class="cta-title">Student</h1>
						<div class="cta-desc">
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
							<p>Describe the action here.</p>
						</div>
					</div>
					<div class="col-md-3 cta-button">
						<a href="#" class="btn btn-lg btn-block btn-danger">Go for It!</a>
					</div>
				</div>
			</div>
=======
	<div class="container register">
		<div class="row">
			<div class="col-md-12">
				<ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
					<li class="nav-item">
						<a
							class="nav-link active"
							id="home-tab"
							data-toggle="tab"
							href="#home"
							role="tab"
							aria-controls="home"
							aria-selected="true"
						>
							Admin Login
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							id="profile-tab"
							data-toggle="tab"
							href="#profile"
							role="tab"
							aria-controls="profile"
							aria-selected="false"
						>
							Institute login
						</a>
					</li>
				</ul>
				<div class="tab-content" id="myTabContent">
					<div
						class="tab-pane fade show active text-align form-new"
						id="home"
						role="tabpanel"
						aria-labelledby="home-tab"
					>
						<h3 class="register-heading">Login Form 1</h3>
						<div class="row register-form">
							<div class="col-md-12">
								<form method="post">
									<div class="form-group">
										<input
											type="text"
											name="LGform1_user"
											class="form-control"
											placeholder="Your Email *"
											value=""
											required=""
										/>
									</div>
									<div class="form-group">
										<input
											type="password"
											name="LGform1_pwd"
											class="form-control"
											placeholder="Your Password *"
											value=""
											required=""
										/>
									</div>
									<div class="form-group">
										<input
											type="submit"
											name="LGform1"
											class="btnContactSubmit"
											value="Login"
										/>
										<a
											href="ForgetPassword.php"
											class="btnForgetPwd"
											value="Login"
										>
											Forget Password?
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade show text-align form-new"
						id="profile"
						role="tabpanel"
						aria-labelledby="profile-tab"
					>
						<h3 class="register-heading">Login Form 2</h3>
						<div class="row register-form">
							<div class="col-md-12">
								<form method="post">
									<div class="form-group">
										<input
											type="text"
											name="LGform2_user"
											class="form-control"
											placeholder="Your Email *"
											value=""
											required=""
										/>
									</div>
									<div class="form-group">
										<input
											type="password"
											name="LGform2_pwd"
											class="form-control"
											placeholder="Your Password *"
											value=""
											required=""
										/>
									</div>
									<div class="form-group">
										<input
											type="submit"
											name="LGform2"
											class="btnContactSubmit"
											value="Login"
										/>
										<a
											href="ForgetPassword.php"
											class="btnForgetPwd"
											value="Login"
										>
											Forget Password?
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
>>>>>>> ba879d83fcfbd98d2d03f9ce38357aedfbcdb334
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.bs-calltoaction {
	position: relative;
	width: auto;
	padding: 15px 25px;
	border: 1px solid black;
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 5px;
}

.bs-calltoaction > .row {
	display: table;
	width: calc(100% + 30px);
}

.bs-calltoaction > .row > [class^='col-'],
.bs-calltoaction > .row > [class*=' col-'] {
	float: none;
	display: table-cell;
	vertical-align: middle;
}

.cta-contents {
	padding-top: 10px;
	padding-bottom: 10px;
}

.cta-title {
	margin: 0 auto 15px;
	padding: 0;
}

.cta-desc {
	padding: 0;
}

.cta-desc p:last-child {
	margin-bottom: 0;
}

.cta-button {
	padding-top: 10px;
	padding-bottom: 10px;
}

@media (max-width: 991px) {
	.bs-calltoaction > .row {
		display: block;
		width: auto;
	}

	.bs-calltoaction > .row > [class^='col-'],
	.bs-calltoaction > .row > [class*=' col-'] {
		float: none;
		display: block;
		vertical-align: middle;
		position: relative;
	}

	.cta-contents {
		text-align: center;
	}
}

.bs-calltoaction.bs-calltoaction-info {
	color: #fff;
	background-color: #5bc0de;
	border-color: #46b8da;
}

.bs-calltoaction.bs-calltoaction-success {
	color: #fff;
	background-color: #5cb85c;
	border-color: #4cae4c;
}

.bs-calltoaction.bs-calltoaction-warning {
	color: #fff;
	background-color: #f0ad4e;
	border-color: #eea236;
}

.bs-calltoaction.bs-calltoaction-danger {
	color: #fff;
	background-color: #d9534f;
	border-color: #d43f3a;
}

.bs-calltoaction.bs-calltoaction-primary .cta-button .btn,
.bs-calltoaction.bs-calltoaction-info .cta-button .btn,
.bs-calltoaction.bs-calltoaction-success .cta-button .btn,
.bs-calltoaction.bs-calltoaction-warning .cta-button .btn,
.bs-calltoaction.bs-calltoaction-danger .cta-button .btn {
	border-color: #fff;
}
</style>
