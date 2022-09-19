<template>
	<div class="wrapper">
		<AppNavbar />
		<main class="content-wrapper">
			<nuxt />
		</main>
		<div id="sidebar-overlay"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppNavbar from './AppNavbar.vue';

export default Vue.extend({
	components: { AppNavbar },
	methods: {
		autoSidebarToggle() {
			if (window.innerWidth > 992) {
				document.querySelector('body')!.classList.remove('sidebar-close');
			} else {
				document.querySelector('body')!.classList.add('sidebar-close');
			}
		},
	},
	watch: {
		$route() {
			if (window.innerWidth < 992) {
				document.body.classList.add('sidebar-close');
			}
			// this.autoSidebarToggle();
		},
	},
	mounted() {
		(document.querySelector('body') as HTMLBodyElement).style.display = 'block';
	},
	created() {
		if (process.browser) {
			this.autoSidebarToggle();
			window.addEventListener('resize', this.autoSidebarToggle);
		}
	},
	destroyed() {
		if (process.browser) {
			window.removeEventListener('resize', this.autoSidebarToggle);
		}
	},
});
</script>

<style>
/* Generic styling */
body {
	display: none;
}

body {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif,
		'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

/* CSS Helpers */
.btn-check {
	position: absolute;
	clip: rect(0, 0, 0, 0);
	pointer-events: none;
}

.btn-check:active + .btn-outline-primary,
.btn-check:checked + .btn-outline-primary,
.btn-outline-primary.active,
.btn-outline-primary.dropdown-toggle.show,
.btn-outline-primary:active {
	color: var(--white);
	background-color: var(--primary);
	border-color: var(--primary);
}

.opacity-50 {
	opacity: 0.5 !important;
}
</style>
