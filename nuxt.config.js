const BACKEND_URL = 'http://127.0.0.1:8000';

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'student-frontend',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		link: [
			{
				rel: 'stylesheet',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/global.ts'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/bootstrap
		'bootstrap-vue/nuxt',
		// https://auth.nuxtjs.org/guide/setup
		'@nuxtjs/auth-next',
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
	],

	bootstrapVue: {
		icons: false,
	},

	router: {
		middleware: [
			// 'is-maintenance-mode',
			'redirect-if-authenticated',
			// 'auth-check.client',
		],
	},

	// https://auth.nuxtjs.org
	auth: {
		strategies: {
			admin: {
				scheme: 'local',
				token: {
					property: 'access_token',
					type: '',
				},
				user: {
					property: 'admin',
				},
				endpoints: {
					login: { url: `${BACKEND_URL}/api/admin/auth/login`, method: 'post' },
					logout: {
						url: `${BACKEND_URL}/api/admin/auth/logout`,
						method: 'post',
					},
					user: { url: `${BACKEND_URL}/api/admin/auth/me`, method: 'get' },
				},
			},
			institute: {
				scheme: 'local',
				token: {
					property: 'access_token',
					type: '',
				},
				user: {
					property: 'institute',
				},
				endpoints: {
					login: {
						url: `${BACKEND_URL}/api/institute/auth/login`,
						method: 'post',
					},
					logout: {
						url: `${BACKEND_URL}/api/institute/auth/logout`,
						method: 'post',
					},
					user: { url: `${BACKEND_URL}/api/institute/auth/me`, method: 'get' },
				},
			},
			staff: {
				scheme: 'local',
				token: {
					property: 'access_token',
					type: '',
				},
				user: {
					property: 'staff',
				},
				endpoints: {
					login: {
						url: `${BACKEND_URL}/api/staff/auth/login`,
						method: 'post',
					},
					logout: {
						url: `${BACKEND_URL}/api/staff/auth/logout`,
						method: 'post',
					},
					user: { url: `${BACKEND_URL}/api/staff/auth/me`, method: 'get' },
				},
			},
			student: {
				scheme: 'local',
				token: {
					property: 'access_token',
					type: '',
				},
				user: {
					property: 'student',
				},
				endpoints: {
					login: {
						url: `${BACKEND_URL}/api/student/auth/login`,
						method: 'post',
					},
					logout: {
						url: `${BACKEND_URL}/api/student/auth/logout`,
						method: 'post',
					},
					user: { url: `${BACKEND_URL}/api/student/auth/me`, method: 'get' },
				},
			},
		},
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: 'http://127.0.0.1:8000/api',
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	// pwa: {
	// 	manifest: {
	// 		lang: 'en',
	// 	},
	// },

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
};
