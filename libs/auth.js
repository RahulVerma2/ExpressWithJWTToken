const jwt = require('jsonwebtoken');

exports.createToken = function(req, res, next) {

  jwt.sign({ user: { name: "Rahul" } }, "secretKey", (err, token) => {
    res.token = token;
    next();
  });

}

// Function to verify token
exports.verifyToken = function(req, res, next) {
  // Get the Auth header value

  const requestHeaders = req.headers['authorization'];
  // Check if auth header is present.
  if (requestHeaders) {
    console.log(requestHeaders);

    req.token = requestHeaders;
    jwt.verify(req.token, "secretKey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        res.authData = authData;
        next();
      }
    })

  }
  else {
    // FORBIDDEN
    res.sendStatus(403)
  }

}



