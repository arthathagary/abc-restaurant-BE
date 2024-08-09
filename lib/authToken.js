const jwt = require("jsonwebtoken");

/**
 * Authenticates a JSON Web Token (JWT) sent in the Authorization header of an HTTP request.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function in the Express.js chain.
 * @return {void}
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    req.user = jwt.verify(token, process.env.authSalt);
    next();
  } catch {
    return res.sendStatus(403);
  }
}

module.exports = authenticateToken;
