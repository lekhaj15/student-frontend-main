import { Context, Middleware } from '@nuxt/types';

const student: Middleware = (ctx: Context) => {
	const is_student = ctx.$auth.user?.role;
	const strategy_name = ctx.$auth.strategy.name;
	if (is_student !== 'student') {
		return ctx.redirect(`/${strategy_name}/dashboard`);
	}
};

export default student;
