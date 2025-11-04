// src/common/adapters/validateToken.ts
import { ResponseValidateToken } from "../../interfaces/Responses";
import { httpAdapter, urlBase } from "./httpAdapter";

export const validateToken = async (token: string) => {
  try {
    const response = await httpAdapter.get<ResponseValidateToken>(
      `${urlBase}/api/auth/protected`,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(response)
    return response.ok;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
