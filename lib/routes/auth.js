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

        return res.status(200).json({ message: 'logged out successfully' });
      }

      return res.status(200).json({ message: 'user not logged in. logged out successfully' });
    },
  );

  authRouter.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['user_friends'] }),
    (req, res, next) => res.status(200).json({ message: 'successfully authed via fb' }),
  );

  authRouter.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['user_friends'] }),
    (req, res, next) => res.status(200).json({ message: 'successfully authed via fb' }),
  );

  return authRouter;
};
