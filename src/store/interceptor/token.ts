import { jwtDecode } from "jwt-decode";

export function isExpiringSoon(
  token: string,
  skewSeconds: number = 20
): boolean {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const exp = decoded.exp * 1000;
    return Date.now() > exp - skewSeconds * 1000;
  } catch (e) {
    return true;
  }
}
