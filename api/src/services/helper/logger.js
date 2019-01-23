import log4js from "log4js";


log4js.configure(
  {
    appenders: {
      file: {
        type: 'file',
        filename: 'app-stub-logs.log',
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
        mode: 0o0640,
        flags: 'w+'
      },
      dateFile: {
        type: 'dateFile',
        filename: 'app-stub-logs.log',
        pattern: 'yyyy-MM-dd-hh',
        compress: true
      },
      out: {
        type: 'stdout'
      }
    },
    categories: {
      default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' }
    }
  }
);

function time(start) {
  const duration = Date.now() - start;
  return duration < 1000 ? `${duration}ms` : `${Math.round(duration / 1000)}s`;
}

export const logger = log4js.getLogger("Stubs_Api");

export const loggerKoa = async (ctx, next) => {
  const {originalUrl, method, request, res} = ctx;
  const start = Date.now();

  const requestBody = request.body || 'empty';
  logger.trace(`--> ${originalUrl} ${method} ${JSON.stringify(requestBody)}`);
  
  try {
    await next();
  } catch(err) {
    logger.error(err.message);
    throw err;
  }

  function done (eventName) {
    // remove listeners
    res.removeListener(eventName, done);
    // log response is finished or closed;
    const responseBody = ctx.body || '';

    logger.trace(`<-- ${ctx.originalUrl} ${ctx.status} ${JSON.stringify(responseBody)} ${time(start)}`);
  }

  res.once('finish', ()=> done('finish'));
  res.once('close', ()=> done('close'));
}
