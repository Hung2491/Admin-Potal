import type { AuthErrors, SignInPayload } from "../types/auth";

export const ValidateSignIn = (item: SignInPayload): AuthErrors => {
  const err: AuthErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!item.username) {
    err.username = "Email không được để trống";
  } else if (!emailRegex.test(item.username)) {
    err.username = "Email không đúng định dạng";
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

  if (!item.password) {
    err.password = "Password không được để trống";
  } else if (item.password.length < 6) {
    err.password = "Mật khẩu tối thiểu 6 ký tự";
  } else if (!passwordRegex.test(item.password)) {
    err.password = "Mật khẩu phải chứa chữ và số";
  }

  return err;
};
