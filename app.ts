import Koa from 'koa';
const app: Koa = new Koa();
const port = 8000;

app.use(async ctx => {
	ctx.body = 'Hey Koa';
});

app.listen(port, ()=> console.log(`Listining on http://localhost:${port}`));
