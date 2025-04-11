import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds: number = 10;
  const hash: string = await bcrypt.hash(password, saltRounds);
  return hash;
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const isMatch: boolean = await bcrypt.compare(password, hash);
  return isMatch;
}