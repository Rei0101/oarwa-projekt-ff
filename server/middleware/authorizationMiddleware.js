const authorizeUser = (role) => (req, res, next) => {
    if (req.dbUser && req.dbUser.role === role) {
      next();
    } else {
      next(Object.assign(new Error(), { status: 403 }));
    }
  };

export default authorizeUser;