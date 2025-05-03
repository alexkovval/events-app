import jwt from 'jsonwebtoken';
const secretKey = 'my-secret-key';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send(err);
    if (!user) return res.status(401).send('Unauthorized: Invalid token');

    req.user = user;
    next();
  });
};
