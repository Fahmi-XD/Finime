import { z, ZodType } from "zod";

export default class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string().min(5).max(100),
    username: z.string().min(5).max(100),
    email: z.string().email().max(100),
    password: z.string().min(1).max(100),
  });
  
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(5).max(100),
    password: z.string().min(1).max(100),
  });
}
