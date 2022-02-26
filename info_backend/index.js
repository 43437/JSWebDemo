const Koa = require('koa');
const Router = require('koa-router')
const fs = require('fs')
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router({prefix: '/api'});

app.use(bodyParser());
// response
app.use(async (ctx, next)=> {
  // ctx.set('Access-Control-Allow-Origin', '*'); //允许来自所有域名请求(不携带cookie请求可以用*，如果有携带cookie请求必须指定域名)
  ctx.set("Access-Control-Allow-Origin", "http://localhost:3000"); // 只允许指定域名http://localhost:8080的请求

  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE'); // 设置所允许的HTTP请求方法

  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type'); //字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  ctx.set('Access-Control-Allow-Credentials', true); // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.body = 'Hello Koa';
  await next();
});

router.get('/', async(ctx) => {
  ctx.type = 'html'
  ctx.body = {
    data: {},
    state: 200,
    type: 'success'
  }
})

router.get('/alldoc', async(ctx) => {
  ctx.type = 'html'
  ctx.body = {
    data: {
      docs: [
        {'title': '钢铁', 'collection': 'new', 'date': '20211203', 'sn': '202112031155'},
        {'title': '是谁', 'collection': 'tmp', 'date': '20220312', 'sn': '202203121023'}
      ]
    },
    state: 200,
    type: 'success'
  }
})

router.get('/doc', async(ctx) => {
  let req = ctx.request
  console.log('query string: ', req.querystring)
  let fileName = req.querystring.substr(2)
  fileName = './doc/' + fileName
  let dat = fs.readFileSync(fileName, 'utf-8')
  ctx.type = 'html'
  ctx.body = {
    data: {
      doc: dat
    }
  }
})

router.post('/doc', async(ctx) => {
  console.log('post: ', ctx.request.body)
  let fileName = './doc/' + ctx.request.body.sn
  fs.writeFileSync(fileName, ctx.request.body.content)
  ctx.type = 'html'
  ctx.body = {
    state: 200,
    type: 'success'
  }
})

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(4000);