import { Context, Middleware } from '@nuxt/types';

const guest: Middleware = (ctx: Context) => {
	// if loggin as csm trying to access
	// login or register page redirect to profile page
	let strategy_name = ctx.$auth?.strategy?.name ?? '';
	if (ctx.app.$auth.loggedIn) {
		// if (strategy_name === 'contractor') {
		// 	return ctx.redirect(`/${strategy_name}/dashboard`);
		// }
		// if (strategy_name === 'supplier') {
		// 	return ctx.redirect(`/${strategy_name}/profile`);
		// }
		// if (strategy_name === 'machine_owner') {
		// 	return ctx.redirect(`/${strategy_name}/profile`);
		// }
	}
};

export default guest;
