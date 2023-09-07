import Koa from 'koa';
const app: Koa = new Koa();
const port = 8000;

app.use(async ctx => {
	start = new Date();
	await next();
	const ms = new Date() - start;
	console.log('%s %s - %s',
		ctx.method,
		ctx.url,
		ms);
});

app.get('/badminton', async ctx => {
	ctx.body = 'Badminton Page';
});

app.use(async ctx => {
	ctx.body = 'GLobal Sports';
});


app.listen(port, ()=> console.log(`Listining on http://localhost:${port}`));
