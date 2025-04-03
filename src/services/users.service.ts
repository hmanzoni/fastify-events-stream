import prisma from "../utils/prisma.util.js";
import { comparePassword } from "../utils/hash.util.js";

export async function fetchUser(username: string) {
  const user = await prisma.users.findUnique({
    where: { username },
  });
  return user;
}

export async function registerUser(data: { username: string; password_hash: string; email: string }) {
  const { username, password_hash, email } = data;
  const userInfo = await fetchUser(username);
  if (userInfo) {
    throw new Error("User already exists");
  }
  return await prisma.users.create({
    data: { username, email, password_hash },
  });
}

export async function loginUser(data: { username: string; password: string; }) {
  const userInfo = await fetchUser(data.username);
  if (!userInfo) {
    throw new Error("User not found");
  }
  const passMatch = await comparePassword(data.password, userInfo.password_hash);
  if (!passMatch) {
    throw new Error("Login failed");
  }
  return userInfo;
}