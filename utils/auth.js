const jwt = require("jsonwebtoken");

const secret_key = "pizza-blog";

const auth = async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG5hb25rZ3cuY29tIiwiaWF0IjoxNzAwMDM3NzYxLCJleHAiOjE3MDAxMjA1NjF9.0vxM5FCqUAasZUShJEHoQdsxiUgdjhCOlJHk6PA_nkE";

  //   await req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "there's no token" });
  }
  try {
    const decoded = jwt.verify(token, secret_key);
    req.body.email = decoded.email;
    return next(); //194
  } catch (err) {
    return res.status(400).json({ message: "wrong token! please login." });
  }
};

module.exports = auth;
