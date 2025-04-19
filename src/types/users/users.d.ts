export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date | null;
}

export type UserPg = User | null;

export interface RegisterUserData {
  id: string;
  username: string;
  password_hash: string;
  email: string;
}

export interface LoginUserData {
  username: string;
  password: string;
}

export interface RegisterBody {
  username: string;
  password: string;
  email: string;
}

export interface LoginBody {
  username: string;
  password: string;
}
