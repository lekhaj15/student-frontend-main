<template>
	<aside class="main-sidebar">
		<nuxt-link to="/" class="brand-link text-decoration-none">
			<b-img-lazy
				src="/icon.png"
				alt="Brand Logo"
				class="brand-image shadow-sm"
			></b-img-lazy>
			<span class="brand-text">Feedback Admin</span>
		</nuxt-link>

		<VSimplebar data-simplebar-auto-hide="false" class="sidebar">
			<div class="user-panel mt-3 pb-3 mb-3 d-flex">
				<div class="image">
					<b-img-lazy
						src="/icon.png"
						class="shadow-sm"
						alt="User Image"
					></b-img-lazy>
				</div>
				<div class="info">
					<nuxt-link to="/" class="d-block text-decoration-none">
						Admin
					</nuxt-link>
				</div>
			</div>
			<nav class="mt-2" v-if="isAdminOnly">
				<b-nav class="text-capitalize" vertical pills>
					<b-nav-item to="/admin/dashboard">dashboard</b-nav-item>

					<b-nav-item-dropdown
						text="admin-institute"
						toggle-class="nav-link-custom"
					>
						<b-dropdown-item to="/admin/institute">index</b-dropdown-item>
						<b-dropdown-item to="/admin/institute/add">add</b-dropdown-item>
					</b-nav-item-dropdown>

					<b-nav-item-dropdown
						text="Grade category"
						toggle-class="nav-link-custom"
					>
						<b-dropdown-item to="/institute/grade-category">
							index
						</b-dropdown-item>
						<b-dropdown-item to="/institute/grade-category/add">
							add
						</b-dropdown-item>
					</b-nav-item-dropdown>

					<b-nav-item-dropdown
						text="Grade Subcategory"
						toggle-class="nav-link-custom"
					>
						<b-dropdown-item to="/institute/grade-subcategory">
							index
						</b-dropdown-item>
						<b-dropdown-item to="/institute/grade-subcategory/add">
							add
						</b-dropdown-item>
					</b-nav-item-dropdown>
					<b-nav-item-dropdown text="Student" toggle-class="nav-link-custom">
						<b-dropdown-item to="/institute/student">index</b-dropdown-item>
						<b-dropdown-item to="/institute/student/add">add</b-dropdown-item>
					</b-nav-item-dropdown>
					<b-nav-item-dropdown text="Staff" toggle-class="nav-link-custom">
						<b-dropdown-item to="/institute/staff">index</b-dropdown-item>
						<b-dropdown-item to="/institute/staff/add">add</b-dropdown-item>
					</b-nav-item-dropdown>

					<b-nav-item to="/contact-us">contact us</b-nav-item>

					<b-nav-item @click="logout">logout</b-nav-item>
				</b-nav>
				<nav class="mt-2" v-if="isInstituteOnly">
					<b-nav class="text-capitalize" vertical pills>
						<b-nav-item to="/institute/dashboard">dashboard</b-nav-item>

						<b-nav-item-dropdown
							text="Grade category"
							toggle-class="nav-link-custom"
						>
							<b-dropdown-item to="/institute/grade-category">
								index
							</b-dropdown-item>
							<b-dropdown-item to="/institute/grade-category/add">
								add
							</b-dropdown-item>
						</b-nav-item-dropdown>

						<b-nav-item-dropdown
							text="Grade Subcategory"
							toggle-class="nav-link-custom"
						>
							<b-dropdown-item to="/institute/grade-subcategory">
								index
							</b-dropdown-item>
							<b-dropdown-item to="/institute/grade-subcategory/add">
								add
							</b-dropdown-item>
						</b-nav-item-dropdown>
						<b-nav-item-dropdown text="Student" toggle-class="nav-link-custom">
							<b-dropdown-item to="/institute/student">index</b-dropdown-item>
							<b-dropdown-item to="/institute/student/add">add</b-dropdown-item>
						</b-nav-item-dropdown>
						<b-nav-item-dropdown text="Staff" toggle-class="nav-link-custom">
							<b-dropdown-item to="/institute/staff">index</b-dropdown-item>
							<b-dropdown-item to="/institute/staff/add">add</b-dropdown-item>
						</b-nav-item-dropdown>

						<b-nav-item to="/contact-us">contact us</b-nav-item>

						<b-nav-item @click="logout">logout</b-nav-item>
					</b-nav>
				</nav>
			</nav>
		</VSimplebar>
	</aside>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	data: () => ({
		form: {},
	}),
	computed: {
		isAdminOnly(): boolean {
			return this.$auth.loggedIn && this.$auth.user?.role === 'admin';
		},
		isInstituteOnly(): boolean {
			return this.$auth.loggedIn && this.$auth.user?.role === 'institute';
		},
		isStudentOnly(): boolean {
			return this.$auth.loggedIn && this.$auth.user?.role === 'student';
		},
		isStaffOnly(): boolean {
			return this.$auth.loggedIn && this.$auth.user?.role === 'staff';
		},

		isGuestOnly(): boolean {
			return !this.$auth.loggedIn;
		},
	},
	methods: {
		async logout() {
			try {
				await this.$auth.logout();
			} catch (err: any) {
				console.log(err);
			}
		},
	},
});
</script>

<style>
.simplebar-scrollbar::before {
	background-color: var(--light) !important;
}
.main-sidebar {
	bottom: 0;
	float: none;
	left: 0;
	position: fixed;
	top: 0;
	background-color: #343a40;
	height: 100vh;
	overflow-y: hidden;
	z-index: 1038;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.main-sidebar,
.main-sidebar::before {
	transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
	width: 250px;
}
.main-sidebar .brand-link {
	border-bottom: 1px solid #4b545c;
	display: block;
	font-size: 1.25rem;
	line-height: 1.5;
	padding: 0.8125rem 0.5rem;
	transition: width 0.3s ease-in-out;
	white-space: nowrap;
}
.main-sidebar .brand-link .brand-image {
	float: left;
	line-height: 0.8;
	margin-left: 0.8rem;
	margin-right: 0.5rem;
	margin-top: -3px;
	max-height: 33px;
	width: auto;
}
.main-sidebar .brand-link .brand-text {
	font-size: 1.25rem;
	line-height: 1.5;
	white-space: nowrap;
	color: rgba(255, 255, 255, 0.8);
}
.main-sidebar .sidebar {
	height: calc(100% - (3.5rem + 1px));
	overflow-x: hidden;
	overflow-y: initial;
	overflow-y: auto;
	padding-bottom: 0;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	padding-top: 0;
}
.main-sidebar .sidebar a {
	color: #c2c7d0;
}
.main-sidebar .sidebar .user-panel {
	border-bottom: 1px solid #4f5962;
}
.main-sidebar .sidebar .user-panel .image {
	display: inline-block;
	padding-left: 0.8rem;
}
.main-sidebar .sidebar .user-panel .image img {
	height: auto;
	width: 2.1rem;
}
.main-sidebar .sidebar .user-panel .info {
	display: inline-block;
	padding: 5px 5px 5px 10px;
}
.main-sidebar .sidebar .nav-item.b-nav-dropdown.dropdown .dropdown-menu {
	width: 100%;
}
.main-sidebar .sidebar .nav-item.b-nav-dropdown.dropdown .dropdown-item {
	color: var(--dark);
	font-weight: 600;
}
.main-sidebar
	.sidebar
	.nav-item.b-nav-dropdown.dropdown
	.nav-link.dropdown-toggle::after {
	display: inline-block;
	width: 0;
	height: 0;
	margin-left: 0.3em;
	vertical-align: middle;
	content: '';
	border-top: 0.3em solid;
	border-right: 0.3em solid transparent;
	border-left: 0.3em solid transparent;
	float: right;
	margin-top: 0.7rem;
}
.content-wrapper {
	height: 100%;
	min-height: 100vh;
	background-color: #f4f6f9;
}
.content-wrapper,
.content-wrapper::before {
	transition: margin-left 0.3s ease-in-out;
}
@media (min-width: 992px) {
	body:not(.sidebar-close) .content-wrapper,
	body:not(.sidebar-close) .content-wrapper::before {
		margin-left: 250px;
	}
}
body.sidebar-close .wrapper .main-sidebar {
	margin-left: -250px;
}
#sidebar-overlay {
	background-color: rgba(0, 0, 0, 0.1);
	bottom: 0;
	display: none;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1037;
}
@media (max-width: 991.98px) {
	body:not(.sidebar-close) #sidebar-overlay {
		display: block;
	}
}
</style>

