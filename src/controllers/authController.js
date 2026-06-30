import { signup } from "../services/authService.js";

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
