import express from 'express';

const authRouter = express.Router();

export default (app, passport) => {
  app.use(
    '/auth',
    authRouter,
  );

  authRouter.post(
    '/signup',
    passport.authenticate('local-signup'),
    (req, res, next) => res.status(201).json({ message: 'user created successfully' }),
  );

  authRouter.post(
    '/login',
    passport.authenticate('local-login'),
    (req, res, next) => res.status(201).json({ messsage: 'login successful' }),
  );

  authRouter.get(
    '/logout',
    (req, res, next) => {
      if (typeof req.logout === 'function') {
        req.logout();
      }

      res.redirect('/');
    },
  );

  authRouter.get(
    '/facebook',
    passport.authenticate('facebook', { scope: 'email, public_profile, user_friends' }),
    (req, res, next) => res.status(200).json({ message: 'successfully authed via fb' }),
  );

  authRouter.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/', scope: 'email, public_profile, user_friends' }),
  );

  return authRouter;
};
