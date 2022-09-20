import { Context, Middleware } from '@nuxt/types';

const staff: Middleware = (ctx: Context) => {
	const is_staff = ctx.$auth.user?.role;
	const strategy_name = ctx.$auth.strategy.name;

	console.debug(ctx.$auth);
	if (is_staff !== 'staff') {
		return ctx.redirect(`/${strategy_name}/dashboard`);
	}
};

export default staff;
