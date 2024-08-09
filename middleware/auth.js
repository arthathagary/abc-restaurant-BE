// middleware/auth.js
const jwt = require("jsonwebtoken");

/**
 * Authenticates a JSON Web Token (JWT) sent in the Authorization header of an HTTP request.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function in the Express.js chain.
 * @return {void}
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.substring(7);

  try {
    req.user = jwt.verify(token, process.env.Salt);
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = authenticateJWT;
