import prisma from "../utils/prisma.util.js";
import { comparePassword } from "../utils/hash.util.js";

export type UserPg = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date | null;
} | null;

export const fetchUser = async (username: string) => {
  const user: UserPg = await prisma.users.findUnique({
    where: { username },
  });
  return user;
};

export type RegisterUserData = {
  id: string;
  username: string;
  password_hash: string;
  email: string;
};

export const registerUser = async (data: RegisterUserData) => {
  const { id, username, password_hash, email } = data;
  const userInfo = await fetchUser(username);

  if (userInfo) throw new Error("User already exists");

  return await prisma.users.create({
    data: { id, username, email, password_hash },
  });
};

type LoginUserData = { username: string; password: string };

export const loginUser = async (data: LoginUserData) => {
  const { username, password } = data;
  const userInfo: UserPg = await fetchUser(username);

  if (!userInfo) throw new Error("User not found");

  const passMatch: boolean = await comparePassword(password, userInfo.password_hash);

  if (!passMatch) throw new Error("Login failed");

  return userInfo;
};
