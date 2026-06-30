import { login, signup } from "../services/authService.js";

//회원가입
export async function signupController(req, res, next) {
  try {
    const user = await signup(req.body);

    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

//로그인
export async function loginController(req, res, next) {
  try {
    const { refreshToken, ...data } = await login(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      message: "로그인에 성공했습니다.",
      data,
    });
  } catch (error) {
    next(error);
  }
}
