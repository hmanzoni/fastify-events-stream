import prisma from "../utils/prisma.util.js";
import { comparePassword } from "../utils/hash.util.js";
import { LoginUserData, RegisterUserData, UserPg } from "../types/users/users.js";

export const fetchUser = async (username: string) => {
  const user: UserPg = await prisma.users.findUnique({
    where: { username },
  });
  return user;
};

export const registerUser = async (data: RegisterUserData) => {
  const { id, username, password_hash, email } = data;
  const userInfo = await fetchUser(username);

  if (userInfo) throw new Error("User already exists");

  return await prisma.users.create({
    data: { id, username, email, password_hash },
  });
};

export const loginUser = async (data: LoginUserData) => {
  const { username, password } = data;
  const userInfo: UserPg = await fetchUser(username);

  if (!userInfo) throw new Error("User not found");

  const passMatch: boolean = await comparePassword(password, userInfo.password_hash);

  if (!passMatch) throw new Error("Login failed");

  return userInfo;
};
