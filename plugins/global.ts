import Vue from 'vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

// @ts-expect-error
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

// (vSelect.props.components as any).default = () => ({
// 	Deselect: {
// 		render: (createElement: (arg0: string, arg1: string) => any) => createElement('span', '❌'),
// 	},
// 	OpenIndicator: {
// 		render: (createElement: (arg0: string, arg1: string) => any) => createElement('span', '🔽'),
// 	},
// });

Vue.component('VSelect', vSelect);
Vue.component('VSimplebar', simplebar);

declare module 'vue/types/vue' {
	interface Vue {
		/**
		 * DESCRIPTION: converts all spaces to hyphens
		 * @param {string} val
		 * @returns val
		 */
		$spaceToHyphens(val: string): string;
		/**
		 * DESCRIPTION: format date in dd-mm-yyyy
		 * @param {string} val
		 * @returns val
		 */
		$formatDate(val: string): string;
		/**
		 * DESCRIPTION: format date in dd-mm-yyyy
		 * @returns val
		 */
		$ddmmyyyy(): string;
		/**
		 * DESCRIPTION: format dd-mm-yyyy to date object
		 * @returns val
		 */
		$ddmmyyyyToDate(): Date;
	}
}

Vue.prototype.$spaceToHyphens = (val: string) => {
	return val
		?.trim()
		?.replace(/([\s,2{}-]+)/g, '-')
		?.toLowerCase();
};

Vue.prototype.$formatDate = (val: string) => {
	const date = new Date(val);
	return `${
		date
			.toLocaleString('en-GB', {
				timeZone: 'Asia/Kolkata',
			})
			.split(',')[0]
	}`.replaceAll('/', '-');
};

Vue.prototype.$ddmmyyyy = () => {
	const date = new Date()
		.toLocaleString('en-GB', {
			timeZone: 'Asia/Kolkata',
		})
		.split(',')[0];
	return `${date}`.replaceAll('/', '-');
};

Vue.prototype.$ddmmyyyyToDate = (val: string): Date => {
	const ddmmyyyy = val.split('-').reverse().join('-');
	const date = new Date(ddmmyyyy);
	return date;
};

Vue.prototype.$globalEvents = () => {
	document.querySelectorAll('input[type="number"]').forEach((v) => {
		v.addEventListener('blur', (e: any) => e.target.reportValidity());
	});
};

Vue.directive('number-minlength', {
	bind(el: any, binding) {
		const minlength = Number.parseInt(binding.value);
		if (minlength === 0) {
			el.setAttribute('min', '1');
			return;
		}
		let find_min_value = '1';
		for (let i = 1; i < minlength; i++) {
			find_min_value += '0';
		}
		el.setAttribute('min', find_min_value);
	},
});

Vue.directive('number-maxlength', {
	bind(el: HTMLElement, binding) {
		const maxlength = Number.parseInt(binding.value);
		let find_max_value = '';
		for (let i = 1; i <= maxlength; i++) {
			find_max_value += '9';
		}
		el.setAttribute('max', find_max_value);
		el.addEventListener('input', (e: any) => {
			if (e.target.value.length > e.target.max.length) {
				e.target.value = e.target.value.slice(0, e.target.max.length);
				e.target.dispatchEvent(new Event('input'));
			}
		});
	},
});

Vue.directive('no-negative-value', {
	update(el: any, binding) {
		if (!/^[1-9]+/.test(el.value) && !binding.value) {
			el.value = 1;
			el.dispatchEvent(new Event('input'));
		}
		if (!/^\d+/.test(el.value) && binding.value) {
			el.value = 0;
			el.dispatchEvent(new Event('input'));
		}
	},
});

Vue.directive('number-only', {
	update: function (el: any) {
		el.value = el.value.replace(/\D+/g, '');
		el.dispatchEvent(new Event('input'));
	},
});

