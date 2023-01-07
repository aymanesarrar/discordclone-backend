export interface ResponseSent {
  type: "success" | "error";
  message: string;
  token?: string;
}
export interface JWTPayload {
  username: string;
  id: string;
  role: "ADMIN" | "SUPERADMIN" | "USER";
  created_at: string;
  iat: number;
  exp: number;
}
