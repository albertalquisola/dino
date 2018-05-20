function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();

  return next(new Error('user not authorized'));
}

function isUser(req, res, next) {
  if (parseInt(req.params.userId, 10) === req.user.id)
    return next();

  return next(new Error('user trying to access data for another person!'));
}

export default { isAuthenticated, isUser };
