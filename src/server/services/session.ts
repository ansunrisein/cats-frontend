"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "token";
const TOKEN = "ABC";

export const createSession = async ({ username }: { username: string }) => {
  "use server";

  const cookieStore = await cookies();

  cookieStore.set({ name: COOKIE_NAME, value: generateToken(username) });
};

export const getCurrentSession = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return parseToken(token);
};

const generateToken = (username: string) => `${TOKEN}+${username}`;

const parseToken = (token: string) => {
  const [tokenType, username] = token.split("+");

  if (tokenType !== TOKEN || !username) {
    return null;
  }

  return { username };
};
