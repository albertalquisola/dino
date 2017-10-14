/*
 *  Project tra - The Recommendation Application
 *
 */
import bodyParser from 'body-parser';
import compression from 'compression';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import hbs from 'hbs';
import passport from 'passport';
import Redis from 'ioredis';
import { Strategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import config from 'config';
import controllers from 'controllers';
import coordinators from 'coordinators';
import errorHandler from 'util/errorHandler';
import mw from 'middleware';
import routes from 'routes';

// setup mysql connection pool
import 'lib/models/db';

const app = express();

const redisClient = new Redis(config.redis);
const RedisStore = ConnectRedis(expressSession);
const session = expressSession({
  store: new RedisStore({ client: redisClient }),
  secret: 'tra la la',
  resave: true,
  saveUninitialized: true,
});

// handlebars templating engine config
app.set('views', './public');
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use('/public', express.static(`${config.paths.rootDir}/public`));

// auth
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

const passportOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

passport.use('local-signup', new Strategy(passportOptions, controllers.user.signup));
passport.use('local-login', new Strategy(passportOptions, controllers.user.login));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true,
}, coordinators.auth.facebookSignup,
));

passport.serializeUser((id, callback) => {
  callback(null, id);
});

passport.deserializeUser((id, callback) => {
  callback(null, { id });
  // controllers.user.getUserById(id, (err, user) => callback(err, user));
});

// configure our routes
routes(app, mw, passport);

app.get(
  '/errorTest',
  (req, res, next) => next(new Error('is the error test working? IT BETTER BE!')),
);

/*
 * For our single-page app
 * always send back index.html for our SPA
 * simple isProd flag to load proper webpack file (prod or dev)
 */
app.get(
  '*',
  (req, res, next) => {
    res.render('index', { isProd: config.isProd });
  }
);

// /*
//  * ATTENTION! THIS MUST BE THE LAST app.use() IN MIDDLEWARE CHAIN
//  * This is our catch all error handler which sends a friendly message back to the client
//  * DO NOT put any other error handlers below this
//  */
app.use(errorHandler);

app.listen(config.ports.app, () => {
  console.log('bootup:', `express app listening on port ${config.ports.app}`);
});
