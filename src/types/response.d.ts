interface ResponseSent {
  type: "success" | "error";
  message: string;
  token?: string;
}
