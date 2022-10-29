import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};

// export const generateToken = (user: any) => {
//     return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
// }

// export const verifyToken = (token: string) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }

// export const generateRefreshToken = (user: any) => {
//     return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
// }

// export const verifyRefreshToken = (token: string) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }

// export const generateAccessToken = (user: any) => {
//     return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
// }

// export const verifyAccessToken = (token: string) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }
