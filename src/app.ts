import Koa from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV ?? 'local'}`})

const app: Koa = new Koa();
const router = new Router();
const port = process.env.PORT ?? 8080;

app.use(async (ctx, next) => {
	const start = new Date() as any;
	await next();
    const end = new Date() as any;
	const ms = end - start;
	console.log('%s %s - %s',
		ctx.method,
		ctx.url,
		ms);
});

router.get('/badminton', async ctx => {
	ctx.body = 'Badminton Page';
});

router.get('/', async ctx => {
	ctx.body = 'GLobal Sports';
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, ()=> console.log(`NODE_ENV=${process.env.NODE_ENV} | Listining on http://localhost:${port}`));
