const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
const rest = require('./rest');

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
//if (! isProduction) {
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));
//}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));


// bind .rest() for ctx:
app.use(rest.restify());

// add controller:
app.use(controller());

// if not used by REST or controller, then static
//app.use(staticFiles('/', __dirname + '/static'));

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`app started at port ${port}...`);