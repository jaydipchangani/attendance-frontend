// utils/jwt.ts
export const decodeJWT = (token: string) => {
  try {
    const payload = token.split('.')[1]; // middle part of JWT
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};
