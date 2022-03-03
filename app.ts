// import '@root/service/imageBackgroundRemoval/removeBackgroundProcess/node_modules/module-alias/register';
import 'module-alias/register';
import express, { Express, RequestHandler } from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParse from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectRedis from 'connect-redis';
import { socketInstance } from './socket';
import { readFileSync } from 'fs';
import session from 'express-session';
import redis, { RedisClient } from 'redis';
import useragent from 'express-useragent';
import http, { Server as HttpServer } from 'http';
import https, { ServerOptions as HttpsServerOptions, Server as HttpsServer } from 'https';

dotenv.config({ path: '../.env' });

const Fingerprint = require('express-fingerprint');
const port: number = Number(process.env.PORT) || 3000;
console.log({ port });
const redisClient: RedisClient = redis.createClient();
const host: string = process.env.URI || '127.0.0.1';
const redisStorage: connectRedis.RedisStore = connectRedis(session);

// MARK: Middleware
import * as langMid from '@middleware/languageMiddleware';
import * as cookieMid from '@middleware/cookieMiddleware';
import * as deviceMid from '@middleware/deviceDataMiddleware';

// MARK: Controller
import * as statsController from '@controller/statsController';
import * as convertFileController from '@controller/fileConversionController';
import * as convertImageController from '@controller/imageConversionController';
import * as authController from '@controller/authController';
import * as uploadImageController from '@controller/imageController';
import * as toolboxController from '@controller/toolboxController';
import * as databaseController from '@controller/databaseController';
import * as apiController from '@controller/apiController';

// MARK: Express config
const app: Express = express();
const sessionMiddleware: RequestHandler = session({
  store: new redisStorage({ host: host, port: 6379, client: redisClient, }),
  secret: 'you secret key',
  saveUninitialized: false,
  resave: false,
  rolling: true,
  name: 'session',
  cookie: { maxAge: 1000 * 60 * 60 * 6, httpOnly: false },
});
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, '/../'), { dotfiles: 'allow' }));
app.set('views', path.join(__dirname, '/../public'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet({ contentSecurityPolicy: false, }));
app.use(fileUpload());
app.use(cors());
app.use(cookieParse());
app.use(express.static(path.join(__dirname, '/../uploads/')));
app.use(express.static(path.join(__dirname, '/../src/uploads/')));
app.use(express.static(path.join(__dirname, '/../public/')));
app.use(express.static(path.join(__dirname, '/../scag/uiOutput')));
app.use(useragent.express());
app.use(Fingerprint({ parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders, Fingerprint.geoip] }));

declare module "express-session" { interface Session { data: { [sessionId: string]: { userHashId: string; }; }; } }

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// MARK: HTTP config
export const server: HttpServer = http.createServer(app)
  .listen((port), () => {
    return console.log(`Server SIGN is listening for port ${port} (HTTP)`);
  });

// inside of try/catch if ssl files do not exist
try {
  const keyPath: string | undefined = process.env.SSL_KEY_PATH;
  const certPath: string | undefined = process.env.SSL_CERT_PATH;
  if (!keyPath || !certPath) { throw Error(`no ssl cert files paths provided`); }
  const httpsOptions: HttpsServerOptions = {
    key: readFileSync(keyPath),
    cert: readFileSync(certPath),
  };
  const httpsServer: HttpsServer = https.createServer(httpsOptions, app)
    .listen(443, () => {
      console.log(`Server SIGN is listening for port 443 (HTTPS)`);
    });
  httpsServer.setTimeout(60000 * 2);
  app.enable('trust proxy');
  app.use(function (req, res, next) {
    if (!req.secure) { return res.redirect(307, `https://sign.lorret.one${req.url}`); }
    next();
  });
} catch (e) {
  console.log(`can't use https because of error: "${e.message}"`);
}

app.get('/toolbox', toolboxController.getToolbox);
app.get('/stats', statsController.getStats);

app.get('/sign', langMid.getLangDataByIp, cookieMid.sessionAuth, langMid.redirectWithLang);
app.get('/info', langMid.getLangDataByIp, cookieMid.sessionAuth, langMid.redirectWithLang);
app.get('/policy', langMid.getLangDataByIp, cookieMid.sessionAuth, langMid.redirectWithLang);
app.get('/tech', langMid.getLangDataByIp, cookieMid.sessionAuth, langMid.redirectWithLang);
app.get('/terms', langMid.getLangDataByIp, cookieMid.sessionAuth, langMid.redirectWithLang);
app.get('/cookie', langMid.getLangDataByIp, cookieMid.sessionAuth, langMid.redirectWithLang);
app.get('/subscription', langMid.getLangDataByIp, cookieMid.sessionAuth, langMid.redirectWithLang);

// -----------POST req------------- 
app.post('/auth', cookieMid.sessionAuth, authController.postAuth);
app.post('/api', cookieMid.sessionAuth, deviceMid.setDeviceDataMiddleware, apiController.postApi);
app.post('/convertimage', cookieMid.sessionAuth, convertImageController.postConvertImage);
app.post('/convertfile', cookieMid.sessionAuth, convertFileController.postConvertFile);
app.post('/uploadimage', cookieMid.sessionAuth, uploadImageController.postUploadImage);
app.post('/database', cookieMid.sessionAuth, databaseController.postDatabase);

// ----------- Socket.io --------------
socketInstance.setServer(server);
socketInstance.getIo.on('connection', socketInstance.onConnection);
