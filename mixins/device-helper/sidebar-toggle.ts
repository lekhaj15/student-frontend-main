import Vue from 'vue';

export default Vue.extend({
	methods: {
		onClickSidebarToggle() {
			document
				.querySelectorAll('.toggle-main-nav')
				.forEach((toggle_main_nav) => {
					toggle_main_nav.addEventListener('click', () => {
						document.querySelector('body')!.classList.toggle('sidebar-close');
					});
				});

			document
				.querySelector('#sidebar-overlay')
				?.addEventListener('click', () => {
					document.querySelector('body')!.classList.add('sidebar-close');
				});
		},
	},
});
