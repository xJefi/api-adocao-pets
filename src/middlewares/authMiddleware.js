const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    return next();
  } catch {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

const authorizeRole = role => {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: 'Acesso negado' });

    next();
  };
};

const authorizeOwnerOrAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }

  if (Number(req.user.id) === Number(req.params.id)) {
    return next();
  }

  return res.status(403).json({
    message: 'Acesso negado',
  });
};

module.exports = { authenticateToken, authorizeRole, authorizeOwnerOrAdmin };
