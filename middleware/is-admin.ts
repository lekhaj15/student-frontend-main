import { Context, Middleware } from '@nuxt/types';

const admin: Middleware = (ctx: Context) => {
	const is_admin = ctx.$auth.user?.role;
	const strategy_name = ctx.$auth.strategy.name;
	if (is_admin !== 'admin') {
		return ctx.redirect(`/${strategy_name}/dashboard`);
	}
};

export default admin;
