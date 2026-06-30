import { verifyAccessToken } from "../utils/token.js";

export default function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "인증 토큰이 없습니다.",
      });
    }

    const accessToken = authorization.split(" ")[1];

    const decoded = verifyAccessToken(accessToken);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "유효하지 않은 토큰입니다.",
    });
  }
}
