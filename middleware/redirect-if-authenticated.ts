import { Context, Middleware } from '@nuxt/types';

const redirect_if_authenticated: Middleware = async (ctx: Context) => {
	// profile redirect hack
	// if loggout and trying to profile page
	// redirect to csm profile pages
	let strategy_name = ctx.$auth.strategy.name ?? 'admin';
	if (ctx.route.path === '/login') {
		return ctx.redirect(`/${strategy_name}/auth/login`);
	}
};

export default redirect_if_authenticated;
