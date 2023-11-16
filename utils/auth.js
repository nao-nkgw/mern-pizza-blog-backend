const jwt = require("jsonwebtoken");

const secret_key = "pizza-blog";

const auth = async (req, res, next) => {



//...

  if(req.method === "GET"){
    return handler(req, res, next)
}

const token = await req.headers.authorization.split(" ")[1]

if(!token){
    return res.status(401).json({message: "noToken"})
}

//...

  /*   if (req.method === "GET") {
    return handler(req,res);
  }

  const token =await req.headers.authorization.split(" ")[1] */

/*   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQHJlbmVoaS5jb20iLCJpYXQiOjE3MDAwNTM0NzAsImV4cCI6MTcwMDEzNjI3MH0.Ntq_lbMytFv4LPbSvRReS8lzLUWaAI2dxviS-6ijo4I"; */

 

  if (!token) {
    return res.status(401).json({ message: "there's no token" });
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
