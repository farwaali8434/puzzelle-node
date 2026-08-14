const attachUserIfPresent = (req, res, next) => {
  if (!req.headers.authorization) {
    req.playerType = "anonymous";
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.playerType = "registered";
    next();
  } catch (error) {
    return res.status(401).json({ message: "Session expired, please log in again" });
  }
};

module.exports = attachUserIfPresent;