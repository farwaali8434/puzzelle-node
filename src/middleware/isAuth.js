const isAuth = (req, res, next)=>{
    try{
    if (!req.headers.authorization) {
         return res.status(401).json({ message: "Unauthorized" });
    }
        const token  = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
}
catch (error) {
     if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(error);
     return res.status(401).json({ message: "Unauthorized" });
}
}
module.exports = isAuth;