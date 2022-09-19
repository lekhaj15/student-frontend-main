import { Context, Middleware } from '@nuxt/types';

const institute: Middleware = (ctx: Context) => {
	const is_institute = ctx.$auth.user?.role;
	const strategy_name = ctx.$auth.strategy.name;

	console.debug(ctx.$auth);
	// if (is_institute !== 'institute') {
	// 	return ctx.redirect(`/${strategy_name}/dashboard`);
	// }
};

export default institute;

