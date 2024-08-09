const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Get the authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the Bearer token

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    // Verify token authenticity using your secret key
    const decoded = jwt.verify(token, process.env.authSalt);

    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.sendStatus(403);
  }
}

module.exports = authenticateToken;
