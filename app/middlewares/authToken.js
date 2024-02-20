import prisma from "../utils/prisma.js";

export const authToken = async (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const checkToken = await prisma.tokens.findUnique({
    where: { token },
    include: {
      user: true,
    },
  });

  if (!checkToken) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  if (checkToken.expires_at < new Date()) {
    return res.status(401).json({ message: "Token is expired!" });
  }

  req.user = checkToken.user;

  next();
};
