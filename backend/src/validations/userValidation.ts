import { z, ZodType } from "zod";

export class UserValidation {
  static readonly UPDATE_USER: ZodType = z.object({
    banner: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    username: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    pronoun: z.string().optional(),
  });

  static readonly CHANGE_PASSWORD: ZodType = z.object({
    old_password: z.string().min(6),
    new_password: z.string().min(6),
  });
}
